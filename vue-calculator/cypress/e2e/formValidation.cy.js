describe('Form Validation', () => {
    it('submit button should be disabled if the form is invalid', () => {
      cy.visit('/ContactForm'); 
      
      cy.get('#email').type('not-an-email');
      cy.get('#message').type(' ');
  
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });