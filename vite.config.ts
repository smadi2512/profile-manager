import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import compress from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // gzip
    compress({
      verbose: true,
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // Only compress files >10kb
    }),
    // brotli
    compress({
      verbose: true,
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ],
  build: {
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          //Vendor Splitting
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("@heroicons")) return "vendor-icons";
            if (id.includes("clsx") || id.includes("uuid"))
              return "vendor-utils";

            //everything else in node_modules
            return "vendor-other";
          }
          //Feature-based Splitting
          if (id.includes("/src/features/")) {
            const match = id.match(/\/src\/features\/([^\\/]+)/);
            if (match) {
              return `feature-${match[1].toLowerCase()}`;
            }
          }

          return undefined;
        },
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
