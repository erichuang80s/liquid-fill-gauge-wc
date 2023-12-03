import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './test',
  build: {
    outDir: path.resolve(__dirname, './dist'),
    minify: 'terser',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'liquidFillGauge',
      fileName(moudleFormat) {
        return moudleFormat === 'umd' ? `liquidFillGauge.${moudleFormat}.min.js` : 'liquidFillGauge.min.js'
      },
      formats: ['umd', 'iife'],
    },
  },
  resolve: {
    alias: {
      wavejs: path.resolve(__dirname, './src/index.ts'),
    },
  },
})
