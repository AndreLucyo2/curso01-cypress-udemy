/// <reference types="cypress" />

import { date } from "assert-plus";

describe('Clock', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Goin back to the past', () => {

        //usando a data atual no sistema:
        cy.get('#buttonNow').click()
        cy.get('#resultado>span').should('contain', '13/05/2022')
        
        //reseta o tempo para default
        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado>span').should('contain', '31/12/1969')

        //Setar uma data para o clock
        const dt = new Date(2022,10,10,18,50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado>span').should('contain', '10/11/2022')

    });
})