describe('API Navigation to an article tests', () => {
   
    // Here we want to create a new article then get to it

   
    it('A valid article can be found via API', () => {   
        cy
        .request({
                method:'GET', 
                url:'https://conduit.productionready.io/api/articles/narky-marky-gswkvx',
                form: true})
                .then((response) => {
                        expect(response.status).to.eq(200)
                        cy.log(response.body)
                        expect(response.body.article.slug).to.equal('narky-marky-gswkvx')
                        expect(response.body.article.title).to.equal('Narky Marky')
                    })
    })

    it('404 error - article not there', () => {   
        cy
        .request({
                failOnStatusCode: false,
                method:'GET', 
                url:'https://conduit.productionready.io/api/articles/narky-marky-wwwwww',
                form: true})
                .then((response) => {
                        expect(response.status).to.eq(404)
                        cy.log(response.body)
                        expect(response.body.error).to.equal('Not Found')
                    })
    })


})