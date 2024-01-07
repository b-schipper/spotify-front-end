describe("Like Badge", () => {
  it("should login with test account, then like all songs, and verify the obtained like badge in the global chat", () => {
    cy.visit("/login");

    cy.get('[data-testid="username-input"]')
      .type("testuser")
      .should("have.value", "testuser");

    cy.get('[data-testid="password-input"]')
      .type("testuser123")
      .should("have.value", "testuser123");

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/music");

    cy.get('[data-testid="like-button"]').click({ multiple: true, timeout: 200 });

    cy.get('[data-testid="send-message-input"]')
      .type("This is a test message!")
      .should("have.value", "This is a test message!");

    cy.get('[data-testid="send-message-button"]').click().wait(2000);

    cy.get('[data-testid="chat-avatar"]')
      .should("have.text", "🤍");
  });
});
