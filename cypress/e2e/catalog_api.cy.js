const API_ORIGIN = "https://vti-clothing-shop.onrender.com";

describe("catalog API smoke", () => {
  it("loads public home catalog resources from mocked API", () => {
    cy.intercept("GET", `${API_ORIGIN}/brand/**`, {
      statusCode: 200,
      body: { status: 200, object: [{ id: 1, name: "VTI Denim" }] },
    }).as("brands");
    cy.intercept("GET", `${API_ORIGIN}/category/**`, {
      statusCode: 200,
      body: { status: 200, object: [{ id: 2, name: "Jackets" }] },
    }).as("categories");
    cy.intercept("GET", `${API_ORIGIN}/on-sale-product**`, {
      statusCode: 200,
      body: {
        status: 200,
        object: [
          {
            id: 3,
            discount: 10,
            sale_price: 300000,
            product_id: {
              image_url: "/1719545334144.6924.png",
              product_id: { id: 3, name: "Cotton Tee" },
            },
          },
        ],
      },
    }).as("onSaleProducts");

    cy.visit("/");
    cy.wait(["@brands", "@categories", "@onSaleProducts"]);
    cy.contains("Cotton Tee").scrollIntoView().should("be.visible");
  });
});
