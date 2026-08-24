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
};

const FALLBACK_POSTS = [
  {
    id: 'real-post-004',
    title: 'EPI para Eletricista: Guia Completo dos Equipamentos Obrigatórios pela NR-10',
    category: 'Eletricidade & NR-10',
    readtime: '6 min',
    summary: 'Conheça todos os EPIs obrigatórios para eletricistas segundo a NR-10, desde luvas isolantes até vestimentas antichama, e garanta proteção máxima contra choque e arco elétrico.',
    content: `<h2>A importância dos EPIs no setor elétrico</h2>
<p>O trabalho com eletricidade exige precisão absoluta e rigor técnico inegociável. Qualquer descuido em instalações elétricas, sejam de baixa, média ou alta tensão, pode resultar em acidentes graves, como choques elétricos, queimaduras térmicas e explosões por arco elétrico. Por essa razão, a <strong>Norma Regulamentadora 10 (NR-10)</strong> e a <strong>NR-6</strong> do Ministério do Trabalho estabelecem diretrizes estritas para a especificação e o uso de <strong>EPIs para eletricistas</strong>.</p>
<p>Na <strong>EPI Marketplace</strong>, reforçamos que o equipamento de proteção individual é a última barreira de defesa do trabalhador. Conhecer a lista completa dos itens obrigatórios e saber como utilizá-los corretamente é fundamental para engenheiros, técnicos de segurança do trabalho (TST) e eletricistas.</p>
<h2>O que diz a NR-10 sobre a proteção do eletricista?</h2>
<p>A NR-10 determina que todas as medidas de proteção coletiva (EPCs), como desenergização, bloqueio, etiquetagem (LOTO) e barreiras isolantes, devem ser priorizadas. No entanto, quando essas medidas não forem suficientes ou durante intervenções em circuitos energizados (Linha Viva), o uso de <strong>EPIs adequados à classe de tensão e ao risco térmico de arco elétrico</strong> torna-se mandatório.</p>
<h2>Lista completa de EPIs obrigatórios para eletricistas</h2>
<h3>1. Luvas Isolantes de Borracha e Luvas de Cobertura</h3>
<p>As <strong>luvas isolantes de borracha</strong> são o principal equipamento para proteção contra choques elétricos. Elas são classificadas de acordo com a tensão máxima de trabalho (Classe 00 até Classe 4). Para garantir a integridade da borracha contra furos, abrasão e cortes, é obrigatório utilizar uma <strong>luva de cobertura em vaqueta ou raspa</strong> sobre a luva isolante.</p>
<h3>2. Capacete de Segurança Classe B</h3>
<p>Diferente do capacete convencional (Classe A), o <strong>capacete Classe B</strong> é submetido a rigorosos testes de rigidez dielétrica, oferecendo proteção contra impactos e isolamento contra descargas elétricas de até 30.000 Volts. Deve ser utilizado sempre acompanhado de jugular não condutiva.</p>
<h3>3. Vestimentas Especiais Antichama (Risco de Arco Elétrico e Fogo Repentino)</h3>
<p>A NR-10 exige que as roupas de trabalho sejam confeccionadas com tecidos 100% algodão ou fibras inerentemente antichama (como aramida/poliamida), com classificação <strong>ATPV (Arc Thermal Performance Value)</strong> compatível com o estudo de energia incidente da instalação (geralmente Risco 2 ou superior).</p>
<h3>4. Calçados de Segurança Dielétricos</h3>
<p>As <strong>botinas de segurança para eletricista</strong> devem ser 100% livres de componentes metálicos (tecnologia Composite). O solado proporciona isolamento elétrico fundamental contra tensões de passo e de toque.</p>
<h3>5. Protetor Facial contra Arco Elétrico e Óculos de Segurança</h3>
<p>Para trabalhos em painéis energizados e cabines primárias, o uso de <strong>protetor facial com visor de policarbonato com proteção contra arco elétrico</strong> é obrigatório.</p>
<h3>6. Cinto Paraquedista Dielétrico e Talabarte para Altura</h3>
<p>Em atividades que combinam trabalho em altura e proximidade com redes elétricas, deve-se utilizar <strong>cintos tipo paraquedista com argolas e fivelas isoladas/revestidas (dielétricas)</strong>.</p>
<h2>Classes de Tensão das Luvas Isolantes</h2>
<p>A escolha correta da luva isolante depende diretamente da tensão da rede: Classe 00 (até 500 V), Classe 0 (até 1.000 V), Classe 1 (até 7.500 V), Classe 2 (até 17.000 V), Classe 3 (até 26.500 V) e Classe 4 (até 36.000 V).</p>
<h2>Inspeção diária e teste dielétrico periódico</h2>
<p>Antes de cada turno, realize o teste pneumático manual de insuflamento de ar nas luvas isolantes para verificar microfuros. As luvas devem passar por ensaios elétricos periódicos em laboratório credenciado.</p>
<h2>Garanta EPIs certificados e com CA ativo na EPI Marketplace</h2>
<p>Compre EPIs para eletricistas com Certificado de Aprovação (CA) ativo e laudos de ensaio atualizados na EPI Marketplace.</p>`,
    date: '2026-08-24',
    slug: 'epi-para-eletricista-equipamentos-obrigatorios-nr-10',
    meta_description: 'Conheça a lista completa de EPIs para eletricista exigidos pela NR-10. Saiba como escolher luvas isolantes, capacete classe B, vestimentas antichama e botinas dielétricas.',
    image_alt: 'Eletricista profissional utilizando luvas isolantes de borracha e vestimenta de proteção contra arco elétrico conforme a NR-10',
    published: true,
  },
  {
    id: 'real-post-001',
    title: 'Guia prático: Como se proteger no trabalho utilizando EPI de forma eficiente',
    category: 'EPIs',
    readtime: '5 min',
    summary: 'Descubra as melhores práticas e a importância vital de saber como se proteger no trabalho utilizando EPI para garantir sua integridade física e produtividade.',
    content: `<p>O uso correto de Equipamentos de Proteção Individual (EPIs) é indispensável em qualquer ambiente de trabalho que apresente riscos à saúde ou integridade física do trabalhador.</p>
<h2>Por que o EPI é obrigatório?</h2>
<p>A <strong>NR-6 do Ministério do Trabalho</strong> determina que o empregador é obrigado a fornecer aos trabalhadores, gratuitamente, EPI adequado ao risco, em perfeito estado de conservação e funcionamento. O não cumprimento sujeita a empresa a multas e interdições.</p>
<h2>Como escolher o EPI correto?</h2>
<p>Antes de adquirir qualquer equipamento, é fundamental realizar a <strong>Análise de Risco</strong> do ambiente de trabalho. Cada atividade exige um tipo específico de proteção — capacetes para riscos de impacto, luvas para cortes ou agentes químicos, protetores auriculares para ruídos acima de 85 dB.</p>
<h2>Cuidados de conservação</h2>
<p>EPIs mal conservados perdem sua eficiência. Inspecione regularmente o estado dos equipamentos e substitua imediatamente qualquer item que tenha sofrido dano ou que já tenha atingido sua vida útil.</p>`,
    date: '2026-07-22',
    slug: 'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente',
    meta_description: 'Descubra como se proteger no trabalho utilizando EPI de forma eficiente. Veja as principais recomendações de uso, conservação e treinamento de segurança.',
    image_alt: 'Trabalhador profissional utilizando capacete, óculos de proteção e luvas em ambiente de construção.',
    published: true,
  },
  {
    id: 'real-post-002',
    title: 'CA de EPI: como verificar a validade e por que ele é essencial para a segurança',
    category: 'Certificação',
    readtime: '4 min',
    summary: 'Descubra tudo sobre o CA de EPI, como consultar a validade no sistema do Ministério do Trabalho e por que garantir esse certificado é crucial para sua empresa.',
    content: `<p>O <strong>Certificado de Aprovação (CA)</strong> é o documento emitido pelo Ministério do Trabalho e Emprego que atesta a eficiência e qualidade de um EPI para a proteção do trabalhador brasileiro.</p>
<h2>O que é o CA de EPI?</h2>
<p>Todo EPI comercializado legalmente no Brasil precisa ter o CA impresso no produto ou na embalagem. Esse número permite ao empregador verificar se o equipamento é realmente certificado e se sua validade está em dia.</p>
<h2>Como consultar a validade do CA?</h2>
<p>Acesse o portal <strong>CNCA (Cadastro Nacional de Certificados de Aprovação)</strong> em consultacnca.trabalho.gov.br, digite o número do CA e confirme se o equipamento está regular.</p>
<h2>Riscos de comprar EPI sem CA válido</h2>
<p>Além de colocar a vida dos colaboradores em risco, a compra de equipamentos não certificados ou com CA vencido sujeita a empresa a <strong>multas pesadas</strong>, interdições e responsabilidade civil em caso de acidentes.</p>`,
    date: '2026-07-20',
    slug: 'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca',
    meta_description: 'Saiba como verificar a validade do CA de EPI e por que este Certificado de Aprovação é obrigatório para garantir a segurança jurídica e física na sua empresa.',
    image_alt: 'Homem verificando o selo de CA de EPI gravado em uma luva de proteção industrial.',
    published: true,
  },
  {
    id: 'real-post-003',
    title: 'NR-10 NR-35: Guia Completo sobre as Normas e EPIs Necessários',
    category: 'Normas',
    readtime: '6 min',
    summary: 'Confira as atualizações essenciais das normas NR-10 NR-35, descubra as exigências para trabalho em altura e elétrico e saiba quais EPIs garantem sua proteção.',
    content: `<p>As <strong>Normas Regulamentadoras NR-10 e NR-35</strong> estabelecem os requisitos mínimos de segurança para trabalhadores que atuam em instalações elétricas e em trabalhos em altura.</p>
<h2>O que é a NR-10?</h2>
<p>A NR-10 regula a segurança em instalações e serviços de eletricidade. Todo profissional que trabalha com energia elétrica deve ter treinamento específico e utilizar EPIs com proteção à tensão adequada ao risco, como <strong>luvas isolantes, capacetes com aba total e calçados de segurança dielétricos</strong>.</p>
<h2>O que é a NR-35?</h2>
<p>A NR-35 trata do trabalho em altura — qualquer atividade realizada acima de 2 metros do nível inferior. Exige o uso de <strong>cintos paraquedistas com duplo talabarte Y</strong>, capacetes com jugular e trava-quedas certificados.</p>
<h2>Principais EPIs exigidos</h2>
<p>Para NR-10: luvas isolantes classe 00 a 4, óculos de proteção, vestimentas arc flash e calçados dielétricos. Para NR-35: cintos tipo paraquedista, trava-quedas deslizante, talabarte de posicionamento e capacete com jugular resistente.</p>`,
    date: '2026-07-18',
    slug: 'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios',
    meta_description: 'Entenda a relação entre as normas NR-10 e NR-35 e quais EPIs são obrigatórios para trabalhos seguros com eletricidade e em altura.',
    image_alt: 'Trabalhador com capacete e talabartes de segurança em trabalho em altura.',
    published: true,
  },
];

