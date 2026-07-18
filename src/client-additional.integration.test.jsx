import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const harness = vi.hoisted(() => {
  const rendered = [];
  const dispatch = vi.fn();
  const navigate = vi.fn();
  const setLanguage = vi.fn();
  const setSeason = vi.fn();
  const setTheme = vi.fn();
  const mutation = vi.fn(() => ({
    data: { statusCode: 200 },
    unwrap: vi.fn(async () => ({ data: { statusCode: 200 } })),
  }));

  const createComponent = (ReactModule, name, tag = "div") => {
    const MockComponent = (componentProps) => {
      rendered.push({ name, props: componentProps });
      const { children, content, label, value, href, role, to } = componentProps;
      const elementProps = {};
      if (href || to) elementProps.href = href ?? to;
      if (role) elementProps.role = role;
      const primitiveValue = typeof value === "string" || typeof value === "number" ? value : name;

      return ReactModule.createElement(
        tag,
        elementProps,
        children ?? label ?? content ?? primitiveValue
      );
    };
    MockComponent.displayName = `Mock${name}`;

    return MockComponent;
  };

  return {
    apiState: {},
    createComponent,
    dispatch,
    moduleFactory: async (names, tag = "div") => {
      const ReactModule = await import("react");

      return Object.fromEntries(
        names.map((name) => [name, createComponent(ReactModule, name, tag)])
      );
    },
    navigate,
    mutation,
    rendered,
    reduxState: {
      active: { value: 1 },
      openAccordion: { value: 0 },
      selectedId: { value: 1 },
      sidebar_item: { value: "Thống kê" },
      sort: { id: 1, type: "ASC" },
    },
    setLanguage,
    setSeason,
    setTheme,
  };
});

vi.mock("@material-tailwind/react/components/Accordion", () =>
  harness.moduleFactory(["Accordion", "AccordionBody", "AccordionHeader"])
);
vi.mock("@material-tailwind/react/components/Breadcrumbs", () =>
  harness.moduleFactory(["Breadcrumbs"], "nav")
);
vi.mock("@material-tailwind/react/components/Button", () =>
  harness.moduleFactory(["Button"], "button")
);
vi.mock("@material-tailwind/react/components/Card", () =>
  harness.moduleFactory(["Card", "CardBody", "CardFooter"])
);
vi.mock("@material-tailwind/react/components/Dialog", () =>
  harness.moduleFactory(["Dialog", "DialogBody", "DialogFooter", "DialogHeader"])
);
vi.mock("@material-tailwind/react/components/IconButton", () =>
  harness.moduleFactory(["IconButton"], "button")
);
vi.mock("@material-tailwind/react/components/Input", () => harness.moduleFactory(["Input"]));
vi.mock("@material-tailwind/react/components/List", () =>
  harness.moduleFactory(["List", "ListItem", "ListItemPrefix"])
);
vi.mock("@material-tailwind/react/components/Menu", () =>
  harness.moduleFactory(["Menu", "MenuHandler", "MenuItem", "MenuList"])
);
vi.mock("@material-tailwind/react/components/Radio", () => harness.moduleFactory(["Radio"]));
vi.mock("@material-tailwind/react/components/Select", () =>
  harness.moduleFactory(["Option", "Select"])
);
vi.mock("@material-tailwind/react/components/Stepper", () =>
  harness.moduleFactory(["Step", "Stepper"])
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
    "Box",
    "Avatar",
    "Card",
    "CardContent",
    "Button",
    "Chip",
    "Container",
    "Dialog",
    "DialogActions",
    "DialogContent",
    "DialogTitle",
    "Divider",
    "FormControl",
    "IconButton",
    "InputAdornment",
    "InputLabel",
    "MenuItem",
    "OutlinedInput",
    "Pagination",
    "Radio",
    "RadioGroup",
    "Rating",
    "Select",
    "Switch",
    "TextField",
    "FormControlLabel",
    "Typography",
  ])
);
vi.mock("@mui/material/Box", async () => {
  const ReactModule = await import("react");
  const Box = ({ children, component = "div", ...props }) =>
    ReactModule.createElement(component, props, children);

  return { default: Box };
});
vi.mock("@mui/material/TextField", async () => {
  const ReactModule = await import("react");
  const TextField = (props) => {
    harness.rendered.push({ name: "TextField", props });
    const { inputProps, ...safeProps } = props;
    return ReactModule.createElement("input", { ...safeProps, ...inputProps });
  };

  return { default: TextField };
});
vi.mock("@mui/material/Autocomplete", async () => {
  const ReactModule = await import("react");
  const Autocomplete = ({ getOptionLabel, options, renderInput, renderOption }) =>
    ReactModule.createElement(
      "section",
      null,
      getOptionLabel(options[0]),
      renderOption({ key: "country-option" }, options[1]),
      renderInput({ inputProps: { "aria-label": "country" } })
    );

  return { default: Autocomplete };
});
vi.mock("@mui/x-date-pickers", () => harness.moduleFactory(["DatePicker", "LocalizationProvider"]));
vi.mock("@mui/x-date-pickers/DatePicker", () => harness.moduleFactory(["DatePicker"]));
vi.mock("@mui/x-date-pickers/AdapterDayjs", () => ({
  AdapterDayjs: function AdapterDayjs() {},
}));
vi.mock("@mui/x-date-pickers/LocalizationProvider", () =>
  harness.moduleFactory(["LocalizationProvider"])
);
vi.mock("@mui/x-date-pickers/internals/demo", () => harness.moduleFactory(["DemoContainer"]));

