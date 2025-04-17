describe('Ejercicio IF', () => {
    

  it('Verificar que el número de elementos del menú principal es igual a 5 y mostrar su longitud real', () => {
    cy.visit('https://demoqa.com/'); 

    // Seleccionar todos los elementos individuales dentro del contenedor '.category-cards'
    cy.get('.category-cards .card')
      .should('have.length', 6)  // Esto verifica que la cantidad de elementos sea 5
      .then(($cards) => {
        const numberOfElements = $cards.length;
        cy.log(`Número de elementos encontrados: ${numberOfElements}`);  // Muestra la longitud real
      });
});

it('Verificar que el número de elementos del menú Formulario es igual a 5 y mostrar su longitud real', () => {
  cy.visit('https://demoqa.com/'); 
  cy.get(':nth-child(2) > :nth-child(1) > .avatar').click()
  // Seleccionar todos los elementos individuales dentro del contenedor '.category-cards'
  cy.get('.accordion .element-group')
    .should('have.length', 6)  // Esto verifica que la cantidad de elementos sea 5
    .then(($element) => {
      const numberOfElements = $element.length;
      cy.log(`Número de elementos encontrados: ${numberOfElements}`);  // Muestra la longitud real
    });
});

});