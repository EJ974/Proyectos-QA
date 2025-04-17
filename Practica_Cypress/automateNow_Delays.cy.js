describe('Ejercicio Contador', () => {
    

    it('Verificar que el Texto " Liftoff! " sea visible ', () => {
      cy.visit('https://practice-automation.com/'); 
      cy.get('.wp-container-core-buttons-is-layout-1 > .wp-block-button > .wp-block-button__link').click();
      cy.get('#start').click();
      cy.get('#delay', { timeout: 10000 }).should('have.value', 'Liftoff!');

      
  });
  

  });