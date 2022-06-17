
///<reference types = "cypress"/>

describe('Sholud test at a functional level', () => {

    it('Create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "andre.lucyo2@gmail.com",
                senha: "123456",
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty') //.then(resp => console.log(resp));
        //Obtem o tokem a partir do login: Faz o POST de uma nova conta
        .then(token =>{
            cy.request({
                url:'https://barrigarest.wcaquino.me/contas',
                method:'POST',
                headers:{Authorization:`JWT ${token}`},
                body:{
                    nome:'Conta criada - rest_003'
                }
                
            }).then(resp=>{ console.log(resp)});

            //Print do token: estrategia de token usado é o JWT- este é um método mais antigo
            cy.log(token);

        })

    });



})