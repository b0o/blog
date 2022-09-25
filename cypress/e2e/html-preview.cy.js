describe('HTML preview', () => {
  it('should be able to expand/collapse code block', () => {
    cy.visit('/posts/surprising-react-bug')

    cy.contains('Show more').as('expandCollapseButton')
    cy.get('@expandCollapseButton').parent().get('pre').as('codeBlock')

    cy.get('@expandCollapseButton').click()
    cy.get('@expandCollapseButton').contains('Show less')

    cy.get('@expandCollapseButton').click()
    cy.get('@expandCollapseButton').contains('Show more')
  })
})