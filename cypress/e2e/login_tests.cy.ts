import { loginApp } from "./utils";

describe("Login tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should change initial light theme to dark", () => {
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get('[data-cy="theme-switch"]').click();
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
  });

  it("should render app sign in page", () => {
    cy.get('[data-cy="app-title"]').should("exist");
  });

  it("should give error messages when signing in with empty credentials", () => {
    cy.get('[data-cy="sign-in-button"]').click();
    cy.get('[data-cy="card-content"]').contains("Email must be valid");
    cy.get('[data-cy="card-content"]').contains("Password cannot be empty");
  });
  it("should give error message when non-existing email entered", () => {
    const email = "random@email.com";
    const pwd = "12345";
    cy.get('[data-cy="login-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(pwd);
    cy.get('[data-cy="sign-in-button"]').click();
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pwd }),
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(400);
    });
  });
  it("should sign in with correct email and display add button and users table", () => {
    loginApp();
    cy.get('[data-cy="welcome-header"]').contains("Hello, Michael!");
    cy.get('[data-cy="add-button"]').should("exist");
    cy.get('[data-cy="table-container"]').should("exist");
  });
});
