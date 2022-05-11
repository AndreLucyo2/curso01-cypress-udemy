///<reference types = "cypress"/>

describe('Esperas...', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    it('Deve aguardar elemento estar disponivel', () => {

        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funcionou')

    });

    it('Deve fazer retrys', () => {

        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funcionou')

    });

    it.only('Uso do find', () => {

        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')

        cy.get('#lista li span')
            .should('contain', 'Item 1')

    });



});