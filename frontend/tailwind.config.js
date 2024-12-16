/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "rgb(238, 98, 55)",
          "primary-focus": "rgb(238, 98, 55)",
          "base-100": "#E5E5E5",
          ".btn-primary": {
            color: "white",
          },
          ".btn-error": {
            color: "white",
          },
          ".btn-outline:hover": {
            color: "white !important",
          },
        },

        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "rgb(238, 98, 55)",
          "primary-focus": "rgb(238, 98, 55)",
          "base-100": "#303030",
          ".btn-primary": {
            color: "black",
          },
          ".btn-error": {
            color: "black",
          },
          ".btn-outline:hover": {
            color: "black !important",
          },
        },
      },
    ],
  },
};
