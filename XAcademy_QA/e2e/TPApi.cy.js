describe('Verificacion de visualizacion de informacion',() => {
    it('Verificar la visualizacion de la informacion del hotel en la pagina', () => {
    cy.visit('https://automationintesting.online/')
    cy.get('.contact > :nth-child(3)').should('be.visible');
        })
    })

    describe('Verificacion del contenido de informacion',() => {
        it('Verificar la correcta informacion del hotel en la pagina', () => {
        cy.visit('https://automationintesting.online/')
        cy.get('.contact > :nth-child(3)').should('be.visible');
        cy.get('.contact > :nth-child(3) > :nth-child(1)').then(($el) => {
            const textWithoutIcons = $el.contents()
                                         .filter(function() { 
                                           return this.nodeType === Node.TEXT_NODE; 
                                         })
                                         .text()
                                         .trim();  
    
            expect(textWithoutIcons).to.equal('Shady Meadows B&B'); 
          }); 

        cy.get('.contact > :nth-child(3) > :nth-child(2)').then(($el) => {
            const textWithoutIcons = $el.contents()
                                         .filter(function() { 
                                           return this.nodeType === Node.TEXT_NODE; 
                                         })
                                         .text()
                                         .trim();  
    
            expect(textWithoutIcons).to.equal('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');  
          });  

        cy.get('.contact > :nth-child(3) > :nth-child(3)').then(($el) => {
            const textWithoutIcons = $el.contents()
                                         .filter(function() { 
                                           return this.nodeType === Node.TEXT_NODE; 
                                         })
                                         .text()
                                         .trim();  
    
            expect(textWithoutIcons).to.equal('012345678901');  
          });
          
          cy.get('.contact > :nth-child(3) > :nth-child(4)').then(($el) => {
            const textWithoutIcons = $el.contents()
                                         .filter(function() { 
                                           return this.nodeType === Node.TEXT_NODE; 
                                         })
                                         .text()
                                         .trim();  
    
            expect(textWithoutIcons).to.equal('fake@fakeemail.com');  
          });
          



        })
        
        })

        it('Verificar que hay al menos una imagen en la pantalla principal del sitio web', () => {
            cy.visit('https://automationintesting.online/');  
        
            const excludedSelectors = [
                '.jumbotron img',                     
                'span img',                          
                'row img'  
            ].join(', ');  
        
            cy.get('.container-fluid img:visible')
              .not(excludedSelectors)  
              .then(($visibleImages) => {
                const numberOfVisibleImages = $visibleImages.length;  
        
                cy.log(`Número de imágenes visibles excluyendo los elementos especificados: ${numberOfVisibleImages}`);  // Muestra cuántas imágenes visibles se encontraron después de filtrar
                expect(numberOfVisibleImages).to.be.greaterThan(0);  // Verifica que haya al menos una imagen visible fuera de los elementos excluidos
              });
        });


        it('Verificar informacion de detalle del sitio web', () => {
            cy.visit('https://automationintesting.online/');  
            cy.get('.col-sm-10 > p').invoke('text')
            .should('eq', 'Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.');
              
        });


        it('Envio de Correo Correcto', () => {
            cy.intercept('POST','message/').as('MensajeEnviado') 
            cy.visit('https://automationintesting.online')
            cy.get('[placeholder="Name"]').type('Ejemplo') 
            cy.get('[placeholder="Email"]').type('ejemplo@gmail.com')
            cy.get('[placeholder="Phone"]').type('012345678901')
            cy.get('[placeholder="Subject"]').type('ejemplo@gmail.com')
            cy.get('[aria-label="Description"]').type('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. ')
            cy.get('#submitContact').click()  
            cy.wait('@MensajeEnviado').then(interception => {                 
                expect(interception.response.statusCode).to.equal(201)} ) 
                cy.log('El Test Paso, se envio el mensaje')
            })

            it.only('Envio de Correo Fallido por email con formato incorrecto', () => {
                cy.intercept('POST','message/').as('MensajeEnviado') 
                cy.visit('https://automationintesting.online')
                cy.get('[placeholder="Name"]').type('Ejemplo') 
                cy.get('[placeholder="Email"]').type('ejemplo')
                cy.get('[placeholder="Phone"]').type('012345678901')
                cy.get('[placeholder="Subject"]').type('ejemplo@gmail.com')
                cy.get('[aria-label="Description"]').type('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. ')
                cy.get('#submitContact').click()  
                cy.wait('@MensajeEnviado').then(interception => {                 
                    expect(interception.response.statusCode).to.equal(400)} ) 
                    cy.log('El usuario no pudo enviar el mensaje')
                })