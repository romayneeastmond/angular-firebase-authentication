describe('Verify Page /verify', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('/verify')
    })

    it('Visits the verify page', () => {
        cy.viewport(1280, 720)
        cy.contains('Verify Your Email Address')
        cy.contains('Already a user?')
    })

    it('Confirm navigating to verify page', () => {
        cy.url().should('includes', 'verify')
        cy.contains('Please follow the instruction to verify your email address.')
    })
})
