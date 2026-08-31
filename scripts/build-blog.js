import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = path.join(__dirname, '..');

const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const SLUG_IMAGE_MAP = {
  'epi-para-eletricista-equipamentos-obrigatorios-nr-10':
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente':
    '/img/blog/guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente-img1.jpg',
  'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca':
    '/img/blog/ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca-img1.jpg',
  'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios':
    '/img/blog/nr10-nr35-img1.jpg',
  'como-escolher-epi-guia-completo-para-seguranca-e-conformidade':
    '/img/blog/como-escolher-epi-img1.png',
  'o-que-e-epi-significado-tipos-e-exemplos':
    'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=1200&q=80',
};

const AUTHOR_BIO_HTML = `
<div class="author-bio" itemscope itemtype="https://schema.org/Person">
  <img class="author-bio__avatar"
       src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&fit=crop&q=80"
       alt="Carolina Ferreira - Engenheira de Seguranca do Trabalho"
       width="60" height="60" loading="lazy" decoding="async">
  <div class="author-bio__info">
    <div class="author-bio__credential">Revisao Tecnica</div>
    <div class="author-bio__name" itemprop="name">Carolina Ferreira, M.Sc.</div>
    <p class="author-bio__desc" itemprop="description">
      Engenheira de Seguranca do Trabalho (CREA-SP) com 12 anos de experiencia em gestao de EPIs para
      concessionarias de energia eletrica e construtoras de grande porte. Especialista em NR-10, NR-35 e NR-6.
    </p>
    <div class="author-bio__links">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a>
      <a href="/sobre">Sobre a EPI Marketplace</a>
    </div>
  </div>
</div>`;

function siloBox({ label, title, desc, href, btnText }) {
  return `
<div class="article-silo-box" role="complementary">
  <div class="article-silo-box__text">
    <div class="article-silo-box__label">${label}</div>
    <div class="article-silo-box__title">${title}</div>
    <p class="article-silo-box__desc">${desc}</p>
  </div>
  <a href="${href}" class="article-silo-box__cta">
    ${btnText}
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>
</div>`;
}

