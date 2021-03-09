describe('Visiting the Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.visit('http://localhost:3000/')
  })

  it('Should have a page title', () => {
    cy.get('h1').should('contain', 'URL Shortener')
  })

  it('Should have shortened urls', () => {
    cy.get('.url').should('have.length', 1)
    cy.get('.url').first().should('contain', 'Test Url One')
    cy.get('.url').first().should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('.url').first().should('contain', 'https://images.unsplash.com/photo...')
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
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.visit('http://localhost:3000/')
  })

  it('Should have an empty string title value by default', () => {
    cy.get('input[name="title"]').should('have.value','')
  })

  it('Should have an empty string url value by default', () => {
    cy.get('input[name="urlToShorten"]').should('have.value','')
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

describe('Submiting a URL', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',
      {
        statusCode: 201,
        body: {
          id: 2,
          long_url: "not a real url",
          short_url: "This is a sucessful test",
          title: "Test Url Two"
        }
      }
    )
    cy.visit('http://localhost:3000/')
    cy.get('input[name="title"]').type('Test Url Two')
    cy.get('input[name="urlToShorten"]').type('Imagine this is a url')
  })

  it('Should add a url card on a successful post', () => {
    cy.get('.url').should('have.length', 1)
    cy.get('button').click()
    cy.get('.url').should('have.length', 2)
    cy.get('.url').last().should('contain', 'Test Url Two')
    cy.get('.url').last().should('contain', 'This is a sucessful test')
    cy.get('.url').last().should('contain', 'not a real url')
  })

  it('Should clear inputs after a post', () => {
    cy.get('input[name="title"]').should('have.value','Test Url Two')
    cy.get('input[name="urlToShorten"]').should('have.value','Imagine this is a url')
    cy.get('button').click()
    cy.get('input[name="title"]').should('have.value','')
    cy.get('input[name="urlToShorten"]').should('have.value','')
  })
})

describe('Handling an Error', () => {
  it('Should not add a URL on a rejection', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'testData'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',
      {
        statusCode: 422,
      }
    )
    cy.visit('http://localhost:3000/')
    cy.get('input[name="title"]').type('Test Url Two')
    cy.get('input[name="urlToShorten"]').type('Imagine this is a url')
    cy.get('.url').should('have.length', 1)
    cy.get('button').click()
    cy.get('.url').should('have.length', 1)
  })
})
