import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const harness = vi.hoisted(() => {
  const createStorage = () => {
    let values = {};

    return {
      clear: vi.fn(() => {
        values = {};
      }),
      getItem: vi.fn((key) => values[key] ?? null),
      removeItem: vi.fn((key) => {
        delete values[key];
      }),
      setItem: vi.fn((key, value) => {
        values[key] = String(value);
      }),
    };
  };

  const createComponent = (React, tag = "div") => {
    const MockComponent = ({ children, content, icon, label, value, src, alt, href }) => {
      if (tag === "img") {
        return React.createElement("img", {
          alt: alt ?? "mock image",
          src: src ?? "",
        });
      }

      const pieces = [icon, content, label, value, children].filter(
        (piece) => piece !== undefined && piece !== null && piece !== false
      );
      const normalizedPieces = pieces.map((piece) =>
        typeof piece === "object" && !React.isValidElement(piece) && !Array.isArray(piece)
          ? JSON.stringify(piece)
          : piece
      );
      const props = href ? { href } : {};

      return React.createElement(tag, props, ...normalizedPieces);
    };

    MockComponent.displayName = `Mock${tag}`;

    return MockComponent;
  };

  const moduleFactory = async (names) => {
    const React = await import("react");

    return Object.fromEntries(names.map((name) => [name, createComponent(React)]));
  };

  const defaultModuleFactory = async () => {
    const React = await import("react");

    return { default: createComponent(React) };
  };

  const iconModuleFactory = async (names) => {
    const React = await import("react");
    const Icon = (props) => React.createElement("svg", props);

    return Object.fromEntries(names.map((name) => [name, Icon]));
  };

  const defaultIconModuleFactory = async () => {
    const React = await import("react");
    const Icon = (props) => React.createElement("svg", props);

    return { default: Icon };
  };

  const mutation = vi.fn(() => ({
    unwrap: vi.fn(async () => ({
      object: {
        avatar_url: "avatar.png",
        name: "Ada Lovelace",
        token: "token",
        url: "/",
      },
    })),
  }));

  return {
    apiState: {},
    createStorage,
    defaultIconModuleFactory,
    defaultModuleFactory,
    dispatchMock: vi.fn(),
    iconModuleFactory,
    moduleFactory,
    mutation,
    navigateMock: vi.fn(),
    params: { id: "1" },
    reduxState: {},
  };
});

vi.mock("@material-tailwind/react/components/Accordion", () =>
  harness.moduleFactory(["Accordion", "AccordionBody", "AccordionHeader"])
);
vi.mock("@material-tailwind/react/components/Avatar", () => harness.moduleFactory(["Avatar"]));
vi.mock("@material-tailwind/react/components/Button", () => harness.moduleFactory(["Button"]));
vi.mock("@material-tailwind/react/components/Card", () =>
  harness.moduleFactory(["Card", "CardBody", "CardFooter", "CardHeader"])
);
vi.mock("@material-tailwind/react/components/Checkbox", () => harness.moduleFactory(["Checkbox"]));
vi.mock("@material-tailwind/react/components/Chip", () => harness.moduleFactory(["Chip"]));
vi.mock("@material-tailwind/react/components/Collapse", () => harness.moduleFactory(["Collapse"]));
vi.mock("@material-tailwind/react/components/Dialog", () =>
  harness.moduleFactory(["Dialog", "DialogBody", "DialogFooter", "DialogHeader"])
);
vi.mock("@material-tailwind/react/components/IconButton", () =>
  harness.moduleFactory(["IconButton"])
);
vi.mock("@material-tailwind/react/components/Input", () => harness.moduleFactory(["Input"]));
vi.mock("@material-tailwind/react/components/List", () =>
  harness.moduleFactory(["List", "ListItem", "ListItemPrefix"])
);
vi.mock("@material-tailwind/react/components/Menu", () =>
  harness.moduleFactory(["Menu", "MenuHandler", "MenuItem", "MenuList"])
);
vi.mock("@material-tailwind/react/components/Navbar", () => harness.moduleFactory(["Navbar"]));
vi.mock("@material-tailwind/react/components/Progress", () => harness.moduleFactory(["Progress"]));
vi.mock("@material-tailwind/react/components/Radio", () => harness.moduleFactory(["Radio"]));
vi.mock("@material-tailwind/react/components/Select", () =>
  harness.moduleFactory(["Option", "Select"])
);
vi.mock("@material-tailwind/react/components/Tabs", () =>
  harness.moduleFactory(["Tab", "Tabs", "TabsHeader"])
);
vi.mock("@material-tailwind/react/components/Textarea", () => harness.moduleFactory(["Textarea"]));
vi.mock("@material-tailwind/react/components/Tooltip", () => harness.moduleFactory(["Tooltip"]));
vi.mock("@material-tailwind/react/components/Typography", () =>
  harness.moduleFactory(["Typography"])
);

