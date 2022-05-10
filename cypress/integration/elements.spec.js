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

    it('Text', () => {

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')

        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it('Links', () => {

        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        //Recarregar a pagina
        cy.reload()
        //Validar que o elemento não texto nao contem
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

    });

    it.only('TextFields', () => {

        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        //obtem o elemento: manda digitar o texto e valida se esta com o texto
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        //Selecionar emento da tabela:
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        //Executa teclas junto com o texto:
        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        //obtem o elemento: manda digitar o texto e valida se esta com o texto
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{Selectall}acerto', {delay:500})
            .should('have.value', 'acerto')


    });

});