import { expect, fixture, html } from "@open-wc/testing";

import "../src/components/employees/EmployeeForm";

describe("Form Component", () => {

  it("check if first name input available", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const firstNameInput = el.shadowRoot.querySelector("#firstName");
    expect(firstNameInput).to.exist;
    expect(firstNameInput.value).to.equal("");

    const errorMessages = el.shadowRoot.querySelectorAll(".error");
    expect(errorMessages.length).to.be.greaterThan(0);
    errorMessages.forEach((error) => {
      expect(error.textContent).to.equal("");
    });
  });

  it("check if form validation exist", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
  
    const form = el.shadowRoot.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    await el.updateComplete;
    const firstNameError = el.shadowRoot.querySelector(".error");
    expect(firstNameError.textContent).to.include("First name is required");
  });

  it("updates state on user input", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
  
    const firstNameInput = el.shadowRoot.querySelector("#firstName");
    firstNameInput.value = "Alex";
    firstNameInput.dispatchEvent(new Event("input"));
  
    expect(el.employee.firstName).to.equal("Alex");
  });

  it("opens and closes the confirmation modal", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const form = el.shadowRoot.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    el.modalVisible = true;
    await el.updateComplete; 
    
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector(".modal-overlay");
    expect(modal).to.exist;

    const closeModalButton = el.shadowRoot.querySelector(
      ".modal-buttons button:last-child"
    );
    closeModalButton.click();

    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".modal-overlay")).to.be.null;
  });
});
