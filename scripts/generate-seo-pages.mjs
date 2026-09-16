import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const whatsappUrl = 'https://wa.me/5511989088928?text=Olá!%20Vim%20pelo%20site%20e%20quero%20um%20orçamento%20de%20EPIs.';

const pages = [
  {
    file: 'nr-10.html',
    url: '/nr-10',
    title: 'EPI NR-10 para Eletricistas | EPI Marketplace',
    description: 'Encontre EPI NR-10 para eletricistas: luvas isolantes, ferramentas isoladas, detectores e proteção para serviços elétricos em todo o Brasil.',
    h1: 'EPI NR-10 para Eletricistas e Serviços Elétricos',
    eyebrow: 'Segurança em eletricidade',
    lead: 'EPI NR-10 para eletricistas, equipes de manutenção e serviços em instalações elétricas. Encontre equipamentos para seleção técnica, orçamento empresarial e envio para todo o Brasil.',
    catalog: [
      { href: '/produtos?categoria=linha-viva', title: 'Linha viva e ferramentas isoladas', text: 'Ferramentas, coberturas e acessórios para serviços elétricos.' },
      { href: '/produtos?categoria=detector', title: 'Detectores de tensão', text: 'Equipamentos para verificação conforme a aplicação.' },
      { href: '/produtos?categoria=aterramento', title: 'Aterramento temporário', text: 'Conjuntos e acessórios para procedimentos de segurança.' }
    ],
    sections: [
      {
        heading: 'Como especificar EPI NR-10',
        body: `<p>A escolha de EPI NR-10 não começa pelo produto mais popular: começa pela análise do risco da atividade. Tensão, energia incidente, possibilidade de arco elétrico, ambiente, procedimento de bloqueio e trabalho a ser executado determinam a proteção necessária. A seleção deve ser feita pela empresa com apoio do responsável técnico e conforme as instruções do fabricante.</p><p>No catálogo da EPI Marketplace, a área de linha viva reúne itens usados em operações de manutenção elétrica, como ferramentas isoladas, acessórios de manobra e proteções para a atividade. A página serve para pesquisar o equipamento e solicitar uma cotação; a confirmação de aplicação, referência, disponibilidade e documentação deve ocorrer antes do pedido.</p>`
      },
      {
        heading: 'Equipamentos que podem compor uma solução para eletricistas',
        body: `<p>Dependendo da atividade, uma solução de segurança pode envolver luvas isolantes compatíveis com a classe de tensão, ferramentas isoladas, capacete adequado, vestimenta de proteção, proteção facial, calçado indicado e sistemas de aterramento temporário. Esses itens não formam um kit universal: o risco e o procedimento de trabalho definem a combinação correta.</p><p>Por isso, é importante diferenciar a proteção individual do controle coletivo. Bloqueio, sinalização, seccionamento, aterramento e delimitação de área são medidas essenciais do processo de segurança. O EPI complementa as medidas de controle; ele não substitui uma análise de risco, capacitação ou procedimento operacional.</p>`
      },
      {
        heading: 'O que conferir antes de comprar',
        body: `<p>Em uma compra técnica, confirme o fabricante, a referência do item, a aplicação prevista, as especificações de isolamento e as orientações de inspeção e armazenamento. Quando o item for um EPI sujeito a Certificado de Aprovação, consulte também o número do CA, a situação do certificado e a correspondência entre o produto consultado e o modelo ofertado.</p><p>Para equipes e empresas, o orçamento pode reunir as referências necessárias em uma única solicitação. Isso facilita a comparação entre alternativas, a validação interna e o planejamento de entrega. Se precisar de apoio comercial, envie a lista de produtos, quantidades e aplicação pelo canal de orçamento.</p>`
      }
    ],
    faq: [
      ['Quais equipamentos fazem parte do EPI NR-10?', 'A composição depende da análise de risco e da atividade. Pode envolver, entre outros itens, luvas isolantes, proteção para cabeça e face, vestimentas, calçados e ferramentas isoladas.'],
      ['Ferramenta isolada substitui o uso de EPI?', 'Não. Ferramentas isoladas são um elemento de controle para determinada atividade; a proteção necessária deve considerar todo o procedimento, os riscos e as exigências aplicáveis.'],
      ['Como solicitar orçamento para uma equipe elétrica?', 'Envie as referências ou a descrição da aplicação, as quantidades e o CNPJ pelo WhatsApp ou pela página de contato para avaliação comercial.']
    ]
  },
  {
    file: 'trabalho-em-altura.html',
    url: '/trabalho-em-altura',
    title: 'EPI para Trabalho em Altura NR-35 | EPI Marketplace',
    description: 'Encontre EPI para trabalho em altura NR-35: cintos paraquedistas, talabartes, trava-quedas e acessórios para sua equipe.',
    h1: 'EPI para Trabalho em Altura NR-35',
    eyebrow: 'Proteção contra quedas',
    lead: 'EPI para trabalho em altura NR-35 para pesquisar cintos paraquedistas, talabartes, trava-quedas e acessórios. Solicite orientação comercial e orçamento para entregas em todo o Brasil.',
    catalog: [
      { href: '/produtos?categoria=altura', title: 'Trabalho em altura', text: 'Cintos, talabartes, trava-quedas e dispositivos de ancoragem.' },
      { href: '/produtos?categoria=bolsas', title: 'Bolsas e içamento', text: 'Opções para transporte e organização de ferramentas.' },
      { href: '/produtos?categoria=selas', title: 'Selas, cintas e colares', text: 'Acessórios e soluções para aplicações específicas.' }
    ],
    sections: [
      {
        heading: 'A seleção começa pelo sistema, não apenas pelo cinto',
        body: `<p>O EPI para trabalho em altura faz parte de um sistema de proteção contra quedas. A seleção do cinto paraquedista, talabarte, trava-quedas, conector e ponto de ancoragem precisa considerar a atividade, a estrutura, o deslocamento do trabalhador, a compatibilidade entre os componentes e o plano de resgate. O equipamento deve ser escolhido e utilizado de acordo com as instruções do fabricante e o planejamento da atividade.</p><p>Na EPI Marketplace, a categoria de trabalho em altura concentra itens para pesquisa e cotação, incluindo cintos, talabartes, dispositivos de ancoragem e trava-quedas. A disponibilidade de cada referência deve ser confirmada antes do pedido, assim como as especificações exigidas pela operação.</p>`
      },
      {
        heading: 'Cinto, talabarte e trava-quedas têm funções diferentes',
        body: `<p>O cinto paraquedista é o elemento de vestimenta de retenção de queda. O talabarte é um elemento de ligação e pode ter configurações adequadas para posicionamento, retenção ou deslocamento, conforme o modelo e a aplicação. Já o trava-quedas atua como parte de sistemas específicos. Nenhum desses itens deve ser escolhido isoladamente ou com base apenas na aparência.</p><p>Antes da compra, confirme a referência, os pontos de conexão previstos, o tipo de conector, a extensão necessária e as limitações de uso. A distância livre de queda e a compatibilidade do conjunto precisam ser avaliadas no planejamento do trabalho por pessoa qualificada.</p>`
      },
      {
        heading: 'Compra empresarial com mais rastreabilidade',
        body: `<p>Para empresas, a padronização de referências ajuda a controlar treinamentos, inspeções, substituições e documentação. Uma cotação organizada por função e aplicação reduz o risco de comparar itens que parecem similares, mas possuem características técnicas diferentes. Inclua as quantidades, o tipo de atividade e, quando houver, as referências já homologadas pela empresa.</p><p>O conteúdo desta página é informativo e não substitui análise de risco, procedimento de trabalho, treinamento ou inspeção do equipamento. Para revisar o catálogo disponível, acesse a categoria de trabalho em altura e envie sua solicitação de orçamento.</p>`
      }
    ],
    faq: [
      ['Qual EPI é usado em trabalho em altura?', 'A definição depende da atividade e do sistema de proteção contra quedas. Cinto paraquedista, talabarte, trava-quedas e conectores podem fazer parte do conjunto conforme o planejamento técnico.'],
      ['Talabarte simples e duplo têm a mesma aplicação?', 'Não necessariamente. A configuração deve ser compatível com o deslocamento e o sistema de segurança planejado para a atividade.'],
      ['Como pedir cotação de equipamentos para altura?', 'Envie as referências desejadas, quantidades e informações da aplicação para que a equipe comercial possa orientar a cotação.']
    ]
  },
  {
    file: 'aterramento.html',
    url: '/aterramento',
    title: 'Kit de Aterramento Temporário | EPI Marketplace',
    description: 'Pesquise kit de aterramento temporário, grampos, cabos e varas de manobra para procedimentos de segurança em serviços elétricos.',
    h1: 'Kit de Aterramento Temporário e Acessórios',
    eyebrow: 'Controle de risco elétrico',
    lead: 'Kit de aterramento temporário, grampos, cabos e varas de manobra para pesquisa, cotação e planejamento de compras técnicas em serviços elétricos.',
    catalog: [
      { href: '/produtos?categoria=aterramento', title: 'Conjuntos de aterramento', text: 'Cabos, grampos, bastões e acessórios de aterramento.' },
      { href: '/produtos?categoria=grampos', title: 'Grampos e cabeçotes', text: 'Componentes para aplicações e configurações específicas.' },
      { href: '/produtos?categoria=linha-viva', title: 'Linha viva', text: 'Outros equipamentos para manutenção de redes elétricas.' }
    ],
    sections: [
      {
        heading: 'Aterramento temporário é parte de um procedimento',
        body: `<p>Um kit de aterramento temporário é usado em procedimentos de segurança para serviços elétricos, mas a sua especificação não pode ser definida apenas pelo nome do item. Rede, nível de tensão, ponto de instalação, capacidade de curto-circuito, sequência de manobra e procedimento da operação influenciam a seleção. A instalação e a retirada devem seguir o procedimento aplicável e ser executadas por profissionais autorizados.</p><p>Esta página organiza o acesso aos conjuntos de aterramento, grampos e acessórios presentes no catálogo. Ela não substitui projeto, procedimento operacional ou avaliação técnica da instalação. Para cada pedido, confirme a referência do produto e sua compatibilidade com a aplicação planejada.</p>`
      },
      {
        heading: 'O que avaliar no conjunto e nos acessórios',
        body: `<p>O conjunto pode incluir cabos, grampos, bastões, conectores e outros componentes. A escolha depende das características da instalação e do método de trabalho. Também é importante verificar as instruções do fabricante, a integridade dos componentes, a identificação do item e os limites previstos para uso.</p><p>Grampos e cabeçotes, por exemplo, podem parecer semelhantes visualmente, mas se destinam a condutores, barramentos ou pontos de conexão diferentes. Ao solicitar cotação, informe o ambiente de aplicação, a referência conhecida e as características exigidas pelo procedimento da empresa para diminuir o risco de adquirir uma solução incompatível.</p>`
      },
      {
        heading: 'Como organizar a compra para equipes técnicas',
        body: `<p>Para manutenção elétrica, a compra costuma envolver mais de um grupo de itens: aterramento, ferramentas isoladas, detecção de tensão, sinalização e proteção individual. Centralizar a lista em uma solicitação de orçamento facilita a conferência das quantidades e a padronização das referências por equipe.</p><p>A EPI Marketplace atende pedidos comerciais por catálogo, WhatsApp e contato. Para uma análise mais objetiva, envie a lista de materiais, as quantidades e o CNPJ. A confirmação de preço, prazo e disponibilidade é feita no atendimento comercial.</p>`
      }
    ],
    faq: [
      ['O que compõe um kit de aterramento temporário?', 'A composição varia pela aplicação e pode incluir cabos, grampos, bastões, conectores e outros acessórios. A especificação deve seguir o procedimento técnico da instalação.'],
      ['Posso usar qualquer grampo em qualquer rede?', 'Não. O componente deve ser compatível com o ponto de conexão, o condutor, a aplicação e as orientações técnicas pertinentes.'],
      ['Como cotar um conjunto de aterramento?', 'Informe a aplicação, referências desejadas, quantidades e dados da empresa para receber orientação comercial.']
    ]
  },
  {
    file: 'epi-para-empresas.html',
    url: '/epi-para-empresas',
    title: 'EPI para Empresas e Atacado | EPI Marketplace',
    description: 'Compre EPI para empresas e atacado: equipamentos com CA válido, suporte comercial, cotação por quantidade e envio para todo o Brasil.',
    h1: 'EPI para Empresas, Atacado e Compras Corporativas',
    eyebrow: 'Compras B2B',
    lead: 'EPI para empresas, compras corporativas e pedidos por quantidade. Pesquise equipamentos com CA válido e solicite cotação para entrega em todo o Brasil.',
    catalog: [
      { href: '/nr-10', title: 'EPI NR-10', text: 'Pesquisa para eletricistas e manutenção elétrica.' },
      { href: '/trabalho-em-altura', title: 'EPI NR-35', text: 'Pesquisa para trabalho em altura e retenção de quedas.' },
      { href: '/aterramento', title: 'Aterramento temporário', text: 'Itens para procedimentos de segurança elétrica.' }
    ],
    sections: [
      {
        heading: 'Uma página comercial para quem compra para equipes',
        body: `<p>A compra de EPI para empresas tem necessidades diferentes da compra pontual. Compras corporativas precisam comparar referências, organizar quantidades, registrar requisitos técnicos e confirmar condições comerciais antes da aprovação interna. Esta página centraliza o pedido de orçamento para empresas que buscam equipamentos de segurança para equipes de manutenção, construção, operações elétricas e outras atividades.</p><p>O catálogo da EPI Marketplace reúne linhas relacionadas a NR-10, NR-35, trabalho em altura, aterramento, sinalização e ferramentas. Use as páginas técnicas para pesquisar as famílias de produto e envie uma lista consolidada para receber uma cotação comercial.</p>`
      },
      {
        heading: 'O que enviar em uma solicitação de cotação',
        body: `<p>Para agilizar o atendimento, informe a razão social ou CNPJ, o responsável pela compra, os produtos ou referências desejadas, as quantidades e a aplicação prevista. Quando a empresa já utiliza modelos homologados, inclua fabricante, SKU, CA ou ficha técnica de referência. Esses dados ajudam a reduzir retrabalho e facilitam a comparação de itens equivalentes.</p><p>Se a necessidade ainda estiver em definição, descreva a atividade e o tipo de risco para que a equipe comercial organize o atendimento. A decisão técnica sobre o equipamento adequado deve respeitar a análise de risco, as normas aplicáveis e as orientações de profissionais habilitados.</p>`
      },
      {
        heading: 'Compras recorrentes e padronização de referências',
        body: `<p>Manter referências padronizadas por função ajuda a empresa a controlar reposição, documentação e treinamento. Também reduz o risco de adquirir itens visualmente parecidos, porém inadequados para a mesma aplicação. Sempre que possível, mantenha o histórico de especificações, lotes, certificados e fichas técnicas junto ao processo de compras.</p><p>A EPI Marketplace realiza vendas online e atendimento comercial por WhatsApp. O preço, o prazo, a disponibilidade e as condições de entrega são confirmados no orçamento ou na plataforma de compra escolhida. Para iniciar, envie sua lista de itens e quantidades.</p>`
      }
    ],
    faq: [
      ['A EPI Marketplace atende compras por CNPJ?', 'Sim. A página de contato e o WhatsApp recebem solicitações de orçamento para empresas e pedidos por quantidade.'],
      ['O que preciso informar para pedir uma cotação?', 'Envie referências, quantidades, aplicação, dados da empresa e, quando houver, exigências de ficha técnica ou CA.'],
      ['Onde encontro equipamentos para NR-10 e NR-35?', 'Use as páginas de NR-10 e trabalho em altura para pesquisar as linhas e depois envie a lista desejada para cotação.']
    ]
  },
  {
    file: 'consultar-ca-epi.html',
    url: '/consultar-ca-epi',
    title: 'Como Consultar CA de EPI | EPI Marketplace',
    description: 'Saiba como consultar CA de EPI, conferir fabricante, descrição e situação do certificado antes de comprar equipamentos de proteção individual.',
    h1: 'Como Consultar CA de EPI Antes da Compra',
    eyebrow: 'Certificado de aprovação',
    lead: 'Aprenda como consultar CA de EPI, conferir a identificação do equipamento e validar as informações antes de uma compra para sua equipe.',
    catalog: [
      { href: '/produtos', title: 'Ver catálogo de EPIs', text: 'Pesquise as categorias e referências disponíveis.' },
      { href: '/nr-10', title: 'EPI NR-10', text: 'Equipamentos para serviços elétricos.' },
      { href: '/trabalho-em-altura', title: 'EPI NR-35', text: 'Equipamentos para trabalho em altura.' }
    ],
    sections: [
      {
        heading: 'O que é o CA de um EPI',
        body: `<p>O Certificado de Aprovação, conhecido como CA, é a identificação associada a determinados equipamentos de proteção individual. Antes de comprar um EPI, é importante conferir se o certificado consultado corresponde ao fabricante, à descrição e à referência do produto que será adquirido. A consulta deve ser feita em fonte oficial e não substitui a análise de risco ou as orientações de uso do fabricante.</p><p>O Ministério do Trabalho e Emprego disponibiliza a consulta pública no sistema CAEPI. Nela, o comprador pode pesquisar pelo número do CA e verificar as informações apresentadas para o certificado. Guarde a consulta e a ficha técnica no processo de compra, especialmente em pedidos corporativos.</p>`
      },
      {
        heading: 'Passo a passo para consultar o certificado',
        body: `<ol><li>Localize o número do CA informado para o equipamento ou na sua identificação.</li><li>Acesse a <a href="https://caepi.trabalho.gov.br/internet/ConsultaCAInternet.aspx" target="_blank" rel="noopener noreferrer">consulta pública do CAEPI</a>.</li><li>Pesquise o número do certificado e confira fabricante, descrição, tipo de proteção e situação exibida.</li><li>Compare as informações com a referência, a ficha técnica e a aplicação desejada.</li><li>Confirme as condições comerciais e a disponibilidade antes de concluir a compra.</li></ol><p>Para equipamentos adquiridos com CA válido, a empresa também deve observar as condições de armazenamento e a validade indicada pelo fabricante ou importador. Por isso, não trate o número do CA como único critério de seleção.</p>`
      },
      {
        heading: 'Cuidados ao comparar produtos',
        body: `<p>Dois produtos podem ter nomes parecidos e aplicações diferentes. Ao comparar opções, verifique o fabricante, a referência, o material, a proteção declarada, a classe ou o tamanho quando aplicável e as limitações de uso. Não use uma consulta genérica de CA para concluir que qualquer item semelhante é adequado.</p><p>Se sua empresa precisa adquirir vários itens, reúna o número do CA, a ficha técnica e a referência de cada produto na solicitação de orçamento. A EPI Marketplace pode apoiar a pesquisa comercial das referências disponíveis; a definição técnica final deve seguir a avaliação de risco e os procedimentos da organização.</p>`
      }
    ],
    faq: [
      ['Onde consultar o CA de um EPI?', 'A consulta pública é disponibilizada pelo Ministério do Trabalho e Emprego no sistema CAEPI.'],
      ['O CA sozinho define se o EPI é adequado?', 'Não. A empresa deve verificar a correspondência do modelo, a aplicação, as limitações de uso e a análise de risco.'],
      ['O que comparar na consulta do CA?', 'Compare número, fabricante, descrição, tipo de proteção e referência do produto com a documentação fornecida.']
    ]
  }
];

