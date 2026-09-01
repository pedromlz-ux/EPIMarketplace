const fs = require('fs');
const path = require('path');

const dir = '/Users/pm/Site SPIDER/epi-marketplace';

const seoData = {
  'index.html': {
    title: 'Loja de EPI | EPIs com CA Válido — EPI Marketplace',
    description: 'Loja de EPI online com CA válido. Distribuidora de EPIs para eletricistas (NR-10) e trabalho em altura (NR-35): cintos paraquedistas, luvas isolantes e ferramentas linha viva.',
    keywords: 'loja de EPI, loja EPI, EPIs, EPI Marketplace, distribuidora de EPI, EPI com CA, EPI para eletricista, NR-10, NR-35'
  },
  'produtos.html': {
    title: 'Catálogo de EPIs | EPI Marketplace',
    description: 'Explore o catálogo de EPIs certificados da EPI Marketplace. Cintos paraquedistas, luvas isolantes, ferramentas NR-10 e trava-quedas NR-35 com CA válido e entrega nacional.',
    keywords: 'comprar EPI, catálogo de EPI, cinto paraquedista, luvas isolantes, trava-quedas, equipamentos proteção individual'
  },
  'sobre.html': {
    title: 'Sobre a EPI Marketplace | Distribuidora de EPIs com CA',
    description: 'Conheça a EPI Marketplace: distribuidora especializada em EPIs certificados para NR-10 e NR-35, com entrega em todo o Brasil e sede em Jundiaí/SP.',
    keywords: 'empresa de EPI, sobre EPI marketplace, segurança do trabalho, distribuidora EPI Jundiaí, fornecedor EPI'
  },
  'contato.html': {
    title: 'Contato e Orçamentos B2B | EPI Marketplace',
    description: 'Solicite orçamento B2B de EPIs com CA para sua empresa. Condições especiais no atacado e suporte técnico especializado em normas NR-10 e NR-35.',
    keywords: 'contato EPI, orçamento EPI B2B, distribuidora EPI contato, comprar EPI atacado'
  },
  'blog.html': {
    title: 'Blog de Segurança do Trabalho | EPI Marketplace',
    description: 'Guias técnicos, dicas de conservação e atualizações sobre normas NR-10 e NR-35. Aprenda a escolher e usar EPIs certificados com CA para proteção total.',
    keywords: 'blog de segurança do trabalho, dicas NR-10, novidades NR-35, validade CA de EPI'
  },
  'artigo.html': {
    title: 'Artigo | EPI Marketplace',
    description: 'Artigos técnicos sobre segurança do trabalho: normas NR-10 e NR-35, escolha de EPIs com CA válido e proteção para eletricistas e trabalho em altura.',
    keywords: 'artigo de segurança do trabalho, EPI, NR-10, NR-35'
  },
  'termos.html': {
    title: 'Termos de Uso | EPI Marketplace',
    description: 'Termos e Condições de Uso da EPI Marketplace. Conheça seus direitos e as políticas de compra da nossa distribuidora de EPIs certificados.',
    keywords: 'termos de uso EPI Marketplace, condições de compra'
  },
  'privacidade.html': {
    title: 'Política de Privacidade | EPI Marketplace',
    description: 'Política de Privacidade e Proteção de Dados da EPI Marketplace em conformidade com a LGPD. Saiba como tratamos e protegemos seus dados pessoais.',
    keywords: 'política de privacidade EPI Marketplace, segurança de dados'
  }
};

const jsonLd = `
  <!-- =============================================
       JSON-LD STRUCTURED DATA
  ============================================= -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "EPI Marketplace",
    "description": "Distribuidora de Equipamentos de Proteção Individual (EPIs) com CA, especializada em NR-10 e NR-35.",
    "url": "https://epimarketplace.com/",
    "telephone": "+5511989088928",
    "email": "contato@epimarketplace.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-12:00"
  }
  </script>`;

for (const [filename, seo] of Object.entries(seoData)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filename}, not found.`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Title
  content = content.replace(/<title>[\s\S]*?<\/title>/g, `<title>${seo.title}</title>`);
  
  // Replace Description
  content = content.replace(/<meta\s+name=["']description["'][\s\S]*?>/ig, `<meta name="description" content="${seo.description}">`);
  
  // Replace or Add Keywords
  if (content.match(/<meta\s+name=["']keywords["']/i)) {
    content = content.replace(/<meta\s+name=["']keywords["'][\s\S]*?>/ig, `<meta name="keywords" content="${seo.keywords}">`);
  } else {
    // Insert after description if not found
    content = content.replace(/(<meta name="description" content="[^"]*">)/, `$1\n  <meta name="keywords" content="${seo.keywords}">`);
  }
  
  // Replace OG tags if exist
  if (content.match(/<meta\s+property=["']og:title["']/i)) {
    content = content.replace(/<meta\s+property=["']og:title["'][\s\S]*?>/ig, `<meta property="og:title" content="${seo.title}">`);
  }
  if (content.match(/<meta\s+property=["']og:description["']/i)) {
    content = content.replace(/<meta\s+property=["']og:description["'][\s\S]*?>/ig, `<meta property="og:description" content="${seo.description}">`);
  }

  // Inject JSON-LD into index.html
  if (filename === 'index.html' && !content.includes('application/ld+json')) {
    content = content.replace('</head>', `${jsonLd}\n</head>`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated SEO for ${filename}`);
}

