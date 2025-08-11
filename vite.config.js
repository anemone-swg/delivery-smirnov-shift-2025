import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { babel } from "@rollup/plugin-babel";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    // babel({
    //   babelConfig: true,
    //   exclude: /node_modules/,
    // }),
    {
      ...babel({
        babelHelpers: "bundled",
        exclude: /node_modules/,
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      }),
      apply: "build",
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
