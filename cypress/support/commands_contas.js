///<reference types = "cypress"/>

import elements from './locators.js'

Cypress.Commands.add('acessarMenuConta',()=>{
    cy.get(elements.MENU.SETTINGS).click();
    cy.get(elements.MENU.CONTAS).click();
})

Cypress.Commands.add('inserirConta',(conta)=>{
    cy.get(elements.CONTAS.NOME).type(conta);
    cy.get(elements.CONTAS.BTN_SALVAR).click();
})

