describe('Ejercicio de Tables', () => {

    it('Verificar datos correspondientes a X Pais', () => {
        cy.visit('https://practice-automation.com/');
        cy.get(':nth-child(1) > .mt-15 > .wp-block-button > .wp-block-button__link').click();
        cy.get('#dt-length-0').invoke('val','25') .trigger('input');
        // ------------------------Datos correspondientes a la India---------------------------
        cy.get('#dt-search-0').type('1,429');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','India')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a China-----------------------------
        cy.get('#dt-search-0').type('1,426');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','China')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a United States---------------------
        cy.get('#dt-search-0').type('340');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','United States')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Indonesia-------------------------
        cy.get('#dt-search-0').type('277.5');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Indonesia')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Pakistan-------------------------
        cy.get('#dt-search-0').type('240.5');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Pakistan')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Nigeria-------------------------
        cy.get('#dt-search-0').type('223.8');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Nigeria')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Brazil-------------------------
        cy.get('#dt-search-0').type('216.4');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Brazil')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Bangladesh-------------------------
        cy.get('#dt-search-0').type('173');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Bangladesh')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Russia-------------------------
        cy.get('#dt-search-0').type('144.4');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Russia')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Mexico-------------------------
        cy.get('#dt-search-0').type('128.5');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Mexico')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Ethiopia-------------------------
        cy.get('#dt-search-0').type('126.5');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Ethiopia')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Japan-------------------------
        cy.get('#dt-search-0').type('123.3');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Japan')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Philippines-------------------------
        cy.get('#dt-search-0').type('117.3');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Philippines')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Egypt-------------------------
        cy.get('#dt-search-0').type('112.7');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Egypt')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a D.R. Congo-------------------------
        cy.get('#dt-search-0').type('102');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','D.R. Congo')
        cy.get('#dt-search-0').clear();
        });

        // ------------------------Datos correspondientes a Vietnam-------------------------
        cy.get('#dt-search-0').type('99');
        cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
        cy.log('Valor obtenido:', textValue);
        cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Vietnam')
        cy.get('#dt-search-0').clear();
        });

         // ------------------------Datos correspondientes a Turkey-------------------------
         cy.get('#dt-search-0').type('84.3');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('#tablepress-1 > tbody > tr > td.column-2').should('have.text','Turkey')
         cy.get('#dt-search-0').clear();
         });

        // ------------------------Datos correspondientes a Iran-------------------------
         cy.get('#dt-search-0').type('84');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-19 > .column-2').should('have.text','Iran')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a Germany-------------------------
         cy.get('#dt-search-0').type('83.8');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-20 > .column-2').should('have.text','Germany')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a Thailand-------------------------
         cy.get('#dt-search-0').type('69.8');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-21 > .column-2').should('have.text','Thailand')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a United Kingdom-------------------------
         cy.get('#dt-search-0').type('67.9');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-22 > .column-2').should('have.text','United Kingdom')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a France-------------------------
         cy.get('#dt-search-0').type('65.3');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-23 > .column-2').should('have.text','France')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a Italy-------------------------
         cy.get('#dt-search-0').type('60.5');
         cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
         cy.log('Valor obtenido:', textValue);
         cy.get('.row-24 > .column-2').should('have.text','Italy')
         cy.get('#dt-search-0').clear();
         });

         // ------------------------Datos correspondientes a Tanzania-------------------------
          cy.get('#dt-search-0').type('59.7');
          cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
          cy.log('Valor obtenido:', textValue);
          cy.get('.row-25 > .column-2').should('have.text','Tanzania')
          cy.get('#dt-search-0').clear();
          });

          // ------------------------Datos correspondientes a South Africa-------------------------
          cy.get('#dt-search-0').type('59.3');
          cy.get('#tablepress-1 > tbody > tr > td.column-2').invoke('text').then((textValue) => { 
          cy.log('Valor obtenido:', textValue);
          cy.get('.row-26 > .column-2').should('have.text','South Africa')
          cy.get('#dt-search-0').clear();
          });
        
        
    })

    




})