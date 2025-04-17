describe('Ejercicio Formulario', () => {

    it('Verificar ingreso de Datos en el formulario', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.wp-container-core-buttons-is-layout-8 > .wp-block-button > .wp-block-button__link').click();
        cy.get('[data-cy="name-input"]').type("Esteban Joel");
        cy.get(':nth-child(3) > input').type("123456");
        cy.get('[data-cy="drink3"]').click();
        cy.get('[data-cy="color1"]').click();
        cy.get('#automation').select('yes').should('have.value', 'yes'); 
        cy.get('#email').type("gaunaesteban983@gmail.com");
        cy.get('#message').type("Prueba de Correo");
        cy.get('#submit-btn').click();



    })


})