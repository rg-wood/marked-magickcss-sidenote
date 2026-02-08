import { defineConfig } from 'vite'
import cacheDir from 'vite-plugin-cachedir'

export default defineConfig(configEnv => ({
  plugins: [cacheDir()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'markedFootnote',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['marked']
    },
    minify: configEnv.mode !== 'development',
    sourcemap: true
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
}))
