///<reference types = "cypress"/>

//https://www.wcaquino.me/cypress/componentes.html

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        //Deve ser de forma assincrona
        // const title = cy.title()
        // console.log(title)

        // cy.pause();

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        //Desafios :
        //TODO: Imprimir o titulo no console
        //cy.title().debug()
        //recuperando o titulo com promises then
        cy.title().then(title => {
            console.log(title)
        })
        //recuperando o titulo com promises com should
        cy.title().should(title => {
            console.log(title)
        })


        //TODO: Escrever o log em um campo de texto na pagina
    });

    it('Should find and with an element', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

    });
});