#!/usr/bin/env node
/**
 * extract-images.js
 * Extrai imagens base64 dos posts do blog e as salva como arquivos externos.
 * Usa string parsing em vez de regex para evitar stack overflow em arquivos grandes.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const IMG_DIR = path.join(__dirname, '..', 'img', 'blog');

// Cria o diretório de imagens se não existir
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log('✅ Criado diretório:', IMG_DIR);
}

const posts = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html') && f !== 'post.html');
console.log(`📂 Encontrados ${posts.length} posts para processar.\n`);

let totalSaved = 0;

function extractBase64Images(html, slug) {
  const results = [];
  let searchFrom = 0;
  
  const MARKER = 'src="data:image/';
  
  while (true) {
    const startIdx = html.indexOf(MARKER, searchFrom);
    if (startIdx === -1) break;
    
    // Encontra o fechamento das aspas
    const dataStart = startIdx + 5; // skip 'src="'
    const endIdx = html.indexOf('"', dataStart + 1);
    if (endIdx === -1) break;
    
    const dataUrl = html.slice(dataStart, endIdx);
    results.push({ startIdx, endIdx: endIdx + 1, dataUrl });
    searchFrom = endIdx + 1;
  }
  
  return results;
}

for (const postFile of posts) {
  const postPath = path.join(BLOG_DIR, postFile);
  const slug = postFile.replace('.html', '');
  
  const originalSize = fs.statSync(postPath).size;
  let html = fs.readFileSync(postPath, 'utf8');
  
  console.log(`📄 Processando: ${postFile} (${(originalSize / 1024 / 1024).toFixed(1)} MB)`);
  
  const images = extractBase64Images(html, slug);
  
  if (images.length === 0) {
    console.log('  ⏭  Nenhuma imagem base64 encontrada, pulando.\n');
    continue;
  }
  
  console.log(`  🔍 Encontradas ${images.length} imagens base64`);
  
  // Processa de trás para frente para preservar os índices
  const sortedImages = images.slice().reverse();
  let imgCount = images.length;
  
  for (const img of sortedImages) {
    const { startIdx, endIdx, dataUrl } = img;
    
    // Detecta mime type
    const mimeMatch = dataUrl.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/);
    if (!mimeMatch) {
      console.log('  ⚠️  Mime type não reconhecido, pulando.');
      imgCount--;
      continue;
    }
    
    const mimeType = mimeMatch[1];
    const ext = mimeType === 'jpeg' ? 'jpg' : mimeType;
    const base64Data = dataUrl.slice(mimeMatch[0].length);
    
    let imgBuffer;
    try {
      imgBuffer = Buffer.from(base64Data, 'base64');
    } catch (e) {
      console.log(`  ⚠️  Erro ao decodificar base64: ${e.message}`);
      imgCount--;
      continue;
    }
    
    const imgFileName = `${slug}-img${imgCount}.${ext}`;
    const imgFilePath = path.join(IMG_DIR, imgFileName);
    const imgRelPath = `../img/blog/${imgFileName}`;
    
    fs.writeFileSync(imgFilePath, imgBuffer);
    const savedSize = fs.statSync(imgFilePath).size;
    console.log(`  🖼  ${imgFileName} → ${(savedSize / 1024).toFixed(0)} KB`);
    
    // Substitui o src no HTML
    const newSrc = `src="${imgRelPath}" loading="lazy" decoding="async"`;
    html = html.slice(0, startIdx) + newSrc + html.slice(endIdx);
    
    totalSaved++;
    imgCount--;
  }
  
  // Salva o HTML atualizado
  fs.writeFileSync(postPath, html, 'utf8');
  const newSize = fs.statSync(postPath).size;
  
  console.log(`\n  ✅ ${postFile}`);
  console.log(`     ${(originalSize / 1024 / 1024).toFixed(1)} MB → ${(newSize / 1024).toFixed(0)} KB`);
  console.log(`     Redução: ${((1 - newSize / originalSize) * 100).toFixed(0)}%\n`);
}

console.log(`\n🎉 Concluído! ${totalSaved} imagens extraídas para img/blog/`);
