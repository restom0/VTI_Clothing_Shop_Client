import { describe, expect, it } from "vitest";
import { captured, harness, render } from "./clientComponentHarness.jsx";

describe("shared component elements", () => {
  it("renders shared notification, footer, media, and country elements", async () => {
    const [
      { default: CountrySelect },
      { default: Footer, FooterView },
      { default: LazyImage },
      { default: Loading },
      { default: NotificationLayout },
      { default: ParallaxBanner },
      { default: ScrollReveal },
    ] = await Promise.all([
      import("./components/country_select.component.jsx"),
      import("./components/shared/shop/Footer.jsx"),
      import("./components/shared/LazyImage.jsx"),
      import("./components/shared/loading.component.jsx"),
      import("./layouts/shop/notification.layout.jsx"),
      import("./components/shared/ParallaxBanner.jsx"),
      import("./components/shared/ScrollReveal.jsx"),
    ]);

    expect(
      render(NotificationLayout, {
        noti: { icon: <svg />, messageKey: "m", nameKey: "n", subtitleKey: "s" },
      })
    ).toContain("common.back_home");
    expect(render(Footer)).toContain("VTI Shop");
    expect(
      render(FooterView, {
        footerMenu: [
          { items: [{ labelKey: "footer.home", link: "/" }], titleKey: "footer.products" },
        ],
        socialLinks: [{ href: "https://example.com", label: "Example", Icon: () => <svg /> }],
        t: (key) => key,
        year: 2026,
      })
    ).toContain("2026");
    expect(render(Loading)).toContain("loading.label");
    expect(render(CountrySelect)).toContain("United Arab Emirates");
    expect(render(LazyImage, { alt: "shirt", aspectRatio: "4/3", src: "shirt.jpg" })).toContain(
      "shirt.jpg"
    );
    expect(render(LazyImage)).toContain("lazy-image-wrapper");
    expect(render(ScrollReveal, { children: "Reveal", delay: "0.1s", stagger: true })).toContain(
      "Reveal"
    );
    expect(
      render(ParallaxBanner, {
        children: "Hero",
        height: "320px",
        imageUrl: "/hero.jpg",
        overlay: 0.4,
        speed: 0.2,
      })
    ).toContain("Hero");
  });

  it("renders shared switcher menu elements", async () => {
    const [{ default: LanguageSwitcher }, { default: SeasonSwitcher }, { default: ThemeSwitcher }] =
      await Promise.all([
        import("./components/shared/LanguageSwitcher.jsx"),
        import("./components/shared/SeasonSwitcher.jsx"),
        import("./components/shared/ThemeSwitcher.jsx"),
      ]);

    harness.rendered.length = 0;
    expect(render(LanguageSwitcher)).toContain("language.english");
    expect(render(ThemeSwitcher)).toContain("theme.light");
    expect(render(SeasonSwitcher)).toContain("season.auto");
    for (const item of captured("MenuItem", (props) => typeof props.onClick === "function")) {
      item.props.onClick();
    }
    expect(harness.setLanguage).toHaveBeenCalledWith("vi");
    expect(harness.setTheme).toHaveBeenCalledWith("system");
    expect(harness.setSeason).toHaveBeenCalledWith("summer");
  });
});
