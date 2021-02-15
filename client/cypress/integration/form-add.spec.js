describe('Add Task', function() {
    it('It added new tasks', function() {
        cy.visit('http://localhost:3000/')
        cy.get('form')
        cy.get('input').type('New task')
        cy.wait(500)
        cy.get('form').submit()
    })
})