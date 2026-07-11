const API_ORIGIN = "https://vti-clothing-shop.onrender.com";
const LOGIN_LABEL = "\u0110\u0103ng nh\u1eadp";

const catalogResponse = (items) => ({
  status: 200,
  message: "OK",
  object: items,
});

const stubCatalogRequests = () => {
  cy.intercept("GET", `${API_ORIGIN}/brand/**`, catalogResponse([{ id: 1, name: "VTI Denim" }])).as(
    "brands"
  );
  cy.intercept(
    "GET",
    `${API_ORIGIN}/category/**`,
    catalogResponse([{ id: 1, name: "Jackets" }])
  ).as("categories");
};

describe("login flow", () => {
  beforeEach(() => {
    stubCatalogRequests();
    cy.intercept("GET", `${API_ORIGIN}/order/cart`, {
      statusCode: 200,
      body: {
        status: 200,
        message: "OK",
        object: { id: 123, orderItems: [], total_price: 0 },
      },
    }).as("cart");
    cy.intercept("GET", `${API_ORIGIN}/user/profile`, {
      statusCode: 200,
      body: {
        status: 200,
        message: "OK",
        object: {
          id: 1,
          name: "Cypress User",
          avatar_url: "https://example.com/avatar.png",
        },
      },
    }).as("profile");

    cy.visit("/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem("vti-shop-language", "vi");
      },
    });
  });

  it("submits credentials and stores the returned session", () => {
    cy.contains("h1", "VTI Shop").should("be.visible");
    cy.contains("h3", LOGIN_LABEL).should("be.visible");

    cy.intercept("POST", `${API_ORIGIN}/user/login`, (req) => {
      expect(req.body).to.deep.include({
        username: "cypress-user",
        password: "secret-password",
      });

      req.reply({
        statusCode: 200,
        body: {
          status: 200,
          message: "OK",
          object: {
            avatar_url: "https://example.com/avatar.png",
            name: "Cypress User",
            token: "cypress-token",
            url: "/profile",
          },
        },
      });
    }).as("login");

    cy.get('input[placeholder="nguyenvana@gmail.com"]').type("cypress-user");
    cy.get('input[type="password"]').type("secret-password");

    cy.clock();
    cy.contains("button", new RegExp(`^${LOGIN_LABEL}$`))
      .should("not.be.disabled")
      .click();
    cy.wait("@login");
    cy.tick(1600);

    cy.location("pathname").should("eq", "/profile");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.equal("cypress-token");
      expect(win.localStorage.getItem("name")).to.equal("Cypress User");
      expect(win.localStorage.getItem("avatar")).to.equal("https://example.com/avatar.png");
    });
  });
});
