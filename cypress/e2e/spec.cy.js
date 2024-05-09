describe('run basic test actions on the Spacex Frontend', () => {
  context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('.type() - type into a DOM element', () => {
      cy.get('.search').type('crs')
    }),
    it('.click() - get only upcoming launches', () => {
      cy.get('#past').click()
    }),
    it('.click() - get only past launches', () => {
      cy.get('#upcoming').click()
    }),
    it('.click() - get only successful launches', () => {
      cy.get('#failure').click()
    }),
    it('.click() - get only failed launches', () => {
      cy.get('#success').click()
    }),
    it('Get only failed launches with a specific keyword', () => {
      cy.get('#success').click()
      cy.get('.search').type('crs')
    }),
    it('Get only successful launches with a specific keyword', () => {
      cy.get('#failure').click()
      cy.get('.search').type('crs')
    }),
    it('Get only upcoming launches with a specific keyword', () => {
      cy.get('#past').click()
      cy.get('.search').type('crs')
    }),
    it('Get only past launches with a specific keyword', () => {
      cy.get('#upcoming').click()
      cy.get('.search').type('crs')
    })
  })
})
