///<reference types = "cypress"/>

describe('Work with basic elements', () => {

    //Executa antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    it('Text', ()=>{
        
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
    
});