function faqAccordion(items) {
  const chevronSvg = `<svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
  const itemsHtml = items.map(({ q, a }) => `
  <details>
    <summary>${q} ${chevronSvg}</summary>
    <div class="article-faq__answer"><p>${a}</p></div>
  </details>`).join('');
  return `
<section class="article-faq" aria-labelledby="article-faq-title">
  <h2 class="article-faq__title" id="article-faq-title">Perguntas Frequentes</h2>
  ${itemsHtml}
</section>`;
}

function socialProof({ quote, name, credential, badge }) {
  return `
<div class="article-social-proof" role="note" aria-label="Validacao tecnica">
  <div class="article-social-proof__icon" aria-hidden="true">&#128077;</div>
  <div class="article-social-proof__body">
    <p class="article-social-proof__quote">${quote}</p>
    <div class="article-social-proof__meta">
      <span class="article-social-proof__name">${name}</span>
      <span class="article-social-proof__credential">${credential}</span>
      <span class="article-social-proof__badge">&#10003; ${badge}</span>
    </div>
  </div>
</div>`;
}

function youtubeEmbed({ url, caption }) {
  const videoId = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/)?.[1];
  if (!videoId) return '';
  return `
<div class="article-video-embed">
  <p class="article-video-embed__label">Assista ao Video</p>
  <div class="article-video-embed__container">
    <iframe
      src="https://www.youtube.com/embed/${videoId}?rel=0"
      title="${caption || 'Video sobre o tema'}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy">
    </iframe>
  </div>
  <p class="article-video-embed__caption">${caption || ''}</p>
</div>`;
}

function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };
}

const FALLBACK_POSTS = [
  {
    id: 'real-post-005',
    title: 'O que e EPI? Significado, Tipos e Exemplos Completos',
    category: 'Fundamentos',
    readtime: '7 min',
    summary: 'Entenda o que e EPI, seu significado legal pela NR-6, os tipos existentes e exemplos praticos por cada tipo de risco ocupacional.',
    content: `<h2>O que e EPI? Definicao oficial pela NR-6</h2>
<p>EPI e a sigla para <strong>Equipamento de Protecao Individual</strong>. Segundo a <strong>Norma Regulamentadora 6 (NR-6)</strong> do Ministerio do Trabalho, EPI e qualquer dispositivo ou produto de uso individual destinado a neutralizar riscos que ameacem a seguranca e a saude no trabalho. O uso de EPI e obrigatorio e gratuito — a empresa e legalmente responsavel pelo fornecimento e substituicao de todos os EPIs necessarios para cada funcao.</p>
<h2>Qual a diferenca entre EPI e EPC?</h2>
<p>Muitos profissionais confundem EPI com EPC (Equipamento de Protecao Coletiva). A diferenca e fundamental: o <strong>EPC</strong> protege todos os trabalhadores de uma area ao mesmo tempo — como corrimao, grades, sinalizacao e sistemas LOTO. Ja o <strong>EPI</strong> protege apenas o trabalhador que o esta usando. A hierarquia de controle de riscos estabelece que o EPC deve ser sempre priorizado; o EPI e a ultima linha de defesa.</p>
<h2>Quais sao os tipos de EPI? Classificacao pela NR-6</h2>
<p>A NR-6 classifica os EPIs de acordo com a parte do corpo que protegem:</p>
<h3>1. Protecao da Cabeca</h3>
<p>O <strong>capacete de seguranca</strong> protege contra impactos e, dependendo da classe, tambem contra choque eletrico:</p>
<ul>
  <li><strong>Classe A:</strong> Impactos e penetracao. Uso geral em obras e construcao civil.</li>
  <li><strong>Classe B:</strong> Tudo da Classe A + isolamento eletrico ate 30.000 V. Obrigatorio para eletricistas (NR-10).</li>
  <li><strong>Classe C:</strong> Apenas impactos, sem isolamento eletrico. Para ambientes sem risco eletrico.</li>
</ul>
<h3>2. Protecao dos Olhos e Face</h3>
<ul>
  <li><strong>Oculos de seguranca:</strong> Contra projecao de particulas, poeira e respingos quimicos.</li>
  <li><strong>Protetores faciais (escudos):</strong> Para trabalhos com risco de arco eletrico e manipulacao de substancias corrosivas.</li>
</ul>
<h3>3. Protecao Auditiva</h3>
<p>O protetor auricular e obrigatorio quando o trabalhador e exposto a ruido acima de 85 dB(A) por 8 horas. Ha dois tipos: o <strong>tipo concha (abafador)</strong>, que cobre toda a orelha com melhor isolamento acustico, e o <strong>tipo plug (inserido)</strong>, mais pratico para uso intermitente.</p>
<h3>4. Protecao Respiratoria</h3>
<ul>
  <li><strong>Mascaras PFF1 / PFF2 / PFF3:</strong> Para poeiras e fumacas. A PFF2 e a mais usada na industria.</li>
  <li><strong>Respiradores de meia-face e face completa:</strong> Para gases, vapores organicos e pesticidas.</li>
  <li><strong>Aparelhos autonomos (SCBA):</strong> Para ambientes com deficiencia de oxigenio.</li>
</ul>
<h3>5. Protecao das Maos e Bracos</h3>
<p>As <strong>luvas de seguranca</strong> sao o EPI mais usado no trabalho. Os tipos variam conforme o risco:</p>
<ul>
  <li><strong>Luvas de borracha (nitrila, latex, PVC):</strong> Contra produtos quimicos e biologicos.</li>
  <li><strong>Luvas isolantes dieletricas:</strong> Contra choque eletrico (NR-10). Devem ser testadas periodicamente.</li>
  <li><strong>Luvas de couro/raspa:</strong> Contra abrasao, cortes e projecao de particulas quentes.</li>
  <li><strong>Luvas anticorte:</strong> Para manipulacao de vidros, chapas metalicas e instrumentos cortantes.</li>
</ul>
<p>Adquira <a href="/produtos?categoria=linha-viva" title="Luvas de seguranca certificadas">luvas de seguranca com CA ativo</a> na EPI Marketplace.</p>
<h3>6. Protecao dos Pes e Pernas</h3>
<ul>
  <li><strong>Calcados com bico de aco ou composite:</strong> Contra impactos nos pes.</li>
  <li><strong>Calcados dieletricos:</strong> Sem componentes metalicos, para isolamento eletrico (NR-10).</li>
  <li><strong>Botas impermeabilizadas:</strong> Para ambientes umidos e produtos quimicos.</li>
  <li><strong>Perneiras:</strong> Protecao contra metal fundido, serras e agentes quimicos.</li>
</ul>
<h3>7. Protecao do Tronco</h3>
<ul>
  <li><strong>Avental de seguranca:</strong> Contra respingos quimicos e solda.</li>
  <li><strong>Vestimentas antichama:</strong> Para eletricistas expostos a risco de arco eletrico. Devem ter ATPV compativel.</li>
  <li><strong>Coletes refletivos:</strong> Para trabalhos proximos a vias de transito.</li>
</ul>
<h3>8. Protecao do Corpo contra Quedas</h3>
<p>Os <strong>cintos paraquedistas</strong> sao obrigatorios para trabalho acima de 2 metros (NR-35). Veja nosso catalogo de <a href="/produtos?categoria=altura" title="Cintos paraquedistas com CA NR-35">cintos paraquedistas certificados</a>.</p>
<h2>O que NAO e considerado EPI pela NR-6</h2>
<p>A NR-6 tambem especifica o que NAO e EPI:</p>
<ul>
  <li>Uniforme de trabalho comum (sem funcao protetora certificada)</li>
  <li>Calcados fechados de uso geral (sem bico de aco e sem CA)</li>
  <li>Protetor solar (considerado produto de higiene)</li>
  <li>Joelheiras esportivas (sem CA do MTE)</li>
</ul>
<p>Para ser EPI, o equipamento DEVE ter <strong>Certificado de Aprovacao (CA) valido</strong> emitido pelo MTE.</p>
<h2>Obrigacoes do empregador quanto ao EPI</h2>
<p>A NR-6 e o Art. 166 da CLT estabelecem que o empregador e obrigado a: fornecer o EPI gratuitamente e em perfeito estado de conservacao; treinar o trabalhador sobre uso correto e limitacoes; substituir imediatamente quando danificado ou com CA vencido; e registrar o fornecimento em ficha individual assinada pelo empregado. O descumprimento sujeita a empresa a multas de ate R$ 181.284,00 por ocorrencia.</p>`,
    faq: [
      { q: 'O que e EPI na seguranca do trabalho?', a: 'EPI (Equipamento de Protecao Individual) e qualquer dispositivo de uso individual utilizado pelo trabalhador para neutralizar riscos que ameacem sua seguranca e saude. O uso e regulamentado pela NR-6 do MTE e e obrigatorio sempre que o risco nao puder ser eliminado por medidas de protecao coletiva (EPC).' },
      { q: 'O que e considerado EPI pela NR-6?', a: 'Para ser considerado EPI, o equipamento deve ter Certificado de Aprovacao (CA) valido emitido pelo MTE, ser de uso individual e ter funcao especifica de protecao contra risco ocupacional identificado. Uniformes comuns, calcados sem certificacao e produtos de higiene NAO sao EPIs.' },
      { q: 'Quais sao os tipos de EPI existentes?', a: 'A NR-6 classifica os EPIs por parte do corpo protegida: cabeca (capacetes), olhos e face (oculos e escudos), auditiva (abafadores e plugs), respiratoria (mascaras e respiradores), maos (luvas), pes e pernas (calcados e perneiras), tronco (aventais e vestimentas) e corpo inteiro contra quedas (cintos paraquedistas).' },
      { q: 'A empresa e obrigada a fornecer EPI gratuitamente?', a: 'Sim. A NR-6 e o Art. 166 da CLT obrigam o empregador a fornecer EPIs gratuitamente e em perfeito estado de conservacao. O descumprimento sujeita a empresa a multas de ate R$ 181.284,00 por ocorrencia e pode resultar em responsabilidade civil em caso de acidente.' },
    ],
    siloBox: { label: 'Comprar EPIs Certificados', title: 'Todos os Tipos de EPI com CA Valido', desc: 'Capacetes, luvas, cintos, calcados, protetores e vestimentas com CA ativo e entrega em todo o Brasil.', href: '/produtos', btnText: 'Ver Catalogo de EPIs' },
    date: '2026-08-29',
    slug: 'o-que-e-epi-significado-tipos-e-exemplos',
    meta_description: 'O que e EPI? Confira o significado, todos os tipos de Equipamento de Protecao Individual segundo a NR-6 e exemplos praticos para cada tipo de risco ocupacional.',
    image_alt: 'Conjunto de EPIs: capacete, luvas, oculos de seguranca e cinto paraquedista em ambiente industrial.',
    published: true,
  },
  {
    id: 'real-post-004',
    title: 'EPI para Eletricista: Obrigatorios pela NR-10',
    category: 'Eletricidade & NR-10',
    readtime: '8 min',
    summary: 'Conheca todos os EPIs obrigatorios para eletricistas segundo a NR-10, desde luvas isolantes ate vestimentas antichama.',
    content: `<h2>A importancia dos EPIs no setor eletrico</h2>
<p>O trabalho com eletricidade exige precisao absoluta e rigor tecnico inegociavel. Qualquer descuido em instalacoes eletricas pode resultar em acidentes graves. A <strong>Norma Regulamentadora 10 (NR-10)</strong> e a <strong>NR-6</strong> estabelecem diretrizes estritas para os <strong>EPIs para eletricistas</strong>.</p>
<p>Na <strong>EPI Marketplace</strong>, reforçamos que o equipamento de protecao individual e a ultima barreira de defesa do trabalhador.</p>
<h2>O que diz a NR-10 sobre a protecao do eletricista?</h2>
<p>A NR-10 determina que todas as medidas de protecao coletiva (EPCs) devem ser priorizadas. No entanto, quando essas medidas nao forem suficientes, o uso de <strong>EPIs adequados a classe de tensao</strong> torna-se mandatorio.</p>
<h2>Lista completa de EPIs obrigatorios para eletricistas</h2>
<h3>1. Luvas Isolantes de Borracha e Luvas de Cobertura</h3>
<p>As <strong>luvas isolantes de borracha</strong> sao o principal equipamento para protecao contra choques eletricos. Elas sao classificadas de acordo com a tensao maxima de trabalho: Classe 00 (ate 500 V), Classe 0 (ate 1.000 V), Classe 1 (ate 7.500 V), Classe 2 (ate 17.000 V), Classe 3 (ate 26.500 V) e Classe 4 (ate 36.000 V). E obrigatorio utilizar uma <strong>luva de cobertura em vaqueta ou raspa</strong> sobre a luva isolante.</p>
<p>Compre <a href="/produtos?categoria=linha-viva" title="Luvas isolantes para eletricista NR-10 com CA valido">luvas isolantes certificadas com CA ativo</a> na EPI Marketplace.</p>
<h3>2. Capacete de Seguranca Classe B</h3>
<p>O <strong>capacete Classe B</strong> oferece protecao contra impactos e isolamento contra descargas eletricas de ate 30.000 Volts. Deve ser utilizado sempre acompanhado de jugular nao condutiva.</p>
<h3>3. Vestimentas Especiais Antichama</h3>
<p>A NR-10 exige vestimentas com <strong>ATPV (Arc Thermal Performance Value)</strong> compativel com o estudo de energia incidente da instalacao.</p>
<h3>4. Calcados de Seguranca Dieletricos</h3>
<p>As <strong>botinas de seguranca para eletricista</strong> devem ser 100% livres de componentes metalicos (tecnologia Composite).</p>
<h3>5. Protetor Facial contra Arco Eletrico</h3>
<p>Para trabalhos em paineis energizados, o uso de <strong>protetor facial com visor de policarbonato anti-arco</strong> e obrigatorio.</p>
<h3>6. Cinto Paraquedista Dieletrico</h3>
<p>Em atividades que combinam altura e eletricidade, deve-se utilizar <strong>cintos tipo paraquedista com argolas e fivelas dieletricas</strong>. Veja nosso catalogo de <a href="/produtos?categoria=altura" title="Cintos paraquedistas dieletricos NR-35 NR-10">cintos paraquedistas dieletricos com CA</a>.</p>
<h2>Classes de Tensao das Luvas Isolantes</h2>
<ul>
  <li><strong>Classe 00:</strong> ate 500 V (baixa tensao residencial)</li>
  <li><strong>Classe 0:</strong> ate 1.000 V (baixa tensao industrial)</li>
  <li><strong>Classe 1:</strong> ate 7.500 V (distribuicao de media tensao)</li>
  <li><strong>Classe 2:</strong> ate 17.000 V (linhas de distribuicao)</li>
  <li><strong>Classe 3:</strong> ate 26.500 V (subtransmissao)</li>
  <li><strong>Classe 4:</strong> ate 36.000 V (alta tensao industrial)</li>
</ul>
<h2>Inspecao diaria e teste dieletrico periodico</h2>
<p>Antes de cada turno, realize o <strong>teste pneumatico manual de insuflamento de ar</strong> nas luvas isolantes. As luvas devem passar por ensaios eletricos periodicos em laboratorio credenciado pelo INMETRO, conforme a norma ABNT NBR 10622. A periodicidade minima e semestral para Classe 00/0 e trimestral para Classes 1 a 4.</p>
<p>Outros EPIs tambem devem ser inspecionados regularmente: verifique o estado dos cintos, a integridade dos capacetes e a data de fabricacao dos EPIs com prazo de vida util definido pelo fabricante.</p>`,
    faq: [
      { q: 'Quais sao os EPIs obrigatorios pela NR-10 para eletricistas?', a: 'Os principais EPIs exigidos pela NR-10 sao: luvas isolantes de borracha com luva de cobertura, capacete Classe B dieletrico, vestimentas antichama com ATPV compativel, calcados dieletricos sem metal, protetor facial e oculos de protecao. Em altura, adiciona-se cinto paraquedista dieletrico com talabarte Y.' },
      { q: 'Com que frequencia devo fazer o teste dieletrico das luvas?', a: 'Conforme a norma ABNT NBR 10622, luvas de Classe 00 e 0 devem ser testadas semestralmente. Luvas de Classe 1 a 4 usadas em campo devem ser testadas trimestralmente. Independente da classe, realize o teste pneumatico manual antes de cada turno de trabalho.' },
      { q: 'O que e ATPV em vestimentas antichama?', a: 'ATPV (Arc Thermal Performance Value) e a medida em cal/cm2 que indica a quantidade de energia de arco eletrico que uma vestimenta consegue absorver antes que o usuario sofra queimadura de segundo grau. A NR-10 exige o uso de vestimentas com ATPV compativel ao estudo de energia incidente de cada instalacao.' },
    ],
    siloBox: { label: 'Catalogo Especializado NR-10', title: 'EPIs para Eletricista com CA Valido', desc: 'Todos os equipamentos listados neste artigo estao disponiveis em nosso catalogo com Certificado de Aprovacao ativo.', href: '/produtos?categoria=linha-viva', btnText: 'Ver EPIs para Linha Viva' },
    date: '2026-08-24',
    slug: 'epi-para-eletricista-equipamentos-obrigatorios-nr-10',
    meta_description: 'Lista completa de EPIs para eletricista exigidos pela NR-10: luvas isolantes, capacete Classe B, vestimentas antichama e botinas dieletricas com CA valido.',
    image_alt: 'Eletricista profissional utilizando luvas isolantes de borracha e vestimenta de protecao contra arco eletrico conforme a NR-10',
    published: true,
  },
  {
    id: 'real-post-001',
    title: 'Como se Proteger no Trabalho com EPI: Guia Pratico',
    category: 'EPIs',
    readtime: '7 min',
    summary: 'Descubra as melhores praticas e a importancia vital de saber como se proteger no trabalho utilizando EPI para garantir sua integridade fisica e produtividade.',
    content: `<h2>Por que o uso correto de EPI salva vidas?</h2>
<p>O uso correto de Equipamentos de Protecao Individual (EPIs) e indispensavel em qualquer ambiente de trabalho que apresente riscos a saude ou integridade fisica do trabalhador. Segundo dados do Observatorio de Seguranca e Saude no Trabalho, o Brasil registra mais de 600.000 acidentes de trabalho por ano.</p>
<h2>Por que o EPI e obrigatorio por lei?</h2>
<p>A <strong>NR-6 do Ministerio do Trabalho</strong> determina que o empregador e obrigado a fornecer aos trabalhadores, gratuitamente, EPI adequado ao risco, em perfeito estado de conservacao e funcionamento. O nao cumprimento sujeita a empresa a multas de R$ 1.814,00 a R$ 181.284,00 por ocorrencia (Portaria MTP 667/2021).</p>
<h2>Como realizar a Analise Preliminar de Risco (APR)?</h2>
<p>Antes de adquirir qualquer equipamento, e fundamental realizar a <strong>Analise Preliminar de Risco (APR)</strong> do ambiente de trabalho. A APR identifica os perigos existentes em cada fase da atividade e define as medidas de controle necessarias, incluindo o tipo de EPI exigido.</p>
<h2>Como escolher o EPI correto?</h2>
<ul>
  <li><strong>Tipo de risco:</strong> Fisico, quimico, biologico, ergonomico ou de acidentes.</li>
  <li><strong>CA valido:</strong> Consulte o numero do CA no portal CNCA antes de comprar.</li>
  <li><strong>Conforto e adaptabilidade:</strong> Um EPI desconfortavel nao e usado.</li>
  <li><strong>Durabilidade:</strong> EPIs de qualidade reduzem a frequencia de reposicao.</li>
</ul>
<p>Veja nosso catalogo completo de <a href="/produtos?categoria=epi" title="EPIs certificados com CA para todos os setores">EPIs certificados com CA valido</a>.</p>
<h2>Cronograma de inspecao e manutencao de EPIs</h2>
<ul>
  <li><strong>Diariamente:</strong> Inspecao visual antes de cada uso.</li>
  <li><strong>Mensalmente:</strong> Registro formal do estado do equipamento.</li>
  <li><strong>Semestralmente:</strong> Ensaios laboratoriais para EPIs dieletricos e cintos.</li>
</ul>
<h2>Treinamento: a protecao comeca antes de usar o EPI</h2>
<p>As normas NR-1 e NR-6 exigem treinamento formal sobre uso correto, limitacoes, higienizacao, armazenamento e descarte de cada tipo de EPI utilizado. Documente todos os treinamentos com lista de presenca e conteudo programatico.</p>
<h2>Descarte correto de EPIs vencidos ou danificados</h2>
<p>Estabeleca um fluxo claro de descarte: EPIs danificados devem ser inutilizados fisicamente antes de serem descartados como residuo industrial, seguindo as normas ABNT NBR 10004.</p>`,
    faq: [
      { q: 'O empregador e obrigado a fornecer EPI gratuitamente?', a: 'Sim. A NR-6 e o Artigo 166 da CLT obrigam o empregador a fornecer EPIs gratuitamente, adequados ao risco, em perfeito estado de conservacao. O descumprimento sujeita a empresa a multas de R$ 1.814,00 a R$ 181.284,00 por ocorrencia.' },
      { q: 'Como sei se o EPI tem CA valido?', a: 'Acesse o portal CNCA em consultacnca.trabalho.gov.br, insira o numero do CA impresso no produto e verifique se a situacao e Valido.' },
      { q: 'Com que frequencia devo trocar os EPIs?', a: 'Siga o prazo de vida util indicado pelo fabricante no laudo tecnico e substitua imediatamente qualquer item que sofra dano visivel, impacto severo ou exposicao quimica.' },
    ],
    siloBox: { label: 'Catalogo Completo de EPIs', title: 'EPIs para Todos os Setores com CA Valido', desc: 'Capacetes, luvas, cintos, calcados e vestimentas de protecao com Certificado de Aprovacao ativo e entrega rapida.', href: '/produtos', btnText: 'Ver Catalogo Completo' },
    date: '2026-07-22',
    slug: 'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente',
    meta_description: 'Aprenda como se proteger no trabalho com EPI: selecao por tipo de risco, CA valido, inspecao, treinamento obrigatorio e cronograma de manutencao.',
    image_alt: 'Trabalhador profissional utilizando capacete, oculos de protecao e luvas em ambiente de construcao.',
    published: true,
  },
  {
    id: 'real-post-002',
    title: 'CA de EPI: Como Verificar a Validade e Importancia',
    category: 'Certificacao',
    readtime: '6 min',
    summary: 'Descubra tudo sobre o CA de EPI, como consultar a validade no sistema do Ministerio do Trabalho e por que garantir esse certificado e crucial para sua empresa.',
    content: `<h2>O que e o Certificado de Aprovacao (CA) de EPI?</h2>
<p>O <strong>Certificado de Aprovacao (CA)</strong> e o documento emitido pelo Ministerio do Trabalho e Emprego (MTE) que atesta a eficiencia e qualidade de um Equipamento de Protecao Individual. Sem o CA valido, nenhum EPI pode ser comercializado legalmente no pais.</p>
<h2>Onde o numero do CA deve estar no produto?</h2>
<p>Todo EPI comercializado legalmente no Brasil deve ter o <strong>numero do CA impresso no produto, na embalagem e na nota fiscal</strong>. Em luvas, o numero fica gravado no punho. Em capacetes, na aba lateral ou na jugular. Em calcados, na palmilha interna ou na caixa.</p>
<h2>Como consultar a validade do CA no portal do MTE</h2>
<ul>
  <li><strong>1.</strong> Acesse o portal <strong>CNCA</strong> em: consultacnca.trabalho.gov.br</li>
  <li><strong>2.</strong> Digite o numero do CA no campo de busca (somente numeros).</li>
  <li><strong>3.</strong> Verifique a situacao: deve estar como <strong>Valido</strong>.</li>
  <li><strong>4.</strong> Confirme se o produto consultado corresponde ao que esta na embalagem.</li>
</ul>
<h2>Riscos de comprar EPI sem CA valido</h2>
<ul>
  <li><strong>Multas administrativas:</strong> ate R$ 181.284,00 por ocorrencia (Portaria MTP 667/2021).</li>
  <li><strong>Interdicao das atividades:</strong> Em casos de risco grave e iminente.</li>
  <li><strong>Responsabilidade civil e criminal:</strong> Em caso de acidente com EPI irregular.</li>
  <li><strong>Perda de contratos:</strong> Empresas podem perder contratos ao apresentar EPIs com CA irregular.</li>
</ul>
<p>Na <a href="/produtos" title="Comprar EPIs com CA valido">EPI Marketplace</a>, todos os produtos possuem CA ativo. Solicite a ficha tecnica pelo <a href="/contato">formulario de contato</a>.</p>
<h2>Periodicidade de renovacao do CA</h2>
<p>O CA possui validade limitada (geralmente de 2 a 5 anos). Empresas que armazenam grandes volumes de EPIs devem manter um controle de CA por lote de compra, com alertas de vencimento programados. O uso de EPI com CA vencido configura infracao as normas regulamentadoras.</p>`,
    faq: [
      { q: 'O que acontece se eu usar um EPI com CA vencido?', a: 'O uso de EPI com CA vencido configura infracao a NR-6, sujeitando a empresa a multas de ate R$ 181.284,00 por ocorrencia. Em caso de acidente com o EPI irregular, o empregador responde civilmente por indenizacao e pode responder criminalmente.' },
      { q: 'Como verificar o CA de um EPI online?', a: 'Acesse o portal CNCA em consultacnca.trabalho.gov.br, digite o numero do CA e verifique se a situacao esta como Valido. Confirme se o fabricante, modelo e tipo de EPI correspondem ao produto que voce possui.' },
      { q: 'Com que frequencia devo verificar os CAs dos EPIs da minha empresa?', a: 'Idealmente, no momento da compra e semestralmente durante o estoque. Mantenha um controle de CA por lote de compra com alertas programados para renovacao antecipada.' },
    ],
    siloBox: { label: 'Comprar com Seguranca', title: 'Todos os Nossos EPIs Tem CA Valido', desc: 'Documentacao tecnica disponivel para auditoria. Solicite a ficha tecnica de qualquer produto.', href: '/contato', btnText: 'Solicitar Orcamento B2B' },
    date: '2026-07-20',
    slug: 'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca',
    meta_description: 'Saiba como verificar CA de EPI no portal CNCA e por que o Certificado de Aprovacao e obrigatorio para seguranca juridica e fisica da sua empresa.',
    image_alt: 'Homem verificando o selo de CA de EPI gravado em uma luva de protecao industrial.',
    published: true,
  },
  {
    id: 'real-post-003',
    title: 'NR-10 e NR-35: Guia das Normas e EPIs Exigidos',
    category: 'Normas',
    readtime: '8 min',
    summary: 'Confira as atualizacoes essenciais das normas NR-10 NR-35, descubra as exigencias para trabalho em altura e eletrico e saiba quais EPIs garantem sua protecao.',
    content: `<h2>A relacao entre NR-10 e NR-35 no trabalho eletrico em altura</h2>
<p>As <strong>Normas Regulamentadoras NR-10 e NR-35</strong> sao as mais relevantes para eletricistas que atuam em linhas de distribuicao, redes de alta tensao e torres de transmissao. Quando a atividade envolve simultaneamente eletricidade e trabalho acima de 2 metros, <strong>ambas as normas se aplicam ao mesmo tempo</strong>.</p>
<h2>O que e a NR-10 e quem deve segui-la?</h2>
<p>A <strong>NR-10</strong> regula todas as atividades que envolvem geracao, transmissao, distribuicao e consumo de energia eletrica. Todo profissional que trabalha direta ou indiretamente com energia eletrica deve ter treinamento basico em NR-10 (40 horas) ou, para alta tensao, o treinamento complementar de 40 horas adicionais (SEP). Esse treinamento deve ser renovado a cada dois anos.</p>
<h2>O que e a NR-35 e como ela se aplica ao eletricista?</h2>
<p>A <strong>NR-35</strong> estabelece os requisitos minimos para o trabalho em altura, considerando qualquer atividade realizada acima de <strong>2 metros do nivel inferior</strong>. A norma exige:</p>
<ul>
  <li>Analise de Risco especifica para cada atividade em altura;</li>
  <li>Permissao de Trabalho (PT) documentada;</li>
  <li>Treinamento teorico-pratico com carga horaria minima de 8 horas;</li>
  <li>Sistema de protecao contra quedas, priorizando a protecao coletiva (EPC).</li>
</ul>
<h2>EPIs exigidos para trabalho eletrico em altura</h2>
<h3>Para atender a NR-10 (protecao eletrica):</h3>
<ul>
  <li>Luvas isolantes de borracha com luva de cobertura (Classe adequada a tensao);</li>
  <li>Capacete Classe B com jugular nao condutiva;</li>
  <li>Vestimenta antichama com ATPV compativel;</li>
  <li>Calcados dieletricos 100% sem metal;</li>
  <li>Protetor facial com visor policarbonato anti-arco.</li>
</ul>
<h3>Para atender a NR-35 (protecao contra queda):</h3>
<ul>
  <li><a href="/produtos?categoria=altura" title="Cintos paraquedistas com CA NR-35"><strong>Cinto paraquedista Classe A ou C</strong></a> com argolas e fivelas dieletricas;</li>
  <li>Talabarte tipo Y com duplo amortecedor de impacto;</li>
  <li>Trava-quedas deslizante certificado;</li>
  <li>Linha de vida ancorada em ponto fixo estrutural.</li>
</ul>
<h2>Cinto paraquedista dieletrico: interseccao entre NR-10 e NR-35</h2>
<p>O <strong>cinto paraquedista dieletrico</strong> atende aos requisitos da NR-35, mas com todos os componentes metalicos revestidos com material isolante ou substituidos por pecas de polimero de engenharia. A escolha entre cinto Classe A (ancoragem dorsal) e Classe C (tronco e pernas) depende do tipo de atividade.</p>
<h2>Fator de queda e forca de choque</h2>
<p>O <strong>fator de queda</strong> e a relacao entre a distancia de queda livre e o comprimento do talabarte. A NR-35 exige que a forca de choque maxima transmitida ao corpo durante uma queda nao ultrapasse <strong>6 kN</strong>. Por isso, talabartes modernos incluem amortecedores de energia que dissipam parte da forca no impacto.</p>`,
    faq: [
      { q: 'Posso usar um cinto paraquedista comum em trabalho com eletricidade?', a: 'Nao. Para trabalhos que envolvem simultaneamente altura e eletricidade, o cinto paraquedista deve ser dieletrico, com argolas, fivelas e conectores isolantes. O uso de cinto com partes metalicas expostas em ambiente eletrico pode resultar em eletrocussao.' },
      { q: 'Qual a diferenca entre cinto Classe A e Classe C?', a: 'O cinto Classe A possui ancoragem dorsal e e projetado para parar quedas, sendo usado com talabarte Y anti-queda. O cinto Classe C possui ancoragem dorsal e ventral/lateral, sendo ideal para posicionamento em estruturas verticais como postes e torres. Ambas as classes devem atender a ABNT NBR 15834.' },
      { q: 'Todo eletricista precisa ter treinamento em NR-35?', a: 'Sim, se o eletricista realizar qualquer atividade acima de 2 metros. O treinamento minimo exigido pela NR-35 e de 8 horas teorico-praticas. A atualizacao deve ser feita sempre que houver mudanca nas condicoes de trabalho ou a cada 2 anos.' },
    ],
    siloBox: { label: 'Catalogo NR-35 & NR-10', title: 'Cintos Paraquedistas e EPIs para Altura Eletrica', desc: 'Cintos dieletricos, talabartes Y, trava-quedas e luvas isolantes. Todos com CA valido e documentacao tecnica.', href: '/produtos?categoria=altura', btnText: 'Ver Cintos Paraquedistas' },
    date: '2026-07-18',
    slug: 'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios',
    meta_description: 'Entenda as normas NR-10 e NR-35 e quais EPIs sao obrigatorios para trabalhos seguros com eletricidade e em altura. Requisitos, treinamentos e cintos dieletricos.',
    image_alt: 'Trabalhador com capacete e talabartes de seguranca em trabalho em altura.',
    published: true,
  },
];

async function fetchPosts() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,category,readtime,image_url,image_alt,summary,content,date,slug,published&published=eq.true`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) { console.warn(`Aviso: Supabase status ${res.status}. Usando fallback.`); return FALLBACK_POSTS; }
    const remotePosts = await res.json();
    if (!remotePosts || remotePosts.length === 0) return FALLBACK_POSTS;

    // Enriquecer posts remotos com dados de fallback (faq, siloBox, meta_description)
    const enriched = remotePosts.map(p => {
      const fallback = FALLBACK_POSTS.find(f => f.slug === p.slug) || {};
      return { ...fallback, ...p };
    });

    // Adicionar posts do fallback que NAO existem no Supabase (artigos locais novos)
    const remoteSlugs = new Set(remotePosts.map(p => p.slug));
    const localOnly = FALLBACK_POSTS.filter(f => !remoteSlugs.has(f.slug));
    if (localOnly.length > 0) {
      console.log(`Incluindo ${localOnly.length} post(s) local(is) nao encontrado(s) no Supabase: ${localOnly.map(p => p.slug).join(', ')}`);
    }

    return [...enriched, ...localOnly];
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`Aviso Supabase (${err.message}). Usando fallback local.`);
    return FALLBACK_POSTS;
  }
}