async function fetchPosts() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,category,readtime,image_url,image_alt,summary,content,date,slug,published&published=eq.true`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Aviso: Supabase respondeu com status ${res.status}. Usando fallback.`);
      return FALLBACK_POSTS;
    }

    const posts = await res.json();
    if (!posts || posts.length === 0) {
      return FALLBACK_POSTS;
    }
    return posts;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`Aviso ao consultar Supabase (${err.message}). Usando fallback local.`);
    return FALLBACK_POSTS;
  }
}

async function buildBlog() {
  console.log('🚀 Iniciando Static Site Generation (SSG) para o Blog...');
  
  const posts = await fetchPosts();
  console.log(`Processando ${posts.length} posts.`);

  // Template base
  const templatePath = path.resolve(cwd, 'dist/artigo.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/artigo.html não encontrado! Rode o vite build primeiro.');
    process.exit(1);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  for (const post of posts) {
    const slug = post.slug;
    if (!slug) continue;
    console.log(`- Gerando página estática para: /blog/${slug}`);

    const imgUrl = SLUG_IMAGE_MAP[slug] || post.image_url || 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=800&q=80';
    let postDate = '';
    if (post.date) {
      try {
        postDate = new Date(post.date).toLocaleDateString('pt-BR');
      } catch {
        postDate = post.date;
      }
    }
    
    let html = templateHtml;

    // SEO Head replacement
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${post.title} | EPI Marketplace</title>`);
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${post.meta_description || post.summary || post.title}">`);
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="https://epimarketplace.com/blog/${slug}">`);

    // OpenGraph
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${post.title}">`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${post.meta_description || post.summary || post.title}">`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="https://epimarketplace.com/blog/${slug}">`);
    html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${imgUrl.startsWith('http') ? imgUrl : `https://epimarketplace.com${imgUrl}`}">`);

    // Schema JSON-LD Article
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "image": [ imgUrl.startsWith('http') ? imgUrl : `https://epimarketplace.com${imgUrl}` ],
      "datePublished": post.date || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "EPI Marketplace"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EPI Marketplace",
        "logo": {
          "@type": "ImageObject",
          "url": "https://epimarketplace.com/img/logo.png"
        }
      }
    };

    html = html.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n  </script>\n</head>`);

    // Content formatting
    let contentHtml = post.content || '';
    if (!contentHtml.includes('<p>') && !contentHtml.includes('<h2>') && !contentHtml.includes('<article>')) {
      let lines = contentHtml.split('\n');
      let inParagraph = false;
      let formatted = '';

      lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) {
          if (inParagraph) { formatted += '</p>'; inParagraph = false; }
          return;
        }

        if (trimmed.startsWith('### ')) {
          if (inParagraph) { formatted += '</p>'; inParagraph = false; }
          formatted += `<h3>${trimmed.substring(4)}</h3>`;
        } else if (trimmed.startsWith('## ')) {
          if (inParagraph) { formatted += '</p>'; inParagraph = false; }
          formatted += `<h2>${trimmed.substring(3)}</h2>`;
        } else if (trimmed.startsWith('# ')) {
          if (inParagraph) { formatted += '</p>'; inParagraph = false; }
          formatted += `<h2>${trimmed.substring(2)}</h2>`;
        } else {
          if (!inParagraph) { formatted += '<p>'; inParagraph = true; }
          else { formatted += '<br>'; }
          formatted += trimmed;
        }
      });
      if (inParagraph) formatted += '</p>';
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      contentHtml = formatted;
    }

    // Replace static elements in HTML
    html = html.replace(/<div id="loading" class="loading-spinner">[\s\S]*?<\/p>\s*<\/div>/i, '<div id="loading" class="loading-spinner" style="display: none;"></div>');
    html = html.replace(/<article id="article-view" class="blog-article"[^>]*>/i, '<article id="article-view" class="blog-article" style="display: block;">');
    
    html = html.replace(/<span id="post-category"[^>]*>.*?<\/span>/i, `<span id="post-category" class="article-tag">${post.category || 'EPIs'}</span>`);
    html = html.replace(/<span id="post-date"[^>]*>.*?<\/span>/i, `<span id="post-date">${postDate}</span>`);
    html = html.replace(/<span id="post-readtime"[^>]*>.*?<\/span>/i, `<span id="post-readtime">${post.readtime || '5 min'}</span>`);
    html = html.replace(/<h1 id="post-title"[^>]*>.*?<\/h1>/i, `<h1 id="post-title">${post.title}</h1>`);
    html = html.replace(/<img id="post-img"[^>]*>/i, `<img id="post-img" src="${imgUrl}" alt="${post.image_alt || post.title}" class="article-hero-image" loading="lazy" decoding="async">`);
    html = html.replace(/<div id="post-content" class="article-content">[\s\S]*?<\/div>/i, `<div id="post-content" class="article-content">\n${contentHtml}\n      </div>`);

    // Ensure directory exists
    const dirPath = path.resolve(cwd, `dist/blog/${slug}`);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
  }

  console.log('✅ SSG concluído com sucesso!');
}

buildBlog().catch(err => {
  console.error('Erro no SSG:', err);
  process.exit(1);
});
