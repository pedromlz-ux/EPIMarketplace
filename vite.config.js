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
        contato: resolve(__dirname, 'contato.html'),
        como_escolher_epi: resolve(__dirname, 'blog/como-escolher-epi.html'),
        nr10_nr35: resolve(__dirname, 'blog/nr10-nr35.html'),
        ca_certificado: resolve(__dirname, 'blog/ca-certificado.html'),
      }
    }
  }
});
