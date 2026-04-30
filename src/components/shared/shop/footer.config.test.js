import { describe, expect, it } from "vitest";
import {
  FOOTER_MENU,
  SOCIAL_LINKS,
  getFooterCopyright,
} from "./footer.config";

describe("footer config", () => {
  it("keeps footer menu groups renderable", () => {
    expect(FOOTER_MENU).toHaveLength(3);
    expect(FOOTER_MENU[0]).toMatchObject({
      titleKey: "footer.products",
    });
    expect(FOOTER_MENU.flatMap(({ items }) => items)).toContainEqual({
      labelKey: "common.cart",
      link: "/cart",
    });
  });

  it("keeps social links accessible", () => {
    expect(SOCIAL_LINKS.map(({ label }) => label)).toEqual([
      "Facebook",
      "Twitter / X",
      "GitHub",
    ]);
  });

  it("formats copyright text", () => {
    expect(getFooterCopyright(2026, "VTI Corporation", "All Rights Reserved."))
      .toBe("© 2026 VTI Corporation. All Rights Reserved.");
  });
});
