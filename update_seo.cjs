const fs = require('fs');
const path = require('path');

const dir = '/Users/pm/Site SPIDER/epi-marketplace';

const seoData = {
  'index.html': {
    title: 'EPI Marketplace | Distribuidora de EPIs com CA (NR-10 e NR-35)',
    description: 'Compre Equipamentos de Proteção Individual (EPI) online com CA válido. Somos especialistas em NR-10 e NR-35: cintos, ferramentas de linha viva e luvas isolantes.',
    keywords: 'comprar EPI, EPI com CA, distribuidora de EPI, EPI para eletricista, equipamentos de segurança do trabalho, ferramentas linha viva, NR-10, NR-35'
  },
  'produtos.html': {
    title: 'Catálogo de EPIs Certificados | EPI Marketplace',
    description: 'Explore nosso catálogo de EPIs certificados. Produtos para trabalho em altura (NR-35) e eletricistas (NR-10). Proteção garantida e CA válido.',
    keywords: 'catálogo de EPI, comprar cinto paraquedista, luvas isolantes, trava-quedas, equipamentos proteção individual'
  },
  'sobre.html': {
    title: 'Sobre a EPI Marketplace | Especialistas em Segurança do Trabalho',
    description: 'Conheça a EPI Marketplace: uma empresa brasileira focada em fornecer os melhores Equipamentos de Proteção Individual (EPIs) para redes elétricas e trabalhos em altura.',
    keywords: 'empresa de EPI, sobre EPI marketplace, segurança do trabalho, loja de EPI, fornecedor EPI'
  },
  'contato.html': {
    title: 'Contato | Orçamento B2B e Suporte Técnico - EPI Marketplace',
    description: 'Fale com a EPI Marketplace. Solicite um orçamento de EPIs B2B para a sua empresa ou tire dúvidas técnicas sobre as normas NR-10 e NR-35.',
    keywords: 'contato EPI, orçamento EPI B2B, distribuidora EPI contato, comprar EPI atacado'
  },
  'blog.html': {
    title: 'Blog de Segurança do Trabalho | Dicas e Normas (NR) | EPI Marketplace',
    description: 'Acompanhe nosso blog sobre segurança do trabalho. Fique por dentro de atualizações das normas NR-10 e NR-35, e saiba como escolher e conservar seus EPIs.',
    keywords: 'blog de segurança do trabalho, dicas NR-10, novidades NR-35, validade CA de EPI, conservação EPI'
  },
  'artigo.html': {
    title: 'Artigo | EPI Marketplace',
    description: 'Artigos técnicos focados em segurança do trabalho, ferramentas isoladas e proteção para eletricistas e trabalhos em altura (NR-10 / NR-35).',
    keywords: 'artigo de segurança, NR-10, NR-35, equipamento de segurança'
  },
  'termos.html': {
    title: 'Termos de Uso | EPI Marketplace',
    description: 'Termos e Condições de Uso da plataforma EPI Marketplace. Conheça seus direitos, deveres e as políticas de compra da nossa loja de EPIs.',
    keywords: 'termos de uso EPI Marketplace, condições de compra'
  },
  'privacidade.html': {
    title: 'Política de Privacidade | EPI Marketplace',
    description: 'Política de Privacidade e Proteção de Dados da EPI Marketplace (em conformidade com a LGPD). Entenda como tratamos e protegemos seus dados.',
    keywords: 'política de privacidade EPI, segurança de dados'
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
    "telephone": "+5511941493029",
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

