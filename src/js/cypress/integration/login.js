import { login } from './util'
// Ideally we would sign up a new user first
// then log in and do all those tests
// then delete the user from the db.  Alas will do that with more time...

describe('Login tests', () => {
   // Valid user details 
    const validEmail = 'terry@terry.com'
    const validPassword = 'Terry200'
   // Invalid user details 
    const invalidEmail = 'terry@very'
    const invalidPassword = 'Giraffe'

  it('A Valid User can log in', () => {

    cy.server()
    // listen for POST request
    cy.route('POST', 'https://conduit.productionready.io/api/users/login').as('login')
    cy.visit('/')
    cy.get('a[href="#/login"]').click()
    login(validEmail, validPassword)

    // Verify post request
    cy.wait('@login').its('status').should('eq', 200)
    // verify Your feed and Global feed
    cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active')
    cy.contains('a.nav-link', 'Global Feed')
      .should('not.have.class', 'active')
      .click()
      .should('have.class', 'active')
    })

  it('Invalid email address', () => {
    cy.visit('/login')
    login(invalidEmail, validPassword)
    cy.contains('li.ng-binding.ng-scope', 'email or password is invalid')
  })

  it('Invalid password', () => {
    cy.visit('/login')
    login(validEmail, invalidPassword)
    cy.contains('li.ng-binding.ng-scope', 'email or password is invalid')  
  })
})