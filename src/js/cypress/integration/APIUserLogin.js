describe('API Login Tests', () => {
   
    // Yes Ideally we would create a new user then test on it
    // then delete the user from the DB.  
    // But for now this is all we have.  
   
    it('A valid user can log in through API', () => {   
        cy
        .request({
                method:'POST', 
                url:'https://conduit.productionready.io/api/users/login',
                form: true,
                body: {"user":{"email":"terry@terry.com", "password":"Terry200"}}})
                .then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.have.property('user').to.have.property('email').to.eq('terry@terry.com')
                        cy.log(response.body)
                        expect(response.body.user.username).to.equal('TerryIsBonkers')
                        
                    })
    })

    it('email or password is invalid - invalid email', () => {
        cy
        .request({
                failOnStatusCode: false,
                method:'POST', 
                url:'https://conduit.productionready.io/api/users/login',
                form: true,
                body: {"user":{"email":"terry@", "password":"Terry200"}}})
                .then((response) => {
                    expect(response.status).to.eq(422)
                    cy.log(response.body)
                    expect(response.body.errors).to.have.property('email or password').to.contain('is invalid')
                })
    }) 

    it('email or password is invalid - invalid password', () => {
        cy
        .request({
                failOnStatusCode: false,
                method:'POST', 
                url:'https://conduit.productionready.io/api/users/login',
                form: true,
                body: {"user":{"email":"terry@terry.com", "password":"INVALID"}}})
                .then((response) => {
                    expect(response.status).to.eq(422)
                    cy.log(response.body)
                    expect(response.body.errors).to.have.property('email or password').to.contain('is invalid')
                })
    }) 
})

    

