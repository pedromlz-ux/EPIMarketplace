import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
    }),
    // Gzip para compatibilidade máxima
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Brotli — melhor compressão (Chrome, Firefox, Edge modernos)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  build: {
    // Minificação máxima de CSS
    cssMinify: 'esbuild',
    // Minificação agressiva de JS
    minify: 'esbuild',
    // Não gerar sourcemaps em produção (menos bytes)
    sourcemap: false,
    // Split de CSS por rota para não bloquear renderização
    cssCodeSplit: true,
    // Target moderno para output menor
    target: 'es2017',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        produtos: resolve(__dirname, 'produtos.html'),
        blog: resolve(__dirname, 'blog.html'),
        artigo: resolve(__dirname, 'artigo.html'),
        contato: resolve(__dirname, 'contato.html'),
        privacidade: resolve(__dirname, 'privacidade.html'),
        termos: resolve(__dirname, 'termos.html'),
      },
      output: {
        // Nomes com hash para cache busting automático
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Agrupar dependências compartilhadas em chunk único
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});

