describe('Hacker Escape Room - startsida', () => {

  it('Visar att länken "Play online" är synlig och går att klicka på', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('a', 'Play online')
      .should('be.visible')
      .click();

    cy.url().should('include', '/all'); // Endast om detta stämmer i din app
  });

  it('Visar att H2-elementet innehåller texten "Play with your friends or build your team stronger at work"', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('h2', 'Play with your friends or build your team stronger at work')
      .should('be.visible');
  });

});
