// import {
//   defineConfig
// } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  // server: {
  //   proxy: {
  //     // Proxying requests with a specific prefix (e.g., /api)
  //     // Change '/api' to the path prefix you use for your API calls
  //     '/api': {
  //       // target: 'https://8000-codeinstitutesol-drfapi-kq1v2uy3bpa.ws-eu108.gitpod.io/',
  //       target: 'https://8000-rockroman-vitemoments-47hrl09xv4p.ws-eu108.gitpod.io/', // Target server
  //       changeOrigin: true, // Needed for virtual hosted sites
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the API prefix
  //     },
  //   },
  // },
});