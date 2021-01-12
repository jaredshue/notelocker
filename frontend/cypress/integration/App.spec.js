describe("App.js", () => {
    it("defaults to '/new' path", () => {
        cy.visit("localhost:3000/")
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq("/new")
        })
    })

    it("renders a header", () => {
        cy.get("header").should("exist")
    })

    it("renders a text area for the note", () => {
        cy.get("textarea").should("exist")//add text area chai
    })
    
    it("renders an input area for password", () => {
        cy.get("input[type='password']").should("exist")
    })
    
    it("renders a button to create note", () => {
        cy.get("button").should("exist")
    })
})