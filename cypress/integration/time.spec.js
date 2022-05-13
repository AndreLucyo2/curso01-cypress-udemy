/// <reference types="cypress" />

import {
    date
} from "assert-plus";

describe('Clock', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Setando uma data para o passado:
    it('Goin back to the past', () => {

        //usando a data atual no sistema:
        cy.get('#buttonNow').click()
        cy.get('#resultado>span').should('contain', '13/05/2022')

        //reseta o tempo para default
        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado>span').should('contain', '31/12/1969')

        //Setar uma data para o clock : o clock nao deve ser executado mais de uma vez por teste
        const dt = new Date(2022, 10, 10, 18, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado>span').should('contain', '10/11/2022')

    });

    //Usando tick:
    it.only('Goes to the future', () => {

        cy.get('#buttonTimePassed').click()

        //validar se o texto contem time: em milesegundos
        cy.get('#resultado>span').should('contain', '1652')
        //validar se o texto contem time maior: em milesegundos
        //cy.get('#resultado > span').invoke('text').should('gt', 16524720)

        //cy.clock()
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 0)
        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 5000)

        cy.clock()
        cy.tick(4000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 0)

    });



})