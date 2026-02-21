describe('Hacker Escape Room - startsida', () => {
  //Kontrollerar H2 element
  it('Visar att H2-elementet innehåller texten "Play with your friends or build your team stronger at work"', () => {
    cy.visit('/');

    cy.contains('h2', 'Play with your friends or build your team stronger at work')
      .should('be.visible');
  });


  //VG-NIVÅ 
  //Flera moment och navigeringar
  it('Navigerar från startsidan till The story och verifierar innehållet', () => {
    cy.visit('/');

      //Steg 1: klicka på länken i menyn
    cy.contains('a', 'The Story')
      .should('be.visible')
      .click();

      //Steg 2: kontrollera att URL ändras
      cy.url().should('include', '/about');

      //Steg 3: Kontrollera att sidan laddats korrekt:
      cy.contains('h1', 'About us')
      .should('be.visible');

      //Gå tillbaka till startsidan
      cy.go('back');

      //Gör så att testen fungerar på både netlify och lokalt
     cy.location('pathname').should('eq', '/');
  });


 it('Hittar filtret "Include online challenges" i modalen', () => {

  cy.visit('all.html'); // lokalt

  // 1. Öppna filter-modalen
  cy.contains('button', 'Filter challenges')
    .should('be.visible')
    .click();

  // 2. Vänta på att modalen visas
  cy.get('.filters') // byt till din modals klass/id om den heter något annat
    .should('be.visible');

  // 3. Leta efter labeln i modalen
  cy.contains('label', 'Include online challenges')
    .should('be.visible');

  // 4. Verifiera att checkboxen finns
  cy.get('#online')
    .should('exist');
});



});
