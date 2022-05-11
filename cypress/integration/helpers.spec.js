///<reference types = "cypress"/>

describe('Helpers...', () => {

    it('Wrap', () => {

        const obj = {
            nome: 'User',
            idade: 20
        }
        expect(obj).to.have.property('nome')
        //usando o whap, trazendo o objeto para o cypress:
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#formNome').then ($el => {
            //Sel.val('funciona via jquery')
            cy.wrap($el).type('funciona via cypress')
         })

    })
})