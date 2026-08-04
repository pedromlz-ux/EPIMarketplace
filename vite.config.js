import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        produtos: resolve(__dirname, 'produtos.html'),
        blog: resolve(__dirname, 'blog.html'),
        artigo: resolve(__dirname, 'artigo.html'),
        contato: resolve(__dirname, 'contato.html'),
      }
    }
  }
});
