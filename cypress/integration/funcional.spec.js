
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('andre.lucyo2@gmail.com', '123456');
    });

    xit('Login', () => {
        //Arrange
        cy.get('.input-group > .form-control').type('andre.lucyo2@gmail.com')
        cy.get('[data-test="passwd"]').type('123456');

        //Act
        cy.get('.btn').should('be.visible').click();

        //Assert:
        cy.get('.toast-message').should('contain', 'Bem vindo');

    });

    it('Create an account', () => {
        //Arrange
        cy.get('[data-test="menu-settings"]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test="nome"]').should('be.visible').type('Conta Teste - ' + Date.now())

        //Act
        cy.get('.btn').should('be.visible').click();

        //Assert
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso');

    });

    it('Update an Count', () => {
        //Arrange
        const nmConta = 'Conta Teste - ' + Date.now();
        const nmContaEdit = 'Conta Editada - ' + Date.now();
        //Crio uma conta:
        cy.get('[data-test="menu-settings"]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test="nome"]').should('be.visible').type(nmConta)
        cy.get('.btn').should('be.visible').click();
       
        //Act
        //Seleciono e clico em editar:
        cy.get('.table').should('be.visible').children().contains(nmConta).click();
        cy.xpath(`//table//td[contains(.,'${nmConta}')]/..//i[@class='far fa-edit']`).click()
        //Limpo o campo e altero o nome:
        cy.get('[data-test="nome"]').should('be.visible').clear().type(nmContaEdit);
        cy.get('.btn').should('be.visible').click();

        //Assert
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso');

    });

});