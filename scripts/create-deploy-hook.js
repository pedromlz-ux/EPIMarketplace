// Script para criar o Deploy Hook do epi-marketplace na Vercel
const { execSync } = require('child_process');

try {
  console.log('Obtendo token da Vercel local...');
  // O CLI da Vercel expõe o token atual através do comando pull/link ou podemos criar o hook via API da Vercel
  // Vamos usar a API da Vercel enviando uma requisição POST autenticada com o token do CLI do usuário
  // Primeiro, obtemos o token ativo do CLI usando vercel --token ou pegando das configurações globais do Vercel CLI no Mac

  // Vamos criar o Deploy Hook chamando a API de Hooks da Vercel
  // Token de autenticação da Vercel local
  const token = execSync('npx vercel auth token', { encoding: 'utf8' }).trim();

  if (!token) {
    throw new Error('Não foi possível recuperar o token de autenticação da Vercel local. Execute npx vercel login primeiro.');
  }

  const projectId = 'prj_RhaQT7LajIb12oZOwZWwD8g8mOXl';
  const teamId = 'team_hQ9Q6HiGa7K1YC6SKxxnqR52';

  console.log('Criando Deploy Hook na Vercel...');

  const response = execSync(`curl -X POST "https://api.vercel.com/v1/projects/${projectId}/deploy-hooks?teamId=${teamId}" \
    -H "Authorization: Bearer ${token}" \
    -H "Content-Type: application/json" \
    -d '{"name": "painel-admin-deploy", "ref": "main"}'`, { encoding: 'utf8' });

  const data = JSON.parse(response);
  console.log('Deploy Hook criado com sucesso!');
  console.log('URL do Hook:', data.url);

} catch (err) {
  console.error('Erro ao criar Deploy Hook:', err.message);
}
