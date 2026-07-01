describe('Ejecicio Popus', () => {

    it('Validar Alert Popus', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.mt-1 > .wp-block-button > .wp-block-button__link').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hi there, pal!');
          });
          cy.get('#alert').click(); 
    })

    it('Validar Confirm Popus', () => {
        cy.visit('https://practice-automation.com/');
        cy.get('.mt-1 > .wp-block-button > .wp-block-button__link').click();
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('OK or Cancel, which will it be?'); 
            return true; 
          });
          
          cy.get('#confirm').click(); 
          cy.get('#confirmResult').should('contain', 'OK it is!');
          
    })

    it.only('Validar Prompt Popup', () => {
        cy.visit('https://practice-automation.com/');
    
        
        cy.get('.mt-1 > .wp-block-button > .wp-block-button__link').click();
    
        
        cy.on('window:prompt', (message) => {
         
            expect(message).to.equal('Hi there, what\'s your name?');
            
            return 'Esteban';
        });
    
       
        cy.get('#prompt').click();
    
        
        cy.get('#promptResult').should('contain', 'Nice to meet you, Esteban!');
    });



})