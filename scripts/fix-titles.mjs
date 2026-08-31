const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const TITLE_FIXES = [
  { slug: 'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente', title: 'Como Usar EPI Corretamente no Trabalho | Guia NR-6', meta_description: 'Como usar EPI corretamente no trabalho? Guia NR-6 com passo a passo de inspeção, higienização e descarte de EPIs certificados com CA válido.' },
  { slug: 'validade-de-capacete-e-oculos-quando-descartar-seus-epis-alem-da-etiqueta', title: 'Validade do Capacete e Óculos de Segurança | EPI', meta_description: 'Validade do capacete e óculos de segurança: saiba quando descartar seus EPIs além da etiqueta e os sinais de desgaste segundo NR-6 e NR-10.' },
  { slug: 'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca', title: 'CA de EPI: Como Verificar a Validade | Guia MTE', meta_description: 'CA de EPI: aprenda a verificar a validade do Certificado de Aprovação no site do MTE e saiba por que o CA vencido é infração grave pela NR-6.' },
  { slug: 'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios', title: 'NR-10 e NR-35: Guia das Normas e EPIs Exigidos', meta_description: 'NR-10 e NR-35: guia completo das normas com os EPIs obrigatórios para eletricistas e trabalhadores em altura, penalidades e CA válido.' },
  { slug: 'epi-para-eletricista-equipamentos-obrigatorios-nr-10', title: 'EPI para Eletricista: Obrigatórios pela NR-10', meta_description: 'EPI para eletricista: lista completa dos equipamentos obrigatórios pela NR-10 com CA válido — luvas dielétricas, capacete classe B e vestimentas antichama.' },
  { slug: 'como-escolher-epi-guia-completo-para-seguranca-e-conformidade', title: 'Como Escolher EPI: Guia de Segurança e Conformidade', meta_description: 'Como escolher EPI adequado? Guia de segurança e conformidade: avalie o risco, verifique o CA válido e siga NR-6, NR-10 e NR-35.' }
];

async function patch(slug, data) {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}`;
  const res = await fetch(url, { method: 'PATCH', headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' }, body: JSON.stringify(data) });
  if (res.ok) { console.log(`OK (${data.title.length} chars): ${data.title}`); }
  else { const err = await res.text(); console.error(`ERRO (${slug}): ${res.status} — ${err}`); }
}

(async () => {
  console.log('Atualizando titulos no Supabase...');
  for (const { slug, ...data } of TITLE_FIXES) await patch(slug, data);
  console.log('Concluido!');
})();
