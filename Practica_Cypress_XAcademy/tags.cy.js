describe('prueba', () =>{
 it('capturar tags',() =>{
    cy.intercept('GET','https://conduit-api.bondaracademy.com/api/tags',{fixture:'tags.json'})//lo que estamos haciendo ahora se denomina MOC Api que significa burlar osea estamos burlando la api 
    cy.visit('https://conduit.bondaracademy.com/')                                            // le decimos a la api que diga lo que nosotros queremos, solo afecta a nivel Front
 })

})