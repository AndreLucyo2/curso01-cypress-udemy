///<reference types = "cypress"/>

describe('Helpers', () => {
    
    it('Wrap', () => {

        const obj = {
            nome: 'User',
            idade: 20
        }
        expect(obj).to.have.property('nome')
        //usando o whap, trazendo o objeto para o cypress:
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').then($el => {
            //Sel.val('funciona via jquery')
            cy.wrap($el).type('funciona via cypress')
        })

    })

    it.only('Wrap com pomises', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontreio elemento'))
        
        //usando a promises criado anteriormente
        cy.wrap(promise).then(ret => console.log(ret))

        cy.get('#buttonList').then(() => console.log('Encontrei o segundo'))
    });
    
});