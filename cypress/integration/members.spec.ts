describe('Members Page /members', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('/members')
    })

    it('Visits the members page, unauthenticated', () => {
        cy.viewport(1280, 720)
        cy.url().should('includes', 'login')
        cy.url().should('includes', 'returnUrl')
        cy.url().should('includes', 'members')
    })
})
