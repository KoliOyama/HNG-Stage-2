/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        content: {
          primary: "var(--content-primary)",
          secondary: "var(--content-secondary)",
          tertiary: "var(--content-tertiary)",
          inverted: "var(--content-inverted)",
        },
        surface: {
          default: "var(--surface-default)",
          card: "var(--surface-card)",
          drawer: "var(--surface-drawer)",
          sidebar: "var(--surface-sidebar)",
          table: "var(--surface-table)",
          footer: "var(--surface-footer)",
        },
        status: {
          paid: {
            DEFAULT: "var(--status-paid)",
            muted: "var(--status-paid-bg)",
          },
          pending: {
            DEFAULT: "var(--status-pending)",
            muted: "var(--status-pending-bg)",
          },
          draft: {
            DEFAULT: "var(--status-draft)",
            muted: "var(--status-draft-bg)",
          },
        },
        interactive: {
          primary: "var(--int-primary)",
          "primary-light": "var(--int-primary-light)",
          danger: "var(--int-danger)",
          "danger-light": "var(--int-danger-light)",
          secondary: {
            DEFAULT: "var(--int-secondary-bg)",
            text: "var(--int-secondary-text)",
            hover: "var(--int-secondary-hover)",
          },
          tertiary: {
            DEFAULT: "var(--int-tertiary-bg)",
            text: "var(--int-tertiary-text)",
            hover: "var(--int-tertiary-hover)",
          },
          draft: {
            DEFAULT: "var(--int-draft-bg)",
            text: "var(--int-draft-text)",
            hover: "var(--int-draft-hover)",
          },
        },
        input: {
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          text: "var(--input-text)",
          focus: "var(--int-primary)",
          error: "var(--int-danger)",
        },
        border: {
          default: "var(--border-default)",
        },
      },
      fontFamily: {
        spartan: ['"League Spartan"', "sans-serif"],
      },
      fontSize: {
        "h-l": [
          "36px",
          { lineHeight: "33px", letterSpacing: "-1px", fontWeight: "700" },
        ],
        "h-m": [
          "24px",
          { lineHeight: "22px", letterSpacing: "-0.75px", fontWeight: "700" },
        ],
        "h-s": [
          "15px",
          { lineHeight: "24px", letterSpacing: "-0.25px", fontWeight: "700" },
        ],
        // Heading S Variant
        "h-s-variant": [
          "15px",
          { lineHeight: "15px", letterSpacing: "-0.25px", fontWeight: "700" },
        ],
        "body-m": [
          "13px",
          { lineHeight: "18px", letterSpacing: "-0.1px", fontWeight: "500" },
        ],
        "body-v": [
          "13px",
          { lineHeight: "15px", letterSpacing: "-0.25px", fontWeight: "500" },
        ],
      },
      boxShadow: {
        variant: "var(--shadow-variant)",
        card: "var(--shadow-card)",
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
};