const iconModule = async (names) => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return Object.fromEntries(names.map((name) => [name, Icon]));
};

vi.mock("@heroicons/react/24/outline", () =>
  iconModule([
    "ArrowLeftIcon",
    "ArrowRightIcon",
    "BriefcaseIcon",
    "ChatBubbleLeftRightIcon",
    "CheckCircleIcon",
    "ChevronUpDownIcon",
    "ChevronDownIcon",
    "ChevronRightIcon",
    "ClipboardDocumentCheckIcon",
    "ComputerDesktopIcon",
    "EnvelopeIcon",
    "GlobeAltIcon",
    "MapPinIcon",
    "MoonIcon",
    "PhoneIcon",
    "QuestionMarkCircleIcon",
    "ShieldCheckIcon",
    "ShoppingBagIcon",
    "SparklesIcon",
    "SunIcon",
    "TruckIcon",
  ])
);
vi.mock("@heroicons/react/24/solid", () =>
  iconModule([
    "FlagIcon",
    "InboxArrowDownIcon",
    "LifebuoyIcon",
    "PowerIcon",
    "PresentationChartBarIcon",
    "ShoppingBagIcon",
    "UserCircleIcon",
  ])
);

vi.mock("@mui/icons-material/ArrowBack", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/CheckCircle", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Close", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Delete", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/East", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Edit", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/FilterList", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/FmdGoodOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/HighlightOffOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/KeyOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/LocalPhoneOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/MailOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Public", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Receipt", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/Settings", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/SecurityOutlined", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/ShoppingCart", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});
vi.mock("@mui/icons-material/SubdirectoryArrowRight", async () => {
  const ReactModule = await import("react");
  const Icon = (props) => ReactModule.createElement("svg", props);

  return { default: Icon };
});

vi.mock("developer-icons", () =>
  iconModule(["Facebook", "Google", "Twitter", "GitHubDark", "Instagram"])
);

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: ({ count }) => ({
    getTotalSize: () => count * 64,
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        end: (index + 1) * 64,
        index,
        key: `row-${index}`,
        start: index * 64,
      })),
    measureElement: vi.fn(),
  }),
}));
vi.mock("swiper/react", () => harness.moduleFactory(["Swiper", "SwiperSlide"]));
vi.mock("swiper/modules", () => ({ Navigation: {} }));
vi.mock("axios", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

vi.mock("react-redux", () => ({
  useDispatch: () => harness.dispatch,
  useSelector: (selector) => selector(harness.reduxState),
}));
vi.mock("react-router-dom", async () => {
  const ReactModule = await import("react");
  const Link = ({ children, href, to }) =>
    ReactModule.createElement("a", { href: href ?? to }, children);
  const Wrapper = ({ children }) => ReactModule.createElement("div", null, children);
  const Route = (props) => {
    harness.rendered.push({ name: "Route", props });
    return ReactModule.createElement(
      "section",
      null,
      `route:${props.path ?? "index"}`,
      props.children
    );
  };

  return {
    BrowserRouter: Wrapper,
    Link,
    NavLink: Link,
    Outlet: () => ReactModule.createElement("div", null, "outlet"),
    Route,
    Routes: Wrapper,
    useLocation: () => ({ pathname: "/dashboard" }),
    useNavigate: () => harness.navigate,
    useParams: () => ({}),
  };
});

vi.mock("./i18n", () => ({
  useI18n: () => ({
    language: "en",
    setLanguage: harness.setLanguage,
    supportedLanguages: [
      { code: "en", labelKey: "language.english" },
      { code: "vi", labelKey: "language.vietnamese" },
    ],
    t: (key, params) => (params ? `${key}:${JSON.stringify(params)}` : key),
  }),
}));
vi.mock("./currency", () => ({
  useCurrency: () => ({
    formatPrice: (value) => `${Number(value ?? 0).toLocaleString("en-US")} VND`,
  }),
}));
vi.mock("./theme", () => ({
  useThemeMode: () => ({
    activeTheme: "dark",
    setTheme: harness.setTheme,
    theme: "system",
    themeOptions: [
      { labelKey: "theme.light", value: "light" },
      { labelKey: "theme.dark", value: "dark" },
      { labelKey: "theme.system", value: "system" },
    ],
  }),
}));
vi.mock("./theme/SeasonProvider", () => ({
  useSeasonMode: () => ({
    activeSeason: "summer",
    season: "auto",
    seasonOptions: [
      { emoji: "A", labelKey: "season.auto", value: "auto" },
      { emoji: "S", labelKey: "season.summer", value: "summer" },
    ],
    setSeason: harness.setSeason,
  }),
}));

vi.mock("./apis/brand.api", () => ({
  useAddBrandMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteBrandMutation: () => [harness.mutation, { isLoading: false }],
  useGetBrandsQuery: () => harness.apiState.brands,
  useUpdateBrandMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/category.api", () => ({
  useAddCategoryMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteCategoryMutation: () => [harness.mutation, { isLoading: false }],
  useGetCategoriesQuery: () => harness.apiState.categories,
  useUpdateCategoryMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/comment.api", () => ({
  useDeleteCommentMutation: () => [harness.mutation, { isLoading: false }],
  useGetCommentsQuery: () => harness.apiState.comments,
}));
vi.mock("./apis/import_product.api", () => ({
  useAddImportedProductMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteImportedProductMutation: () => [harness.mutation, { isLoading: false }],
  useGetColorsQuery: () => harness.apiState.colors,
  useGetImportedProductQuery: () => harness.apiState.importedProductPreview,
  useGetImportedProductsQuery: () => harness.apiState.importedProducts,
  useGetMaterialsQuery: () => harness.apiState.materials,
  useGetSizesQuery: () => harness.apiState.sizes,
  useUpdateImportedProductMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/input_on_sale.api", () => ({
  useCreateInputSaleMutation: () => [harness.mutation, { isLoading: false }],
  useDeleteInputSaleMutation: () => [harness.mutation, { isLoading: false }],
  useGetInputSalesQuery: () => harness.apiState.inputSales,
  useUpdateInputSaleMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/order.api", () => ({
  useGetOrdersQuery: () => harness.apiState.orders,
}));
vi.mock("./apis/product.api", () => ({
  useGetProductsQuery: () => harness.apiState.products,
}));
vi.mock("./apis/user.api", () => ({
  useGetUserProfileQuery: () => harness.apiState.userProfile,
  useGetUsersQuery: () => harness.apiState.users,
  useUpdatePasswordMutation: () => [harness.mutation, { isLoading: false }],
  useUpdateUserProfileMutation: () => [harness.mutation, { isLoading: false }],
}));
vi.mock("./apis/voucher.api", () => ({
  useAddVoucherMutation: () => [harness.mutation, { isLoading: false }],
  useGetVouchersQuery: () => harness.apiState.vouchers,
  useUpdateVoucherMutation: () => [harness.mutation, { isLoading: false }],
}));

vi.mock("./components/shared/admin/admin_navbar.component", async () => {
  const ReactModule = await import("react");

  return { default: () => ReactModule.createElement("header", null, "admin-navbar") };
});
vi.mock("./components/shared/shop/Banner", async () => {
  const ReactModule = await import("react");

  return { default: () => ReactModule.createElement("div", null, "shop-banner") };
});
vi.mock("./components/shared/shop/NavbarWithSublist", async () => {
  const ReactModule = await import("react");

  return { default: () => ReactModule.createElement("nav", null, "shop-navbar") };
});
vi.mock("./components/shop/checkout_step_1.component", async () => {
  const ReactModule = await import("react");

  return {
    default: ({ handleNext }) =>
      ReactModule.createElement("button", { onClick: handleNext }, "checkout-step-1"),
  };
});
vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) },
}));
vi.mock("./configs/sweetalert2.config", () => ({
  Toast: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) },
}));

