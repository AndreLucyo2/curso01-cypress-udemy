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

    it('Wrap com pomises', () => {

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



    it.only('Its...', () => {
        const obj = {
            nome: 'User',
            idade: 20
        }

        //acertiva com uma propriedade e seu valor
        cy.wrap(obj).should('have.property', 'nome', 'User')

        //Pegando apenas uma propriedade do objeto com uso do Its
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        //--------------------------------------------
        const obj2 = {
            nome: 'User',
            idade: '20',
            endereco: {
                rua: 'dos bobos',
                num: '123'
            }
        }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        //Its encadeados
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        //Percorrendo o objeto
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        //Pegando uma propriedade do titulo:
        cy.title().its('length').should('be.eq', 20)



    });

});