const deepCategoryPages = [
  {
    slug: 'linha-viva',
    title: 'Equipamentos para Linha Viva | EPI Marketplace',
    description: 'Pesquise equipamentos para linha viva, manutenção de redes elétricas, ferramentas e acessórios para solicitar cotação em todo o Brasil.',
    h1: 'Equipamentos para Linha Viva e Redes Elétricas',
    eyebrow: 'Manutenção de redes',
    term: 'equipamentos para linha viva',
    specialty: 'operações em redes elétricas, manobras, manutenção e procedimentos definidos pela organização',
    checks: 'a referência do item, o procedimento aplicável, a tensão, as limitações de uso e as instruções do fabricante',
    catalog: [
      { href: '/ferramentas-isoladas', title: 'Ferramentas isoladas', text: 'Alicates, chaves e itens para avaliação técnica.' },
      { href: '/detector-de-tensao', title: 'Detectores de tensão', text: 'Opções para verificação conforme a aplicação.' },
      { href: '/vara-de-manobra', title: 'Varas de manobra', text: 'Itens para operações e procedimentos específicos.' }
    ]
  },
  {
    slug: 'ferramentas-isoladas',
    title: 'Ferramentas Isoladas para Eletricista | EPI Marketplace',
    description: 'Pesquise ferramentas isoladas para eletricista e manutenção elétrica. Compare referências e solicite cotação para sua empresa.',
    h1: 'Ferramentas Isoladas para Eletricista',
    eyebrow: 'Manutenção elétrica',
    term: 'ferramentas isoladas para eletricista',
    specialty: 'atividades de manutenção elétrica que exigem ferramentas compatíveis com o procedimento de trabalho',
    checks: 'a classe ou especificação declarada, a integridade do isolamento, a referência, a aplicação e as instruções do fabricante',
    catalog: [
      { href: '/linha-viva', title: 'Linha viva', text: 'Equipamentos e acessórios para manutenção de redes.' },
      { href: '/nr-10', title: 'EPI NR-10', text: 'Orientação comercial para equipes elétricas.' },
      { href: '/produtos?categoria=linha-viva', title: 'Ver itens no catálogo', text: 'Acesse a categoria de linha viva.' }
    ]
  },
  {
    slug: 'luvas-isolantes',
    title: 'Luvas Isolantes para Eletricista | EPI Marketplace',
    description: 'Pesquise luvas isolantes para eletricista, compare referências e confirme a aplicação, o CA e a documentação antes de comprar.',
    h1: 'Luvas Isolantes para Eletricista',
    eyebrow: 'Proteção das mãos',
    term: 'luvas isolantes para eletricista',
    specialty: 'serviços elétricos cuja seleção deve considerar o risco avaliado e a classe de proteção necessária',
    checks: 'o CA quando aplicável, a classe de proteção, a referência, o estado de conservação e as limitações indicadas pelo fabricante',
    catalog: [
      { href: '/nr-10', title: 'EPI NR-10', text: 'Orientações para compras de equipes elétricas.' },
      { href: '/consultar-ca-epi', title: 'Consultar CA', text: 'Aprenda a conferir o certificado no CAEPI.' },
      { href: '/produtos?categoria=epi', title: 'Ver EPIs no catálogo', text: 'Acesse os itens de proteção disponíveis.' }
    ]
  },
  {
    slug: 'cinto-paraquedista',
    title: 'Cinto Paraquedista para Trabalho em Altura | EPI Marketplace',
    description: 'Pesquise cinto paraquedista para trabalho em altura, compare referências e solicite cotação para sua equipe em todo o Brasil.',
    h1: 'Cinto Paraquedista para Trabalho em Altura',
    eyebrow: 'Retenção de quedas',
    term: 'cinto paraquedista para trabalho em altura',
    specialty: 'atividades com risco de queda em que o equipamento integra um sistema de proteção planejado',
    checks: 'os pontos de conexão, o tamanho, a compatibilidade com o sistema, a referência e as orientações do fabricante',
    catalog: [
      { href: '/trabalho-em-altura', title: 'Trabalho em altura', text: 'Página comercial para sistemas de proteção contra quedas.' },
      { href: '/talabartes', title: 'Talabartes', text: 'Elementos de ligação para avaliação conforme a aplicação.' },
      { href: '/trava-quedas', title: 'Trava-quedas', text: 'Dispositivos para sistemas específicos.' }
    ]
  },
  {
    slug: 'talabartes',
    title: 'Talabartes para Trabalho em Altura | EPI Marketplace',
    description: 'Pesquise talabartes para trabalho em altura, compare referências, conectores e aplicação antes de solicitar cotação para sua equipe.',
    h1: 'Talabartes para Trabalho em Altura',
    eyebrow: 'Elemento de ligação',
    term: 'talabartes para trabalho em altura',
    specialty: 'sistemas de proteção contra quedas em que o elemento de ligação precisa ser compatível com toda a configuração',
    checks: 'a finalidade do modelo, os conectores, a extensão, a compatibilidade com o sistema e as limitações de uso',
    catalog: [
      { href: '/trabalho-em-altura', title: 'Trabalho em altura', text: 'Visão geral de sistemas e equipamentos.' },
      { href: '/cinto-paraquedista', title: 'Cintos paraquedistas', text: 'Vestimenta de retenção para avaliar no conjunto.' },
      { href: '/trava-quedas', title: 'Trava-quedas', text: 'Itens para sistemas específicos de proteção.' }
    ]
  },
  {
    slug: 'trava-quedas',
    title: 'Trava-Quedas para Trabalho em Altura | EPI Marketplace',
    description: 'Pesquise trava-quedas para trabalho em altura, confira referências e compatibilidade do sistema antes de solicitar cotação.',
    h1: 'Trava-Quedas para Trabalho em Altura',
    eyebrow: 'Sistema de proteção',
    term: 'trava-quedas para trabalho em altura',
    specialty: 'sistemas de retenção de queda cuja configuração depende da atividade, da ancoragem e do deslocamento previsto',
    checks: 'o tipo de linha ou suporte, o conector, a compatibilidade do conjunto, a referência e as limitações de uso',
    catalog: [
      { href: '/trabalho-em-altura', title: 'Trabalho em altura', text: 'Pesquisa de equipamentos para proteção contra quedas.' },
      { href: '/cinto-paraquedista', title: 'Cintos paraquedistas', text: 'Vestimenta que integra o sistema conforme a aplicação.' },
      { href: '/talabartes', title: 'Talabartes', text: 'Elementos de ligação para comparar no conjunto.' }
    ]
  },
  {
    slug: 'detector-de-tensao',
    title: 'Detector de Tensão para Serviços Elétricos | EPI Marketplace',
    description: 'Pesquise detector de tensão para serviços elétricos, compare referências e solicite cotação com base no procedimento da sua equipe.',
    h1: 'Detector de Tensão para Serviços Elétricos',
    eyebrow: 'Verificação elétrica',
    term: 'detector de tensão para serviços elétricos',
    specialty: 'procedimentos de verificação de ausência ou presença de tensão definidos pela organização',
    checks: 'o método de detecção, a faixa indicada, a referência, as instruções de uso e a compatibilidade com o procedimento',
    catalog: [
      { href: '/linha-viva', title: 'Linha viva', text: 'Equipamentos para manutenção e redes elétricas.' },
      { href: '/nr-10', title: 'EPI NR-10', text: 'Pesquisa de itens relacionados a serviços elétricos.' },
      { href: '/produtos?categoria=detector', title: 'Ver detectores no catálogo', text: 'Acesse os modelos disponíveis.' }
    ]
  },
  {
    slug: 'vara-de-manobra',
    title: 'Vara de Manobra para Serviços Elétricos | EPI Marketplace',
    description: 'Pesquise vara de manobra para serviços elétricos, compare referências e solicite cotação para operações e equipes técnicas.',
    h1: 'Vara de Manobra para Serviços Elétricos',
    eyebrow: 'Operação em redes',
    term: 'vara de manobra para serviços elétricos',
    specialty: 'operações em instalações e redes elétricas realizadas conforme procedimento e autorização aplicáveis',
    checks: 'o comprimento, o cabeçote, a referência, a aplicação, a integridade e as orientações do fabricante',
    catalog: [
      { href: '/linha-viva', title: 'Linha viva', text: 'Equipamentos e acessórios para redes elétricas.' },
      { href: '/aterramento', title: 'Aterramento temporário', text: 'Itens para procedimentos de segurança elétrica.' },
      { href: '/produtos?categoria=linha-viva', title: 'Ver itens no catálogo', text: 'Acesse a categoria de linha viva.' }
    ]
  }
];

