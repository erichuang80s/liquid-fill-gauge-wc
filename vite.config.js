import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './plaground',
  build: {
    outDir: path.resolve(__dirname, './dist'),
    minify: 'terser',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, './src/liguidFillGauge.ts'),
      name: 'liquidFillGauge',
      fileName(moudleFormat) {
        return moudleFormat === 'es' ? `liquidFillGauge.${moudleFormat}.min.js` : 'liquidFillGauge.min.js'
      },
      formats: ['es', 'iife'],
    },
  },
  resolve: {
    alias: {
      wavejs: path.resolve(__dirname, './src/index.ts'),
    },
  },
})
