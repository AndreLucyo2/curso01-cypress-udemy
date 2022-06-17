
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

        cy.request({
            url:'https://barrigarest.wcaquino.me/contas',
            method:'POST',
            body:{
                nome:'Conta criada - rest_001'
            }
        }).then(resp=>{ console.log(resp)})
    });



})