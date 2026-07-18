import { describe, expect, it } from "vitest";
import { captured, render } from "./clientComponentHarness.jsx";

describe("route and static page components", () => {
  it("renders route and layout elements", async () => {
    const [
      { default: App },
      { default: ShopLayout },
      { default: AdminPage },
      { default: CareerLayout },
      { default: HelpCenterLayout },
      { default: ErrorPage },
      { default: ForbiddenPage },
      { default: NotFoundPage },
      { default: ProductPage },
    ] = await Promise.all([
      import("./apps/App.jsx"),
      import("./layouts/shop/shop.layout.jsx"),
      import("./pages/admin.page.jsx"),
      import("./layouts/career/career.layout.jsx"),
      import("./layouts/helpcenter/help_center.layout.jsx"),
      import("./pages/error.page.jsx"),
      import("./pages/forbidden.page.jsx"),
      import("./pages/not_found.page.jsx"),
      import("./pages/list_product.page.jsx"),
    ]);

    expect(render(App)).toContain("route:/");
    expect(captured("Route").length).toBeGreaterThan(20);
    expect(render(ShopLayout)).toContain("shop-banner");
    expect(render(AdminPage)).toContain("admin-navbar");
    expect(render(CareerLayout)).toContain("static.careers.title");
    expect(render(HelpCenterLayout)).toContain("static.help.title");
    expect(render(ErrorPage)).toContain("notification.error_name");
    expect(render(ForbiddenPage)).toContain("notification.forbidden_name");
    expect(render(NotFoundPage)).toContain("notification.not_found_name");
    expect(render(ProductPage)).toContain("shop.results_count");
  });

  it("renders static content page elements", async () => {
    const staticPages = await import("./pages/static_content.page.jsx");

    for (const Page of [
      staticPages.AboutUsPage,
      staticPages.ContactPage,
      staticPages.TermsPage,
      staticPages.PolicyPage,
      staticPages.FaqPage,
    ]) {
      expect(render(Page)).toContain("dailynews.jpg");
    }

    expect(
      render(staticPages.default, {
        actions: [{ href: "/x", label: "Action", variant: "secondary" }],
        eyebrow: "Eyebrow",
        faqs: [{ answer: "Answer", question: "Question" }],
        heroImage: "/hero.jpg",
        sections: [
          {
            description: "Description",
            icon: () => <svg />,
            title: "Section",
          },
        ],
        stats: [{ label: "Orders", value: "42" }],
        subtitle: "Subtitle",
        title: "Title",
      })
    ).toContain("Question");
  });
});
