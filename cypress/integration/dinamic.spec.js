/// <reference types="cypress" />
describe('Dinamic tests', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Tipos de comida:
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    //faz um laço com os elementos do array
    foods.forEach(food => {

        //Vai executar um teste para cada elemento do array:
        it(`Cadastro com comida variada: '${food}'`, function () {

            //Obtem os dados mokados: busca direto na pasta de fixtures
            cy.fixture('userData').as('usuario').then(() => {

                cy.get('#formNome').type(this.usuario.nome)
                cy.get('#formSobrenome').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()

                //locator com xpatch -- instalar plugin : seção 7 Xpath
                // https://docs.cypress.io/plugins/directory
                // https://github.com/cypress-io/cypress-xpath                
                cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()

                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esportes)

                //Clicar em cadastrar
                cy.get('#formCadastrar').click()

                //Valida se apareceu a informação de cadastrado
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

            })

        });

    })


    it.only(`Cadastro com comida variada usando each:`, function () {

        //Obtem os dados mokados: busca direto na pasta de fixtures
        cy.fixture('userData').as('usuario').then(() => {

            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()

            //Usando o EACH:
            cy.get('[name=formComidaFavorita]').each($el =>{

                //Condicional para atender a regra:
                if ($el.val() != 'vegetariano' ) {                    
                    cy.wrap($el).click()
                }
            })

            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)

            //Clicar em cadastrar
            cy.get('#formCadastrar').click()

            //Valida se apareceu a informação de cadastrado
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
  
        })

    });




})