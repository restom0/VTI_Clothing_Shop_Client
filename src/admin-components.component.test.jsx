import { describe, expect, it, vi } from "vitest";
import {
  captured,
  harness,
  invoke,
  render,
  withMockedUseState,
} from "./clientComponentHarness.jsx";

describe("admin component elements", () => {
  it("drives admin table, pagination, sidebar, tabs, and layout handlers", async () => {
    const [
      { default: AdminLayout },
      { default: AdminPagination },
      { default: SidebarWithSearch },
      { default: SettingButton },
      { default: Table },
      { default: Tablist },
    ] = await Promise.all([
      import("./layouts/admin/admin.layout.jsx"),
      import("./components/shared/admin/admin_pagination.component.jsx"),
      import("./components/shared/search_sidebar.component.jsx"),
      import("./components/shared/admin/setting_button.component.jsx"),
      import("./components/shared/table.component.jsx"),
      import("./components/shared/list_tab.component.jsx"),
    ]);

    const tableHead = [
      { col: 1, label: "Name" },
      { col: 1, label: "Role" },
    ];
    const rows = [
      { id: 1, name: "Ada", role: "Admin" },
      { id: 2, name: "Grace", role: "User" },
    ];

    expect(
      render(Table, {
        TABLE_HEAD: tableHead,
        TABLE_ROWS: rows,
        deleteContent: "Delete",
        handleDeleteOpen: vi.fn(),
        handleDetailOpen: vi.fn(),
        handleUpdateOpen: vi.fn(),
        updateContent: "Update",
      })
    ).toContain("Ada");
    expect(
      render(Table, { TABLE_HEAD: tableHead, TABLE_ROWS: [], noDelete: true, noUpdate: true })
    ).toContain("table.empty");

    for (const iconButton of captured(
      "IconButton",
      (props) => typeof props.onClick === "function"
    )) {
      iconButton.props.onClick();
    }
    expect(harness.dispatch).toHaveBeenCalled();

    harness.rendered.length = 0;
    expect(render(AdminPagination, { page: 3 })).toContain("1");
    for (const button of captured("Button", (props) => typeof props.onClick === "function")) {
      button.props.onClick();
    }
    expect(render(AdminPagination, { page: 1 })).toBe("");

    harness.rendered.length = 0;
    expect(render(SidebarWithSearch)).toContain("Thống kê");
    for (const entry of [
      ...captured("AccordionHeader", (props) => typeof props.onClick === "function"),
      ...captured("ListItem", (props) => typeof props.onClick === "function"),
    ]) {
      entry.props.onClick();
    }
    expect(harness.dispatch).toHaveBeenCalled();

    const setTab = vi.fn();
    harness.rendered.length = 0;
    expect(
      render(Tablist, {
        TABS: [
          { labelKey: "report.tab_revenue", value: "revenue" },
          { label: "Brand", value: "brand" },
        ],
        setTab,
        tab: "revenue",
      })
    ).toContain("report.tab_revenue");
    for (const tab of captured("Tab", (props) => typeof props.onClick === "function")) {
      tab.props.onClick();
    }
    expect(setTab).toHaveBeenCalledWith("brand");

    const updateOpen = vi.fn();
    const deleteOpen = vi.fn();
    harness.rendered.length = 0;
    render(SettingButton, {
      deleteContent: "Delete",
      handleDeleteOpen: deleteOpen,
      handleUpdateOpen: updateOpen,
      id: 99,
      updateContent: "Update",
    });
    for (const iconButton of captured(
      "IconButton",
      (props) => typeof props.onClick === "function"
    )) {
      iconButton.props.onClick();
    }
    expect(updateOpen).toHaveBeenCalled();
    expect(deleteOpen).toHaveBeenCalled();

    const updateSubmit = vi.fn(async () => ({ data: { statusCode: 200 } }));
    harness.rendered.length = 0;
    expect(
      render(AdminLayout, {
        TABLE_HEAD: tableHead,
        TABLE_ROWS: rows,
        bodyDetail: <span>detail</span>,
        bodyUpdate: <span>update</span>,
        children: <button>create</button>,
        deleteContent: "Delete",
        handleDeleteSubmit: vi.fn(),
        headerDetail: "Detail",
        headerUpdate: "Update",
        name: "Products",
        setTab,
        tab: "revenue",
        tablist: [{ label: "Revenue", value: "revenue" }],
        updateContent: "Update",
        updateSubmit,
      })
    ).toContain("Products");
    await captured("Button", (props) => typeof props.onClick === "function")
      .at(-1)
      .props.onClick();
    expect(updateSubmit).toHaveBeenCalled();
  });

  it("renders admin resource component elements and drives handlers", async () => {
    const [{ default: Brand }, { default: Category }] = await Promise.all([
      import("./components/admin/brand.component.jsx"),
      import("./components/admin/category.component.jsx"),
    ]);

    const markup = [render(Brand), render(Category)].join(" ");

    expect(markup).toContain("Nike");
    expect(markup).toContain("Shirts");

    for (const entry of [
      ...captured("TextField", (props) => typeof props.onChange === "function"),
      ...captured("OutlinedInput", (props) => typeof props.onChange === "function"),
      ...captured("Select", (props) => typeof props.onChange === "function"),
    ]) {
      await invoke(entry, "onChange", { target: { value: "42" } });
    }
    for (const entry of captured("DatePicker", (props) => typeof props.onChange === "function")) {
      await invoke(entry, "onChange", "2026-07-18");
    }
    for (const entry of [
      ...captured("Button", (props) => typeof props.onClick === "function"),
      ...captured("IconButton", (props) => typeof props.onClick === "function"),
    ]) {
      await invoke(entry);
    }
    expect(harness.mutation).toHaveBeenCalled();

    harness.apiState.brands = { data: null, error: null, isLoading: true };
    expect(render(Brand)).toContain("loading.label");

    harness.apiState.categories = {
      data: null,
      error: { message: "Category failed" },
      isLoading: false,
    };
    expect(render(Category)).toContain("Category failed");
  });

  it("renders order, comment, inbox, user, and web admin elements", async () => {
    const [
      { default: Comment },
      { default: Inbox },
      { default: AllOrder },
      { default: PaymentChannel },
      { default: User },
      { default: Web },
    ] = await Promise.all([
      import("./components/admin/comment.component.jsx"),
      import("./components/admin/inbox.component.jsx"),
      import("./components/admin/order.component.jsx"),
      import("./components/admin/payment_channel.component.jsx"),
      import("./components/admin/user.component.jsx"),
      import("./components/admin/web.component.jsx"),
    ]);

    const markup = [
      render(Comment),
      render(Inbox),
      render(AllOrder),
      render(PaymentChannel),
      render(User),
      render(Web),
    ].join(" ");

    expect(markup).toContain("Runner Tee");
    expect(markup).toContain("Ada User");
    expect(markup).toContain("notification.not_found_name");
    expect(markup).toContain("ada");

    for (const entry of [
      ...captured("Button", (props) => typeof props.onClick === "function"),
      ...captured("IconButton", (props) => typeof props.onClick === "function"),
    ]) {
      await invoke(entry);
    }

    harness.apiState.orders = {
      data: null,
      error: { message: "Order failed" },
      isLoading: false,
    };
    expect(render(AllOrder)).toContain("error");
  });

  it("renders sale and voucher admin form elements", async () => {
    const [{ default: OnsaleProduct }, { default: Voucher }] = await Promise.all([
      import("./components/admin/on_sale_product.component.jsx"),
      import("./components/admin/voucher.component.jsx"),
    ]);

    const markup = [render(OnsaleProduct), render(Voucher)].join(" ");

    expect(markup).toContain("PRODUCT");
    expect(markup).toContain("SAVE10");

    for (const entry of [
      ...captured("TextField", (props) => typeof props.onChange === "function"),
      ...captured("OutlinedInput", (props) => typeof props.onChange === "function"),
      ...captured("Select", (props) => typeof props.onChange === "function"),
    ]) {
      await invoke(entry, "onChange", { target: { value: "42" } });
    }
    for (const entry of captured("DatePicker", (props) => typeof props.onChange === "function")) {
      await invoke(entry, "onChange", "2026-07-18");
    }
    for (const entry of [
      ...captured("Button", (props) => typeof props.onClick === "function"),
      ...captured("IconButton", (props) => typeof props.onClick === "function"),
    ]) {
      await invoke(entry);
    }
    expect(harness.mutation).toHaveBeenCalled();

    harness.apiState.vouchers = { data: null, isError: true, isLoading: false };
    expect(render(Voucher)).toContain("notification.error_name");

    harness.apiState.brands = {
      data: { object: [{ description: "Athletic gear", id: 1, name: "Nike" }] },
      error: null,
      isLoading: false,
    };
    harness.apiState.categories = {
      data: { object: [{ description: "Everyday shirts", id: 1, name: "Shirts" }] },
      error: null,
      isLoading: false,
    };
    harness.apiState.inputSales = {
      data: null,
      error: { message: "Input sale failed" },
      isLoading: false,
    };
    expect(render(OnsaleProduct)).toContain("Input sale failed");
  });

  it("renders product and import-product preview branches", async () => {
    const filledTextState = (initial) => {
      if (initial === "") return "/filled-preview.png";
      if (initial === null) return 1;
      return initial;
    };

    const markup = await withMockedUseState(filledTextState, async () => {
      const [{ default: Product }, { default: ImportProduct }] = await Promise.all([
        import("./components/admin/product.component.jsx"),
        import("./components/admin/import_product.component.jsx"),
      ]);

      return [render(Product), render(ImportProduct)].join(" ");
    });

    expect(markup).toContain("Danh sách sản phẩm");
    expect(markup).toContain("Nhập hàng");

    for (const entry of [
      ...captured("TextField", (props) => typeof props.onChange === "function"),
      ...captured("OutlinedInput", (props) => typeof props.onChange === "function"),
      ...captured("Select", (props) => typeof props.onChange === "function"),
    ]) {
      await invoke(entry, "onChange", { target: { value: 2 } });
    }
    for (const entry of [
      ...captured("Button", (props) => typeof props.onClick === "function"),
      ...captured("IconButton", (props) => typeof props.onClick === "function"),
    ]) {
      await invoke(entry);
    }

    expect(harness.mutation).toHaveBeenCalled();
  });

  it("renders sale filter branch tables for each filter type", async () => {
    const { default: OnsaleProduct } =
      await import("./components/admin/on_sale_product.component.jsx");
    const previewRows = Array.from({ length: 6 }, (_, index) => ({
      importPrice: 1000 + index,
      material: `Cotton ${index}`,
      salePrice: 900 + index,
      sku: `SKU-${index}`,
    }));

    for (const filter of ["PRODUCT", "BRAND", "CATEGORY", "COLOR", "SIZE", "MATERIAL"]) {
      const markup = await withMockedUseState(
        (initial, index) => {
          if (index === 0 || index === 17) return filter;
          if (index === 1 || index === 6 || index === 18) return 1;
          if (index === 11 || index === 12) return previewRows;
          if (index === 20 || index === 21) return true;
          return initial;
        },
        async () => render(OnsaleProduct)
      );

      expect(markup).toContain("Danh sách sản phẩm");
      expect(markup).toContain("SKU-0");
    }
  });
});
