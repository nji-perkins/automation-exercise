//search functionality works as expected
describe('Search Functionality', () => {
//search logic works in general, by searching with a single lowercase letter
  it('search logic works in general, by searching with a single lowercase letter ', () => {
  cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
  cy.get('[data-qa="search-input"]').type('b{enter}');
})

//search logic works in general, by searching with a single uppercase letter
  it('search logic works in general, by searching with a single uppercase letter ', () => {
  cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
  cy.get('[data-qa="search-input"]').type('B{enter}');
})

//search logic works in general, by searching with a single number
  it('search logic works in general, by searching with a single number ', () => {
  cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
  cy.get('[data-qa="search-input"]').type('1{enter}');
})

//User can search for a single or individual product
  it('User can search for a single or individual product', () => {
 cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
 cy.contains('h2', 'Category').scrollIntoView();
  cy.contains('h2', 'Searched Products').scrollIntoView();
  cy.get('[data-qa="search-input"]').type('Blue Top{enter}')
})

//User can search for a particular category of products
  it('User can search for a particular category of products', () => {
 cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
 cy.contains('h2', 'Category').scrollIntoView();
  cy.contains('h2', 'Searched Products').scrollIntoView();
  cy.get('[data-qa="search-input"]').type('Dress{enter}')
})

//user can search for a particular brand of products
  it('user can search for a particular brand of products', () => {
 cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
 cy.contains('h2', 'Category').scrollIntoView();
  cy.contains('h2', 'Searched Products').scrollIntoView();
  cy.get('[data-qa="search-input"]').type('Polo{enter}')
})

//user can search for a particular product by its price
  it('user can search for a particular product by its price', () => {
 cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
 cy.contains('h2', 'Category').scrollIntoView();
  cy.contains('h2', 'Searched Products').scrollIntoView();
  cy.get('[data-qa="search-input"]').type('Rs. 500{enter}')
})
 
})

//Product Details functionality works as expected
describe('Product Details', () => {
  it('should display product details when a product is clicked', () => {
    cy.get('a[href="/product_details/1"]').click(); 
})
})

//Product Search functionality defects
describe('Product Search defects', () => {
  //search with an empty search query    
  it('should display an error message when attempting to search with an empty search query', () => {
    cy.get('[data-qa="search-button"]').click();
    cy.get('[data-qa="search-error"]').should('contain.text', 'Please enter a search query');
  })
  //search with a non-existent product name
  it('should display an error message when attempting to search for a non-existent product name', () => {
    cy.get('[data-qa="search-input"]').type('NonExistentProduct{enter}');
    cy.get('[data-qa="search-error"]').should('contain.text', 'No products found');
  })
  //search with a non-existent category
  it('should display an error message when attempting to search for a non-existent category', () => {
    cy.get('[data-qa="search-input"]').type('NonExistentCategory{enter}');
    cy.get('[data-qa="search-error"]').should('contain.text', 'No products found');
  })
  //search with a non-existent brand
  it('should display an error message when attempting to search for a non-existent brand', () => {
    cy.get('[data-qa="search-input"]').type('NonExistentBrand{enter}');
    cy.get('[data-qa="search-error"]').should('contain.text', 'No products found');
  })
  //search with a non-existent price range
  it('should display an error message when attempting to search for a non-existent price range', () => {
    cy.get('[data-qa="search-input"]').type('NonExistentPriceRange{enter}');
    cy.get('[data-qa="search-error"]').should('contain.text', 'No products found');
    })
})

//shopping cart management functionality
describe('Shopping Cart Management', () => {
  //Adding a product to the cart
  it('should allow adding a product to the cart', () => {
    cy.get('a[href="/product_details/1"]').click();
    cy.get('#quantity').clear().type('2');
    cy.contains('button', 'Add to cart').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content').contains('Your product has been added to cart').should('be.visible');
  })
  //Removing a product from the cart
  it('should allow removing a product from the cart', () => {
    cy.get('.cart_info').contains('Blue Top').should('be.visible');
    cy.get('.cart_info').contains('Remove').click();
    cy.get('.cart_info').contains('Blue Top').should('not.exist');
  })  
  //Updating the quantity of a product in the cart
  it('should allow updating the quantity of a product in the cart', () => {
    cy.get('a[href="/product_details/1"]').click();
    cy.get('#quantity').clear().type('3');
    cy.contains('button', 'Add to cart').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content').contains('Your product has been added to cart').should('be.visible');
    cy.get('.cart_info').contains('Blue Top').should('be.visible');
    cy.get('.cart_info').contains('3').should('be.visible');
  })
  //Verifying the total price in the cart
  it('should correctly calculate the total price in the cart', () => {
    cy.get('.cart_info').contains('Total').should('be.visible');
  })
  //Proceeding to checkout
  it('should allow proceeding to checkout', () => {
    cy.get('.btn.btn-default.check_out').click();
    cy.get('.heading').contains('Address Details').should('be.visible');
  })
  //Verifying the order confirmation after placing an order
  it('should display order confirmation after placing an order', () => {
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').contains('Order Placed!').should('be.visible');
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
  })
  //Verifying the order history after placing an order
  it('should display the order in order history after placing an order', () => {
    cy.get('.btn.btn-default.check_out').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain.text', 'Logged in as John Doe');
  })
})