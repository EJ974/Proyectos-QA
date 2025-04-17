describe('Ejercicio Slider', () => {

it('Deslizar Slider a la derecha', () => {
    cy.visit('https://practice-automation.com/');
    cy.get('#post-36 > div > div.wp-block-group.is-layout-flow.wp-block-group-is-layout-flow > div > div:nth-child(1) > div.wp-block-buttons.mb-3.mt-05.is-content-justification-center.is-layout-flex.wp-container-core-buttons-is-layout-2.wp-block-buttons-is-layout-flex > div > a').click();
    cy.get('#slideMe').invoke('val','50') .trigger('input');
    cy.get('#slideMe').should('have.value', '50');
    cy.get('.coolslider > :nth-child(3)').should('contain', 'Current value: 50');

})

it('Deslizar Slider a la izquierda', () => {
    cy.visit('https://practice-automation.com/');
    cy.get('#post-36 > div > div.wp-block-group.is-layout-flow.wp-block-group-is-layout-flow > div > div:nth-child(1) > div.wp-block-buttons.mb-3.mt-05.is-content-justification-center.is-layout-flex.wp-container-core-buttons-is-layout-2.wp-block-buttons-is-layout-flex > div > a').click();
    cy.get('#slideMe').invoke('val','15') .trigger('input');
    cy.get('#slideMe').should('have.value', '15');
    cy.get('.coolslider > :nth-child(3)').should('contain', 'Current value: 15');

})






})