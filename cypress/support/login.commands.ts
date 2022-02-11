declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(emailAddress: string, password: string): typeof login;
    }
}

function login(emailAddress: string, password: string): void {
    cy.viewport(1280, 720)
    cy.visit('/login')
    cy.get('[id="EmailAddress"]').type(emailAddress)
    cy.get('[id="Password"]').type(password)
}

Cypress.Commands.add('login', login);
