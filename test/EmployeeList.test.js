import { expect, fixture, html } from "@open-wc/testing";
import "../src/components/employees/EmployeeList";

describe("EmployeeList Component", () => {
  it("should render a table when in list view mode", async () => {
    const element = await fixture(
      html`<employee-list viewMode="list"></employee-list>`
    );
    const table = element.shadowRoot.querySelector("table");
    expect(table).to.exist; 
  });

  it("should render a grid of cards when in card view mode", async () => {
    const element = await fixture(
      html`<employee-list viewMode="table"></employee-list>`
    );
    const cardContainer = element.shadowRoot.querySelector(".card-container");
    expect(cardContainer).to.exist; 
  });
});

describe("EmployeeList", () => {
  it("should filter employees by search", async () => {
    const mockTranslate = (key) => key;
    globalThis.t = mockTranslate;

    const element = await fixture(html`<employee-list></employee-list>`);

    element.defaultEmployees = [{ firstName: "John" }, { lastName: "Doe" }];

    const searchInput = element.shadowRoot.querySelector(
      'input[type="search"]'
    );
    expect(searchInput).to.exist; 

    searchInput.value = "John"; 
    searchInput.dispatchEvent(new Event("input"));

    await element.updateComplete;

    const filteredEmployees =
      element.shadowRoot.querySelectorAll(".search-container");
    expect(filteredEmployees.length).to.be.greaterThan(0);
  });
});

it("should change the current page", async () => {
  const element = await fixture(html`<employee-list></employee-list>`);
  element.currentPage = 1;

  element.changePage(2);
  await element.updateComplete;

  expect(element.currentPage).to.equal(2);
});

it("should show the confirmation modal when deleting an employee", async () => {
  const element = await fixture(html`<employee-list></employee-list>`);

  element.handleDelete(1);
  await element.updateComplete;

  const modal = element.shadowRoot.querySelector(".modal");
  expect(modal.classList.contains("visible")).to.be.true;
});

it("should close the confirmation modal", async () => {
  const element = await fixture(html`<employee-list></employee-list>`);

  element.handleDelete(1);
  await element.updateComplete;

  element.handleCloseModal();
  await element.updateComplete;

  const modal = element.shadowRoot.querySelector(".modal");
  expect(modal.classList.contains("visible")).to.be.false;
});

it("should delete an employee", async () => {
  const element = await fixture(html`<employee-list></employee-list>`);
  const initialEmployees = element.employees;

  const employeeToDelete = initialEmployees[0];
  element.handleDelete(employeeToDelete.id);
  element.handleConfirmDelete();

  expect(element.employees.length).to.be.lessThan(initialEmployees.length);
});

it("should change view mode", async () => {
  const element = await fixture(html`<employee-list></employee-list>`);

  element.changeViewMode("table");
  await element.updateComplete;

  const tableButton = element.shadowRoot.querySelector(
    ".view-buttons button.active"
  );
  expect(tableButton.classList.contains("active")).to.be.true;
  expect(element.viewMode).to.equal("table");

  const listButton = element.shadowRoot.querySelector(
    ".view-buttons button:first-child"
  );
  expect(listButton.classList.contains("active")).to.be.false;
});
