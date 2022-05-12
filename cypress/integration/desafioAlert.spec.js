///<reference types = "cypress"/>

describe('Esperas...', () => {

    //Executa uma vez antes de cada test
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    //Executa antes de cada teste
    beforeEach(() => {
        //Recarregar a pagina
        cy.reload()
    });

    //----------------------------------------------------------
    //Desafio:
    //----------------------------------------------------------
    //TODO - Acessar a pagina com o form vazio
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert 
    //TODO - Preencher o campo nome
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Preencher o campo sobrenome
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Informar o sexo: Masculino
    //TODO - Clicar em cadastrar
    //TODO - Validar a msg do alert
    //TODO - Validar se foi cadastrada com sucesso!

    //----------------------------------------------------------
    //Resolvendo:
    //----------------------------------------------------------
    it.only('Validando mensagens Desafio', () => {


        //Criar stub do alerta
        const stub = cy.stub().as('Alerta')

        //Quando ocorrer o evento alert, chama o stub
        cy.on('window:alert', stub)

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })

        //Preenche o campo nome:
        cy.get('#formNome').type('Andre')

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })

        //Preenche o campo sobrenome:
        cy.get('[data-cy="dataSobrenome"]').type('Lucio')

        //Clicar em cadastrar, faz o acert para ver se o alert veio com a msg esperada:
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })

        //Seleciona o sexo: masculino
        cy.get('#formSexoMasc').click()

        //Clicar em cadastrar
        cy.get('#formCadastrar').click()

        //Valida se apareceu a informação de cadastrado
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

    });

});