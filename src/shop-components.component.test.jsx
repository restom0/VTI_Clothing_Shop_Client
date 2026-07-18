import { describe, expect, it, vi } from "vitest";
import { captured, harness, invoke, render } from "./clientComponentHarness.jsx";

describe("shop component elements", () => {
  it("renders profile user info states and drives profile handlers", async () => {
    const { default: UserInfo } = await import("./components/shop/user_info.component.jsx");
    const profileMarkup = render(UserInfo);

    expect(profileMarkup).toContain("profile.personal_info");
    expect(profileMarkup).toContain("profile.connections");
    expect(captured("Avatar", (props) => props.src === "/avatar.png")).toHaveLength(1);

    for (const entry of [
      ...captured("TextField", (props) => typeof props.onChange === "function"),
      ...captured("RadioGroup", (props) => typeof props.onChange === "function"),
    ]) {
      await invoke(entry, "onChange", { target: { value: "changed" } });
    }
    for (const entry of captured("DatePicker", (props) => typeof props.onChange === "function")) {
      await invoke(entry, "onChange", "2026-07-18");
    }
    for (const entry of [
      ...captured("Avatar", (props) => typeof props.onClick === "function"),
      ...captured("Button", (props) => typeof props.onClick === "function"),
    ]) {
      await invoke(entry);
    }
    expect(harness.mutation).toHaveBeenCalled();

    harness.apiState.userProfile = { data: null, isError: false, isLoading: true };
    expect(render(UserInfo)).toContain("loading.label");

    harness.apiState.userProfile = { data: null, isError: true, isLoading: false };
    expect(render(UserInfo)).toContain("profile.load_failed");
  });

  it("renders shop voucher loading, error, and list elements", async () => {
    const { default: ShopVoucher } = await import("./components/shop/voucer.component.jsx");

    expect(render(ShopVoucher)).toContain("profile.menu_vouchers");

    harness.apiState.vouchers = { data: null, isError: false, isLoading: true };
    expect(render(ShopVoucher)).toContain("loading.label");

    harness.apiState.vouchers = { data: null, isError: true, isLoading: false };
    harness.apiState.availableVouchers = { data: null, isError: false, isLoading: false };
    expect(render(ShopVoucher)).toContain("profile.generic_error");
  });

  it("renders checkout component elements and drives checkout handlers", async () => {
    const [{ default: CheckoutPage }, { default: CheckoutStep2 }, { default: CheckoutStep3 }] =
      await Promise.all([
        import("./pages/checkout.page.jsx"),
        import("./components/shop/checkout_step_2.component.jsx"),
        import("./components/shop/checkout_step_3.component.jsx"),
      ]);

    expect(render(CheckoutPage)).toContain("checkout-step-1");
    const handleNext = vi.fn();
    const handlePrev = vi.fn();
    harness.rendered.length = 0;
    expect(render(CheckoutStep2, { handleNext, handlePrev })).toContain("checkout.payment_gateway");
    for (const entry of [
      ...captured("Button", (props) => typeof props.onClick === "function"),
      ...captured("IconButton", (props) => typeof props.onClick === "function"),
      ...captured("Typography", (props) => typeof props.onClick === "function"),
    ]) {
      entry.props.onClick();
    }
    expect(handleNext).toHaveBeenCalled();
    expect(handlePrev).toHaveBeenCalled();
    expect(render(CheckoutStep3)).toContain("notification.checkout_success_name");
  });
});
