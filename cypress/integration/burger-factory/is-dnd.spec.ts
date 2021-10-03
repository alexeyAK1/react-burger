import { getNIndexChildrenSelector } from "../common/functions";
import {
    bunElementSelector,
    coastTotal,
    constructorBunButton,
    constructorBunTop,
    countElements,
    dropContainer,
    mainElementSelector,
    sauceElementSelector
} from "./constants";

describe("ingredients are correctly dragged to the constructor", function () {
  let totalSum = 0;

  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should initial", () => {
    cy.get(dropContainer).should("be.empty");
    cy.get(constructorBunTop).should("be.empty");
    cy.get(constructorBunButton).should("be.empty");
    cy.get(bunElementSelector).should("exist");
    cy.get(
      `${bunElementSelector} > [class^=ingredient-card_ingredient_count]`
    ).should("not.exist");
    cy.get(coastTotal).contains(0);
  });
  //TODO: to cover the sending of the registered user's order with tests and not
  //   it("should show error modal", () => {
  //     cy.get(sendButtonSelector).click();
  //     // eslint-disable-next-line cypress/no-unnecessary-waiting
  //     cy.wait(1000)
  //   });

  it("should drag n drop bun", () => {
    cy.get(bunElementSelector).should("exist");
    cy.get(bunElementSelector).as("bunElement");
    cy.get(dropContainer).as("targetContainer");
    cy.get("@bunElement").drag("@targetContainer");
    cy.get(coastTotal).should(($div) => {
      const sum = +$div.text().trim();

      if (sum <= 0) {
        throw new Error("The value is less than or equal to zero");
      }
      totalSum = sum;
    });
    cy.get(dropContainer).should("be.empty");
    cy.get(constructorBunTop).children().should("have.length", 1);
    cy.get(constructorBunButton).children().should("have.length", 1);
    cy.get(`${bunElementSelector} > ${countElements}`).contains(2);
  });

  it("should drag n drop sauce", () => {
    cy.get(bunElementSelector).should("exist");
    cy.get(sauceElementSelector).as("ingredientContainer");
    cy.get(dropContainer).as("targetContainer");
    cy.get("@ingredientContainer").drag("@targetContainer");
    cy.get("@ingredientContainer").drag("@targetContainer");
    cy.get(coastTotal).should(($div) => {
      const sum = +$div.text().trim();

      if (sum <= 0) {
        throw new Error("The value is less than or equal to zero");
      }
      if (totalSum === sum) {
        throw new Error("The value has not changed");
      }

      totalSum = sum;
    });
    cy.get(dropContainer).children().should("have.length", 2);
    cy.get(constructorBunTop).children().should("have.length", 1);
    cy.get(constructorBunButton).children().should("have.length", 1);
    cy.get(`${bunElementSelector} > ${countElements}`).contains(2);
    cy.get(`${sauceElementSelector} > ${countElements}`).contains(2);
  });

  it("should drag n drop main", () => {
    cy.get(bunElementSelector).should("exist");
    cy.get(mainElementSelector).as("ingredientContainer");
    cy.get(dropContainer).as("targetContainer");
    cy.get("@ingredientContainer").drag("@targetContainer");
    cy.get(coastTotal).should(($div) => {
      const sum = +$div.text().trim();

      if (sum <= 0) {
        throw new Error("The value is less than or equal to zero");
      }
      if (totalSum === sum) {
        throw new Error("The value has not changed");
      }

      totalSum = sum;
    });
    cy.get(dropContainer).children().should("have.length", 3);
    cy.get(constructorBunTop).children().should("have.length", 1);
    cy.get(constructorBunButton).children().should("have.length", 1);
    cy.get(`${bunElementSelector} > ${countElements}`).contains(2);
    cy.get(`${sauceElementSelector} > ${countElements}`).contains(2);
    cy.get(`${mainElementSelector} > ${countElements}`).contains(1);
  });

  it("should swap places element", () => {
    let firstId1 = "";
    let firstId2 = "";
    cy.get(getNIndexChildrenSelector(dropContainer, 1)).as("element1");
    cy.get("@element1")
      .should("exist")
      .should(($div) => {
        firstId1 = $div.attr("data-handler-id") as string;
      });
    cy.get(getNIndexChildrenSelector(dropContainer, 3)).as("element2");
    cy.get("@element2")
      .should("exist")
      .should(($div) => {
        firstId2 = $div.attr("data-handler-id") as string;
      });
    cy.get("@element1")
      .find("[class^=ingredient-item_drag_container]")
      .as("dragElement1");
    cy.get("@element2")
      .find("[class^=ingredient-item_drag_container]")
      .as("dragElement2");
    cy.get("@dragElement2").drag("@dragElement1");
    cy.get(getNIndexChildrenSelector(dropContainer, 1)).as("newElement1");
    cy.get("@newElement1").should(($div) => {
      const newFirstId1 = $div.attr("data-handler-id") as string;

      if (newFirstId1 === firstId1) {
        throw new Error("The id of the element has not changed");
      }
      if (newFirstId1 !== firstId2) {
        throw new Error("The element has an invalid id");
      }
    });
    cy.get(getNIndexChildrenSelector(dropContainer, 2)).as("newElement2");
    cy.get("@newElement2").should(($div) => {
      const newFirstId2 = $div.attr("data-handler-id") as string;

      if (newFirstId2 === firstId2) {
        throw new Error("The id of the element has not changed");
      }
      if (newFirstId2 !== firstId1) {
        throw new Error("The element has an invalid id");
      }
    });
    cy.get(coastTotal).should(($div) => {
      const sum = +$div.text().trim();

      if (sum <= 0) {
        throw new Error("The value is less than or equal to zero");
      }
      if (totalSum !== sum) {
        throw new Error("The value has not changed");
      }
    });
  });

  it("should delete element", () => {
    cy.get(dropContainer).children().should("have.length", 3);
    cy.get(`${mainElementSelector} > ${countElements}`).contains(1);
    cy.get(mainElementSelector)
      .find("[class*=ingredient-card_ingredient_count]")
      .should("have.css", "opacity", "1");
    cy.get(getNIndexChildrenSelector(dropContainer, 1)).as("element1");
    cy.get("@element1").should("exist");
    cy.get("@element1")
      .find(
        "[class^=ingredient-item_item_container] > .constructor-element > .constructor-element__row > .constructor-element__action"
      )
      .click();
    cy.get(dropContainer).children().should("have.length", 2);
    cy.get(mainElementSelector)
      .find("[class*=ingredient-card_ingredient_count]")
      .should("have.css", "opacity", "0");
  });
});
