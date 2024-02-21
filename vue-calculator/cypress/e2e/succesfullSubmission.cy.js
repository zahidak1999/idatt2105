describe("Successful Submission", () => {
    it("shows the correct response from the server on successful form submission", () => {

        cy.intercept("POST", "http://localhost:3000/messages", {
            statusCode: 200,
            body: {
                message: "I got your personal info now! I'll be in touch",
            },
        }).as("submitForm");

        cy.visit("/ContactForm"); 
        
        cy.get("#name").type("James");
        cy.get("#email").type("heisann@hoppsan.fallelalala");
        cy.get("#message").type("Hope this message finds you well");

        cy.get('button[type="submit"]').should('not.be.disabled').click();

        cy.wait('@submitForm').its('response.statusCode').should('eq', 200);
    });
});