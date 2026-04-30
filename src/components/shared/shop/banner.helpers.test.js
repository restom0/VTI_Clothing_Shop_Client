import { describe, expect, it } from "vitest";
import {
  getAccountMenuItems,
  getBannerLabels,
  isLogoutMenuItem,
} from "./banner.helpers";

const Icon = () => null;

describe("banner helpers", () => {
  it("marks logout account menu entries", () => {
    expect(isLogoutMenuItem({ labelKey: "common.logout" })).toBe(true);
    expect(isLogoutMenuItem({ labelKey: "account.profile" })).toBe(false);
  });

  it("maps account menu entries into render-ready rows", () => {
    const t = (key) => `translated:${key}`;
    const rows = getAccountMenuItems(
      [
        { label: "Profile", labelKey: "account.profile", icon: Icon, link: "/profile" },
        { label: "Logout", labelKey: "common.logout", icon: Icon, link: "/login" },
      ],
      t
    );

    expect(rows).toMatchObject([
      {
        href: "/profile",
        isDanger: false,
        text: "translated:account.profile",
      },
      {
        href: "#",
        isDanger: true,
        text: "translated:common.logout",
      },
    ]);
  });

  it("builds banner labels", () => {
    const t = (key) => key;

    expect(getBannerLabels(t)).toEqual({
      freeShipping: "banner.free_shipping",
      login: "common.login",
      register: "common.register",
    });
  });
});
