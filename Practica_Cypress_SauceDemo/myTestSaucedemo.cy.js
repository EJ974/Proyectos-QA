//-----------------------------Casos de Prueba correspondientes a User 1-------------------------------------------

//---------------------------------------------LOGIN----------------------------------------------------------------
describe('Login User 1', () => {
    it('Inicio de Sesión Exitoso con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.scrollTo('top');
      cy.get('[data-test="inventory-container"]').should('be.visible');
    });

    it('Inicio de Sesión Fallido con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("1234");
      cy.get('[data-test="login-button"]').click();
      cy.get('.error-message-container').should('be.visible');
    });

    it('Logout con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.get('#react-burger-menu-btn').click();
      cy.get('[data-test="logout-sidebar-link"]').click();
      cy.get('.login_wrapper-inner').should('be.visible');
    });
});

//---------------------------------------------CARRITO---------------------------------------------------------------
describe('Carrito User 1', () => {
    it('Notificacion de Carga de Productos al Carrito con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.scrollTo('top');
      cy.get('[data-test="shopping-cart-badge"]').should('be.visible');
    });

    it('Visualizacion de Carga de Productos al Carrito con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="inventory-item"]').should('be.visible');
    });

    it('Chekout del Producto con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type("Esteban");
      cy.get('[data-test="lastName"]').type("Gauna");
      cy.get('[data-test="postalCode"]').type("3400");
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="checkout-summary-container"]').should('be.visible');
    });

    it('Confirmacion del Ckekout del Producto con User1', () => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type("Esteban");
      cy.get('[data-test="lastName"]').type("Gauna");
      cy.get('[data-test="postalCode"]').type("3400");
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
      cy.get('[data-test="checkout-complete-container"]').should('be.visible');
    });

   
});
//-----------------------------------------------------------------------------------------------------------------




//-----------------------------Casos de Prueba correspondientes a User 2-------------------------------------------

//---------------------------------------------LOGIN----------------------------------------------------------------
describe('Login User 2', () => {
  it('Inicio de Sesión Exitoso con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.scrollTo('top');
    cy.get('[data-test="inventory-container"]').should('be.visible');
  });

  it('Inicio de Sesión Fallido con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("1234");
    cy.get('[data-test="login-button"]').click();
    cy.get('.error-message-container').should('be.visible');
  });

  it('Logout con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.get('.login_wrapper-inner').should('be.visible');
  });
});


//---------------------------------------------CARRITO---------------------------------------------------------------
describe('Carrito User 2', () => {
  it('Notificacion de Carga de Productos al Carrito con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.scrollTo('top');
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible');
  });

  it('Visualizacion de Carga de Productos al Carrito con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]').should('be.visible');
  });

  it('Chekout del Producto con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Esteban");
    cy.get('[data-test="lastName"]').type("Gauna");
    cy.get('[data-test="postalCode"]').type("3400");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="checkout-summary-container"]').should('be.visible');
  });

  it('Confirmacion del Ckekout del Producto con User2', () => {
    cy.visit('https://www.saucedemo.com/'); 
    cy.get('[data-test="username"]').type("problem_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Esteban");
    cy.get('[data-test="lastName"]').type("Gauna");
    cy.get('[data-test="postalCode"]').type("3400");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="checkout-complete-container"]').should('be.visible');
  });

 
});
//-----------------------------------------------------------------------------------------------------------------