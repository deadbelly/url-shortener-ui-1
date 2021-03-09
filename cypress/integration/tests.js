describe('Visiting the Page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.visit('http://localhost:3000/')
  })

  it('Should have a page title', () => {
    cy.get('h1').should('contain', 'URL Shortener')
  })

  it('Should have shortened urls', () => {
    cy.get('.url').should('have.length', 1)
    cy.get('.url').first().get('h3').should('contain', 'Test Url One')
    cy.get('.url').first().get('a').should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('.url').first().get('p').should('contain', 'https://images.unsplash.com/photo...')
  })

  it('Should have a title input', () => {
    cy.get('input[name="title"]').should('be.visible')
  })

  it('Should have a url input', () => {
    cy.get('input[name="urlToShorten"]').should('be.visible')
  })

  it('Should have a submit button', () => {
    cy.get('button').should('contain', 'Shorten Please!')
  })
})

describe('Using the Form', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.visit('http://localhost:3000/')
  })

  it('Should let the user update the title input', () => {
    cy.get('input[name="title"]').type('Test Url Two')
      .should('have.value','Test Url Two')
  })

  it('Should let the user update the url input', () => {
    cy.get('input[name="urlToShorten"]').type('https://www.gutenberg.org/files/2701/2701-h/2701-h.htm')
      .should('have.value','https://www.gutenberg.org/files/2701/2701-h/2701-h.htm')
  })

})
