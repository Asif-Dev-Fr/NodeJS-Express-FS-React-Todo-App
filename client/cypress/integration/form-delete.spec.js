describe('Delete Task', function() {
    it('It deleted a task', function() {
        cy.visit('http://localhost:3000/')
        cy.get('.list')
        cy.get('span').last().click()

    })
})