for (const category of deepCategoryPages) {
  pages.push({
    file: `${category.slug}.html`,
    url: `/${category.slug}`,
    title: category.title,
    description: category.description,
    h1: category.h1,
    eyebrow: category.eyebrow,
    lead: `Pesquise ${category.term}, compare referências e solicite cotação para sua equipe. A confirmação técnica e comercial deve considerar a aplicação, a documentação e a disponibilidade do item.`,
    catalog: category.catalog,
    sections: [
      {
        heading: `Como selecionar ${category.term}`,
        body: `<p>A escolha de ${category.term} deve partir da análise da atividade e dos riscos envolvidos. Produtos para ${category.specialty} podem ter aparência semelhante, mas apresentar referências, limites e formas de uso diferentes. Por isso, a compra não deve se basear apenas no nome comercial ou em uma imagem do catálogo.</p><p>Antes de solicitar cotação, reúna informações do procedimento da empresa, da referência já utilizada e da necessidade da equipe. Esses dados ajudam a comparar opções com mais precisão e evitam que um item destinado a outra aplicação seja considerado equivalente.</p>`
      },
      {
        heading: 'O que conferir na especificação',
        body: `<p>Em uma compra técnica, confirme ${category.checks}. Quando houver EPI sujeito a Certificado de Aprovação, consulte o número no sistema público CAEPI e compare a descrição exibida com o produto e a ficha técnica. O CA não substitui a avaliação de risco, o procedimento ou a orientação de uso.</p><p>Também é importante avaliar se o item será usado junto com outros equipamentos. Em serviços elétricos e trabalho em altura, compatibilidade e planejamento do conjunto são decisivos. A definição final deve seguir as normas aplicáveis, o procedimento da organização e as instruções do fabricante ou importador.</p>`
      },
      {
        heading: 'Como organizar uma cotação para a equipe',
        body: `<p>Para acelerar o atendimento, envie a lista de referências, quantidades, aplicação prevista e dados da empresa. Caso já exista uma ficha técnica, um modelo homologado ou requisito interno, inclua essa documentação. Assim, a cotação comercial pode ser comparada de forma mais objetiva pela área de compras e pela equipe responsável.</p><p>A EPI Marketplace realiza vendas online e atendimento comercial para pedidos por quantidade. Preço, prazo, disponibilidade e documentação são confirmados antes do fechamento. Este conteúdo é informativo e não substitui análise de risco, treinamento, projeto ou procedimento de segurança.</p>`
      },
      {
        heading: 'Compra técnica com informação verificável',
        body: `<p>Use esta página como ponto de partida para a pesquisa comercial, não como especificação final. Antes de liberar qualquer item para uso, a organização deve confirmar a compatibilidade com a atividade, manter a documentação aplicável e seguir o planejamento de segurança. Quando houver divergência entre uma descrição comercial, uma ficha técnica e as instruções do fabricante ou importador, prevalece a informação técnica que corresponda à referência efetivamente adquirida.</p>`
      }
    ],
    faq: [
      [`Como escolher ${category.term}?`, `A escolha deve considerar a atividade, os riscos avaliados, a referência do produto, as limitações de uso e as instruções do fabricante ou importador.`],
      ['O CA é suficiente para definir a compra?', 'Não. Quando aplicável, o CA deve corresponder ao produto consultado, mas a definição também depende de risco, aplicação, compatibilidade e procedimento de trabalho.'],
      ['Como solicitar cotação?', 'Envie referências, quantidades, aplicação e dados da empresa pelo WhatsApp ou pela página de contato para atendimento comercial.']
    ]
  });
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function renderCatalog(items) {
  return items.map(({ href, title, text }) => `<a href="${href}"><strong>${title}</strong><span>${text}</span></a>`).join('');
}

function renderFaq(faq) {
  return faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('');
}

function renderSiteHeader() {
  return `
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <nav aria-label="Navegação principal" class="landing-site-navbar" id="navbar" role="navigation">
    <div class="container"><div class="navbar__inner">
      <button aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menu" class="navbar__burger" id="burger-btn" type="button"><span></span><span></span><span></span></button>
      <a aria-label="EPI Marketplace — Página inicial" class="navbar__logo" href="/"><span class="landing-site-brand">EPI Marketplace</span></a>
      <div class="navbar__links" role="menubar"><a href="/produtos" role="menuitem">Produtos</a><a href="/epi-para-empresas" role="menuitem">Para empresas</a><a href="/blog" role="menuitem">Blog</a><a href="/contato" role="menuitem">Contato</a></div>
      <a aria-label="Solicitar orçamento pelo WhatsApp" class="navbar__cta" href="${whatsappUrl}" rel="noopener noreferrer" target="_blank">Solicitar orçamento</a>
    </div><div aria-hidden="true" class="navbar__mobile" id="mobile-menu" role="menu"><a href="/produtos" role="menuitem">Produtos</a><a href="/epi-para-empresas" role="menuitem">Para empresas</a><a href="/blog" role="menuitem">Blog</a><a href="/contato" role="menuitem">Contato</a></div></div>
  </nav>
  <div aria-hidden="true" class="navbar__overlay" id="nav-overlay"></div>`;
}

function renderSiteFooter() {
  return `
  <footer role="contentinfo"><div class="container"><div class="footer__grid">
    <div><div class="footer__brand-name">EPI Marketplace</div><p class="footer__brand-desc">E-commerce nacional de EPIs, EPCs e equipamentos de segurança.</p><address class="footer__contact" style="font-style:normal"><a href="tel:+5511989088928">(11) 98908-8928</a><a href="mailto:contato@epimarketplace.com">contato@epimarketplace.com</a></address></div>
    <div><div class="footer__col-title">Categorias</div><nav aria-label="Categorias" class="footer__col-links"><a href="/nr-10">NR-10</a><a href="/trabalho-em-altura">Trabalho em altura</a><a href="/aterramento">Aterramento</a><a href="/linha-viva">Linha viva</a></nav></div>
    <div><div class="footer__col-title">Compras</div><nav aria-label="Canais de compra" class="footer__col-links"><a href="/epi-para-empresas">Para empresas</a><a href="/contato">Cotação por e-mail</a><a href="${whatsappUrl}" rel="noopener noreferrer" target="_blank">WhatsApp</a></nav></div>
  </div><div class="footer__bottom"><p class="footer__bottom-text">© 2026 EPI Marketplace · CNPJ: 58.912.592/0001-06</p><nav aria-label="Links legais" class="footer__bottom-links"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></nav></div></div></footer>`;
}

function renderPage(page) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://epimarketplace.com${page.url}#webpage`,
        name: page.h1,
        description: page.description,
        url: `https://epimarketplace.com${page.url}`,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': 'https://epimarketplace.com/#website' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://epimarketplace.com/' },
          { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://epimarketplace.com/produtos' },
          { '@type': 'ListItem', position: 3, name: page.h1, item: `https://epimarketplace.com${page.url}` }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
      }
    ]
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="https://epimarketplace.com${page.url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EPI Marketplace">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="https://epimarketplace.com${page.url}">
  <meta property="og:image" content="https://epimarketplace.com/img/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${escapeJson(schema)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/global.css">
  <link rel="stylesheet" href="/css/seo-landing.css">
  <link rel="icon" type="image/png" href="/favicon.png?v=3">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;600;700;800&display=swap">
