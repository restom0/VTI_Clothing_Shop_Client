# VTI Clothing Shop Client

Frontend client for the VTI Clothing Shop. The app is built with React, Vite,
Redux Toolkit, RTK Query, Material Tailwind, MUI, Tailwind CSS, Swiper, and
Chart.js. It provides a storefront, customer account flows, checkout, static
support/company pages, and an admin dashboard.

## Main Features

- Storefront home page with carousel, product sections, filters, product cards,
  product listing, brand/category listing, product detail, cart, and checkout.
- Authentication and account pages for login, registration, profile, orders,
  viewed products, wishlist, ratings, and vouchers.
- Admin dashboard modules for products, brands, categories, orders, users,
  vouchers, comments, inventory, import products, logs, reports, analytics, and
  web settings.
- Static content pages for help center, careers, about us, contact, terms,
  policy, and FAQs.
- Internationalization support with property files for 6 languages:
  `en`, `ca`, `it`, `es`, `de`, and `fr`.
- Locale-aware currency display with cached exchange rates refreshed every
  5 minutes.
- Advanced Redux setup with RTK Query, listener middleware, store auto-batching,
  Redux DevTools trace support, and a React metrics slice.
- React monitoring overlay in development using `React.Profiler`,
  `PerformanceObserver`, browser memory sampling, and Redux state.
- Unit test setup with Vitest and LCOV coverage for Sonar.

## Tech Stack

- React 18
- Vite
- React Router
- Redux Toolkit and RTK Query
- Material Tailwind, MUI, Heroicons, Tailwind CSS, SCSS
- Swiper
- Formik and Yup
- Chart.js and react-chartjs-2
- Axios
- Vitest
- SonarQube / SonarCloud compatible LCOV config

## Project Structure

```text
src/
  apis/                 RTK Query API modules
  apps/                 App routes, Redux store, Redux middleware
  assets/               Local icon/assets components
  components/
    admin/              Admin dashboard feature components
    shared/             Shared UI, shop layout parts, monitor, language switcher
    shop/               Customer account and checkout components
  configs/              API, Swiper, SweetAlert config
  constants/            Menu, table, sidebar, notification constants
  features/slices/      Redux slices
  hooks/                Shared custom hooks
  i18n/                 Translation provider, generated labels, locale sources
  layouts/              Shop/admin/help/career layout wrappers
  pages/                Route pages and static content pages
  styles/               SCSS variables and component utility classes
  utils/                Shared utilities
```

## Routes

Storefront routes:

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/product` | Product listing |
| `/product/:id` | Product detail |
| `/brand`, `/brand/:id` | Brand listing/filter |
| `/category`, `/category/:id` | Category listing/filter |
| `/cart` | Shopping cart |
| `/checkout` | Checkout flow |
| `/login` | Customer login |
| `/register` | Customer registration |
| `/profile` | Customer profile area |
| `/about-us` | About page |
| `/contact` | Contact page |
| `/terms` | Terms page |
| `/policy` | Policy page |
| `/faqs` | FAQs page |
| `/help-center` | Help center page |
| `/career`, `/careers` | Careers page |
| `/forbidden` | Forbidden notification |
| `*` | Not found page |

Admin/system routes:

| Route | Purpose |
| --- | --- |
| `/dashboard` | Admin dashboard |
| `/error` | Generic error page |

## Internationalization

i18n lives in `src/i18n`.

- Each language has its own source file at
  `src/i18n/locales/{language}/labels.properties`.
- React imports generated labels from `src/i18n/generated/labels.js`.
- Supported locales: `en`, `ca`, `it`, `es`, `de`, `fr`.
- `I18nProvider` wraps the app in `src/main.jsx`.
- `useI18n()` exposes `t`, `language`, `setLanguage`, and
  `supportedLanguages`.
- The language switcher stores the selected locale in `localStorage` under
  `vti-shop-language`.
- Run `npm run i18n:generate` after changing locale source files. The same
  generator also runs before `npm run dev` and `npm run build`.

Example:

```jsx
import { useI18n } from "../i18n";

