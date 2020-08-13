describe('API Sign Up Tests', () => {
   
    // Ideally we would have access to the db to delete this user before creating
    // Then we could reuse the same data

    // it('API Successful sign up', () => {   
    //     cy
    //     .request({
    //             method:'POST', 
    //             url:'https://conduit.productionready.io/api/users',
    //             form: true,
    //             body: {"user":{"email":"billy@billy.com", "password":"billy2000", "username":"Billy"} }})
    //             .then((response) => {
    //                     expect(response.status).to.eq(200)
    //                     cy.log(response.body)
    //                 })
    // })

    it('username has already been taken', () => {
        cy
        .request({
                failOnStatusCode: false,
                method:'POST', 
                url:'https://conduit.productionready.io/api/users',
                form: true,
                body: {"user":{"email":"noname@noname.com", "password":"noname20000", "username":"TerryIsBonkers"}}})
                .then((response) => {
                    expect(response.status).to.eq(422)
                    cy.log(response.body)
                    expect(response.body.errors).to.have.property('username').to.contain('has already been taken')
                })
    })
    
    // username is too short etc....
})
