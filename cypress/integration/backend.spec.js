
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
        }).then(resp => console.log(resp));
    });

})