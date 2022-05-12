///<reference types = "cypress"/>

describe('Work with basic elements', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    it('Using jquery selectors', () => {

        //Refinamento de seletores jquery
        cy.get('table#tabelaUsuarios')
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody >tr td:nth-child(3) > input ')
        cy.get('table#tabelaUsuarios tbody >tr:eq(0) td:nth-child(3) > input ').click()

        cy.get('[value="Clique aqui"]')
        cy.get('[onclick*="Francisco"]') // * quer dizer que contenha 
        //navegando pelos irmãos
        cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
        //navegando pela linha:
        cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input')



    });



})