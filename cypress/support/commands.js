// 1. Account Creation
Cypress.Commands.add('signUpAndCreateAccount', (user) => {
  cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
  cy.get('[data-qa="signup-name"]').type(user.name, { delay: 100 });
  cy.get('[data-qa="signup-email"]').type(user.email, { delay: 100 });
  cy.get('[data-qa="signup-button"]').click();

  cy.get('#id_gender1').check('Mr');
  cy.get('[data-qa="password"]').type(user.password, { delay: 100 });
  cy.get('[data-qa="days"]').select(user.day, { delay: 100 });
  cy.get('[data-qa="months"]').select(user.month, { delay: 100 });
  cy.get('[data-qa="years"]').select(user.year, { delay: 100 });
  cy.get('#newsletter').check();
  cy.get('#optin').check();

  cy.get('[data-qa="first_name"]').type(user.firstName, { delay: 100 });
  cy.get('[data-qa="last_name"]').type(user.lastName, { delay: 100 });
  cy.get('[data-qa="company"]').type(user.company, { delay: 100 });
  cy.get('[data-qa="address"]').type(user.address, { delay: 100 });
  cy.get('[data-qa="address2"]').type(user.address2, { delay: 100 });
  cy.get('[data-qa="country"]').select(user.country, { delay: 100 });
  cy.get('[data-qa="state"]').type(user.state, { delay: 100 });
  cy.get('[data-qa="city"]').type(user.city, { delay: 100 });
  cy.get('[data-qa="zipcode"]').type(user.zipcode, { delay: 100 });
  cy.get('[data-qa="mobile_number"]').type(user.mobile, { delay: 100 });

  cy.get('[data-qa="create-account"]').click();
  cy.get('.title > b').should('have.text', 'Account Created!');
  cy.get('[data-qa="continue-button"]').click();
});

// 2. User Authentication
Cypress.Commands.add('login', (email, password, displayName) => {
  cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
  cy.get('[data-qa="login-email"]').type(email, { delay: 100 });
  cy.get('[data-qa="login-password"]').type(password, { delay: 100 });
  cy.get('[data-qa="login-button"]').click();
  if (displayName) {
    cy.get('.shop-menu > .nav > :nth-child(10) > a').should('contain.text', `Logged in as ${displayName}`);
  }
});

// 3. Product & Cart Flow
Cypress.Commands.add('addFeaturedProductToCart', (productId, quantity) => {
  cy.scrollTo('bottom');
  cy.wait(1000);
  cy.scrollTo('top');
  cy.contains('h2', 'Features Items').scrollIntoView();

  cy.get(`a[href="/product_details/${productId}"]`).click();
  cy.scrollTo('bottom');
  cy.wait(1000);
  cy.scrollTo('top');

  cy.get('#quantity').clear().type(quantity);
  cy.contains('button', 'Add to cart').click();
  cy.get('.modal-content').should('be.visible');
  cy.get('.modal-content').contains('Your product has been added to car').should('be.visible');
  cy.get('.modal-content').contains('Continue Shopping').click();

  cy.contains('button', 'Add to cart').click({ force: true });
  cy.get('.modal-content a[href="/view_cart"]').click();
});

// 4. Cart Verification
Cypress.Commands.add('verifyCartDetails', (itemName, price, quantity) => {
  cy.get('.cart_info').contains(itemName).should('be.visible');
  cy.get('.cart_info').contains(price).should('be.visible');
  cy.get('.cart_info').contains(quantity).should('be.visible');

  cy.get('#cart_info')
    .should('be.visible')
    .then(($element) => {
      const rawText = $element.text();
      cy.log('The extracted cart text is: ' + rawText);
      const priceMatch = rawText.match(/Rs\.\s?\d+/);
      if (priceMatch) {
        const extractedTotal = priceMatch[0];
        cy.log('Extracted Total Price is: ' + extractedTotal);
        expect(extractedTotal).to.contain('Rs.');
      }
    });

  cy.get('.cart_info').contains('Total').should('be.visible');
});

// 5. Checkout & Payment
Cypress.Commands.add('processCheckoutAndPayment', (paymentDetails) => {
  cy.get('.btn.btn-default.check_out').click();
  cy.get('.heading').contains('Address Details').should('be.visible');
  cy.get('.page-subheading').contains('Your delivery address').should('be.visible');
  cy.get('.page-subheading').contains('Your billing address').should('be.visible');

  cy.get('a[href="/payment"]').click();
  cy.get('.heading').contains('Payment').should('be.visible');

  cy.get('[data-qa="name-on-card"]').type(paymentDetails.nameOnCard);
  cy.get('[data-qa="card-number"]').type(paymentDetails.cardNumber);
  cy.get('[data-qa="cvc"]').type(paymentDetails.cvc);
  cy.get('[data-qa="expiry-month"]').type(paymentDetails.expiryMonth);
  cy.get('[data-qa="expiry-year"]').type(paymentDetails.expiryYear);

  cy.get('[data-qa="pay-button"]').click();
  cy.get('[data-qa="order-placed"]').contains('Order Placed!').should('be.visible');
  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

  cy.get('.btn.btn-default.check_out').should('be.visible');
  cy.get('.btn.btn-primary').should('be.visible');
  cy.get('.btn.btn-default.check_out').click();
  cy.get('[data-qa="continue-button"]').click();
});
// 6. Verify Empty Cart
Cypress.Commands.add('verifyCartIsEmpty', () => {
  cy.get('.shop-menu > .nav > :nth-child(3) > a').click(); 
  cy.get('#empty_cart').should('be.visible');
  cy.get('#empty_cart').contains('Cart is empty!').should('be.visible');
});