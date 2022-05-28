
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/') 
    });

    it('Login', () => {
        //Arrange
        cy.get('.input-group > .form-control').type('andre.lucyo2@gmail.com')
        cy.get('[data-test="passwd"]').type('123456');

        //Act
        cy.get('.btn').should('be.visible').click();

        //Assert:
        cy.get('.toast-message').should('contain','Bem vindo');

    });

    it.only('...', () => {

        //Arrange
        cy.login('andre.lucyo2@gmail.com','123456');

        //Act


        //Assert:

        
    });
    
});