
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // for React support
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Local dev server settings
  server: {
    host: "::",
    port: 8080,
  },

  // Plugins
  plugins: [
    react(), // includes React SWC compiler for fast builds
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // allows import from "@/components/..."
    },
  },
}));
