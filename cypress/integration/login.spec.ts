describe('Login Page /login', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('/login')
    })

    it('Visits the login page', () => {
        cy.viewport(1280, 720)
        cy.contains('Welcome Back')
        cy.contains('Do you have an account yet? Click here to Register')
    })

    it('Confirm navigating to login page', () => {
        cy.url().should('includes', 'login')
    })

    it('Confirm login page has form controls', () => {
        cy.get('[id="EmailAddress"]')
        cy.get('[id="Password"]')
        cy.get('[name="rememberMe"]')
        cy.get('button').contains('Login')
    })

    it('Confirm clicking Login button', () => {
        cy.get('button').click()
        cy.url().should('not.includes', 'members')
        cy.contains('Something has gone wrong!')
        cy.contains('Email Address is required.')
        cy.contains('Password is required.')
    })

    it('Confirm clicking Login button with partial validation', () => {
        cy.get('[id="EmailAddress"]').type('integration-test@e2e.com')
        cy.get('button').click()
        cy.get('[id="EmailAddress"]').should('have.value', 'integration-test@e2e.com')
        cy.contains('Password is required.')
    })

    it('Confirm clicking Login button with validation', () => {
        cy.login('integration-test@e2e.com', '12345')
        cy.get('[id="Password"]').type('12345')
        cy.get('button').click()
        cy.get('[id="EmailAddress"]').should('have.value', 'integration-test@e2e.com')
        cy.contains('Something has gone wrong!')
    })
})
