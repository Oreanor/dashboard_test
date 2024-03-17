import { addUser, loginApp } from "./utils";

describe("Data management tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    loginApp();
  });

  it("add button should invoke add user dialog", () => {
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="add-title"]').should("exist");
  });

  it("cancel button should close add user dialog", () => {
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="add-cancel-button"]').click();
    cy.get('[data-cy="add-title"]').should("not.exist");
  });

  it("should give errors when trying to add empty user", () => {
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="add-save-button"]').click();
    cy.get('[data-cy="email-input-add"]').contains("Email must be valid");
    cy.get('[data-cy="first-name-input-add"]').contains(
      "First name cannot be empty"
    );
    cy.get('[data-cy="last-name-input-add"]').contains(
      "Last name cannot be empty"
    );
  });

  it("should add user if valid data is entered", () => {
    addUser();
    cy.get('[data-cy="table-container"]').contains("John");
    cy.get('[data-cy="table-container"]').contains("Doe");
  });

  it("should open edit dialog after adding user", () => {
    addUser();
    cy.get('[data-cy="edit-button--1"]').click();
    cy.get('[data-cy="edit-dialog"]').should("exist");
  });

  it("should cancel edit dialog", () => {
    addUser();
    cy.get('[data-cy="edit-button--1"]').click();
    cy.get('[data-cy="cancel-edit-button"]').click();
    cy.get('[data-cy="edit-dialog"]').should("not.exist");
  });

  it("should give errors when trying to save empty user", () => {
    addUser();
    cy.get('[data-cy="edit-button--1"]').click();
    cy.get('[data-cy="email-input-edit"]').clear();
    cy.get('[data-cy="first-name-input-edit"]').clear();
    cy.get('[data-cy="last-name-input-edit"]').clear();
    cy.get('[data-cy="save-edit-button"]').click();
    cy.get('[data-cy="email-input-edit"]').contains("Email must be valid");
    cy.get('[data-cy="first-name-input-edit"]').contains(
      "First name cannot be empty"
    );
    cy.get('[data-cy="last-name-input-edit"]').contains(
      "Last name cannot be empty"
    );
  });

  it("should update user data", () => {
    addUser();
    cy.get('[data-cy="edit-button--1"]').click();
    cy.get('[data-cy="first-name-input-edit"]').type("1");
    cy.get('[data-cy="last-name-input-edit"]').type("1");
    cy.get('[data-cy="save-edit-button"]').click();
    cy.get('[data-cy="edit-dialog"]').should("not.exist");
    cy.get('[data-cy="table-container"]').contains("John1");
    cy.get('[data-cy="table-container"]').contains("Doe1");
  });

  it("should open delete user dialog after adding user", () => {
    addUser();
    cy.get('[data-cy="delete-button--1"]').click();
    cy.get('[data-cy="delete-dialog"]').should("exist");
  });

  it("should cancel delete user dialog", () => {
    addUser();
    cy.get('[data-cy="delete-button--1"]').click();
    cy.get('[data-cy="cancel-delete-button"]').click();
    cy.get('[data-cy="delete-dialog"]').should("not.exist");
  });

  it("should delete user", () => {
    addUser();
    cy.get('[data-cy="delete-button--1"]').click();
    cy.get('[data-cy="confirm-delete-button"]').click();
    cy.get('[data-cy="table-container"]').should("not.include.text", "John");
    cy.get('[data-cy="table-container"]').should("not.include.text", "Doe");
  });
});
