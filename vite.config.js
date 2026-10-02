import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set BASE_PATH when deploying under a subpath (e.g. GitHub Pages project
// sites serve from /<repo>/). Leave it unset for domain-root deploys.
const base = (process.env.BASE_PATH || '/').replace(/\/*$/, '/');

export default defineConfig({
  base,
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    outDir: 'build',
    sourcemap: false,
  },
});