const render = (Component, props = {}) =>
  renderToStaticMarkup(React.createElement(Component, props));
const captured = (name, predicate = () => true) =>
  harness.rendered.filter((entry) => entry.name === name && predicate(entry.props));
const invoke = async (entry, handlerName = "onClick", event = { target: { value: "typed" } }) => {
  const result = entry?.props?.[handlerName]?.(event);
  if (result && typeof result.then === "function") await result;
};

beforeEach(() => {
  vi.clearAllMocks();
  const storage = {
    clear: vi.fn(),
    getItem: vi.fn(() => null),
    removeItem: vi.fn(),
    setItem: vi.fn(),
  };
  globalThis.localStorage = storage;
  globalThis.window = {
    addEventListener: vi.fn(),
    cancelAnimationFrame: vi.fn(),
    innerHeight: 900,
    innerWidth: 1200,
    localStorage: storage,
    removeEventListener: vi.fn(),
    requestAnimationFrame: vi.fn((callback) => {
      callback();
      return 1;
    }),
  };
  globalThis.document = {
    documentElement: {
      classList: { toggle: vi.fn() },
      dataset: {},
      style: {},
    },
  };
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { userAgent: "Chrome" },
  });
  globalThis.requestAnimationFrame = globalThis.window.requestAnimationFrame;
  globalThis.cancelAnimationFrame = globalThis.window.cancelAnimationFrame;
  harness.rendered.length = 0;
  harness.mutation.mockClear();
  harness.apiState.brands = {
    data: {
      object: [
        { description: "Athletic gear", id: 1, name: "Nike" },
        { description: "Classic gear", id: 2, name: "Adidas" },
      ],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.categories = {
    data: {
      object: [
        { description: "Everyday shirts", id: 1, name: "Shirts" },
        { description: "Everyday pants", id: 2, name: "Pants" },
      ],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.comments = {
    data: [
      {
        content: "Comfortable fabric",
        created_at: "2026-07-18",
        id: 1,
        star: 5,
        username: "ada",
      },
    ],
    error: null,
    isLoading: false,
  };
  harness.apiState.products = {
    data: {
      object: [
        {
          brand_id: { id: 1, name: "Nike" },
          category_id: { id: 1, name: "Shirts" },
          id: 1,
          name: "Runner Tee",
          short_description: "Training tee",
        },
      ],
    },
    error: null,
    isLoading: false,
  };
  const importedProductRows = [
    {
      color_id: { color_code: "#111827", color_name: "Black", id: 1 },
      id: 1,
      image_url: "/runner-tee.png",
      importNumber: 20,
      importPrice: 100000,
      material_id: { id: 1, name: "Cotton" },
      product_id: { id: 1, name: "Runner Tee" },
      public_id_slider_url_1: "slide-1",
      public_id_slider_url_2: "slide-2",
      public_id_slider_url_3: "slide-3",
      public_id_slider_url_4: "slide-4",
      public_id_url: "main",
      size_id: { height: "165-175cm", id: 1, size: "M", weight: "55-70kg" },
      sku: "RUN-BLK-M",
      slider_url_1: "/runner-1.png",
      slider_url_2: "/runner-2.png",
      slider_url_3: "/runner-3.png",
      slider_url_4: "/runner-4.png",
      stock: 12,
    },
    {
      color_id: { color_code: "#f8fafc", color_name: "White", id: 2 },
      id: 2,
      image_url: "/runner-tee-white.png",
      importNumber: 5,
      importPrice: 120000,
      material_id: { id: 2, name: "Linen" },
      product_id: { id: 1, name: "Runner Tee" },
      public_id_slider_url_1: "white-slide-1",
      public_id_slider_url_2: "white-slide-2",
      public_id_slider_url_3: "white-slide-3",
      public_id_slider_url_4: "white-slide-4",
      public_id_url: "white-main",
      size_id: { height: "170-180cm", id: 2, size: "L", weight: "65-80kg" },
      sku: "RUN-WHT-L",
      slider_url_1: "/runner-white-1.png",
      slider_url_2: "/runner-white-2.png",
      slider_url_3: "/runner-white-3.png",
      slider_url_4: "/runner-white-4.png",
      stock: 0,
    },
  ];
  harness.apiState.colors = {
    data: { object: importedProductRows.map(({ color_id: color }) => color) },
    error: null,
    isLoading: false,
  };
  harness.apiState.importedProducts = {
    data: { object: importedProductRows },
    error: null,
    isLoading: false,
  };
  harness.apiState.importedProductPreview = {
    data: { object: importedProductRows },
    error: null,
    isLoading: false,
  };
  harness.apiState.inputSales = {
    data: {
      object: [
        {
          available_date: "2026-07-01",
          discount: 10,
          end_date: "2026-08-01",
          filter: "PRODUCT",
          filter_id: 1,
          id: 1,
          salePercentage: 120,
        },
      ],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.materials = {
    data: { object: importedProductRows.map(({ material_id: material }) => material) },
    error: null,
    isLoading: false,
  };
  harness.apiState.sizes = {
    data: { object: importedProductRows.map(({ size_id: size }) => size) },
    error: null,
    isLoading: false,
  };
  harness.apiState.orders = {
    data: {
      object: [
        {
          address: "1 Main St",
          id: 1,
          order_code: "ORD-1",
          orderItems: [
            {
              id: 10,
              product_id: {
                discount: 10,
                product_id: { product_id: { name: "Runner Tee" } },
                sale_price: 100000,
              },
              quantity: 2,
            },
          ],
          payment_method: "BANK",
          payment_status: "PAID",
          phone_number: "0912345678",
          receiver_name: "Ada Buyer",
          total_price: 180000,
        },
      ],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.users = {
    data: {
      object: [{ id: 1, name: "Ada User", role: "USER", status: "ACTIVE", username: "ada" }],
    },
    error: null,
    isLoading: false,
  };
  harness.apiState.userProfile = {
    data: {
      object: {
        address: "1 Main St",
        avatar_url: "/avatar.png",
        birthday: "1998-01-15",
        email: "ada@example.com",
        gender: "MALE",
        name: "Ada Profile",
        phone_number: "0912345678",
        public_id_avatar_url: "avatar-public-id",
      },
    },
    isError: false,
    isLoading: false,
  };
  harness.apiState.vouchers = {
    data: {
      object: [
        {
          available_date: "2026-07-01T00:00:00.000Z",
          code: "SAVE10",
          expired_date: "2026-08-01T00:00:00.000Z",
          id: 1,
          stock: 5,
          value: 10,
        },
        {
          available_date: "2026-09-01T00:00:00.000Z",
          code: "SAVE20",
          expired_date: "2026-10-01T00:00:00.000Z",
          id: 2,
          stock: 8,
          value: 20,
        },
      ],
    },
    isError: false,
    isLoading: false,
  };
  harness.reduxState = {
    active: { value: 1 },
    openAccordion: { value: 0 },
    selectedId: { value: 1 },
    sidebar_item: { value: "Thống kê" },
    sort: { id: 1, type: "ASC" },
  };
});

describe("additional client integration coverage", () => {
  it("renders app routes, shop/admin shells, and static content pages", async () => {
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
      staticPages,
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
      import("./pages/static_content.page.jsx"),
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
            icon: () => React.createElement("svg"),
            title: "Section",
          },
        ],
        stats: [{ label: "Orders", value: "42" }],
        subtitle: "Subtitle",
        title: "Title",
      })
    ).toContain("Question");
  });

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
        bodyDetail: React.createElement("span", null, "detail"),
        bodyUpdate: React.createElement("span", null, "update"),
        children: React.createElement("button", null, "create"),
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

  it("renders admin resource screens and drives their form handlers", async () => {
    const [
      { default: Brand },
      { default: Category },
      { default: Comment },
      { default: Inbox },
      { default: AllOrder },
      { default: PaymentChannel },
      { default: OnsaleProduct },
      { default: User },
      { default: Voucher },
      { default: Web },
    ] = await Promise.all([
      import("./components/admin/brand.component.jsx"),
      import("./components/admin/category.component.jsx"),
      import("./components/admin/comment.component.jsx"),
      import("./components/admin/inbox.component.jsx"),
      import("./components/admin/order.component.jsx"),
      import("./components/admin/payment_channel.component.jsx"),
      import("./components/admin/on_sale_product.component.jsx"),
      import("./components/admin/user.component.jsx"),
      import("./components/admin/voucher.component.jsx"),
      import("./components/admin/web.component.jsx"),
    ]);

    const markup = [
      render(Brand),
      render(Category),
      render(Comment),
      render(Inbox),
      render(AllOrder),
      render(PaymentChannel),
      render(OnsaleProduct),
      render(User),
      render(Voucher),
      render(Web),
    ].join(" ");

    expect(markup).toContain("Nike");
    expect(markup).toContain("Shirts");
    expect(markup).toContain("Lượt bình luận");
    expect(markup).toContain("Runner Tee");
    expect(markup).toContain("Lên giá sản phẩm");
    expect(markup).toContain("Ada User");
    expect(markup).toContain("SAVE10");
    expect(markup).toContain("notification.not_found_name");

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

    harness.apiState.orders = {
      data: null,
      error: { message: "Order failed" },
      isLoading: false,
    };
    expect(render(AllOrder)).toContain("error");

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

  it("renders checkout, notification, switcher, media, and country components", async () => {
    const [
      { default: CheckoutPage },
      { default: CheckoutStep2 },
      { default: CheckoutStep3 },
      { default: CountrySelect },
      { default: Footer, FooterView },
      { default: LanguageSwitcher },
      { default: LazyImage },
      { default: Loading },
      { default: NotificationLayout },
      { default: ParallaxBanner },
      { default: ScrollReveal },
      { default: SeasonSwitcher },
      { default: ThemeSwitcher },
    ] = await Promise.all([
      import("./pages/checkout.page.jsx"),
      import("./components/shop/checkout_step_2.component.jsx"),
      import("./components/shop/checkout_step_3.component.jsx"),
      import("./components/country_select.component.jsx"),
      import("./components/shared/shop/Footer.jsx"),
      import("./components/shared/LanguageSwitcher.jsx"),
      import("./components/shared/LazyImage.jsx"),
      import("./components/shared/loading.component.jsx"),
      import("./layouts/shop/notification.layout.jsx"),
      import("./components/shared/ParallaxBanner.jsx"),
      import("./components/shared/ScrollReveal.jsx"),
      import("./components/shared/SeasonSwitcher.jsx"),
      import("./components/shared/ThemeSwitcher.jsx"),
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
