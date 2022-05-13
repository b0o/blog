describe('Menu', () => {
  it('should be keyboard accessible', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('__theme', 'light')
      },
    })

    cy.findByRole('button', { name: /change theme/i })
      .should('have.attr', 'aria-expanded', 'false')
      .click()
      .should('have.attr', 'aria-expanded', 'true')

    cy.findByRole('menuitem', { name: /light/i }).should(
      'have.attr',
      'aria-selected',
      'true'
    )

    cy.findByRole('menu')
      .should('be.visible')
      .and('be.focused')
      .and('have.attr', 'aria-activedescendant', 'theme-option-light')
      .type('{downArrow}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-dark')
      .type('{upArrow}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-light')
      .type('{pageDown}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-auto')
      .type('{pageUp}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-light')
      .type('{home}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-light')
      .type('{end}')
      .should('have.attr', 'aria-activedescendant', 'theme-option-auto')
      .type('{esc}')

    cy.findByRole('button', { name: /change theme/i })
      .should('be.focused')
      .and('have.attr', 'aria-expanded', 'false')
  })

  it('should focus on button after escaping menu', () => {
    cy.visit('/')

    cy.findByRole('button', { name: /change theme/i }).click()
    cy.findByRole('menu').type('{esc}')
    cy.findByRole('button', { name: /change theme/i }).should('be.focused')
  })
})
