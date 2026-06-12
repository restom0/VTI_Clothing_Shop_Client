import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const getVendorChunk = (id) => {
  if (!id.includes("node_modules")) return undefined;

  const normalizedId = id.replaceAll("\\", "/");
  const materialTailwindComponentMatch = normalizedId.match(
    /@material-tailwind\/react\/components\/([^/]+)/
  );

  if (
    normalizedId.includes("@mui/icons-material") ||
    normalizedId.includes("@heroicons")
  ) {
    return "vendor-icons";
  }

  if (normalizedId.includes("@mui/")) return "vendor-mui";
  if (normalizedId.includes("@emotion/")) return "vendor-emotion";

  if (
    normalizedId.includes(
      "@material-tailwind/react/node_modules/framer-motion"
    )
  ) {
    return "vendor-motion";
  }

  if (
    normalizedId.includes("@material-tailwind/react/node_modules/@floating-ui")
  ) {
    return "vendor-floating-ui";
  }

  if (normalizedId.includes("@material-tailwind/react/node_modules/")) {
    return "vendor-material-tailwind-utils";
  }

  if (materialTailwindComponentMatch) {
    const componentName = materialTailwindComponentMatch[1].toLowerCase();
    const chunkByComponent = {
      accordion: "vendor-mt-navigation",
      alert: "vendor-mt-overlay",
      avatar: "vendor-mt-base",
      badge: "vendor-mt-base",
      breadcrumbs: "vendor-mt-navigation",
      button: "vendor-mt-base",
      buttongroup: "vendor-mt-base",
      card: "vendor-mt-base",
      carousel: "vendor-mt-overlay",
      checkbox: "vendor-mt-forms",
      chip: "vendor-mt-base",
      collapse: "vendor-mt-navigation",
      dialog: "vendor-mt-overlay",
      drawer: "vendor-mt-overlay",
      iconbutton: "vendor-mt-base",
      input: "vendor-mt-forms",
      list: "vendor-mt-navigation",
      menu: "vendor-mt-overlay",
      navbar: "vendor-mt-navigation",
      popover: "vendor-mt-overlay",
      progress: "vendor-mt-base",
      radio: "vendor-mt-forms",
      rating: "vendor-mt-forms",
      select: "vendor-mt-forms",
      slider: "vendor-mt-forms",
      speeddial: "vendor-mt-overlay",
      spinner: "vendor-mt-base",
      stepper: "vendor-mt-forms",
      tabs: "vendor-mt-forms",
      textarea: "vendor-mt-forms",
      timeline: "vendor-mt-base",
      tooltip: "vendor-mt-overlay",
      typography: "vendor-mt-base",
    };

    return chunkByComponent[componentName] ?? "vendor-mt-base";
  }

  if (normalizedId.includes("@material-tailwind/react/")) {
    return "vendor-mt-core";
  }

  if (
    normalizedId.includes("/react/") ||
    normalizedId.includes("/react-dom/") ||
    normalizedId.includes("/scheduler/")
  ) {
    return "vendor-react";
  }

  if (
    normalizedId.includes("react-router-dom") ||
    normalizedId.includes("@remix-run")
  ) {
    return "vendor-router";
  }

  if (
    normalizedId.includes("@reduxjs/") ||
    normalizedId.includes("react-redux")
  ) {
    return "vendor-state";
  }

  if (
    normalizedId.includes("chart.js") ||
    normalizedId.includes("react-chartjs-2")
  ) {
    return "vendor-charts";
  }

  if (normalizedId.includes("swiper")) return "vendor-swiper";
  if (normalizedId.includes("sweetalert2")) return "vendor-alerts";
  if (normalizedId.includes("@tanstack/")) return "vendor-virtual";

  if (
    normalizedId.includes("/axios/") ||
    normalizedId.includes("/crypto-js/") ||
    normalizedId.includes("/date-fns/") ||
    normalizedId.includes("/dayjs/") ||
    normalizedId.includes("/formik/") ||
    normalizedId.includes("/yup/")
  ) {
    return "vendor-utils";
  }

  return "vendor-misc";
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rolldownOptions: {
      output: {
        manualChunks: getVendorChunk,
      },
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/**/*.test.{js,jsx}",
        "src/**/*.spec.{js,jsx}",
        "src/main.jsx",
      ],
    },
  },
});
