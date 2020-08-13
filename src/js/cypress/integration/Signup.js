import { signUp } from './util'

describe('User Sign Up Tests', () => {
    // it('Successful Sign up from nav bar', () => {
    //   cy.visit('/')
    //   cy.get('a[href="#/register"]').click()
    //   cy.get('[placeholder="Username"]')
    //   cy.get('[placeholder="Email"]')
    //   cy.get('[placeholder="Password"]')
    //   cy.get('[type="submit"]')
    //   
    // })
    
    
    it('Password can\'t be blank', () => {
        cy.visit('/') 
        cy.get('a[href="#/register"]').click() // test this only once
        signUp('User A', 'A@123.com', ' ') // luckily this takes a space.  Technically it is not blank though
        cy.contains('li.ng-binding.ng-scope', 'password can\'t be blank')
    })

    it('Password is too short', () => {
        cy.visit('/register')
        signUp('User A', 'A@A.com', '1234567')
        cy.contains('li.ng-binding.ng-scope', 'password is too short (minimum is 8 characters)')
    })

    it('username has already been taken', () => {
        cy.visit('/register')
        signUp('TerryIsBonkers', 'A@A.com', '1234567')
        cy.contains('li.ng-binding.ng-scope', 'username has already been taken')
    })

    // this one is a pain in the arse as type does not accept empty string
    it('username is too short (minimum is 1 character), username can\'t be blank', () => {
        cy.visit('/register')
        // signUp('', 'A@A.com', '1234567')
        cy.get('[placeholder="Username"]').invoke('val', '')
        cy.get('[placeholder="Email"]').type('A@A.com')
        cy.get('[placeholder="Password"]').type('12345678')
        cy.get('[type="submit"]').click()
        cy.contains('li.ng-binding.ng-scope', 'username is too short (minimum is 1 character)')
        cy.contains('li.ng-binding.ng-scope', 'username can\'t be blank')
    })
    
    it('username is too long (maximum is 20 characters)', () => {
        cy.visit('/register')
        signUp('123456789012345678901', 'A@A.com', '1234567')  
        cy.contains('li.ng-binding.ng-scope', 'username is too long (maximum is 20 characters)')
    })

    it('email can\'t be blank', () => {
        cy.visit('/register')
        cy.get('[placeholder="Username"]').type('gary')
        cy.get('[placeholder="Email"]').invoke('val', '')
        cy.get('[placeholder="Password"]').type('12345678')
        cy.get('[type="submit"]').click()
        cy.contains('li.ng-binding.ng-scope', 'email can\'t be blank')
    })


  })
