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

    it('Uso do find', () => {

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


    it('Uso do timeout', () => {

        cy.get('#buttonDelay').click()
        //alterando o timeout na consulta: se liberar antes, ele libera o fluxo
        cy.get('#novoCampo', {
            timeout: 1000
        }).should('exist')
    });

    it('Uso do wait', () => {

        cy.get('#buttonListDOM').click()
        //para o fluxo do cypress
        cy.wait(5000)
        cy.get('#lista li span')
            .should('contain', 'Item 2')

    });

    it.only('Uso do wait', () => {

        cy.get('#buttonListDOM').click()
        //só libera quando satifazer todas as acertivas
        cy.get('#lista li span', {
                timeout: 8000
            })
            .should('have.length', 1)
        //Ideal é fazer as acertivas separadas
        cy.get('#lista li span')
            .should('have.length', 2)
    });





});