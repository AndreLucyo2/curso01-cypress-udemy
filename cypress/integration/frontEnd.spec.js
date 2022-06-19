
///<reference types = "cypress"/>

import elements from '../support/locators.js'

describe('Sholud test at a functional level', () => {

    after(()=>{
        cy.clearLocalStorage();
    })

    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'Usuario falso',
                token: 'Uma string grande, nao deve ser aceito mais vai.'
            }
        }).as('signin')
        
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.login('andre.lucyo2@gmail.com', 'ABCDESSSSSSSSS');
        cy.resetApp();
    });

    beforeEach(()=>{
        cy.get(elements.MENU.HOME).click();
        cy.resetApp();
    })

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
        const nmConta = 'Conta Teste - ' + Date.now();
        cy.get(elements.MENU.SETTINGS).click();
        cy.get(elements.MENU.CONTAS).click();
        cy.get(elements.CONTAS.NOME).should('be.visible').type('Conta Teste - ' + Date.now())

        //Act
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Assert
        cy.get(elements.MESSAGE).should('contain', 'Conta inserida com sucesso');

    });

    it('Update an Count', () => {
        //Arrange
        const nmConta = 'Conta Teste - ' + Date.now();
        const nmContaEdit = 'Conta Editada - ' + Date.now();
        cy.acessarMenuConta();
        cy.inserirConta(nmConta);

        //Act
        cy.xpath(`//table//td[contains(.,'${nmConta}')]/..//i[@class='far fa-edit']`).click()
        cy.get(elements.CONTAS.NOME).should('be.visible')
            .clear()
            .type(nmContaEdit);
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Assert
        cy.get(elements.MESSAGE).should('contain', 'Conta atualizada com sucesso');

    });

    it.only('Create an duplicate Count', () => {
        //Arrange
        const nmConta1 = 'Conta Teste1 - ' + Date.now();
        const nmConta2 = 'Conta Teste2 - ' + Date.now();
        cy.acessarMenuConta();
        cy.inserirConta(nmConta1);
        cy.acessarMenuConta();
        cy.inserirConta(nmConta2);

        //Act
        cy.xpath(`//table//td[contains(.,'${nmConta1}')]/..//i[@class='far fa-edit']`).should('be.visible').click()
        cy.get(elements.CONTAS.NOME).should('be.visible')
            .clear()
            .type(nmConta2);
        cy.get(elements.CONTAS.BTN_SALVAR).should('be.visible').click();

        //Assert
        cy.get(elements.MESSAGE).should('be.visible')
            .should('contain', 'code 400');

        //Teste função javaScript
        const texto = (nome,sobrenome) => `Nome: ${nome} \nSobre Nome: ${sobrenome}`
        console.log(texto('Andre','Lucio'));

    });

});