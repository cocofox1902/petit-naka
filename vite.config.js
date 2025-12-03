import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permet l'accès depuis le réseau local
    port: 5173,
  },
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  build: {
    // Minification avec esbuild (plus rapide que terser et inclus par défaut)
    minify: "esbuild",
    // Options de minification
    esbuild: {
      drop: ["console", "debugger"], // Supprimer console et debugger en production
      legalComments: "none", // Supprimer les commentaires légaux
      treeShaking: true, // Tree shaking agressif
    },
    // Optimiser le chunking
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Séparer Three.js et React Three Fiber dans des chunks séparés
          if (id.includes("node_modules")) {
            // Three.js et dépendances 3D - chunks séparés pour lazy loading
            if (id.includes("three")) {
              return "three";
            }
            if (id.includes("@react-three/fiber")) {
              return "react-three-fiber";
            }
            if (id.includes("@react-three/drei")) {
              return "react-three-drei";
            }
            // React Router - chunk séparé
            if (id.includes("react-router")) {
              return "react-router";
            }
            // React core - chunk séparé pour meilleur caching
            if (id.includes("/react/") || id.includes("react/jsx-runtime")) {
              return "react-core";
            }
            // React DOM - chunk séparé
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            // Autres dépendances React (hooks, etc.)
            if (id.includes("react")) {
              return "react-vendor";
            }
            // Autres dépendances
            return "vendor";
          }
        },
        // Optimiser les noms de fichiers pour le cache
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Réduire la limite de chunk size warning pour forcer l'optimisation
    chunkSizeWarningLimit: 600,
    // Source maps seulement en dev
    sourcemap: false,
  },
  // Optimiser les dépendances
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "use-sync-external-store/shim/with-selector",
    ],
  },
});