vi.mock("@mui/material", () =>
  harness.moduleFactory([
    "Avatar",
    "Chip",
    "Container",
    "Dialog",
    "DialogActions",
    "DialogContent",
    "DialogTitle",
    "Divider",
    "FormControl",
    "InputAdornment",
    "MenuItem",
    "OutlinedInput",
    "Rating",
    "Select",
    "TextField",
  ])
);
vi.mock("@mui/material/Chip", () => harness.defaultModuleFactory());
vi.mock("@mui/material/Container", () => harness.defaultModuleFactory());
vi.mock("@mui/material/Divider", () => harness.defaultModuleFactory());
vi.mock("@mui/material/TextField", () => harness.defaultModuleFactory());

vi.mock("@mui/icons-material/Close", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/Delete", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/East", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/Edit", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/FilterList", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/Settings", () => harness.defaultIconModuleFactory());
vi.mock("@mui/icons-material/ShoppingCart", () => harness.defaultIconModuleFactory());

vi.mock("@heroicons/react/24/outline", () =>
  harness.iconModuleFactory([
    "Bars3Icon",
    "ChartBarIcon",
    "ChevronDownIcon",
    "ChevronRightIcon",
    "ChevronUpIcon",
    "MagnifyingGlassIcon",
    "TrashIcon",
    "XMarkIcon",
  ])
);
vi.mock("@heroicons/react/24/solid", () =>
  harness.iconModuleFactory([
    "Bars2Icon",
    "ChevronDownIcon",
    "HeartIcon",
    "InboxArrowDownIcon",
    "LifebuoyIcon",
    "PowerIcon",
    "UserCircleIcon",
  ])
);

vi.mock("chart.js/auto", () => ({}));
vi.mock("react-chartjs-2", () => harness.moduleFactory(["Bar", "Line"]));
vi.mock("swiper/modules", () => ({
  Autoplay: {},
  EffectFade: {},
  Navigation: {},
  Pagination: {},
}));
vi.mock("swiper/react", () => harness.moduleFactory(["Swiper", "SwiperSlide"]));

vi.mock("react-router-dom", async () => {
  const React = await import("react");
  const Link = ({ children, to, href }) => React.createElement("a", { href: href ?? to }, children);

  return {
    Link,
    NavLink: Link,
    useNavigate: () => harness.navigateMock,
    useParams: () => harness.params,
  };
});

vi.mock("react-redux", async () => {
  const React = await import("react");

  return {
    Provider: ({ children }) => React.createElement(React.Fragment, null, children),
    useDispatch: () => harness.dispatchMock,
    useSelector: (selector) => selector(harness.reduxState),
  };
});

vi.mock("./i18n", () => ({
  useI18n: () => ({
    t: (key, params) => (params ? `${key}:${JSON.stringify(params)}` : key),
  }),
}));

vi.mock("./currency", () => ({
  useCurrency: () => ({
    formatPrice: (value) => `${Number(value ?? 0).toLocaleString("en-US")} VND`,
    locale: "en-US",
  }),
}));

vi.mock("./configs/sweetalert2.config", () => ({
  Toast: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  },
}));

