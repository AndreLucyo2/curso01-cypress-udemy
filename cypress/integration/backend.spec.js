
///<reference types = "cypress"/>

import { random } from "lodash";

describe('Sholud test at a functional level', () => {

    //Guardar o token para usar em mais testes
    let token;

    //Antes de executar o teste, ele recupera o token
    before(() => {

        //Guarda o tokem de forma assincrona, pois é uma promisses
        // cy.cmdGetToken("andre.lucyo2@gmail.com", "123456").then(tkn => {
        //     token = tkn;
        // })

        //Recupera o token utilizando dados de acesso oculto no cypress.env.json
        cy.cmdGetTokenOculto().then(tkn => {
            token = tkn;
        })

    });

    beforeEach(() => {
        //Reseta dados do usuario:
        cy.cmdResetRest(token);
    });

    it('Create an account', () => {

        //Arrange:
        const fakeNomeConta = 'Conta criada pela api REST_01'

        //Act:
        //Adiciona uma nova conta pelo backend:
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: fakeNomeConta
            }
        }).as('response');//Adicionado um nome para o retorno para usar mais para frente nos testes

        //Asserts:
        cy.get('@response').then(resp => {
            cy.log(resp);

            //Testa se retornou sucesso:
            expect(resp.status).to.be.equals(201);
            //Testa se no body contem a propriedade chamada id
            expect(resp.body).to.have.property('id');
            //Testa se no body contem a propriedade chamada nome com o nome da conta criada
            expect(resp.body).to.have.property('nome', fakeNomeConta);

        })

    });

    it('Update a account', () => {

        //Arrange:
        const fakeNomeConta = 'Conta criada pela api REST - ' + random(0, 100);
        const fakeNomeContaEditada = 'Conta alterada via api REST - ' + random(0, 100);

        //Cria uma nova conta:
        cy.cmdAddAccount(fakeNomeConta).then(obj => {

            //Act 
            //Faz o update:
            cy.request({
                url: Cypress.config().baseApiUrl + '/contas/' + obj.id,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: fakeNomeContaEditada
                }
            }).as('response');

        });

        //Asserts:
        cy.get('@response').its('status').should('be.equal', 200);

        //fazer uma consulta pelo nome da conta altera: 
        cy.request({

            method: 'GET',
            url: Cypress.config().baseApiUrl + '/contas',
            headers: { Authorization: `JWT ${token}` },
            //refinamento da consulta na api: queryString
            qs: {
                nome: fakeNomeContaEditada
            }

        }).then(resp => {
            expect(resp.body[0].nome).to.be.equals(fakeNomeContaEditada);
        })
    });

    it.only('Should not create an account with same name', () => {
        //Arrange:
        const fakeNomeConta1 = 'Conta criada pela api RESTxxxx - ' + random(0, 100000);
        const fakeNomeConta2 = fakeNomeConta1; 

        //Cria uma nova conta:
        cy.cmdAddAccount(fakeNomeConta1);

        //Act:
        //Tentar criar uma conta com o mesmo nome
        cy.request({
            url: Cypress.config().baseApiUrl + '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: fakeNomeConta1
            },
            failOnStatusCode: false
        }).as('response')

        //Asserts:
        //Valida e retorna o json do obj gerado
        cy.get('@response').then(resp => {
            //console.log(resp);
            expect(resp.status).to.be.equal(400);
            expect(resp.body.error).to.be.equal('Já existe uma conta com esse nome!');
        });

    });

})