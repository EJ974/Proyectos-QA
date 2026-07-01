describe('Creacion de usuario',() => {
it('Creacion de usuario OK', () => {
cy.intercept('POST','/api/users').as('userCreado') //Intercepto la api con el url para la creacion de un usuario y lo guardo como "userCreado"
cy.visit('https://conduit.bondaracademy.com')
cy.contains('Sign up').click()
const numeroRandom = Math.floor(1000 + Math.random() * 9000); //esta constante nos permite generar "Username" y "Email" aleatorios para poder asi 
cy.get('[placeholder="Username"]').type(`test${numeroRandom}`) //siempre ejecutar los test sin necesidad de cerrar sesion y crear otro usuario
cy.get('[placeholder="Email"]').type(`test${numeroRandom}`)
cy.get('[placeholder="Password"]').type('123456')
cy.get('.btn').click()  
cy.wait('@userCreado').then(interception => {                 //uso la url ya mencionada arriba y la intercepto para 
    expect(interception.response.statusCode).to.equal(201)} ) //posteriormente me devuelta el status code y comparar si me devuelve un 201
    cy.log('El Test Paso, se  creo el usuario')
})

})

it('Wrong User', () => {
    cy.intercept('POST','/api/users/login').as('userErroneo') //Intercepto la api con el url para la creacion de un usuario y lo guardo como "userCreado"
    cy.visit('https://conduit.bondaracademy.com/login')
    cy.get('[placeholder="Email"]').type('sebaaaaa@gmail.com')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('.btn').click() 
    cy.wait('@userErroneo').then(interception => {                 //uso la url ya mencionada arriba y la intercepto para 
        expect(interception.response.statusCode).to.equal(403)} ) //posteriormente me devuelta el status code y comparar si me devuelve un 201
        cy.log('El Test Paso, se  confirmo el usuario erroneo')
    })
    
    