const Example = () => {
  const { t } = useI18n();

  return <span>{t("nav.product_list")}</span>;
};
```

## Currency And Exchange Rates

Currency support lives in `src/currency`.

- Product, cart, checkout, and admin price displays use `useCurrency()`.
- Prices are stored and calculated from the base currency `VND`.
- Display currency follows the active language:
  `en -> USD`, `ca/it/es/de/fr -> EUR`.
- Exchange rates are loaded from `https://fxapi.app/api/vnd.json`.
- Rates are cached in `localStorage` under `vti-shop-currency-rates`.
- The provider refreshes rates every 5 minutes and falls back to VND if a
  requested rate is unavailable.

Example:

```jsx
import { useCurrency } from "../currency";

const ExamplePrice = ({ price }) => {
  const { formatPrice } = useCurrency();

  return <span>{formatPrice(price)}</span>;
};
```

## Redux Architecture

The Redux store is configured in `src/apps/store.js`.

- Feature reducers are grouped by UI state, form state, entity state, media
  state, observability state, and RTK Query reducers.
- RTK Query APIs are registered from one `rtkQueryApis` list, reducing manual
  reducer/middleware repetition.
- `setupListeners(store.dispatch)` enables RTK Query refetch behavior.
- `reduxPerformanceListener` records RTK Query rejected actions as metrics.
- `autoBatchEnhancer({ type: "raf" })` batches Redux notifications per animation
  frame for smoother UI updates.
- Redux DevTools tracing is enabled in development.

## React Monitoring

The monitoring tool is implemented in
`src/components/shared/ReactMetricsMonitor.jsx` and backed by
`src/features/slices/react_metrics.slice.js`.

It tracks:

- React render samples from `React.Profiler`
- Average render duration
- Slowest render sample
- First Contentful Paint
- Largest Contentful Paint
- Layout Shift
- JavaScript heap memory when the browser exposes `performance.memory`
- RTK Query rejected request metrics

In development, a small floating metrics button appears in the bottom-right
corner. Production monitoring can be enabled with:

```env
VITE_ENABLE_REACT_MONITOR=true
```

## Static Content Pages

Static content is centralized in `src/pages/static_content.page.jsx`.

The file exports reusable page variants for:

- Help center
- Careers
- About us
- Contact
- Terms
- Policy
- FAQs

This avoids placeholder pages such as `HelpCenterLayout` and keeps shared
layout/rendering consistent.

## API Configuration

API base URLs and route segments are configured in `src/configs/api.config.js`.

```js
const SHOP_LOCAL_URL = "http://127.0.0.1:8080/";
const SHOP_URL = "https://vti-clothing-shop.onrender.com/";
```

RTK Query API modules are under `src/apis`.

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Test and Sonar

Vitest test files use the patterns:

```text
src/**/*.test.js
src/**/*.test.jsx
src/**/*.spec.js
src/**/*.spec.jsx
```

Sonar configuration is in `sonar-project.properties`.

Coverage is expected at:

```text
coverage/lcov.info
```

Typical quality command sequence:

```bash
npm run lint
npm run test:coverage
sonar-scanner
```

## Troubleshooting

If `npm run build` fails with a missing Vite binary such as:

```text
Cannot find module 'node_modules/vite/bin/vite.js'
```

reinstall dependencies:

```bash
npm install
```

If `npm run test` says `vitest` is not recognized, install dependencies again
so the new dev dependencies from `package.json` are present.

## Notes for Contributors

- Keep UI copy in i18n labels where possible.
- Prefer adding pure helper functions for logic that needs unit tests.
- Keep view components focused on rendering and move data shaping into helpers.
- Avoid duplicating RTK Query reducer/middleware registration; add new APIs to
  `rtkQueryApis` in `src/apps/store.js`.
- For new static pages, extend `src/pages/static_content.page.jsx` unless the
  page needs live data or complex interactions.
