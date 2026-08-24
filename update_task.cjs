const fs = require('fs');
const file = '/Users/pm/.gemini/antigravity-ide/brain/097db739-4e68-4b63-97f1-d443c8661f4d/task.md';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/- \[ \] 1. Ajuste das Meta Descrições/g, '- [x] 1. Ajuste das Meta Descrições');
content = content.replace(/- \[ \] Revisar e ajustar `<meta name="description">` em/g, '- [x] Revisar e ajustar `<meta name="description">` em');
fs.writeFileSync(file, content);
console.log('Task list updated for item 1');