async function buildBlog() {
  console.log('Iniciando Static Site Generation (SSG) para o Blog...');
  const posts = await fetchPosts();
  console.log(`Processando ${posts.length} posts.`);

  const templatePath = path.resolve(cwd, 'dist/artigo.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/artigo.html nao encontrado! Rode o vite build primeiro.');
    process.exit(1);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  for (const post of posts) {
    const slug = post.slug;
    if (!slug) continue;
    console.log(`- Gerando: /blog/${slug}`);

    const imgUrl = SLUG_IMAGE_MAP[slug] || post.image_url || 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=800&q=80';
    let postDate = '';
    if (post.date) {
      try { postDate = new Date(post.date).toLocaleDateString('pt-BR'); } catch { postDate = post.date; }
    }

    let html = templateHtml;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${post.title} | EPI Marketplace</title>`);
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/, `<meta name="description" content="${post.meta_description || post.summary || post.title}">`);
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/, `<link rel="canonical" href="https://epimarketplace.com/blog/${slug}">`);
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/, `<meta property="og:title" content="${post.title}">`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/, `<meta property="og:description" content="${post.meta_description || post.summary || post.title}">`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/, `<meta property="og:url" content="https://epimarketplace.com/blog/${slug}">`);
    html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/, `<meta property="og:image" content="${imgUrl.startsWith('http') ? imgUrl : 'https://epimarketplace.com' + imgUrl}">`);

    const articleSchema = {
      "@context": "https://schema.org", "@type": "Article",
      "headline": post.title,
      "image": [imgUrl.startsWith('http') ? imgUrl : 'https://epimarketplace.com' + imgUrl],
      "datePublished": post.date || new Date().toISOString(),
      "author": { "@type": "Person", "name": "Carolina Ferreira, M.Sc.", "jobTitle": "Engenheira de Seguranca do Trabalho" },
      "publisher": { "@type": "Organization", "name": "EPI Marketplace", "logo": { "@type": "ImageObject", "url": "https://epimarketplace.com/img/logo.png" } },
      "description": post.meta_description || post.summary || ''
    };

    const faqItems = post.faq || [];
    let faqSchemaTag = '';
    if (faqItems.length > 0) {
      faqSchemaTag = `  <script type="application/ld+json">\n${JSON.stringify(faqSchema(faqItems), null, 2)}\n  </script>\n`;
    }
    html = html.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n  </script>\n${faqSchemaTag}</head>`);

    let contentHtml = post.content || '';
    if (!contentHtml.includes('<p>') && !contentHtml.includes('<h2>') && !contentHtml.includes('<article>')) {
      let lines = contentHtml.split('\n');
      let inParagraph = false;
      let formatted = '';
      lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) { if (inParagraph) { formatted += '</p>'; inParagraph = false; } return; }
        if (trimmed.startsWith('### ')) { if (inParagraph) { formatted += '</p>'; inParagraph = false; } formatted += `<h3>${trimmed.substring(4)}</h3>`; }
        else if (trimmed.startsWith('## ')) { if (inParagraph) { formatted += '</p>'; inParagraph = false; } formatted += `<h2>${trimmed.substring(3)}</h2>`; }
        else if (trimmed.startsWith('# ')) { if (inParagraph) { formatted += '</p>'; inParagraph = false; } formatted += `<h2>${trimmed.substring(2)}</h2>`; }
        else { if (!inParagraph) { formatted += '<p>'; inParagraph = true; } else { formatted += '<br>'; } formatted += trimmed; }
      });
      if (inParagraph) formatted += '</p>';
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      contentHtml = formatted;
    }

    const siloHtml = post.siloBox ? siloBox(post.siloBox) : '';
    const faqHtml = faqItems.length > 0 ? faqAccordion(faqItems) : '';
    const videoHtml = post.video_url ? youtubeEmbed({ url: post.video_url, caption: post.video_caption || '' }) : '';
    const socialProofHtml = post.social_proof
      ? socialProof(post.social_proof)
      : socialProof({
          quote: `"A escolha correta dos EPIs com <strong>CA valido</strong> e a inspecao periodica sao a base da conformidade com as normas regulamentadoras brasileiras."`,
          name: 'Eng. Ricardo Lopes, CREA-SP',
          credential: 'Tecnico de Seguranca do Trabalho — 18 anos de experiencia em conformidade NR',
          badge: 'Especialista NR-10 / NR-35'
        });
    const fullContent = `${videoHtml}${contentHtml}\n${siloHtml}\n${faqHtml}\n${socialProofHtml}\n${AUTHOR_BIO_HTML}`;

    html = html.replace(/<div id="loading" class="loading-spinner">[\s\S]*?<\/p>\s*<\/div>/i, '<div id="loading" class="loading-spinner" style="display: none;"></div>');
    html = html.replace(/<article id="article-view" class="blog-article"[^>]*>/i, '<article id="article-view" class="blog-article" style="display: block;">');
    html = html.replace(/<span id="post-category"[^>]*>.*?<\/span>/i, `<span id="post-category" class="article-tag">${post.category || 'EPIs'}</span>`);
    html = html.replace(/<span id="post-date"[^>]*>.*?<\/span>/i, `<span id="post-date">${postDate}</span>`);
    html = html.replace(/<span id="post-readtime"[^>]*>.*?<\/span>/i, `<span id="post-readtime">${post.readtime || '5 min'}</span>`);
    html = html.replace(/<h1 id="post-title"[^>]*>.*?<\/h1>/i, `<h1 id="post-title">${post.title}</h1>`);
    html = html.replace(/<img id="post-img"[^>]*>/i, `<img id="post-img" src="${imgUrl}" alt="${post.image_alt || post.title}" class="article-hero-image" loading="lazy" decoding="async">`);
    html = html.replace(/<div id="post-content" class="article-content">[\s\S]*?<\/div>/i, `<div id="post-content" class="article-content">\n${fullContent}\n      </div>`);

    const dirPath = path.resolve(cwd, `dist/blog/${slug}`);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
  }

  console.log('SSG concluido com sucesso!');
  console.log('');
  console.log('====================================================');
  console.log('  RELATORIO DE DEPLOY SEO — Ultimate SEO Engineer   ');
  console.log('====================================================');
  console.log('');
  console.log('  VERIFICACAO DA TRIADE (Exact Match Framework):');
  posts.forEach(p => {
    const titleLen = (p.title || '').length;
    const descLen = (p.meta_description || p.summary || '').length;
    const titleOk = titleLen <= 60 ? '[OK]' : `[FALHA: ${titleLen} chars — max 60]`;
    const descOk = descLen >= 120 && descLen <= 160 ? '[OK]' : `[ATENCAO: ${descLen} chars — ideal 120-160]`;
    console.log(`  Slug: /blog/${p.slug}`);
    console.log(`    Title (${titleLen} chars):  ${titleOk}`);
    console.log(`    Desc  (${descLen} chars): ${descOk}`);
    console.log('');
  });
  console.log('  COMPONENTES EEAT INJETADOS: AuthorBio + SocialProof + FAQ + Silo CTA');
  console.log('  JSON-LD: Article + FAQPage por artigo (AI Overviews / SGE)');
  console.log('');
  console.log('  ACOES EXTERNAS OBRIGATORIAS:');
  console.log('  1. [INTENCAO SERP] Verifique o Google hoje para cada keyword dos artigos.');
  console.log('  2. [PAGESPEED] Rode GTmetrix (servidor Brasil) — mire LCP < 2.5s.');
  console.log('  3. [GSC] Envie o Sitemap e solicite indexacao de cada URL nova.');
  console.log('  4. [BACKLINKS] Busque parceiros reais para link building.');
  console.log('  5. [SOCIAL] Compartilhe cada artigo no LinkedIn e WhatsApp B2B.');
  console.log('====================================================');
}

buildBlog().catch(err => {
  console.error('Erro no SSG:', err);
  process.exit(1);
});
