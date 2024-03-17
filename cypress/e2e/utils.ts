export function loginApp() {
  const email = "michael.lawson@reqres.in";
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
    expect(resp.status).to.eq(200);
  });
}
export function addUser() {
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="email-input-add"]').type("newuser@gmail.com");
  cy.get('[data-cy="first-name-input-add"]').type("John");
  cy.get('[data-cy="last-name-input-add"]').type("Doe");
  cy.get('[data-cy="add-save-button"]').click();
}
