const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME:'[data-test="menu-home"]',
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET : '[href="/reset"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR:'.btn'
    },
    MESSAGE: '.toast-message'
}

export default locators

