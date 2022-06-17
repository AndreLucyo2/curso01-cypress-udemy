
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {
    
    //Guardar o token para usar em mais testes
    let token;
    
    //Antes de executar o teste, ele recupera o token
    before(() => {
        //Guarda o tokem de forma assincrona, pois é uma promisses
        cy.getToken("andre.lucyo2@gmail.com", "123456").then(tkn => {
            token = tkn;
        })
    });
    
    beforeEach(() => {
        //Reseta dados do usuario:
        cy.resetRest(token);
    });
        
    it('Create an account', () => {
        
        const fakeNomeConta = 'Conta criada pela api REST_01'
        
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: fakeNomeConta
            }
        }).as('response');//Adicionado um nome para o retorno para usar mais para frente nos testes

        cy.get('@response').then(resp => {
            //cy.log(resp);

            //Testa se retornou sucesso:
            expect(resp.status).to.be.equals(201);
            //Testa se no body contem a propriedade chamada id
            expect(resp.body).to.have.property('id');
            //Testa se no body contem a propriedade chamada nome com o nome da conta criada
            expect(resp.body).to.have.property('nome', fakeNomeConta);

        })

    });



})