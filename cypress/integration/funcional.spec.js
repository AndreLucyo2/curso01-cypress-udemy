
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/') 
    });

    it('Login', () => {
        // cy.get('.input-group > .form-control').type('andre.lucyo2@gmail.com')
        // cy.get('[data-test="passwd"]').type('123456');
        // cy.get('.btn').should('be.visible').click();
        cy.login('andre.lucyo2@gmail.com','123456');
        cy.get('.toast-message').should('contain','Bem vindo');

    });
    
});