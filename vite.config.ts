import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({//changes recommended by chatgpt as my github site was having loading errors
  base:
    mode === "development"
      ? "/swen1005-router-assignment"
      : "/swen1005-router-assignment/",
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
}));