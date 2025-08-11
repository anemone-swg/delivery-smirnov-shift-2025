import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

export default {
  plugins: [
    autoprefixer({}),
    ...(isProduction ? [cssnano({ preset: "default" })] : []),
  ],
};
