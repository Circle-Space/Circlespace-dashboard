import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import visualizer from 'rollup-plugin-visualizer';

import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    ViteEjsPlugin(),
    nodePolyfills({
      protocolImports: true,
    }),
    splitVendorChunkPlugin(),
    visualizer({
      open: true, // Automatically open the visualization after build
    }),
  ],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        light: resolve(__dirname, 'src/assets/scss/light.scss'),
        dark: resolve(__dirname, 'src/assets/scss/dark.scss'),
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        manualChunks: {
          apexcharts: ['apexcharts'],
          chartjs: ['chart.js', 'react-chartjs-2'],
          googlemaps: ['google-map-react'],
          vectormaps: ['jsvectormap', 'src/vendor/us_aea_en.ts', 'src/vendor/world.ts'],
          fullcalendar: ['@fullcalendar/bootstrap', '@fullcalendar/daygrid', '@fullcalendar/react', '@fullcalendar/timegrid'],
        },
      },
    },
  },
});
