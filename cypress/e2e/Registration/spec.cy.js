//user registration functionality defectcts
describe('User Registration defects', () => {
  //user registration with an already registered email
  it('should display an error message when attempting to register with an already registered email', () => {
    cy.get('[data-qa="signup-name"]').type('John Doe');
    cy.get('[data-qa="signup-email"]').type('johndoe60@gmail.com');
    cy.get('[data-qa="signup-password"]').type('123456789');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="signup-error"]').should('contain.text', 'Email already exists');
  })
//user registration with an invalid email format
  it('should display an error message when attempting to register with an invalid email format', () => {
    cy.get('[data-qa="signup-name"]').type('John Doe');
    cy.get('[data-qa="signup-email"]').type('invalidemailformat');
    cy.get('[data-qa="signup-password"]').type('123456789');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="signup-error"]').should('contain.text', 'Invalid email format');
  })
  //user registration with empty fields
  it('should display an error message when attempting to register with empty fields', () => {
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="signup-error"]').should('contain.text', 'All fields are required');
  })
  //user registration with a weak password
  it('should display an error message when attempting to register with a weak password', () => {
    cy.get('[data-qa="signup-name"]').type('John Doe');
    cy.get('[data-qa="signup-email"]').type('john.doe@gmail.com');
    cy.get('[data-qa="signup-password"]').type('123');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="signup-error"]').should('contain.text', 'Password must be at least 8 characters long');
  })
//user registration Form Field Input Type and Format Validation
  it('should validate the input types and formats of the registration form fields', () => {
    cy.get('[data-qa="signup-name"]').type('John Doe');
    cy.get('[data-qa="signup-email"]').type('john.doe@gmail.com');
    cy.get('[data-qa="signup-password"]').type('123456789');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="signup-error"]').should('not.exist');
  })  
})