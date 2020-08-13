describe('Global Feed Load Test', () => {
    it('global feed is loaded correctly', () => {   
    // login with API and set jwt
    cy
    .request({method:'POST', 
             url:'https://conduit.productionready.io/api/users/login',
             form: true,
             body: {"user":{"email":"terry@terry.com", "password":"Terry200"}}})
             .then((response) => {
                    expect(response.status).to.eq(200)
                    window.localStorage.setItem('jwtToken', response.body.user.token)
                })
        cy.server()
        // listen for get requests
        cy.route('GET', 'https://conduit.productionready.io/api/user').as('user')
        cy.route('GET', 'https://conduit.productionready.io/api/tags').as('tags')
        cy.route('GET', 'https://conduit.productionready.io/api/articles/feed?limit=10&offset=0').as('feed')
    
        //visit our site
    cy.visit('/')
        // Verify get requests
    cy.wait('@user').its('status').should('eq', 200)        
    cy.wait('@tags').its('status').should('eq', 200)
    cy.wait('@feed').its('status').should('eq', 200)

    })
})