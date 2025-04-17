describe('Ejercicio de Modals', () => {

    it('Verificar Visibilidad de Texto en Simple Modal', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#simpleModal').click();
        cy.get('#popmake-1318').should('be.visible');
    })

    it('Verificar Texto en Simple Modal', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#simpleModal').click();
        cy.get('#popmake-1318 > .pum-content > p').should('have.text', 'Hi, I’m a simple modal.');
    })

    it('Verificar Visibilidad de formulario en Form Modal', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#formModal').click();
        cy.get('#popmake-674').should('be.visible');
    })

    it('Verificar Ingreso de datos en Form Modal', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#formModal').click();
        cy.get('#g1051-name').type('Esteban Joel');
        cy.get('#g1051-email').type('gaunaesteban983@gmail.com');
        cy.get('#contact-form-comment-g1051-message').type('Verificar Ingreso de datos en Form Modal');
        cy.get('.pushbutton-wide').click();
    })

    it('Verificar Visibilidad del contenido del sitio web luego del ingreso de datos en Form Modal', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#formModal').click();
        cy.get('#g1051-name').type('Esteban Joel');
        cy.get('#g1051-email').type('gaunaesteban983@gmail.com');
        cy.get('#contact-form-comment-g1051-message').type('Verificar Ingreso de datos en Form Modal');
        cy.get('.pushbutton-wide').click();
        cy.get('.title > .container').should('be.visible');
        cy.get('#main > .container').should('be.visible');
        cy.get('#footer > .container').should('be.visible');
        cy.get('#copyright > .container').should('be.visible');
    })




})