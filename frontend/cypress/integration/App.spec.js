describe('App.js', () => {
    it("defaults to '/new' path", () => {
        cy.visit('localhost:3000/')
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/new')
        })
    })

    it('renders a header', () => {
        cy.get('header').should('exist')
    })

    // it('renders a text area for the note', () => {
    //     cy.get('input')//
    // })
})