
///<reference types = "cypress"/>

import elements from '../support/locators.js'

describe('Sholud test at a functional level', () => {

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('andre.lucyo2@gmail.com', '123456');
    });

    xit('Login', () => {
        //Arrange
        cy.get(elements.LOGIN.USER).type('andre.lucyo2@gmail.com')
        cy.get(elements.LOGIN.PASSWORD).type('123456');

        //Act
        cy.get(elements.LOGIN.BTN_LOGIN).should('be.visible').click();

        //Assert:
        cy.get(elements.MESSAGE).should('contain', 'Bem vindo');

    });

    it('Create an account', () => {
        //Arrange
        cy.get(elements.MENU.SETTINGS).click();
        cy.get(elements.MENU.CONTAS).click();
        cy.get(elements.CONTAS.NOME).should('be.visible').type('Conta Teste - ' + Date.now())

        //Act
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Assert
        cy.get(elements.MESSAGE).should('contain', 'Conta inserida com sucesso');

    });

    it.only('Update an Count', () => {
        //Arrange
        const nmConta = 'Conta Teste - ' + Date.now();
        const nmContaEdit = 'Conta Editada - ' + Date.now();
        //Criar conta:
        cy.get(elements.MENU.SETTINGS).click();
        cy.get(elements.MENU.CONTAS).click();
        cy.get(elements.CONTAS.NOME).should('be.visible').type(nmConta)
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Act
        //Editar:
        cy.xpath(`//table//td[contains(.,'${nmConta}')]/..//i[@class='far fa-edit']`).click()
        //Limpo o campo e altero o nome:
        cy.get(elements.CONTAS.NOME).should('be.visible')
            .clear()
            .type(nmContaEdit);
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Assert
        cy.get(elements.MESSAGE).should('contain', 'Conta atualizada com sucesso');

    });

});