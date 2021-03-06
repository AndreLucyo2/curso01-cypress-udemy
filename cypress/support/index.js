// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './commands_contas'

//locator com xpatch -- instalar plugin : seção 7 Xpath
// https://docs.cypress.io/plugins/directory
// https://github.com/cypress-io/cypress-xpath    
require("cypress-xpath");


// Alternatively you can use CommonJS syntax:
// require('./commands')

//Estrategia e Ordem para o SelectorPlayground:
//ref: https://docs.cypress.io/api/cypress-api/selector-playground-api#Arguments
Cypress.SelectorPlayground.defaults({
    selectorPriority: [
        'data-cy',
        'data-wc',
        'data-test',
        'data-testid',
        'id',
        'class',
        'tag',
        'attributes',
        'nth-child'
    ]

})
