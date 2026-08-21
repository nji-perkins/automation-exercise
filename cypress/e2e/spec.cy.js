/// <reference types="cypress" />
describe('Web Application Tests', () => {
  const userData = {
    name: 'John Doe',
    email: 'johndoe7031@example.com',
    password: '123456789',
    day: '10',
    month: 'May',
    year: '1990',
    firstName: 'John',
    lastName: 'Doe',
    company: 'ABC Company',
    address: '123 Main St',
    address2: 'Apt 4B',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5H 2N2',
    mobile: '+1 416-123-4567'
  };

  const paymentData = {
    nameOnCard: 'John Doe',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2025'
  };

  it('User can create an account and make a purchase', () => {
    cy.visit('https://automationexercise.com/');
    cy.title().should('eq', 'Automation Exercise');

    // Executing custom functions sequentially
    cy.signUpAndCreateAccount(userData);
    cy.login(userData.email, userData.password, userData.name);
    cy.addFeaturedProductToCart('1', '5');
    cy.verifyCartDetails('Blue Top', 'Rs. 500', '5');
    cy.processCheckoutAndPayment(paymentData);

    // Final relogin assertion & verify cart status
    cy.login(userData.email, userData.password);
    cy.verifyCartIsEmpty();
  });
});