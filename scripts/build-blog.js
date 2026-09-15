import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = path.join(__dirname, '..');

const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const SLUG_IMAGE_MAP = {
  'epis-obrigatorios-principais-equipamentos-seguranca':
    '/img/blog/epis-obrigatorios-colete-refletivo-bota-seguranca.webp',
  'epi-para-trabalho-em-altura-nr-35':
    '/img/blog/epi-para-trabalho-em-altura-nr-35.jpg',
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
    '/img/blog/o-que-e-epi-significado-tipos-e-exemplos.jpg',
  'epi-e-epc-qual-a-diferenca-exemplos-e-quando-usar':
    '/img/blog/epi-e-epc-qual-a-diferenca-exemplos-e-quando-usar.jpg',
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
  id: 'real-post-008',
  title: 'EPIs Obrigatórios: 7 Principais Equipamentos de Segurança',
  category: 'Normas & EPIs Obrigatórios',
  readtime: '9 min',
  target_keyword: 'EPIs obrigatórios',
  slug: 'epis-obrigatorios-principais-equipamentos-seguranca',
  date: '2026-09-14',
  published: true,
  image_url: '/img/blog/epis-obrigatorios-colete-refletivo-bota-seguranca.webp',
  image_alt: 'Engenheiro e trabalhadora da construção com colete refletivo EPI, óculos escuros, bota de segurança e capacete em canteiro industrial.',
  meta_description: 'Conheça os EPIs obrigatórios por lei, os 7 principais equipamentos com CA do MTE, regras da CLT, multas e baixe modelo de ficha de EPI.',
  summary: 'Guia completo sobre os EPIs obrigatórios por lei: conheça os 7 principais equipamentos de proteção individual, exigências do CA MTE, regras da CLT, cálculo de multas e modelo de ficha de EPI.',
  content: `<h2>O que a legislação brasileira define sobre os EPIs obrigatórios?</h2>
<p>Saber quais são os <strong>EPIs obrigatórios</strong> no ambiente corporativo e industrial é um dever legal de toda empresa e um direito fundamental de qualquer trabalhador. A segurança ocupacional no Brasil é regida pela Consolidação das Leis do Trabalho (CLT) e regulamentada pelas Normas Regulamentadoras (NRs) emitidas pelo Ministério do Trabalho e Emprego (MTE).</p>
<p>De acordo com o item 6.2 da <strong>Norma Regulamentadora nº 6 (NR-6)</strong>, considera-se Equipamento de Proteção Individual todo dispositivo ou produto de uso individual utilizado pelo trabalhador, destinado à proteção contra riscos suscetíveis de ameaçar a segurança e a saúde no trabalho. Conforme o <strong>Artigo 166 da CLT</strong>, a empresa é obrigada a fornecer gratuitamente aos colaboradores o EPI adequado ao risco, em perfeito estado de conservação e funcionamento, acompanhado de treinamento e fiscalização contínua.</p>
<p>A determinação de quais equipamentos são compulsórios depende diretamente do Programa de Gerenciamento de Riscos (PGR) e do Laudo Técnico das Condições Ambientais do Trabalho (LTCAT), os quais identificam agentes físicos, químicos, biológicos, ergonômicos e mecânicos em cada posto de trabalho.</p>

<h2>Quais são os 7 principais equipamentos de segurança no trabalho?</h2>
<p>Embora cada segmento produtivo apresente particularidades operacionais, sete equipamentos formam a espinha dorsal da proteção individual na indústria, engenharia, infraestrutura e logística. A seguir, detalhamos as especificações técnicas, normas aplicáveis e finalidades de cada um:</p>

<h3>1. Colete Refletivo EPI de Alta Visibilidade (ABNT NBR 15292)</h3>
<p>O <strong>colete refletivo EPI</strong> é um item obrigatório indispensável em ambientes onde trabalhadores dividem espaço com veículos em movimento, maquinário pesado ou operam em condições de baixa luminosidade, nevoeiro e períodos noturnos. A norma técnica reguladora é a <strong>ABNT NBR 15292</strong>, que categoriza as vestimentas de alta visibilidade em três classes de proteção:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Classe 1:</strong> Para tráfego com velocidade inferior a 40 km/h, separação clara entre pedestres e veículos (ex.: estacionamentos internos e almoxarifados).</li>
  <li><strong>Classe 2:</strong> Para tráfego entre 40 km/h e 80 km/h, com menor tempo de reação dos condutores (ex.: obras em vias urbanas, equipes de saneamento, coleta e pátios logísticos).</li>
  <li><strong>Classe 3:</strong> Para tráfego superior a 80 km/h e condições climáticas adversas severas, exigindo máxima área de material fluorescente e retrorrefletivo (ex.: rodovias de alta velocidade, aeroportos e ferrovias).</li>
</ul>
<p>O tecido fluorescente (geralmente amarelo-limão ou laranja) transforma a radiação UV invisível em luz visível durante o dia, enquanto as faixas retrorrefletivas devolvem o facho luminoso dos faróis diretamente para os olhos dos motoristas à noite. Confira os modelos de <a href='/produtos?categoria=sinalizacao' title='Coletes refletivos e sinalização de segurança com CA'>coletes refletivos homologados e itens de sinalização</a> disponíveis na EPI Marketplace.</p>

<h3>2. Óculos EPI Escuro e Incolor para Proteção Visual (ABNT NBR 16360)</h3>
<p>A proteção ocular previne lesões que podem resultar em cegueira parcial ou definitiva. O uso de <strong>óculos EPI escuro</strong> é obrigatório para trabalhadores expostos à radiação solar ultravioleta (UV), luminosidade intensa em campo aberto (construção pesada, pavimentação, solda e agricultura) e impactos mecânicos:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Lentes Fumê / Escuras:</strong> Atenuam a fadiga ocular provocada pelo excesso de luz solar e filtram 99,9% da radiação UVA e UVB prejudicial à córnea.</li>
  <li><strong>Lentes Incolores:</strong> Indicadas para ambientes internos e galpões fechados, garantindo clareza ótica contra projeção de fragmentos metálicos, poeiras e respingos químicos.</li>
  <li><strong>Tratamentos Anti-Risco e Anti-Embaçante:</strong> Asseguram durabilidade superficial e visibilidade plena mesmo em condições de alta umidade ou esforço físico intenso.</li>
</ul>

<h3>3. Bota de Segurança EPI e Calçados Ocupacionais (ABNT NBR ISO 20345)</h3>
<p>A <strong>bota de segurança EPI</strong> é o calçado profissional projetado para absorver choques mecânicos, proteger contra perfurações na sola e impedir escorregões fatais. Diferencia-se de calçados comuns por uma série de requisitos técnicos:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Biqueira de Segurança:</strong> Em aço carbono ou composite (fibra de carbono/polímero de engenharia), projetada para resistir a impactos de até 200 Joules e compressão de 15 kN. O modelo em composite é 100% livre de metais, ideal para eletricistas.</li>
  <li><strong>Solado Bidensidade em PU (Poliuretano):</strong> Composto por uma entressola mais macia para absorção de impacto no calcanhar e sola externa compacta com ranhuras para escoamento de fluidos (aderência SRC).</li>
  <li><strong>Palmilha de Kevlar / Anti-Perfuração:</strong> Protege a planta dos pés contra pregos expostos, arames e cacos de vidro em canteiros de demolição.</li>
</ul>

<h3>4. Capacete de Segurança com Jugular (ABNT NBR 8221)</h3>
<p>O capacete industrial protege o crânio contra impactos de objetos em queda livre e descargas elétricas acidentais. A fita jugular acoplada em 3 pontos garante que o capacete permaneça fixado à cabeça mesmo em caso de tropeços ou trabalhos com desnível vertical.</p>

<h3>5. Luvas de Proteção Específicas para Cada Risco</h3>
<p>As mãos representam a parte do corpo mais suscetível a acidentes na indústria. Os modelos variam conforme a matriz de risco da função: luvas de vaqueta para esforço mecânico abrasivo, luvas nitrílicas para contato com óleos e solventes, e luvas isolantes de borracha para intervenções elétricas conforme a NR-10.</p>

<h3>6. Protetor Auricular Tipo Plug e Concha (ABNT NBR 16076)</h3>
<p>O ruído contínuo acima de 85 dB(A) por mais de 8 horas diárias causa a Perda Auditiva Induzida por Ruído (PAIR), uma doença ocupacional irreversível. Os protetores auriculares tipo inserção de silicone (plug) ou tipo concha abafadora atenuam o nível sonoro (NRRsf) para limites fisiologicamente toleráveis.</p>

<h3>7. Cinto de Segurança Tipo Paraquedista para Altura (NR-35)</h3>
<p>Em qualquer tarefa executada a mais de 2,00 metros do piso, o cinto paraquedista é obrigatório. Dotado de pontos de ancoragem dorsal e peitoral, ele deve ser conectado a talabartes com absorvedor de energia ou trava-quedas retráteis para reter quedas sem ultrapassar 6 kN de força de impacto no corpo.</p>

<h2>Tabela Comparativa: Os 7 Principais EPIs Obrigatórios</h2>
<table style='width: 100%; border-collapse: collapse; margin: var(--space-6) 0; font-size: 0.9em; border: 1px solid var(--clr-border, #e2e8f0);'>
  <thead>
    <tr style='background: var(--clr-navy); color: white; text-align: left;'>
      <th style='padding: 12px;'>Equipamento de Proteção</th>
      <th style='padding: 12px;'>Norma Técnica Aplicável</th>
      <th style='padding: 12px;'>Principal Risco Mitigado</th>
      <th style='padding: 12px;'>Obrigatoriedade por Função</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Colete Refletivo EPI</td>
      <td style='padding: 10px;'>ABNT NBR 15292</td>
      <td style='padding: 10px;'>Atropelamento e baixa visibilidade</td>
      <td style='padding: 10px;'>Rodovias, trânsito, logística e pátios</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0); background: #f8fafc;'>
      <td style='padding: 10px; font-weight: bold;'>Óculos EPI Escuro / Incolor</td>
      <td style='padding: 10px;'>ABNT NBR 16360</td>
      <td style='padding: 10px;'>Radiação UV, claridade e partículas volantes</td>
      <td style='padding: 10px;'>Construção, solda, corte e áreas abertas</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Bota de Segurança EPI</td>
      <td style='padding: 10px;'>ABNT NBR ISO 20345</td>
      <td style='padding: 10px;'>Queda de peso, perfuração e escorregamento</td>
      <td style='padding: 10px;'>Fábricas, canteiros, oficinas e depósitos</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0); background: #f8fafc;'>
      <td style='padding: 10px; font-weight: bold;'>Capacete com Jugular</td>
      <td style='padding: 10px;'>ABNT NBR 8221</td>
      <td style='padding: 10px;'>Queda de objetos e colisão craniana</td>
      <td style='padding: 10px;'>Obras civis, montagens e manutenção</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Luvas de Proteção</td>
      <td style='padding: 10px;'>EN 388 / NBR 16068</td>
      <td style='padding: 10px;'>Cortes, queimaduras químicas e choque elétrico</td>
      <td style='padding: 10px;'>Manipulação mecânica, elétrica e química</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0); background: #f8fafc;'>
      <td style='padding: 10px; font-weight: bold;'>Protetor Auricular</td>
      <td style='padding: 10px;'>ABNT NBR 16076</td>
      <td style='padding: 10px;'>Perda auditiva por ruído contínuo (>85 dB)</td>
      <td style='padding: 10px;'>Ambientes ruidosos e motores pesados</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Cinto Paraquedista</td>
      <td style='padding: 10px;'>ABNT NBR 15836</td>
      <td style='padding: 10px;'>Quedas em diferença de nível (>2,00m)</td>
      <td style='padding: 10px;'>Trabalhos em altura, fachadas e torres</td>
    </tr>
  </tbody>
</table>

<h2>Como consultar a validade do CA EPI MTE?</h2>
<p>O <strong>Certificado de Aprovação (CA)</strong> emitido pelo Ministério do Trabalho e Emprego é o único documento que atesta a eficácia técnica e a conformidade legal de um equipamento de proteção no território brasileiro. Utilizar, comercializar ou fornecer EPI sem CA válido constitui infração grave com sanções civis e criminais.</p>
<p>Para verificar o <strong>CA EPI MTE</strong>, siga os passos recomendados pelos engenheiros de segurança da EPI Marketplace:</p>
<ol style='margin: var(--space-4) 0 var(--space-4) 20px; line-height: 2;'>
  <li>Localize o número do CA gravado de forma legível e indelével na carcaça, etiqueta ou tecido do equipamento.</li>
  <li>Acesse o portal oficial do governo federal: <strong>consultaca.mte.gov.br</strong>.</li>
  <li>Digite o número no campo de busca e verifique o status cadastral: ativo, vencido ou cancelado.</li>
  <li>Confira se a descrição dos laudos laboratoriais corresponde exatamente à atividade executada na sua empresa.</li>
</ol>
<p><strong>Atenção ao detalhe jurídico:</strong> O CA precisa estar válido na data da compra do produto. Uma vez adquirido com CA ativo, o EPI pode ser utilizado até o término de sua vida útil recomendada pelo fabricante, desde que conservado e inspecionado periodicamente.</p>

<h2>Modelo de Ficha de EPI: Como estruturar e garantir validade jurídica</h2>
<p>A <strong>ficha de controle e entrega de EPI</strong> é o documento probatório indispensável perante a fiscalização do Ministério do Trabalho e da Justiça do Trabalho. Em processos trabalhistas por insalubridade ou acidentes, a ausência da ficha assinada pelo funcionário equivale juridicamente ao não fornecimento do equipamento.</p>
<p>Conforme o item 6.5.1 da NR-6, a entrega do EPI pode ser registrada em livro, ficha em papel ou sistema eletrônico, desde que atenda a requisitos mínimos. A seguir, apresentamos o modelo padrão adotado por departamentos de Recursos Humanos e SESMT:</p>

<div style='background: var(--clr-surface-dim, #f4f6fa); border: 1px solid var(--clr-border, #e2e8f0); border-radius: var(--radius-lg); padding: var(--space-6); margin: var(--space-6) 0;'>
  <h4 style='margin-top: 0; color: var(--clr-navy); font-size: 1.1rem; border-bottom: 2px solid var(--clr-orange); padding-bottom: 8px;'>Estrutura Padrão da Ficha de Entrega de EPI (NR-6)</h4>
  <p><strong>Cabeçalho da Empresa:</strong> Razão Social, CNPJ, Endereço e Ramo de Atividade.</p>
  <p><strong>Dados do Colaborador:</strong> Nome Completo, CPF, Número da CTPS, Cargo/Função, Setor e Data de Admissão.</p>
  <p><strong>Termo de Responsabilidade Legal:</strong> Declaração de recebimento gratuito, compromisso de guarda e conservação, ciência da obrigatoriedade de uso durante a jornada e comunicação imediata em caso de dano ou extravio.</p>
  <p><strong>Tabela de Registro de Movimentação:</strong></p>
  <table style='width: 100%; border-collapse: collapse; font-size: 0.85em; background: white; margin-top: 10px;'>
    <thead>
      <tr style='background: #e2e8f0;'>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Data Entrega</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Qtd</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Descrição do EPI</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Nº CA</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Fabricante</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Assinatura Empregado</th>
        <th style='padding: 8px; border: 1px solid #cbd5e1;'>Data Devolução</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>___/___/202_</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>01</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>Bota de Segurança Composite</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>43.XXX</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>Certificado</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>________________</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>___/___/202_</td>
      </tr>
      <tr>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>___/___/202_</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>01</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>Colete Refletivo Classe 2</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>38.XXX</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>Certificado</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>________________</td>
        <td style='padding: 8px; border: 1px solid #cbd5e1;'>___/___/202_</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Legislação, CLT e Multas por descumprimento de EPI</h2>
<p>O descumprimento das normas de segurança gera graves consequências jurídicas e financeiras para ambas as partes da relação trabalhista:</p>

<h3>Responsabilidades do Empregador (Empresa)</h3>
<p>Se a empresa não fornecer os EPIs obrigatórios, fornecer equipamentos inadequados ou sem Certificado de Aprovação válido, estará sujeita a:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Multas Administrativas da NR-28:</strong> Variam entre R$ 2.000,00 e R$ 6.000,00 por infração, multiplicadas pelo número de trabalhadores prejudicados.</li>
  <li><strong>Pagamento de Adicional de Insalubridade:</strong> Conforme a <strong>Súmula 289 do TST</strong>, a simples entrega do EPI não afasta o pagamento da insalubridade caso a empresa não comprove fiscalização efetiva e treinamento contínuo.</li>
  <li><strong>Ação Civil Pública e Indenizações por Danos Morais:</strong> Em caso de acidente de trabalho com óbito ou sequelas incapacitantes, os gestores respondem nas esferas cível e criminal por omissão ou negligência.</li>
</ul>

<h3>Deveres e Penalidades para o Trabalhador</h3>
<p>O Artigo 158 da CLT estabelece expressamente que constitui ato faltoso a recusa injustificada do empregado em utilizar os equipamentos fornecidos pela empresa. O empregador pode aplicar medidas disciplinares escalonadas:</p>
<ol style='margin: var(--space-3) 0 var(--space-4) 20px; line-height: 1.8;'>
  <li>Advertência verbal formalizada;</li>
  <li>Advertência por escrito com registro no prontuário funcional;</li>
  <li>Suspensão disciplinar de até 30 dias sem remuneração (Art. 474 da CLT);</li>
  <li><strong>Demissão por Justa Causa</strong> fundamentada no Artigo 482, alínea "h" da CLT (ato de indisciplina ou insubordinação).</li>
</ol>

<h2>Onde comprar EPIs com Certificado de Aprovação (CA) ativo?</h2>
<p>A compra de equipamentos corporativos exige confiança no fornecedor, agilidade logística e suporte técnico qualificado. Na <strong>loja de EPI</strong> da <a href='/produtos?categoria=epi' title='Catálogo completo de EPIs de segurança com CA válido'>EPI Marketplace</a>, você encontra catálogo homologado das melhores marcas nacionais com CA ativo emitido pelo Ministério do Trabalho.</p>
<p>Atendemos clientes corporativos (CNPJ) em todo o Brasil com condições diferenciadas no atacado, suporte técnico consultivo para as NRs e emissão de notas fiscais com rastreabilidade total. Solicite um orçamento B2B rápido pelo nosso canal no WhatsApp ou consulte nosso catálogo completo online.</p>`,
  siloBox: {
    label: 'Catálogo Oficial de EPIs',
    title: 'Equipamentos de Segurança com CA Válido no MTE',
    desc: 'Botas de segurança, coletes refletivos, óculos escuros e incolores, capacetes e kits para NR-10 e NR-35 com pronta-entrega para empresas.',
    href: '/produtos?categoria=epi',
    btnText: 'Ver Todos os EPIs na Loja'
  },
  social_proof: {
    quote: '"O fornecimento dos <strong>EPIs obrigatórios</strong> com CA ativo e a guarda da ficha de entrega assinada neutralizam até 90% dos passivos trabalhistas e salvam vidas diariamente."',
    name: 'Eng. Ricardo Lopes, CREA-SP',
    credential: 'Técnico e Engenheiro de Segurança do Trabalho — 18 anos de auditoria de conformidade NR',
    badge: 'Auditor Técnico NR-6 / NR-18'
  },
  faq: [
    {
      q: 'Quais são os 7 principais equipamentos de segurança no trabalho?',
      a: 'Os 7 principais EPIs obrigatórios mais utilizados são: 1. Capacete de segurança com jugular (proteção craniana); 2. Óculos de proteção escuro ou incolor (proteção visual contra radiação UV e impactos); 3. Protetor auricular tipo concha ou plug (atenuação de ruído contínuo); 4. Luvas de proteção adequadas ao risco mecânico ou elétrico; 5. Bota de segurança com bico de aço ou composite e solado antiderrapante; 6. Colete refletivo de alta visibilidade (ABNT NBR 15292); e 7. Cinto de segurança tipo paraquedista com talabarte para trabalhos em altura acima de 2 metros (NR-35).'
    },
    {
      q: 'O que a CLT diz sobre o fornecimento de EPI?',
      a: 'Segundo o Artigo 166 da Consolidação das Leis do Trabalho (CLT) e a Norma Regulamentadora nº 6 (NR-6), a empresa é obrigada a fornecer aos empregados, gratuitamente, equipamento de proteção individual adequado ao risco, em perfeito estado de conservação e funcionamento, sempre que as medidas de proteção coletiva (EPC) forem inviáveis ou insuficientes.'
    },
    {
      q: 'O funcionário pode se recusar a usar o EPI obrigatório?',
      a: 'Não. O uso do EPI fornecido pelo empregador é uma obrigação legal do empregado (Art. 158 da CLT e item 6.7.2 da NR-6). A recusa injustificada constitui ato de indisciplina ou insubordinação, passível de advertência verbal, advertência por escrito, suspensão disciplinar (Art. 474 da CLT) e demissão por justa causa (Art. 482, alínea h, da CLT).'
    },
    {
      q: 'Qual é o valor da multa por falta de fornecimento ou uso de EPI?',
      a: 'As penalidades são graduadas conforme a Norma Regulamentadora nº 28 (NR-28) do Ministério do Trabalho e Emprego, variando conforme a gravidade da infração e o número de funcionários da empresa. As multas por falta de fornecimento de EPI ou manutenção de equipamentos sem Certificado de Aprovação (CA) válido iniciam em torno de R$ 2.000,00 e podem ultrapassar R$ 6.000,00 por trabalhador desprotegido, além do embargo da obra ou interdição da máquina.'
    },
    {
      q: 'Quem usa EPI obrigatório tem direito a adicional de insalubridade?',
      a: 'Depende da capacidade de neutralização do risco. A Súmula nº 289 do Tribunal Superior do Trabalho (TST) determina que o simples fornecimento do aparelho de proteção pelo empregador não o exime do pagamento do adicional de insalubridade se a empresa não comprovar que exigiu o uso, realizou treinamentos, efetuou trocas periódicas e que o EPI efetivamente neutralizou o agente nocivo abaixo dos limites de tolerância da NR-15.'
    },
    {
      q: 'Como consultar se o CA do EPI está válido no Ministério do Trabalho?',
      a: 'A verificação da autenticidade e validade do Certificado de Aprovação deve ser feita diretamente no portal oficial do Ministério do Trabalho e Emprego através do sistema CAEPI (consultaca.mte.gov.br) ou pela plataforma gov.br. Basta digitar o número gravado no corpo do equipamento para conferir a data de validade, o fabricante legal e os ensaios laboratoriais aprovados.'
    },
    {
      q: 'Qual a diferença entre EPI e EPC na hierarquia de segurança?',
      a: 'O EPC (Equipamento de Proteção Coletiva) protege todo o ambiente e todos os colaboradores simultaneamente (ex.: guarda-corpos, exaustores, redes de proteção, sinalizações). Já o EPI (Equipamento de Proteção Individual) protege apenas o trabalhador individualmente. Pelo princípio de prevenção da NR-1, o EPC tem prioridade obrigatória; os EPIs só devem ser adotados enquanto o EPC estiver sendo implantado, para emergências ou para complementar a proteção residual.'
    }
  ]
},
  {
    id: 'real-post-007',
    title: 'EPI para Trabalho em Altura: Guia Completo NR-35',
    category: 'Trabalho em Altura & NR-35',
    readtime: '9 min',
    summary: 'Guia completo de EPI para trabalho em altura: conheça as exigências da NR-35, cinto paraquedista, talabarte com absorvedor, trava-quedas, cálculo de ZLQ e inspeção.',
    content: `<h2>O que define o trabalho em altura segundo a NR-35?</h2>
<p>A seleção e o uso adequado do <strong>EPI para trabalho em altura</strong> representam a fronteira definitiva entre uma operação industrial segura e um acidente grave. No Brasil, quedas de diferença de nível figuram historicamente entre as principais causas de fatalidades na construção civil, manutenção predial, telecomunicações e no setor elétrico.</p>
<p>De acordo com o item 35.1.2 da <strong>Norma Regulamentadora 35 (NR-35)</strong> do Ministério do Trabalho e Emprego, considera-se trabalho em altura toda atividade executada <strong>acima de 2,00 m (dois metros) do nível inferior</strong>, onde haja risco de queda. A partir dessa cota, a adoção de medidas de proteção coletiva (EPC) e de proteção individual (EPI) torna-se legalmente compulsória.</p>
<p>A NR-35 estabelece que o empregador deve priorizar a prevenção e a eliminação do risco. Quando o trabalho em altura for inevitável, é mandatória a implementação do <strong>Sistema de Proteção Individual Contra Quedas (SPIQ)</strong>, composto por elementos rigorosamente inspecionados e certificados.</p>

<h2>A estrutura do SPIQ: os 3 pilares da retenção de queda</h2>
<p>Muitos gestores e profissionais cometem o erro de acreditar que apenas vestir um cinto garante segurança. Na engenharia de segurança do trabalho, a proteção contra quedas depende do funcionamento harmônico de uma tríade indissociável:</p>
<ol style='margin: var(--space-4) 0 var(--space-4) 20px; line-height: 2;'>
  <li><strong>Sistema de Ancoragem (Estrutura):</strong> Pontos de fixação, linhas de vida horizontais ou verticais que devem suportar uma carga estática mínima de 15 kN (aproximadamente 1.500 kgf por usuário), conforme a norma ABNT NBR 16325.</li>
  <li><strong>Elemento de Ligação (Conexão):</strong> Dispositivos que unem o cinto ao ponto de ancoragem, como talabartes com absorvedor de energia (ABS) ou dispositivos trava-quedas.</li>
  <li><strong>Equipamento de Proteção Individual (EPI):</strong> Cinto de segurança tipo paraquedista com Certificado de Aprovação (CA) ativo no MTE.</li>
</ol>
<p>Se qualquer um desses três elos falhar, todo o sistema entra em colapso. Por isso, adquira sempre <a href='/produtos?categoria=altura' title='Equipamentos certificados para trabalho em altura NR-35'>equipamentos para trabalho em altura com CA válido</a> na EPI Marketplace, garantindo conformidade documental e técnica.</p>

<h2>Quais são os principais EPIs para trabalho em altura?</h2>
<p>Cada atividade em desnível possui exigências ergonômicas e mecânicas específicas. A seguir, detalhamos os componentes fundamentais que compõem o kit de segurança do trabalhador:</p>

<h3>1. Cinto de Segurança Tipo Paraquedista (ABNT NBR 15836)</h3>
<p>O <strong>cinto paraquedista</strong> é o único modelo permitido pela legislação para retenção de queda livre. Os antigos cintos abdominais (tipo eletricista) são terminantemente proibidos para reter quedas desde 2004, sendo restritos apenas ao posicionamento ergonômico de trabalho.</p>
<p>O cinto paraquedista distribui as forças de desaceleração nas partes mais resistentes da anatomia humana (coxas, bacia e tórax), mantendo o corpo na posição vertical após a parada. O modelo deve contar com:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Ponto de ancoragem dorsal (Argola D de aço):</strong> Destinado primariamente à conexão de talabartes de retenção de queda e trava-quedas.</li>
  <li><strong>Ponto de ancoragem esternal (peitoral):</strong> Indicado para conexão em escadas tipo marinheiro com trava-quedas deslizante ou operações de resgate.</li>
  <li><strong>Pontos laterais na cintura:</strong> Utilizados exclusivamente para descanso e posicionamento ergonômico (nunca para reter quedas livres).</li>
  <li><strong>Ponto ventral (umbilical):</strong> Obrigatório em técnicas de acesso por corda, suspensão e espaços confinados.</li>
</ul>
<p>Conheça os modelos de <a href='/produtos?categoria=altura' title='Cintos paraquedistas com CA homologado'>cintos paraquedistas homologados pelo MTE</a> disponíveis em nosso catálogo.</p>

<h3>2. Talabartes com Absorvedor de Energia (ABNT NBR 15834 e NBR 15835)</h3>
<p>O talabarte é o elemento que conecta o cinto ao ponto de ancoragem. Em qualquer situação onde exista a possibilidade de queda livre, o uso de talabarte com <strong>Absorvedor de Energia (ABS)</strong> é obrigatório por lei.</p>
<p>O absorvedor é uma fita especial costurada que se rompe de forma controlada durante uma desaceleração brusca, dissipando a energia cinética. Essa abertura limita a força de impacto transmitida ao corpo do trabalhador a no máximo <strong>6 kN (cerca de 600 kgf)</strong>, impedindo lesões viscerais, fraturas na coluna e morte por trauma de impacto.</p>
<p>Para movimentações horizontais e transposição de obstáculos em torres e andaimes, utiliza-se o <strong>talabarte duplo em Y</strong>, que garante que o profissional esteja conectado ininterruptamente (regra dos 100% de conexão).</p>

<h3>3. Dispositivos Trava-Quedas (ABNT NBR 14626 e NBR 14628)</h3>
<p>Os trava-quedas são mecanismos automáticos que bloqueiam instantaneamente a queda:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Trava-quedas retrátil:</strong> Equipamento com fita de poliéster ou cabo de aço galvanizado que se enrola e desenrola automaticamente conforme o movimento do operador. Trava de forma imediata em milésimos de segundo, reduzindo drasticamente a distância de queda livre.</li>
  <li><strong>Trava-quedas deslizante para corda ou cabo:</strong> Desliza livremente em linhas de vida verticais fixadas em escadas ou estruturas e trava mecanicamente por atrito em caso de aceleração descendente.</li>
</ul>

<h3>4. Conectores e Mosquetões (ABNT NBR 15837)</h3>
<p>Os conectores unem os componentes do sistema. A NR-35 exige mosquetões com mecanismo de <strong>dupla ou tripla trava automática</strong>, impedindo a abertura acidental por torção ou atrito contra vigas e cantos vivos. Podem ser de aço forjado (maior resistência mecânica para montagens pesadas) ou de duralumínio (mais leves para escalada e acesso por corda).</p>

<h3>5. Capacete de Segurança com Jugular de 3 Pontos</h3>
<p>O capacete utilizado em altura deve possuir fita jugular resistente afixada em três pontos da carcaça. Uma simples queda de 1 metro pode fazer o capacete tradicional sem jugular voar longe da cabeça do trabalhador antes que ocorra a colisão contra estruturas laterais ou o solo.</p>

<h3>6. Calçados de Segurança com Solado de Alta Aderência</h3>
<p>Botinas industriais com solado bidensidade antiderrapante (poliuretano injetado) e bico composite ou de aço proporcionam equilíbrio estável em tabuleiros de andaimes úmidos e perfis metálicos estreitos.</p>

<h2>Zona Livre de Queda (ZLQ) e Fator de Queda: o cálculo que salva vidas</h2>
<p>Um dos erros técnicos mais graves cometidos em canteiros de obras é a desconsideração da <strong>Zona Livre de Queda (ZLQ)</strong>. A ZLQ é a distância vertical mínima necessária entre o ponto de ancoragem e o primeiro obstáculo ou solo para que o sistema retenha a queda sem que o trabalhador colida contra o chão.</p>

<p>O cálculo da ZLQ considera a seguinte fórmula matemática:</p>
<blockquote style='background: var(--clr-surface-dim, #f4f6fa); border-left: 4px solid var(--clr-orange); padding: var(--space-4); margin: var(--space-6) 0; font-family: var(--font-mono, monospace); font-size: 0.95em;'>
  <strong>ZLQ = Comprimento do Talabarte (CT) + Abertura do Absorvedor (ABS) + Altura do Trabalhador (HT) + Margem de Segurança (MS)</strong>
</blockquote>

<table style='width: 100%; border-collapse: collapse; margin: var(--space-6) 0; font-size: 0.9em; border: 1px solid var(--clr-border, #e2e8f0);'>
  <thead>
    <tr style='background: var(--clr-navy); color: white; text-align: left;'>
      <th style='padding: 12px;'>Variável do Cálculo</th>
      <th style='padding: 12px;'>Valor Padrão Estimado</th>
      <th style='padding: 12px;'>Descrição Técnica</th>
    </tr>
  </thead>
  <tbody>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Comprimento do Talabarte</td>
      <td style='padding: 10px;'>1,50 m</td>
      <td style='padding: 10px;'>Tamanho da fita esticada do talabarte com conectores.</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0); background: rgba(0,0,0,0.02);'>
      <td style='padding: 10px; font-weight: bold;'>Abertura do Absorvedor</td>
      <td style='padding: 10px;'>1,20 m</td>
      <td style='padding: 10px;'>Desdobramento máximo da fita de absorção de choque.</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0);'>
      <td style='padding: 10px; font-weight: bold;'>Altura do Trabalhador</td>
      <td style='padding: 10px;'>1,80 m</td>
      <td style='padding: 10px;'>Distância entre a argola dorsal e a ponta dos pés.</td>
    </tr>
    <tr style='border-bottom: 1px solid var(--clr-border, #e2e8f0); background: rgba(0,0,0,0.02);'>
      <td style='padding: 10px; font-weight: bold;'>Margem de Segurança</td>
      <td style='padding: 10px;'>1,00 m</td>
      <td style='padding: 10px;'>Distância livre obrigatória entre os pés e o obstáculo.</td>
    </tr>
    <tr style='background: rgba(235, 94, 40, 0.08); font-weight: bold; color: var(--clr-navy);'>
      <td style='padding: 12px;'>ZLQ Mínima Necessária</td>
      <td style='padding: 12px; color: var(--clr-orange);'>5,50 metros</td>
      <td style='padding: 12px;'>Espaço livre mínimo exigido abaixo do ponto de fixação.</td>
    </tr>
  </tbody>
</table>

<p>Perceba que, ao utilizar um talabarte convencional de 1,5 m com absorvedor, são necessários pelo menos <strong>5,5 metros de espaço livre</strong> abaixo da ancoragem. Se o trabalhador estiver operando a 3 ou 4 metros de altura e a ancoragem estiver na altura dos pés (Fator de Queda 2), ele colidirá fatalmente contra o solo antes que o absorvedor complete a desaceleração. Nesses casos, a solução técnica mandatória é a substituição do talabarte por um <strong>trava-quedas retrátil</strong> com ancoragem posicionada acima da cabeça (Fator de Queda 0).</p>

<h2>Síndrome da Suspensão Inerte: a urgência do plano de resgate</h2>
<p>O perigo do trabalho em altura não termina quando a queda é interrompida pelo cinto. A <strong>Síndrome da Suspensão Inerte (também conhecida como trauma de suspensão)</strong> ocorre quando o trabalhador permanece pendurado no cinto sem apoiar os pés, ficando imóvel ou inconsciente.</p>
<p>A pressão das fitas femorais sobre as veias femorais na região da virilha interrompe o retorno venoso, represando o sangue nos membros inferiores. Essa restrição causa hipóxia cerebral rápida, perda de consciência e parada cardiorrespiratória que pode levar ao óbito em <strong>menos de 15 a 20 minutos</strong>.</p>
<p>Por essa razão, a NR-35 exige expressamente que toda empresa possua uma equipe e um <strong>plano de resgate e primeiros socorros treinado e operacional</strong>. Além disso, recomenda-se que os cintos contenham a fita estribo de alívio de suspensão, permitindo que o trabalhador apoie os pés e bombeie os músculos da perna enquanto aguarda o socorro.</p>

<h2>Inspeção diária, vida útil e validade do CA</h2>
<p>Antes de calçar o cinto ou conectar o talabarte, o operador deve realizar uma rigorosa inspeção visual tátil:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li>Verifique se há cortes, fiapos soltos, queimaduras químicas ou desfiamento nas fitas de poliéster.</li>
  <li>Cheque se as fivelas de aço ou duralumínio apresentam trincas, deformações, rebarbas ou oxidação profunda.</li>
  <li>Certifique-se de que os indicadores de queda do cinto não foram acionados.</li>
  <li>Confira a <a href='/blog/ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca' title='Como consultar o CA de EPI no sistema do Ministério do Trabalho'>validade do Certificado de Aprovação (CA)</a> no portal oficial CNCA do MTE.</li>
</ul>
<p><strong>Regra Inegociável da NR-35:</strong> Qualquer cinto, talabarte ou trava-quedas que tenha participado da retenção de uma queda real deve ser <strong>retirado de uso e destruído imediatamente</strong>, mesmo que aparentemente pareça intacto, pois a estrutura molecular das fibras perde sua capacidade elástica de absorção.</p>

<h2>Obrigações legais e treinamento obrigatório da NR-35</h2>
<p>O trabalho em altura exige conformidade com rígidos protocolos corporativos:</p>
<ul style='margin: var(--space-3) 0 var(--space-4) 18px; line-height: 1.8;'>
  <li><strong>Atestado de Saúde Ocupacional (ASO):</strong> Deve constar expressamente a aptidão para trabalho em altura, precedido de exames complementares (eletrocardiograma, eletroencefalograma, glicemia e avaliação psicossocial).</li>
  <li><strong>Treinamento Capacitatório:</strong> Carga horária mínima de 8 horas (teoria e prática), ministrado por instrutor qualificado em segurança do trabalho, com reciclagem bienal de 8 horas ou sempre que houver mudança de procedimento.</li>
  <li><strong>Análise de Risco (AR) e Permissão de Trabalho (PT):</strong> Documentos prévios que mapeiam as condições meteorológicas (vento, chuva), interferências elétricas e procedimentos operacionais.</li>
</ul>

<p>Precisa equipar sua equipe com o que há de mais moderno e confiável em segurança de altura? Entre em <a href='/contato' title='Fale com nossos especialistas em EPI para empresas'>contato com nosso atendimento B2B</a> e solicite uma cotação personalizada com condições especiais no atacado.</p>`,
    faq: [
      { q: 'Qual o EPI obrigatório para trabalho em altura?', a: 'O EPI obrigatório principal é o cinto de segurança tipo paraquedista com CA válido pelo MTE, acompanhado de capacete com jugular de 3 pontos, calçado com solado antiderrapante e elemento de ligação (talabarte com absorvedor de energia ou trava-quedas). Desde 2004, cintos abdominais são proibidos para retenção de quedas livres.' },
      { q: 'A partir de qual altura é obrigatório o uso de EPI pela NR-35?', a: 'O uso de EPI é obrigatório a partir de 2,00 metros de altura do nível inferior onde haja risco de queda, conforme o item 35.1.2 da NR-35. Em cotas inferiores a 2 metros, medidas preventivas podem ser exigidas caso a Análise de Risco (AR) aponte perigos graves, como superfícies cortantes ou peças em movimento.' },
      { q: 'O que é a Zona Livre de Queda (ZLQ) e por que ela é calculada?', a: 'A Zona Livre de Queda (ZLQ) é a distância vertical mínima necessária entre a ancoragem e o primeiro obstáculo abaixo para reter a queda sem impacto contra o solo. É calculada somando o comprimento do talabarte (1,5 m), a abertura do absorvedor de energia (1,2 m), a altura do trabalhador (1,8 m) e uma margem de segurança de 1,0 m, totalizando cerca de 5,5 metros.' },
      { q: 'Qual a validade de um cinto de segurança paraquedista?', a: 'A validade do cinto paraquedista é determinada pelo fabricante (geralmente de 3 a 5 anos a partir da fabricação), desde que mantido sem danos e armazenado corretamente. Além da vida útil do equipamento, a empresa deve checar se o Certificado de Aprovação (CA) do MTE estava válido na data de aquisição do lote.' },
      { q: 'O que fazer com o cinto de segurança após reter uma queda real?', a: 'O cinto de segurança deve ser retirado de serviço e inutilizado imediatamente após reter uma queda real, conforme determinação expressa da NR-35. Mesmo sem danos externos visíveis, a força de impacto estica e rompe microfibras estruturais de poliamida ou poliéster, comprometendo a retenção em um eventual segundo evento.' }
    ],
    siloBox: {
      label: 'Catálogo Especializado NR-35',
      title: 'EPIs para Trabalho em Altura com CA Válido',
      desc: 'Cintos paraquedistas, talabartes com absorvedor, trava-quedas retráteis e mosquetões certificados com pronta-entrega para todo o Brasil.',
      href: '/produtos?categoria=altura',
      btnText: 'Ver Cintos e Trava-Quedas'
    },
    social_proof: {
      quote: 'Na segurança em altura não existe margem para improvisação. O uso correto do cinto paraquedista conectado a um ponto de ancoragem dimensionado a 15 kN e o cálculo preciso da Zona Livre de Queda (ZLQ) são o que garantem que o operador retorne ileso para sua família.',
      name: 'Eng. Roberto Vasconcellos, CREA-SP',
      credential: 'Especialista em Acesso por Corda, Resgate Industrial e Instrutor Master de NR-35',
      badge: 'Auditor Técnico de Trabalho em Altura'
    },
    date: '2026-09-08',
    slug: 'epi-para-trabalho-em-altura-nr-35',
    meta_description: 'Guia de EPI para trabalho em altura: cinto paraquedista, trava-quedas, talabarte, ZLQ e exigências da NR-35 com CA válido para segurança total.',
    image_alt: 'Técnico de segurança industrial equipado com cinto paraquedista, capacete com jugular e talabarte duplo em estrutura elevada conforme a NR-35.',
    published: true,
  },
  {
    id: 'real-post-006',
    title: 'EPI e EPC: Diferenca, Exemplos e Normas | Guia NR-6',
    category: 'Fundamentos',
    readtime: '8 min',
    summary: 'Entenda a diferenca entre EPI e EPC, a hierarquia de protecao da NR-6, exemplos praticos por setor e quando usar cada um na seguranca do trabalho.',
    content: `<h2>O que e EPI e o que e EPC?</h2>
<p><strong>EPI (Equipamento de Protecao Individual)</strong> e qualquer dispositivo de uso individual utilizado pelo trabalhador destinado a neutralizar riscos que ameacem a sua seguranca e saude no trabalho, segundo a <strong>Norma Regulamentadora 6 (NR-6)</strong>. Exemplos: capacetes, luvas, oculos de seguranca, cintos paraquedistas e calcados de seguranca.</p>
<p><strong>EPC (Equipamento de Protecao Coletiva)</strong> e o dispositivo, sistema ou meio de engenharia que protege <strong>todos os trabalhadores de uma area ao mesmo tempo</strong>, independentemente de acao individual. Exemplos: corrimas, guarda-corpos, sistemas LOTO (Lockout/Tagout), ventilacao forcada e redes de protecao.</p>
<h2>Qual e a diferenca entre EPI e EPC?</h2>
<p>A diferenca fundamental esta no <strong>alcance da protecao</strong>. O EPI protege apenas o individuo que o usa e exige CA do MTE. O EPC protege todos na area automaticamente, sem depender da acao do trabalhador. Por isso a NR-1 e a NR-6 determinam que o EPC deve ser <strong>sempre priorizado</strong>; o EPI e a <strong>ultima linha de defesa</strong>.</p>
<h2>A Hierarquia de Controle de Riscos (NR-1 e NR-6)</h2>
<p>Tanto a NR-1 (revisada em 2024) quanto a NR-6 estabelecem uma <strong>hierarquia obrigatoria</strong>:</p>
<ol style='margin: var(--space-4) 0 0 20px; line-height: 2;'>
  <li><strong>Eliminacao do risco</strong> — remover a fonte de perigo</li>
  <li><strong>Substituicao</strong> — trocar por processo ou material menos perigoso</li>
  <li><strong>Controles de Engenharia (EPC)</strong> — isolamento, ventilacao, barreiras fisicas</li>
  <li><strong>Controles Administrativos</strong> — procedimentos, treinamentos</li>
  <li><strong>EPI</strong> — ultima linha de defesa</li>
</ol>
<p>O empregador so pode exigir o EPI quando as medidas anteriores sao tecnicamente inviaveis ou insuficientes. Usar EPI como <em>primeira</em> resposta ao risco e considerado pratica inadequada pela legislacao e pode resultar em responsabilidade civil em caso de acidente.</p>
<h2>Exemplos praticos de EPI vs EPC por setor</h2>
<h3>Eletricidade (NR-10)</h3>
<ul style='margin: var(--space-3) 0 0 18px; line-height: 1.8;'>
  <li><strong>EPC:</strong> Sinalizacao de areas energizadas, bloqueio LOTO, detectores fixos de tensao</li>
  <li><strong>EPI:</strong> Luvas isolantes dieletricas (Classe 0 a 4), capacete Classe B, calcado dieletrico, vestimenta antichama</li>
</ul>
<h3>Trabalho em Altura (NR-35)</h3>
<ul style='margin: var(--space-3) 0 0 18px; line-height: 1.8;'>
  <li><strong>EPC:</strong> Guarda-corpos, andaimes, redes de protecao anticaida, linhas de vida horizontais fixas</li>
  <li><strong>EPI:</strong> Cinto paraquedista Classe A ou C, talabarte com absorvedor de energia, trava-quedas</li>
</ul>
<h3>Construcao Civil (NR-18)</h3>
<ul style='margin: var(--space-3) 0 0 18px; line-height: 1.8;'>
  <li><strong>EPC:</strong> Corrimas, guarda-corpos em aberturas, protecao de maquinas</li>
  <li><strong>EPI:</strong> Capacete Classe A, oculos de seguranca, botina com bico de aco, luvas de raspa</li>
</ul>
<h3>Setor Quimico e Laboratorial</h3>
<ul style='margin: var(--space-3) 0 0 18px; line-height: 1.8;'>
  <li><strong>EPC:</strong> Exaustores, capelas de fluxo laminar, chuveiros de emergencia</li>
  <li><strong>EPI:</strong> Luvas de nitrila, avental de PVC, oculos vedantes, mascara com filtro especifico</li>
</ul>
<h2>O que NAO e EPI nem EPC pela NR-6</h2>
<p>Nao sao considerados EPIs: uniforme de trabalho comum, protetor solar (classificado como higiene pessoal), joelheiras esportivas sem CA do MTE e calcados fechados sem bico de aco e sem CA. Para ser EPI, o item deve ter <strong>Certificado de Aprovacao (CA) valido</strong> emitido pelo MTE.</p>
<p>Adquira os <a href='/produtos' title='Catalogo completo de EPIs com CA valido'>EPIs com CA valido</a> para sua empresa na EPI Marketplace — atendemos desde profissionais autonomos ate grandes construtoras e concessionarias de energia em todo o Brasil.</p>`,
    faq: [
      { q: 'Qual a diferenca entre EPI e EPC?', a: 'EPI (Equipamento de Protecao Individual) protege apenas o trabalhador que o utiliza e exige CA do MTE. EPC (Equipamento de Protecao Coletiva) protege todos na area automaticamente — como corrimas, redes, sistemas LOTO e ventilacao. A NR-6 determina que o EPC deve ser sempre priorizado; o EPI e a ultima linha de defesa.' },
      { q: 'Por que o EPC e prioritario em relacao ao EPI?', a: 'Porque o EPC independe da acao do trabalhador e protege automaticamente todos na area. O EPI depende do uso correto e da manutencao pelo trabalhador. Uma falha humana no EPI pode ser fatal; o EPC elimina ou reduz o risco na fonte.' },
      { q: 'O protetor solar e considerado EPI ou EPC?', a: 'Nenhum dos dois. Segundo a NR-6, o protetor solar e classificado como produto de higiene pessoal e nao possui CA do MTE. Para ser EPI, o equipamento deve ter CA valido e funcao especifica de protecao contra risco ocupacional identificado.' },
      { q: 'Quando e obrigatorio usar EPI mesmo tendo EPC?', a: 'O EPI e obrigatorio mesmo com EPC quando o controle coletivo nao e suficiente para neutralizar completamente o risco residual. Por exemplo: em subestacoes com sistema LOTO (EPC), o eletricista ainda usa luvas isolantes e capacete Classe B (EPI) por seguranca adicional.' },
    ],
    siloBox: { label: 'Comprar EPIs Certificados', title: 'Catalogo Completo de EPIs com CA Valido', desc: 'Da luva dieletrica ao cinto paraquedista: todos os EPIs obrigatorios para NR-10 e NR-35 com CA ativo.', href: '/produtos', btnText: 'Ver Catalogo de EPIs' },
    social_proof: {
      quote: `A hierarquia de controle de riscos e clara: o <strong>EPC vem primeiro</strong>. O EPI deve ser a ultima camada, nao a primeira. Empresas que pulam as medidas coletivas e vao direto ao EPI cometem infracao grave e assumem responsabilidade civil e criminal em caso de acidente.`,
      name: 'Eng. Marcus Almeida, CREA-SP',
      credential: 'Engenheiro de Seguranca do Trabalho — Consultor NR-1 e NR-6 por 20 anos',
      badge: 'Especialista Hierarquia de Riscos'
    },
    date: '2026-09-01',
    slug: 'epi-e-epc-qual-a-diferenca-exemplos-e-quando-usar',
    meta_description: 'EPI e EPC: entenda a diferenca, a hierarquia de protecao da NR-6, exemplos praticos por setor (NR-10, NR-35, NR-18) e quando usar cada um na seguranca do trabalho.',
    image_alt: 'Trabalhador com EPI completo (capacete, luvas e cinto) em frente a equipamentos de protecao coletiva em obra.',
    published: true,
  },
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

    const imgUrl = SLUG_IMAGE_MAP[slug] || post.image_url || '/img/blog/o-que-e-epi-significado-tipos-e-exemplos.jpg';
    let postDate = '';
    if (post.date) {
      try { postDate = new Date(post.date).toLocaleDateString('pt-BR'); } catch { postDate = post.date; }
    }

    let html = templateHtml;
    const finalTitle = (post.title.includes('EPI Marketplace') || post.title.length + 18 > 60)
      ? post.title
      : `${post.title} | EPI Marketplace`;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${finalTitle}</title>`);
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
