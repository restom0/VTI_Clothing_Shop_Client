import withMT from "@material-tailwind/react/utils/withMT";
// const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  //plugins: [flowbite.plugin()],
});