vi.mock("./assets/login_icon.asset", () => ({
  default: () => React.createElement("svg", { "data-testid": "login-icon" }),
}));
vi.mock("./components/shared/loading.component", () => ({
  default: () => React.createElement("div", null, "loading"),
}));
vi.mock("./components/shared/pagination.component", () => ({
  default: () => React.createElement("nav", null, "pagination"),
}));
vi.mock("./components/shared/list_tab.component", () => ({
  default: ({ TABS = [] }) => React.createElement("div", null, TABS.length),
}));
vi.mock("./components/shared/header_table", () => ({
  default: ({ TABLE_HEAD = [] }) => React.createElement("thead", null, TABLE_HEAD.length),
}));
vi.mock("./components/shared/table.component", () => ({
  default: ({ TABLE_ROWS = [] }) => React.createElement("div", null, `rows:${TABLE_ROWS.length}`),
}));
vi.mock("./layouts/admin/admin.layout", () => ({
  default: ({ bodyDetail, bodyUpdate, children, name, TABLE_ROWS = [] }) =>
    React.createElement(
      "section",
      null,
      React.createElement("h1", null, name),
      children,
      React.createElement("div", null, `rows:${TABLE_ROWS.length}`),
      React.createElement("div", null, bodyDetail),
      React.createElement("div", null, bodyUpdate)
    ),
}));
vi.mock("./components/upload_image.component", () => ({
  default: ({ image }) => React.createElement("span", null, image),
}));
vi.mock("./components/shared/LanguageSwitcher", () => ({
  default: () => React.createElement("span", null, "language"),
}));
vi.mock("./components/shared/ParallaxBanner", () => ({
  default: ({ children }) => React.createElement("section", null, children),
}));
vi.mock("./components/shared/ScrollReveal", () => ({
  default: ({ children }) => React.createElement("section", null, children),
}));
vi.mock("./components/shared/SeasonSwitcher", () => ({
  default: () => React.createElement("span", null, "season"),
}));
vi.mock("./components/shared/SkeletonBlock", () => ({
  default: () => React.createElement("span", null, "skeleton"),
}));
vi.mock("./components/shared/ThemeSwitcher", () => ({
  default: () => React.createElement("span", null, "theme"),
}));
vi.mock("./components/shared/shop/ProductCard", () => ({
  default: ({ title, product_id }) =>
    React.createElement("article", null, title ?? product_id?.product_id?.name ?? "product"),
}));
vi.mock("./components/shop/user_info.component", () => ({
  default: () => React.createElement("div", null, "user-info"),
}));
vi.mock("./components/shop/seen_product.component", () => ({
  default: () => React.createElement("div", null, "seen-products"),
}));
vi.mock("./components/shop/wishlist.component", () => ({
  default: () => React.createElement("div", null, "wishlist"),
}));
vi.mock("./components/shop/rating_product.component", () => ({
  default: () => React.createElement("div", null, "ratings"),
}));
vi.mock("./components/shop/voucer.component", () => ({
  default: () => React.createElement("div", null, "vouchers"),
}));

vi.mock("./apis/account.api", () => ({
  useLoginMutation: () => [harness.mutation, { isLoading: false }],
  useRegisterMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/brand.api", () => ({
  useGetBrandsQuery: () => harness.apiState.brands,
}));
vi.mock("./apis/category.api", () => ({
  useGetCategoriesQuery: () => harness.apiState.categories,
}));
vi.mock("./apis/import_product.api", () => ({
  useAddImportedProductMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteImportedProductMutation: () => [harness.mutation, { isLoading: false }],
  useGetImportedProductsQuery: () => harness.apiState.importedProducts,
  useUpdateImportedProductMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/log.api", () => ({
  useGetLogsQuery: () => harness.apiState.logs,
}));
vi.mock("./apis/on_sale_product.api", () => ({
  useGetOnSaleProductQuery: () => harness.apiState.onSaleProduct,
  useGetOnSaleProductsQuery: () => harness.apiState.onSaleProducts,
}));
vi.mock("./apis/order.api", () => ({
  useGetCartQuery: () => harness.apiState.cart,
}));
vi.mock("./apis/order_item.api", () => ({
  useCreateOrderItemMutation: () => [harness.mutation, { isLoading: false }],
  useUpdateOrderItemMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/product.api", () => ({
  useCreateProductMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteProductMutation: () => [harness.mutation, { isLoading: false }],
  useGetProductsQuery: () => harness.apiState.products,
  useUpdateProductMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/statistic.api", () => ({
  useGetStatQuery: () => harness.apiState.stat,
}));

const importedProduct = {
  color_id: {
    color_code: "#111111",
    color_name: "Black",
    id: "#111111",
  },
  gender: "MALE",
  id: 1,
  image_url: "image-main.jpg",
  importNumber: 3,
  importPrice: 100000,
  material_id: {
    id: "cotton",
    name: "Cotton",
  },
  product_id: {
    id: 10,
    name: "Runner Tee",
  },
  public_id_slider_url_1: "public-1",
  public_id_slider_url_2: "public-2",
  public_id_slider_url_3: "public-3",
  public_id_slider_url_4: "public-4",
  public_id_url: "public-main",
  size_id: {
    height: "170cm",
    id: "m",
    size: "M",
    weight: "65kg",
  },
  sku: "SKU-001",
  slider_url_1: "image-1.jpg",
  slider_url_2: "image-2.jpg",
  slider_url_3: "image-3.jpg",
  slider_url_4: "image-4.jpg",
  stock: 8,
};

