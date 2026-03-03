
/*** G UPPGIFT
 * * 1. Kontrollerar att webbsidan är uppe och kör på localhost och Visar att H2-elementet innehåller texten "Play with your friends or build your team stronger at work
***/
describe('Hacker Escape Room - startsida', () => {

  it('Kontrollerar att webbsidan är upp och körs på localhost', () => {
    cy.visit('/');

    //Visar att H2-elementet innehåller texten "Play with your friends or build your team stronger at work"
    cy.contains('h2', 'Play with your friends or build your team stronger at work')
      .should('be.visible');
  });


  /*** VG UPPGIFT
   * * 1. Letar efter specifikt webbelement i filter av Challenges på webbsidan.
   * * 2. Gör flera moment och navigerar från startsidan till olika sidor på sajten, t ex “The Story” och verifierar innehållet.
   * * 3. Gör något som både kan bli rätt och fel t ex sökning på datum i filter, Kontrollerar att webbsidan ger relevant ett relevant svar eller felmeddelande. (det är alltså responsen som ska testas).
  ***/

  it('Letar efter filtret "Include online challenges" i modalen', () => {

    cy.visit('all.html'); // lokalt

    // 1. Öppna filter-modalen
    cy.contains('button', 'Filter challenges')
      .should('be.visible')
      .click();

    // 2. Vänta på att modalen visas
    cy.get('.filters') 
      .should('be.visible');

    // 3. Leta efter labeln i modalen
    cy.contains('label', 'Include online challenges')
      .should('be.visible');

    // 4. Verifiera att checkboxen finns
    cy.get('#online')
      .should('exist');
  });


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

  it('Testar keyword-sökning med både träff och ingen träff', () => {
    cy.visit('all.html');

    // Öppna filter-modalen
    cy.contains('button', 'Filter challenges').click();
    cy.get('.filters').should('be.visible');

    // --- GILTIG SÖKNING ---
    cy.get('input[type="text"]').type('Linux');

    // Kontrollera att resultat visas
    cy.get('.challenges__listItem').should('exist');

    // --- OGILTIG SÖKNING ---
    cy.get('input[type="text"]').clear().type('asdasdasd');

    // Kontrollera att inga resultat hittas
    cy.contains('No matching challenges').should('be.visible');
  });

  //Kontrollerar att sidan är deployad på netlify
  it('Kontrollerar att sidan är uppe på Netlify', () => {
    cy.visit('https://hacker-escape-room.netlify.app/all.html');
    cy.contains('Filter challenges')
    .should('be.visible');
  });

});
