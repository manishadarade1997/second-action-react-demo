describe('YouTube Test', () => {
  it('should open YouTube and search for content', () => {
    // Visit YouTube
    cy.visit('https://www.youtube.com');
    
    // Wait for the page to load
    cy.wait(2000);
    
    // Accept cookies if the banner appears
    cy.get('body').then(($body) => {
      if ($body.find('[aria-label="Accept the use of cookies and other data for the purposes described"]').length > 0) {
        cy.get('[aria-label="Accept the use of cookies and other data for the purposes described"]').click()
      }
    });
    
    // Verify we're on YouTube
    cy.title().should('contain', 'YouTube');
    
    // Find and click on the search box
    cy.get('input[name="search_query"]').should('be.visible').click();
    
    // Type in the search box
    cy.get('input[name="search_query"]').type('cypress tutorial');
    
    // Press Enter or click search button
    cy.get('input[name="search_query"]').type('{enter}');
    
    // Wait for search results to load
    cy.wait(3000)
    
    // Verify search results are displayed
    cy.contains('Cypress').should('exist');
  })

  it('should navigate to the channel page', () => {
    // Click on the channel name
    cy.visit('https://www.youtube.com/c/CypressIO');
    cy.wait(2000);
    cy.get('ytd-channel-name#channel-name').should('contain.text', 'Cypress.io');
  })
})