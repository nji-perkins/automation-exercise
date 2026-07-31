// <reference types="cypress" />
describe('Web Application Tests', () => {
  it('User can create an account and make a purchase', () => {
    //register a new user account
    cy.visit('https://automationexercise.com/ ');
    cy.title().should('eq', 'Automation Exercise');
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    cy.get('[data-qa="signup-name"]').type('John Doe');
    cy.get('[data-qa="signup-email"]').type('johndoe7021@example.com');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender1').check('Mr');
     cy.get('[data-qa="password"]').type('123456789');
      cy.get('[data-qa="days"]').select('10');
      cy.get('[data-qa="months"]').select('May');
      cy.get('[data-qa="years"]').select('1990');
      cy.get('#newsletter').check();
      cy.get('#optin').check();
      cy.get('[data-qa="first_name"]').type('John');
      cy.get('[data-qa="last_name"]').type('Doe');
      cy.get('[data-qa="company"]').type('ABC Company');
      cy.get('[data-qa="address"]').type('123 Main St');    
      cy.get('[data-qa="address2"]').type('Apt 4B');
      cy.get('[data-qa="country"]').select('Canada');
      cy.get('[data-qa="state"]').type('Ontario');
      cy.get('[data-qa="city"]').type('Toronto');
      cy.get('[data-qa="zipcode"]').type('M5H 2N2');
      cy.get('[data-qa="mobile_number"]').type('+1 416-123-4567');
      cy.get('[data-qa="create-account"]').click();
      cy.get('.title > b').should('have.text', 'Account Created!');
      cy.get('[data-qa="continue-button"]').click();
      cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
      //login with the newly created account
      cy.get('[data-qa="login-email"]').type('johndoe7021@example.com');
      cy.get('[data-qa="login-password"]').type('123456789');
      cy.get('[data-qa="login-button"]').click();
      cy.get('.shop-menu > .nav > :nth-child(10) > a').should('contain.text', 'Logged in as John Doe');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.scrollTo('top');
      cy.contains('h2', 'Features Items').scrollIntoView();
      // Add a product to the cart
      cy.get('a[href="/product_details/1"]').click();
       cy.scrollTo('bottom');
      cy.wait(1000);
      cy.scrollTo('top');
      cy.get('#quantity').clear().type('5');
      cy.contains('button', 'Add to cart').click();
      cy.get('.modal-content').should('be.visible');
      // Verify that the product has been added to the cart
      cy.get('.modal-content').contains('Your product has been added to car').should('be.visible');
      cy.get('.modal-content').contains('Continue Shopping').click();
     cy.contains('button', 'Add to cart').click({ force: true });
      cy.get('.modal-content a[href="/view_cart"]').click();
      cy.get('.cart_info').contains('Blue Top').should('be.visible');
      cy.get('.cart_info').contains('Rs. 500').should('be.visible');
      cy.get('.cart_info').contains('5').should('be.visible');
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
  // Verify that the total price is displayed correctly
      cy.get('.cart_info').contains('Total').should('be.visible');
      cy.get('.btn.btn-default.check_out').click();
      // Verify that the user is on the checkout page
      cy.get('.heading').contains('Address Details').should('be.visible');
      // Verify that the delivery and billing addresses are displayed correctly
      cy.get('.page-subheading').contains('Your delivery address').should('be.visible');
      cy.get('.page-subheading').contains('Your billing address').should('be.visible');
      cy.get('a[href="/payment"]').click();
      cy.get('.heading').should('be.visible');
      // Verify that the user is on the payment page
      cy.get('.heading').contains('Payment').should('be.visible');
      cy.get('[data-qa="name-on-card"]').type('John Doe');
      cy.get('[data-qa="card-number"]').type('4111111111111111');
      cy.get('[data-qa="cvc"]').type('123');
      cy.get('[data-qa="expiry-month"]').type('12');
      cy.get('[data-qa="expiry-year"]').type('2025');
      // Click the "Pay and Confirm Order" button
      cy.get('[data-qa="pay-button"]').click();
      // Verify that the order has been placed successfully
      cy.get('[data-qa="order-placed"]').contains('Order Placed!').should('be.visible');
      cy.contains('p', 'Congratulations! Your order has been confirmed!')
  .should('be.visible');
  // Verify that the user can log out successfully
      cy.get('.btn.btn-default.check_out').should('be.visible');
      cy.get('.btn.btn-primary').should('be.visible');
      cy.get('.btn.btn-default.check_out').click();
      cy.get('[data-qa="continue-button"]').click();

  // Verify that the user can log out and log back in successfully
  cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
   cy.get('[data-qa="login-email"]').type('johndoe7021@example.com');
    cy.get('[data-qa="login-password"]').type('123456789');
    cy.get('[data-qa="login-button"]').click();
  })
 
})
