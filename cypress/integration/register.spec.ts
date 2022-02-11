describe('Register Page /register', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('/register')
    })

    it('Visits the register page', () => {
        cy.viewport(1280, 720)
        cy.contains('Register to Continue')
        cy.contains('Already a user? Click here to Login.')
    })

    it('Confirm navigating to register page', () => {
        cy.url().should('includes', 'register')
    })

    it('Confirm register page has form controls', () => {
        cy.get('[id="FirstName"]')
        cy.get('[id="LastName"]')
        cy.get('[id="EmailAddress"]')
        cy.get('[id="Password"]')
        cy.get('[id="ConfirmPassword"]')
        cy.get('button').contains('Register')
    })

    it('Confirm clicking Register button', () => {
        cy.get('button').click()
        cy.url().should('not.includes', 'verify')
        cy.contains('Something has gone wrong!')
        cy.contains('First Name is required.')
        cy.contains('Last Name is required.')
        cy.contains('Email Address is required.')
        cy.contains('Password is required.')
        cy.contains('Confirm Password is required.')
    })

    it('Confirm clicking Register button with partial validation', () => {
        cy.get('[id="FirstName"]').type('Tester')
        cy.get('[id="LastName"]').type('Bot')
        cy.get('[id="EmailAddress"]').type('integration-test@e2e.com')
        cy.get('[id="Password"]').type('12345')
        cy.get('button').click()
        cy.get('[id="FirstName"]').should('have.value', 'Tester')
        cy.get('[id="LastName"]').should('have.value', 'Bot')
        cy.get('[id="EmailAddress"]').should('have.value', 'integration-test@e2e.com')
        cy.contains('Confirm Password is required.')
    })
})
