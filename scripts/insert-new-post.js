import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = path.join(__dirname, '..');

const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const NEW_POST = {
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
  <li>Acesse o portal oficial do governo federal: <strong>caepi.trabalho.gov.br/internet/ConsultaCAInternet.aspx</strong>.</li>
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
  <li><strong>Conformidade:</strong> a organização deve observar a NR-6, a NR-1 e demais regras aplicáveis, mantendo os registros e procedimentos exigidos.</li>
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
      a: 'A verificação da autenticidade e validade do Certificado de Aprovação deve ser feita diretamente no portal oficial do Ministério do Trabalho e Emprego através do sistema CAEPI (caepi.trabalho.gov.br/internet/ConsultaCAInternet.aspx) ou pela plataforma gov.br. Basta digitar o número gravado no corpo do equipamento para conferir a data de validade, o fabricante legal e os ensaios laboratoriais aprovados.'
    },
    {
      q: 'Qual a diferença entre EPI e EPC na hierarquia de segurança?',
      a: 'O EPC (Equipamento de Proteção Coletiva) protege todo o ambiente e todos os colaboradores simultaneamente (ex.: guarda-corpos, exaustores, redes de proteção, sinalizações). Já o EPI (Equipamento de Proteção Individual) protege apenas o trabalhador individualmente. Pelo princípio de prevenção da NR-1, o EPC tem prioridade obrigatória; os EPIs só devem ser adotados enquanto o EPC estiver sendo implantado, para emergências ou para complementar a proteção residual.'
    }
  ]
};

async function run() {
  console.log('1. Inserindo no Supabase...');
  const supabasePayload = {
    title: NEW_POST.title,
    category: NEW_POST.category,
    readtime: NEW_POST.readtime,
    target_keyword: NEW_POST.target_keyword,
    slug: NEW_POST.slug,
    date: NEW_POST.date,
    published: NEW_POST.published,
    image_url: NEW_POST.image_url,
    image_alt: NEW_POST.image_alt,
    meta_description: NEW_POST.meta_description,
    summary: NEW_POST.summary,
    content: NEW_POST.content,
    author: 'Equipe Editorial EPI Marketplace',
    has_footer: true,
    seo_score: 100
  };

  try {
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${NEW_POST.slug}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const existing = await checkRes.json();
    if (existing && existing.length > 0) {
      console.log('Post ja existe no Supabase, atualizando...');
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${NEW_POST.slug}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(supabasePayload)
      });
      console.log('Atualizado status:', updateRes.status);
    } else {
      console.log('Inserindo novo post no Supabase...');
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(supabasePayload)
      });
      const insData = await insertRes.json();
      console.log('Inserido status:', insertRes.status, 'ID:', insData[0]?.id);
    }
  } catch (err) {
    console.error('Erro no Supabase:', err);
  }

  console.log('2. Atualizando build-blog.js para incluir o novo post no FALLBACK_POSTS...');
  const buildBlogPath = path.resolve(cwd, 'scripts/build-blog.js');
  let buildBlogContent = fs.readFileSync(buildBlogPath, 'utf8');

  if (!buildBlogContent.includes(NEW_POST.slug)) {
    const postSnippet = `  ${JSON.stringify(NEW_POST, null, 2)},\n`;
    buildBlogContent = buildBlogContent.replace('const FALLBACK_POSTS = [', `const FALLBACK_POSTS = [\n${postSnippet}`);
    fs.writeFileSync(buildBlogPath, buildBlogContent, 'utf8');
    console.log('Post inserido no FALLBACK_POSTS de build-blog.js');
  } else {
    console.log('build-blog.js ja contem o slug do novo post.');
  }

  console.log('Script concluido com sucesso!');
}

run();
