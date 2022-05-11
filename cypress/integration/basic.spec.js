///<reference types = "cypress"/>

//https://www.wcaquino.me/cypress/componentes.html

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
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
        //Imprimir o titulo no console
        //cy.title().debug()
        //recuperando o titulo com promises then
        cy.title().then(title => {
            console.log(title)
        })

        //recuperando o titulo com promises com should
        cy.title().should(title => {
            console.log(title)
        })

        //Escrever o log em um campo de texto na pagina
        cy.title().then(title => {

            cy.get('#formNome').type(title)
        })

    });

    it.only('Should visit a page and assert title', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        //Variavel para guardar o titulo
        let syncTitle
        cy.title().then(title => {
            //Escree o titulo no console
            console.log(title)
            //passa o titulo para um campo
            cy.get('#formNome').type(title)
            //Guarda o titulo em uma variavel
            syncTitle = title
        })

        //passa o valor da variavel para uma campo:
        cy.get('[data-cy="dataSobrenome"]').then($sel =>{
            $sel.val(syncTitle)
        })

        //Usando o wrap
        cy.get('#elementosForm\\:sugestoes').then($sel =>{
            cy.wrap($sel).type(syncTitle)
        })

    });

    it('Should find and with an element', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

    });
});