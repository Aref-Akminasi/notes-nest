describe('My First Tests Set', () => {
  it('finds the content "type"', () => {
    cy.visit('/')
  })

  it('creates a note', () => {
    cy.visit('/');
    cy.get('textarea[id=note-input]').type('Hello, world!');
    cy.get('button[id=add-note]').click();
    cy.get('.nest').children().should('have.length', 1);
  })

  it('creates and deletes a note', () => {
    cy.visit('/');
    cy.get('textarea[id=note-input]').type('Hello, world!');
    cy.get('button[id=add-note]').click();
    cy.get('.nest').children().should('have.length', 1);
    cy.get('button[id=delete-notes]').click();
    cy.get('.nest').children().should('have.length', 0);
  })
})