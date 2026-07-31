//Login functionality works as expected
describe('Authentication', () => {
  //Login Attempt with Incorrect Credentials(password)
  it('should display an error message when attempting to login with incorrect credentials', () => {
    cy.get('[data-qa="login-email"]').type('johndoe60@gmail.com');
    cy.get('[data-qa="login-password"]').type('wrongpassword');
    cy.get('[data-qa="login-button"]').click();
    cy.get('[data-qa="login-error"]').should('contain.text', 'Your email or password is incorrect');
  })
//Login Attempt with Non-Existent Email
it('should display an error message when attempting to login with a non-existent email', () => {
    cy.get('[data-qa="login-email"]').type('nonexistent@gmail.com');
    cy.get('[data-qa="login-password"]').type('123456789');
    cy.get('[data-qa="login-button"]').click();
    cy.get('[data-qa="login-error"]').should('contain.text', 'Your email or password is incorrect');
  })
//Login Attempt with Empty Fields
it('should display an error message when attempting to login with empty fields', () => {
    cy.get('[data-qa="login-button"]').click();
    cy.get('[data-qa="login-error"]').should('contain.text', 'Your email or password is incorrect');
  })
  //Login Attempt with Valid Credentials
  it('should successfully login with valid credentials', () => {
    cy.get('[data-qa="login-email"]').type('johndoe60@gmail.com');
    cy.get('[data-qa="login-password"]').type('123456789');
    cy.get('[data-qa="login-button"]').click();
    cy.get('[data-qa="login-success"]').should('contain.text', 'You are logged in as John Doe');
  })

})
//logout functionality works as expected
describe('Logout Functionality', () => {
  it('logout functionality works as expected', () => {
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain.text', 'Login');
  })
})