import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically generate input files from root and blog directory
const getInputs = () => {
  const inputs = {
    main: resolve(__dirname, 'index.html'),
    sobre: resolve(__dirname, 'sobre.html'),
    produtos: resolve(__dirname, 'produtos.html'),
    blog: resolve(__dirname, 'blog.html'),
    contato: resolve(__dirname, 'contato.html'),
  };

  // Check blog directory
  const blogDir = resolve(__dirname, 'blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    files.forEach((file) => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '').replace(/[^a-zA-Z0-9]/g, '_');
        inputs[name] = resolve(blogDir, file);
      }
    });
  }

  return inputs;
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: getInputs()
    }
  }
});