</head>
<body>
${renderSiteHeader()}
  <main id="conteudo">
    <nav class="landing-breadcrumb container" aria-label="Navegação estrutural"><a href="/">Início</a><span aria-hidden="true">›</span><a href="/produtos">Produtos</a><span aria-hidden="true">›</span><span aria-current="page">${page.h1}</span></nav>
    <header class="landing-hero">
      <div class="container">
        <p class="landing-eyebrow">${page.eyebrow}</p>
        <h1>${page.h1}</h1>
        <p class="landing-hero__lead">${page.lead}</p>
        <div class="landing-hero__actions">
          <a class="landing-button" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Solicitar orçamento</a>
          <a class="landing-button landing-button--quiet" href="/produtos">Ver catálogo</a>
        </div>
      </div>
    </header>
    <div class="container landing-main">
      <div class="landing-layout">
        <article class="landing-content">
          ${page.sections.map(section => `<section><h2>${section.heading}</h2>${section.body}</section>`).join('')}
          <section><h2>Explore categorias relacionadas</h2><div class="landing-catalog">${renderCatalog(page.catalog)}</div></section>
          <section><h2>Perguntas frequentes</h2><div class="landing-faq">${renderFaq(page.faq)}</div></section>
          <section class="landing-cta"><h2>Precisa de uma cotação?</h2><p>Envie as referências, quantidades e a aplicação desejada. A confirmação de especificações, disponibilidade, prazo e condições comerciais é feita no atendimento.</p><a class="landing-button" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></section>
        </article>
        <aside class="landing-panel" aria-label="Links relacionados"><h2>Links relacionados</h2><ul><li><a href="/produtos">Catálogo de produtos</a></li><li><a href="/consultar-ca-epi">Como consultar CA de EPI</a></li><li><a href="/epi-para-empresas">EPI para empresas</a></li><li><a href="/contato">Página de contato</a></li></ul></aside>
      </div>
    </div>
  </main>
${renderSiteFooter()}
  <script defer src="/js/main.js" type="module"></script>
</body>
</html>`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(projectRoot, page.file), `${renderPage(page)}\n`, 'utf8');
}

for (const sitemapFile of ['sitemap.xml', 'public/sitemap.xml']) {
  const sitemapPath = path.join(projectRoot, sitemapFile);
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const missingEntries = pages
    .filter(page => !sitemap.includes(`https://epimarketplace.com${page.url}`))
    .map(page => `  <url>\n    <loc>https://epimarketplace.com${page.url}</loc>\n    <lastmod>2026-09-15</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join('\n');

  if (missingEntries) {
    sitemap = sitemap.replace('  <!-- Artigos do Blog', `${missingEntries}\n\n  <!-- Artigos do Blog`);
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  }
}

console.log(`Geradas ${pages.length} páginas SEO indexáveis.`);
