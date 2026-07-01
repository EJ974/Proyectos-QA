describe('Ejercicio Calendario', () => {

    it('Seleccionar una fecha', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-9 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#g1065-selectorenteradate').click();
        cy.get('.ui-datepicker-prev').click();
        cy.get(':nth-child(2) > :nth-child(7) > .ui-state-default').click();
        cy.get('#g1065-selectorenteradate').should('have.value', '2024-11-10');
        cy.get('.entry-content > [data-test="contact-form"] > .contact-form > .contact-submit > .pushbutton-wide').click();
        cy.get('.field-value').should('contain', '2024-11-10');
    })

    it('Escribir una fecha', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-9 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#g1065-selectorenteradate').type('2025-04-24');
        cy.get('#main > .container').click();
        cy.get('.entry-content > [data-test="contact-form"] > .contact-form > .contact-submit > .pushbutton-wide').click();
        cy.get('.field-value').should('contain', '2025-04-24');
    })



})