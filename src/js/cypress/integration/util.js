export const login = (email, password) => {
    cy.get('[placeholder="Email"]').type(email)
    cy.get('[placeholder="Password"]').type(password)
    cy.get('[type="submit"]').click()
  }

  export const signUp = (username, email, password) => {
    cy.get('[placeholder="Username"]').type(username)
    cy.get('[placeholder="Email"]').type(email)
    cy.get('[placeholder="Password"]').type(password)
    cy.get('[type="submit"]').click()
  }