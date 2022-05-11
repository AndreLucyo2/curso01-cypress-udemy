///<reference types = "cypress"/>

describe('Work with basic elements', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    it('Text', () => {

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')

        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it('Links', () => {

        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        //Recarregar a pagina
        cy.reload()
        //Validar que o elemento não texto nao contem
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

    });

    it('TextFields', () => {

        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        //obtem o elemento: manda digitar o texto e valida se esta com o texto
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        //Selecionar emento da tabela:
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        //Executa teclas junto com o texto:
        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        //obtem o elemento: manda digitar o texto e valida se esta com o texto
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{Selectall}acerto', {
                delay: 500
            })
            .should('have.value', 'acerto')

    });

    it('RadioButton', () => {

        //Validar se esta checado
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        //Validar se  não esta checado
        cy.get('#formSexoMasc').should('not.be.checked')

        //faz a por propriedade, validar se selecionou os dois ementos:
        cy.get('[name=formSexo]').should('have.length', 2)


    });

    it('CheckBox', () => {

        //Checa a opção pizza:
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        //Checa todos os checkbox
        cy.get('[name=formComidaFavorita]').click({
            multiple: true
        })
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')

    });

    it('ComboBox', () => {
        //Selecionando o valor visivel:
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        //selecionando o value
        cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        //Validar as opções do combo
        //Saber que existe um determinado item
        // 1 - validar a qtd de itens do combo
        cy.get('[data-test="dataEscolaridade"] option').should('have.length', 8)

        // 2 - Obter os itens, faz iteração
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []

            $arr.each(function () {
                //Obtem os elementos e adiciona no array
                values.push(this.innerHTML)
            })

            //Validar se os elementos estão presentes
            expect(values).to.include.members(['Superior', 'Mestrado'])
        })
    });

    it.only('Combobox multiplo select', () => {

        //Sewlecionar mais de uma opção, manda um array de values
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])

        //Validar as opções selecionadas do combo multiplo
        //incorreto:
        // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
        
        //Forma 1:
        cy.get('[data-testid=dataEsportes]').then($el => {
            //validar a quantidade de itens selecionada:
            expect($el.val()).to.have.length(3)
            //validar quais itens foram selecionadaos
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])

        })

        //Forma 2:
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida', 'nada'])

    });

});