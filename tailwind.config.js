import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary — dùng CSS var để có thể override runtime
        primary: {
          DEFAULT: "var(--color-primary)",
          dark:    "var(--color-primary-dark)",
          light:   "var(--color-primary-light)",
          muted:   "var(--color-primary-muted)",
        },
        // Semantic
        danger: {
          DEFAULT: "var(--color-danger)",
          dark:    "var(--color-danger-dark)",
          light:   "var(--color-danger-light)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          dark:    "var(--color-success-dark)",
          light:   "var(--color-success-light)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          dark:    "var(--color-warning-dark)",
          light:   "var(--color-warning-light)",
        },
        // Surface / neutral
        surface: {
          DEFAULT: "var(--color-surface)",
          raised:  "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong:  "var(--color-border-strong)",
        },
        // Text
        "text-base":   "var(--color-text-base)",
        "text-muted":  "var(--color-text-muted)",
        "text-invert": "var(--color-text-invert)",
      },
      boxShadow: {
        card:       "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        panel:      "var(--shadow-panel)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width-base)",
        strong: "var(--border-width-strong)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
        fast: "150ms",
        slow: "500ms",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "page-x": "var(--spacing-page-x)",
        "section-y": "var(--spacing-section-y)",
        "card-padding": "var(--spacing-card-padding)",
        "panel-padding": "var(--spacing-panel-padding)",
      },
    },
  },
});
