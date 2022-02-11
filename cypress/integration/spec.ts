describe('Firebase Authentication Angular Demo Landing Page', () => {
    it('Visits the initial project page', () => {
        cy.viewport(1280, 720)
        cy.visit('/')
        cy.contains('Welcome Back')
        cy.contains('Do you have an account yet?')
    })
})