const saleProduct = {
  discount: 10,
  id: 101,
  product_id: {
    color_id: {
      color_code: "#111111",
      color_name: "Black",
      id: 1,
    },
    id: 10,
    image_url: "image-main.jpg",
    material_id: {
      id: 3,
      name: "Cotton",
    },
    product_id: {
      id: 1001,
      name: "Runner Tee",
      short_description: "Light everyday tee",
    },
    size_id: {
      height: "170",
      id: 2,
      size: "M",
      weight: "65",
    },
    slider_url_1: "image-1.jpg",
    slider_url_2: "image-2.jpg",
    slider_url_3: "image-3.jpg",
    slider_url_4: "image-4.jpg",
    stock: 8,
  },
  sale_price: 150000,
};

const resetApiState = () => {
  harness.apiState.brands = {
    data: { object: [{ id: 1, name: "Nike" }] },
    error: null,
    isLoading: false,
  };
  harness.apiState.cart = {
    data: {
      object: {
        id: 77,
        orderItems: [
          {
            id: 1,
            product_id: {
              discount: 10,
              id: 101,
              product_id: {
                image_url: "cart.jpg",
                product_id: { name: "Runner Tee" },
              },
              sale_price: 150000,
            },
            quantity: 2,
            title: "Runner Tee",
          },
        ],
        total_price: 270000,
      },
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.categories = {
    data: { object: [{ id: 2, name: "Tops" }] },
    error: null,
    isLoading: false,
  };
  harness.apiState.importedProducts = {
    data: { object: [importedProduct] },
    error: null,
    isLoading: false,
  };
  harness.apiState.logs = {
    data: { objects: [{ action: "LOGIN", date: "2026-07-18", id: 1, name: "Admin" }] },
    error: null,
    isLoading: false,
  };
  harness.apiState.onSaleProduct = {
    data: {
      object: [
        saleProduct,
        {
          ...saleProduct,
          id: 102,
          product_id: {
            ...saleProduct.product_id,
            color_id: { color_code: "#ffffff", color_name: "White", id: 4 },
            size_id: { height: "175", id: 5, size: "L", weight: "70" },
          },
        },
      ],
      rating: 4.5,
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.onSaleProducts = {
    data: { object: [saleProduct, { ...saleProduct, id: 102 }] },
    error: null,
    isLoading: false,
  };
  harness.apiState.products = {
    data: {
      object: [
        {
          brand_id: { id: 1, name: "Nike" },
          category_id: { id: 2, name: "Tops" },
          id: 10,
          name: "Runner Tee",
          short_description: "Light everyday tee",
        },
      ],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.stat = {
    data: {
      object: {
        generalStats: {
          completed: 7,
          income: 1200000,
          order: 12,
          product: 30,
          user: 5,
        },
        monthlyIncome: {
          2025: [10, 20, 30],
          2026: [15, 25, 35],
        },
      },
    },
    error: null,
    isLoading: false,
  };
};

const resetReduxState = () => {
  harness.reduxState = {
    active: { value: 1 },
    avatar_url: { publicId: "avatar-public", value: "avatar.png" },
    reactMetrics: {
      enabled: true,
      entities: {
        1: {
          actualDuration: 12,
          baseDuration: 13,
          commitTime: 14,
          componentId: "Dashboard",
          id: 1,
          phase: "mount",
          route: "/",
          startTime: 10,
          timestamp: 1,
        },
      },
      events: [],
      ids: [1],
      lastUpdatedAt: 1,
      maxRenderSamples: 120,
      memorySamples: [{ timestamp: 1, usedJSHeapSize: 5 * 1024 * 1024 }],
      panelOpen: false,
      renderSequence: 1,
      webMetrics: {
        "first-contentful-paint": { name: "first-contentful-paint", value: 31.23 },
        "largest-contentful-paint": { name: "largest-contentful-paint", value: 150.4 },
        "layout-shift": { name: "layout-shift", value: 0.02 },
      },
    },
    selectedId: { value: 1 },
    sort: { id: 0, type: "ASC" },
  };
};

const installBrowserState = () => {
  const storage = harness.createStorage();

  globalThis.localStorage = storage;
  storage.setItem("token", "token");
  storage.setItem("avatar", "avatar.png");
  storage.setItem("name", "Ada Lovelace");
  storage.setItem("order_id", "77");

  globalThis.document = {
    body: { classList: { add: vi.fn(), remove: vi.fn(), toggle: vi.fn() } },
    documentElement: { style: { setProperty: vi.fn() } },
  };
  globalThis.window = {
    addEventListener: vi.fn(),
    clearInterval: vi.fn(),
    document: globalThis.document,
    getComputedStyle: vi.fn(() => ({
      getPropertyValue: vi.fn(() => "#111111"),
    })),
    innerWidth: 1200,
    location: { href: "", pathname: "/" },
    performance: {
      getEntriesByType: vi.fn(() => []),
      memory: {
        jsHeapSizeLimit: 10 * 1024 * 1024,
        totalJSHeapSize: 6 * 1024 * 1024,
        usedJSHeapSize: 5 * 1024 * 1024,
      },
    },
    removeEventListener: vi.fn(),
    setInterval: vi.fn(() => 1),
  };
};

const render = (Component, props = {}) =>
  renderToStaticMarkup(React.createElement(Component, props));

beforeEach(() => {
  vi.clearAllMocks();
  installBrowserState();
  resetApiState();
  resetReduxState();
});

describe("Sonar new-code coverage for client UI", () => {
  it("renders shared navigation, notification, and profile components", async () => {
    const [
      { default: AdminNavbar },
      { default: Banner, BannerView, ProfileMenuView },
      { default: NavbarWithSublist, CartTooltipView, NavListMenu, NavListView },
      { default: NotificationLayout },
      { default: ProfileSidebar },
      { default: ReactMetricsMonitor },
    ] = await Promise.all([
      import("./components/shared/admin/admin_navbar.component.jsx"),
      import("./components/shared/shop/Banner.jsx"),
      import("./components/shared/shop/NavbarWithSublist.jsx"),
      import("./layouts/shop/notification.layout.jsx"),
      import("./components/shared/profile_sidebar.component.jsx"),
      import("./components/shared/ReactMetricsMonitor.jsx"),
    ]);

    expect(render(AdminNavbar)).toContain("VTI");
    expect(render(Banner)).toContain("banner.free_shipping");
    expect(
      render(BannerView, {
        isAuthenticated: false,
        labels: {
          freeShipping: "Free ship",
          login: "Login",
          register: "Register",
        },
        onLoginClick: vi.fn(),
        onRegisterClick: vi.fn(),
      })
    ).toContain("Register");
    expect(
      render(ProfileMenuView, {
        accountItems: [
          {
            href: "/profile",
            icon: () => React.createElement("svg"),
            isDanger: false,
            label: "Profile",
            labelKey: "account.profile",
            text: "Profile",
          },
          {
            href: "#",
            icon: () => React.createElement("svg"),
            isDanger: true,
            label: "Logout",
            labelKey: "common.logout",
            text: "Logout",
          },
        ],
        avatarUrl: "avatar.png",
        isMenuOpen: true,
        onMenuOpenChange: vi.fn(),
      })
    ).toContain("Logout");

    expect(render(NavbarWithSublist)).toContain("common.search");
    expect(
      render(NavListMenu, {
        data: { object: [{ id: 1, name: "Nike" }] },
        name: "Brands",
        type: "brand",
      })
    ).toContain("Nike");
    expect(
      render(NavListView, {
        brands: { object: [{ id: 1, name: "Nike" }] },
        categories: { object: [{ id: 2, name: "Tops" }] },
        labels: {
          aboutUs: "About",
          brands: "Brands",
          categories: "Categories",
          contact: "Contact",
          productList: "Products",
        },
      })
    ).toContain("Products");
    expect(
      render(CartTooltipView, {
        formatPrice: (value) => `${value}`,
        labels: {
          cart: "Cart",
          itemCount: "1 item",
          productImageAlt: "Product",
          total: "Total",
        },
        rows: [
          {
            id: 1,
            imageUrl: "cart.jpg",
            lineTotal: 90,
            quantity: 1,
            title: "Runner Tee",
            unitPrice: 90,
          },
        ],
        total: 90,
      })
    ).toContain("Runner Tee");

    expect(
      render(NotificationLayout, {
        notification: {
          icon: React.createElement("svg"),
          messageKey: "notification.message",
          nameKey: "notification.title",
          subtitleKey: "notification.subtitle",
        },
      })
    ).toContain("notification.title");
    expect(render(ProfileSidebar, { setTab: vi.fn(), tab: 0 })).toContain("Ada Lovelace");
    expect(
      render(ReactMetricsMonitor, { children: React.createElement("main", null, "App") })
    ).toContain("React metrics");
  });

  it("renders shop pages through loading, error, and populated states", async () => {
    const [
      { default: CartPage },
      { default: Step1Checkout },
      { default: ProductDetailpage },
      { default: Homepage, HomepageView },
      { default: HomeProductList },
    ] = await Promise.all([
      import("./pages/cart.page.jsx"),
      import("./components/shop/checkout_step_1.component.jsx"),
      import("./pages/detail_product.page.jsx"),
      import("./pages/home.page.jsx"),
      import("./components/shared/shop/HomeProductList.jsx"),
    ]);

    expect(render(CartPage)).toContain("Runner Tee");
    harness.apiState.cart = {
      data: null,
      error: { data: { message: "Cart failed" } },
      isLoading: false,
    };
    expect(render(CartPage)).toContain("Cart failed");
    harness.apiState.cart = { data: null, error: null, isLoading: true };
    expect(render(CartPage)).toContain("loading");
    globalThis.localStorage.removeItem("token");
    expect(render(CartPage)).toBe("");
    globalThis.localStorage.setItem("token", "token");
    resetApiState();

    expect(render(Step1Checkout, { handleNext: vi.fn() })).toContain("checkout.shipping_address");
    globalThis.localStorage.removeItem("token");
    expect(render(Step1Checkout, { handleNext: vi.fn() })).toContain(
      "checkout.login_to_select_address"
    );
    globalThis.localStorage.setItem("token", "token");

    expect(render(ProductDetailpage)).toContain("Runner Tee");
    harness.apiState.onSaleProduct = {
      data: null,
      error: { message: "No product" },
      isLoading: false,
    };
    expect(render(ProductDetailpage)).toBe("");
    expect(harness.navigateMock).toHaveBeenCalledWith("/error");
    harness.navigateMock.mockClear();
    harness.apiState.onSaleProduct = { data: { object: [] }, error: null, isLoading: false };
    expect(render(ProductDetailpage)).toBe("");
    harness.apiState.onSaleProduct = { data: null, error: null, isLoading: true };
    expect(render(ProductDetailpage)).toContain("loading");
    resetApiState();

    expect(render(Homepage)).toContain("home.new_products");
    harness.apiState.onSaleProducts = {
      data: null,
      error: { message: "Home failed" },
      isLoading: false,
    };
    expect(render(Homepage)).toContain("Home failed");
    harness.apiState.onSaleProducts = { data: null, error: null, isLoading: true };
    expect(render(Homepage)).toContain("loading");
    resetApiState();
    expect(
      render(HomepageView, {
        labels: {
          emailLabel: "Email",
          newsletterCopy: "Copy",
          newsletterTitle: "News",
          newProducts: "New",
          styleQuote: "Style",
        },
        products: [saleProduct],
        slides: ["slide-1.jpg", "slide-2.jpg"],
      })
    ).toContain("New");
    expect(render(HomeProductList, { products: [saleProduct], title: "Featured" })).toContain(
      "Featured"
    );
  });

  it("renders admin analytics, inventory, import, product, report, kpi, and log views", async () => {
    const [
      { default: Analytic },
      { default: ImportProduct },
      { default: Inventory },
      { default: Kpi },
      { default: KpiReport },
      { default: Log },
      { default: ProductList },
      { default: Report },
    ] = await Promise.all([
      import("./components/admin/analytic.component.jsx"),
      import("./components/admin/import_product.component.jsx"),
      import("./components/admin/inventory.component.jsx"),
      import("./components/admin/kpi.component.jsx"),
      import("./components/admin/kpi_report.component.jsx"),
      import("./components/admin/log.component.jsx"),
      import("./components/admin/product.component.jsx"),
      import("./components/admin/report.component.jsx"),
    ]);

    expect(render(Analytic)).toContain("analytics.title");
    harness.apiState.stat = { data: null, error: { message: "Stats failed" }, isLoading: false };
    expect(render(Analytic)).toContain("Stats failed");
    harness.apiState.stat = { data: null, error: null, isLoading: true };
    expect(render(Analytic)).toContain("loading");
    resetApiState();

    expect(
      render(Kpi, { stat: { completed: 1, income: 1000, order: 2, soldProduct: 4, user: 3 } })
    ).toContain("kpi.products_sold");
    for (const tab of ["revenue", "brand", "category", "product", "unknown"]) {
      expect(render(KpiReport, { tab })).toContain("container");
    }

    expect(render(ImportProduct)).toContain("rows:1");
    harness.apiState.importedProducts = {
      data: null,
      error: { message: "Import failed" },
      isLoading: false,
    };
    expect(render(ImportProduct)).toBe("");
    expect(harness.navigateMock).toHaveBeenCalledWith("/error");
    resetApiState();
    harness.apiState.importedProducts = { data: null, error: null, isLoading: true };
    expect(render(ImportProduct)).toContain("loading");
    resetApiState();

    expect(render(Inventory)).toContain("rows:0");
    harness.apiState.importedProducts = { data: null, error: "Inventory failed", isLoading: false };
    expect(render(Inventory)).toContain("Inventory failed");
    harness.apiState.importedProducts = { data: null, error: null, isLoading: true };
    expect(render(Inventory)).toContain("loading");
    resetApiState();

    expect(render(ProductList)).toContain("rows:1");
    harness.apiState.products = {
      data: null,
      error: { message: "Products failed" },
      isLoading: false,
    };
    expect(render(ProductList)).toBe("");
    expect(harness.navigateMock).toHaveBeenCalledWith("/error");
    resetApiState();
    harness.apiState.products = { data: null, error: null, isLoading: true };
    expect(render(ProductList)).toContain("loading");
    resetApiState();

    expect(render(Log)).toContain("rows:1");
    harness.apiState.logs = { data: null, error: { message: "Logs failed" }, isLoading: false };
    expect(render(Log)).toBe("");
    expect(harness.navigateMock).toHaveBeenCalledWith("/error");
    resetApiState();
    harness.apiState.logs = { data: null, error: null, isLoading: true };
    expect(render(Log)).toContain("loading");
    resetApiState();

    expect(render(Report)).toContain("report.title");
  });

  it("renders auth and order pages, and covers constants and persisted slices", async () => {
    const [
      { default: Loginpage },
      { default: Registerpage },
      { default: Order },
      menuItems,
      routes,
      statuses,
      openAccordionModule,
      sidebarItemModule,
    ] = await Promise.all([
      import("./pages/login.page.jsx"),
      import("./pages/register.page.jsx"),
      import("./components/shop/order.component.jsx"),
      import("./constants/menu_item.constant.jsx"),
      import("./constants/routes.constant.js"),
      import("./constants/status.constant.js"),
      import("./features/slices/open_accordion.slice.js"),
      import("./features/slices/sidebar_item.slice.js"),
    ]);

    expect(render(Loginpage)).toContain("auth.login_title");
    expect(render(Registerpage)).toContain("auth.register_title");
    harness.reduxState.avatar_url = { publicId: "avatar-public", value: "avatar.png" };
    expect(render(Registerpage)).toContain("auth.remove_image");
    expect(render(Order)).toContain("ORD-1001");

    expect(menuItems.account_menu).toHaveLength(4);
    expect(menuItems.report_items.map((item) => item.id)).toContain("product");
    expect(routes.ROUTES.CHECKOUT).toBe("/checkout");
    expect(statuses.ORDER_STATUS.COMPLETED).toBe("COMPLETED");
    expect(statuses.INVENTORY_FILTER.OUT_OF_STOCK).toBe("OUT_OF_STOCK");

    const openAccordionReducer = openAccordionModule.default;
    const { setOpenAccordion } = openAccordionModule;
    expect(openAccordionReducer({ value: 2 }, setOpenAccordion(2)).value).toBe(-1);
    expect(openAccordionReducer({ value: 2 }, setOpenAccordion(3)).value).toBe(3);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith("open_accordion", 3);

    const sidebarItemReducer = sidebarItemModule.default;
    const { setSidebarItem } = sidebarItemModule;
    expect(sidebarItemReducer(undefined, setSidebarItem({ label: "Orders" })).value).toBe("Orders");
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith("sidebar_item", "Orders");
  });
});
