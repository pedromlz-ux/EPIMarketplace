import bs4

products = [
    # Page 4: Coberturas
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 4' - 100 x 300 mm", "code": "160 492 612E", "desc": "Cobertura para poste e circular, 26 kV.", "img": "img/serveq/p4-img13.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 4' - 100 x 900 mm", "code": "160 492 636E", "desc": "Cobertura para poste e circular, 26 kV.", "img": "img/serveq/p4-img14.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 8' - 160 x 300 mm", "code": "160 406 0548", "desc": "Cobertura para poste e circular, 36 kV.", "img": "img/serveq/p4-img15.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 8' - 160 x 600 mm", "code": "160 406 0549", "desc": "Cobertura para poste e circular, 36 kV.", "img": "img/serveq/p4-img16.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 8' - 160 x 1200 mm", "code": "160 406 0550", "desc": "Cobertura para poste e circular, 36 kV.", "img": "img/serveq/p4-img17.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 8' - 160 x 1800 mm", "code": "160 406 0551", "desc": "Cobertura para poste e circular, 36 kV.", "img": "img/serveq/p4-img18.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 9' - 230 x 300 mm", "code": "160 493 7-10", "desc": "Cobertura para poste e circular, 36 kV.", "img": "img/serveq/p4-img19.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 9' - 230 x 600 mm", "code": "160 493 7-20", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 9' - 230 x 1200 mm", "code": "160 493 7-40", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 9' - 230 x 1800 mm", "code": "160 493 7-60", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 12' - 300 x 300 mm", "code": "160 406 0028", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 12' - 300 x 600 mm", "code": "160 406 0029", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 12' - 300 x 1200 mm", "code": "160 406 0030", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. c/ nervuras 12' - 300 x 1800 mm", "code": "160 406 0000", "desc": "Cobertura para poste e circular, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 4' - 100 x 300 mm", "code": "160 492 6-12", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 4' - 100 x 600 mm", "code": "160 492 6-24", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 4' - 100 x 900 mm", "code": "160 492 6-36", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 4' - 100 x 1200 mm", "code": "160 492 6-48", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 6' - 150 x 300 mm", "code": "160 493 6-12", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 6' - 150 x 600 mm", "code": "160 493 6-24", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 6' - 150 x 900 mm", "code": "160 493 6-36", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 6' - 150 x 1200 mm", "code": "160 493 6-48", "desc": "Cobertura para poste e circular lisa, 26 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 9' - 230 x 600 mm", "code": "160 493 7-2L", "desc": "Cobertura para poste e circular lisa, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura circ. lisa 9' - 230 x 300 mm", "code": "160 493 7-1L", "desc": "Cobertura para poste e circular lisa, 36 kV."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ condutor B.T até 25mm", "code": "160 494 6BT0", "desc": "14,6 KV. Para isolamento de condutores nas operações em linha viva.", "img": "img/serveq/p3-img10.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ condutor A.T até 25mm (26,4kV)", "code": "160 494 6000", "desc": "26,4 KV. Para isolamento de condutores de alta tensão."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ condutor A.T até 25mm (36,6kV)", "code": "160 363 1000", "desc": "36,6 KV. Para isolamento de condutores nas operações em linha viva."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ condutor RDC 25x880mm", "code": "160 111 4700", "desc": "36,6 kV. Para isolamento no trabalho em redes de distribuição compacta (RDC)."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ chave faca 26 KV", "code": "160 856 1-10", "desc": "26,4 kV. Coberturas para chave faca, mantém presa por pressão."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura protetora para carcaça chave faca", "code": "160 133 45-1", "desc": "26,4 kV. Para proteção isolante entre a carcaça e as partes energizadas."},

    # Page 5
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura protetora para chave fusível", "code": "160 406 0009", "desc": "26,4 kV. Presa por um pino pela parte traseira do isolador.", "img": "img/serveq/p4-img13.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ Isolador de pino (João de Barro)", "code": "160 494 7000", "desc": "26,4 kV. Utilizadas para a proteção das partes energizadas.", "img": "img/serveq/p4-img14.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura para Espaçador Losangular", "code": "160 110 5000", "desc": "26,4 kV. Coberturas utilizadas para isolamento no trabalho em redes.", "img": "img/serveq/p5-img20.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura para isolados de pino RDC", "code": "160 110 5100", "desc": "26,4 kV. Coberturas utilizadas para isolamento de pino.", "img": "img/serveq/p5-img21.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura para extremidade da cruzeta", "code": "160 147 80-1", "desc": "36,6 kV. Protege a extremidade da cruzeta evitando contato acidental.", "img": "img/serveq/p4-img15.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura para carcaça de chave faca (36,6kV)", "code": "160 107 65-1", "desc": "36,6 kV. Proteção para chave faca.", "img": "img/serveq/p5-img22.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura p/ chave fusível L/ Bloqueadora de fúsil", "code": "160 494 8000", "desc": "Cobertura bloqueadora e sinalizadora para que não seja acionada a chave."},

    # Page 6
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de tração c/ torniquete", "code": "1405460000", "desc": "Bastão de tração com torniquete para linha viva.", "img": "img/serveq/p5-img20.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de tração c/ rolete", "code": "1406010000", "desc": "Bastão de tração modelo com rolete.", "img": "img/serveq/p6-img23.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de tração espiral", "code": "1406020000", "desc": "Bastão de tração espiral para linha viva.", "img": "img/serveq/p5-img21.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão garra p/ linha viva", "code": "1406330000", "desc": "Bastão com garra para linha viva.", "img": "img/serveq/p6-img24.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão podador c/ encaixe universal", "code": "1107170000", "desc": "Bastão podador com encaixe universal.", "img": "img/serveq/p6-img25.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão p/ talha e moitão c/ olhal isolante", "code": "1402200000", "desc": "Bastão de talha e moitão isolante.", "img": "img/serveq/p6-img26.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão separador isolante de corda", "code": "1408660170", "desc": "Bastão separador isolante.", "img": "img/serveq/p6-img27.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Vara de manobra c/ 5 elementos", "code": "140912B000", "desc": "Vara de manobra c/ cabeçote, 5 elementos. 6450mm.", "img": "img/serveq/p5-img22.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão alavanca de poste com tirante", "code": "1407210000", "desc": "Bastão alavanca de poste com tirante.", "img": "img/serveq/p6-img28.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão alavanca p/ girar poste", "code": "140231C000", "desc": "Bastão alavanca Ø 51 x 1220 mm com catraca e cinta."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão movimentador de poste", "code": "1400170000", "desc": "Bastão para movimentar e posicionar postes."},

    # Page 7
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de manobra pega tudo (1300mm)", "code": "1308610000", "desc": "Comprimento: 1300 mm.", "img": "img/serveq/p7-img29.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de manobra pega tudo (1970mm)", "code": "1308620000", "desc": "Comprimento: 1970 mm.", "img": "img/serveq/p7-img30.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de manobra pega tudo (2580mm)", "code": "1308630000", "desc": "Comprimento: 2580 mm.", "img": "img/serveq/p7-img31.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de manobra pega tudo (3190mm)", "code": "1308640000", "desc": "Comprimento: 3190 mm.", "img": "img/serveq/p7-img32.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Bastão de manobra pega tudo (3800mm)", "code": "1308650000", "desc": "Comprimento: 3800 mm.", "img": "img/serveq/p7-img33.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Içador isolado completo p/ linha viva", "code": "1403410000", "desc": "Içador isolado completo.", "img": "img/serveq/p7-img34.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "BY-PASS temporário p/ chave fusível", "code": "1100173300", "desc": "Para realizar by-pass provisório em chaves.", "img": "img/serveq/p7-img35.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabo p/ BY-PASS", "code": "1300326000", "desc": "Cabo flexível para montagem de by-pass temporário."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cruzeta auxiliar", "code": "1406650000", "desc": "Cruzeta auxiliar isolante."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Suporte Isolante p/ BY-PASS", "code": "1401547000", "desc": "Suporte de fixação isolante."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Suporte Temporário p/ cruzeta", "code": "1406040000", "desc": "Suporte provisório de cruzeta."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Dispositivo de proteção para jampe provisório", "code": "1401546000", "desc": "Dispositivo de proteção isolante."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Grampo p/ bucha de transformador", "code": "140001TRAS", "desc": "Grampo de segurança para bucha."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Grampo p/ bucha de transformador Isolado", "code": "140000TRAS", "desc": "Grampo de segurança para bucha, isolado."},

    # Page 8
    {"cat": "linha-viva", "badge": "NR-10", "title": "Lençol Isolante de Borracha 2x250x900mm", "code": "120 202 6001", "desc": "Lençol isolante de borracha para baixa tensão.", "img": "img/serveq/p7-img29.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Lençol Isolante de Borracha 2x300x900mm", "code": "120 202 6002", "desc": "Lençol isolante de borracha para baixa tensão.", "img": "img/serveq/p8-img36.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Lençol Isolante de Borracha 2x300x1200mm", "code": "120 202 6003", "desc": "Lençol isolante de borracha para baixa tensão.", "img": "img/serveq/p8-img37.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Lençol Isolante de Borracha 2x300x800mm", "code": "120 202 6005", "desc": "Lençol isolante de borracha para baixa tensão.", "img": "img/serveq/p8-img38.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Manta isolante CL II ou CL IV", "code": "1300490000", "desc": "Com fenda ou sem fenda.", "img": "img/serveq/p7-img30.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cunha polimérica", "code": "1308810000", "desc": "Cunha de fixação polimérica.", "img": "img/serveq/p8-img39.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Espaçador de fase", "code": "1109020000", "desc": "Espaçador de cabos de fase em redes.", "img": "img/serveq/p8-img40.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Pregador p/ lençol isolante", "code": "1301600000", "desc": "Pregador de alta pressão para lençóis de borracha isolante.", "img": "img/serveq/p8-img41.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cesto Aéreo Isolado", "code": "1300351000", "desc": "Cesto aéreo para caminhões e munck.", "img": "img/serveq/p8-img42.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura flexível c/ terminal", "code": "13000442000", "desc": "Cobertura tubular flexível com terminal.", "img": "img/serveq/p8-img43.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cobertura flexível", "code": "1300214000", "desc": "Cobertura tubular flexível.", "img": "img/serveq/p8-img44.png"},

    # Page 9
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. aterramento p/ curto-circuitamento", "code": "1104470000", "desc": "p/ rede secundária BT, c/ 4 ou 5 grampos.", "img": "img/serveq/p8-img36.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conjunto de aterramento Rápido e temporário", "code": "1104400000", "desc": "p/ linhas de distribuição secundária BT, c/ 4 ou 5 grampos.", "img": "img/serveq/p9-img47.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conjunto de aterramento rápido 22kV", "code": "1107810000", "desc": "p/ linhas de distribuição aérea até 22kV.", "img": "img/serveq/p8-img37.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conjunto de aterramento rápido 34,5kV", "code": "1107750000", "desc": "p/ linhas de distribuição até 34,5kV.", "img": "img/serveq/p9-img48.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conjunto de aterramento p/ cabo multiplexado", "code": "110440AL40", "desc": "Conjunto p/ cabo multiplexado BT c/ 4 ou 5 grampos.", "img": "img/serveq/p9-img49.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Bastão de aterramento", "code": "1404200000", "desc": "Bastão para aplicação de aterramento.", "img": "img/serveq/p9-img50.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Sela p/ aterramento", "code": "140441SEL0", "desc": "Sela modelo 441.", "img": "img/serveq/p9-img51.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conjunto de aterramento rápido e temp. 34,5kV", "code": "110455FM00", "desc": "p/ linhas de distribuição até 34,5kV.", "img": "img/serveq/p9-img52.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. aterramento temp. equip. 34,5 kV ELEKTRO", "code": "110441ELKT", "desc": "Padrão Elektro.", "img": "img/serveq/p9-img53.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. aterramento temp. sec. multiplexado ELEKTRO", "code": "110440ELKT", "desc": "Padrão Elektro.", "img": "img/serveq/p9-img54.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. aterramento temp. primário 34,5 kV ELEKTRO", "code": "110455ELKT", "desc": "Padrão Elektro.", "img": "img/serveq/p9-img55.png"},

    # Page 10
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabeçote olhal c/ ou s/ isolador", "code": "1309758000", "desc": "Cabeçote olhal para bastões.", "img": "img/serveq/p10-img57.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Pega poste circular", "code": "1302500000", "desc": "Ferramenta para manuseio de postes circulares.", "img": "img/serveq/p10-img58.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Pega poste duplo T", "code": "1302510000", "desc": "Ferramenta para manuseio de postes duplo T.", "img": "img/serveq/p10-img59.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cinta p/ mão francesa 64mm", "code": "1402860000", "desc": "Cinta de fixação.", "img": "img/serveq/p10-img60.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Colar de 38 e 64 mm", "code": "1409759000", "desc": "Colar para fixação em estruturas.", "img": "img/serveq/p10-img61.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Estribo p/ mão francesa", "code": "1102870000", "desc": "Estribo suporte.", "img": "img/serveq/p10-img62.png"},
    {"cat": "detector", "badge": "NR-10", "title": "Detector de tensão por aproximação", "code": "130 800 0000", "desc": "100V a 50kV (fase-fase).", "img": "img/serveq/p9-img47.png"},
    {"cat": "detector", "badge": "NR-10", "title": "Detector de tensão por contato", "code": "130 804 0000", "desc": "100V a 20kV (fase-terra).", "img": "img/serveq/p10-img63.png"},
    {"cat": "detector", "badge": "NR-10", "title": "Detector de ausência de tensão", "code": "130 803 0000", "desc": "1 a 230kV (fase-fase)."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. de aterramento p/ cabine e cubículo", "code": "110440CEB0", "desc": "Aterramento rápido p/ cabine."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. de aterramento p/ cabine (grampos 795)", "code": "110461CUB2", "desc": "Grampos 795 e 755."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Conj. de aterramento p/ cabine (grampos 731)", "code": "110461CUB1", "desc": "Grampos 731 e 755."},

    # Page 11
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ içar materiais 454 KGF c/ gancho e trava", "code": "110232TR00", "desc": "Carretilha de alumínio.", "img": "img/serveq/p11-img64.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ içar materiais 454 KFG", "code": "110232R000", "desc": "Carretilha de alumínio.", "img": "img/serveq/p11-img65.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ içar materiais 454 KFG c/ gancho 55mm", "code": "110232RESL", "desc": "Carretilha de alumínio abertura 55mm.", "img": "img/serveq/p11-img66.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ lançamento de cabo em ângulo", "code": "110240SI00", "desc": "Carretilha direcional.", "img": "img/serveq/p11-img67.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha de lançamento de cabo protegido", "code": "110239R200", "desc": "Carretilha isolada.", "img": "img/serveq/p11-img68.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ lançamento de cabo fase", "code": "110242TM00", "desc": "Carretilha fase.", "img": "img/serveq/p11-img69.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ remoção de condutores", "code": "110239RC00", "desc": "Carretilha removedora.", "img": "img/serveq/p11-img70.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretilha p/ cabo mensageiro", "code": "110241TI00", "desc": "Carretilha para cabos pesados.", "img": "img/serveq/p11-img71.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Bandola p/ cabo multiplexado", "code": "1101550000", "desc": "Bandola de suspensão."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Roldana p/ lançamento de cabo AT", "code": "110204R000", "desc": "Roldana para alta tensão."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Roldana p/ encaixe no estribo da armação", "code": "110206A000", "desc": "Roldana para rede secundária."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Pega bobina", "code": "1100015000", "desc": "Gancho pega bobina."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Presilha de elevação s/ isolador", "code": "1402880000", "desc": "Presilha de fixação."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Presilha de elevação c/ isolador", "code": "1405478000", "desc": "Presilha de fixação com isolador em resina."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Presilha de suspensão s/ isolador", "code": "1402640000", "desc": "Presilha suspensora."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Presilha de suspensão c/ isolador", "code": "1402590000", "desc": "Presilha suspensora com isolador em resina."},

    # Page 12
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Esticador tipo meia lua s/ mola (1,52 a 6,35 mm)", "code": "1304600000", "desc": "Para tensionamento de condutores menores.", "img": "img/serveq/p12-img72.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Esticador tipo meia lua s/ mola (3,18 a 12,70 mm)", "code": "1304700000", "desc": "Para tensionamento de condutores maiores.", "img": "img/serveq/p12-img73.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Esticador p/ cordoalha de aço", "code": "1404400000", "desc": "Mordentes paralelos c/ perfil redondo estriado (3 a 12mm).", "img": "img/serveq/p12-img74.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Espora extensiva p/ poste de madeira", "code": "12035E0000", "desc": "Com almofada e correias em couro.", "img": "img/serveq/p12-img75.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Correia e almofada p/ espora extensiva", "code": "120141L000", "desc": "Acessórios de reposição para espora.", "img": "img/serveq/p12-img76.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Pedarol p/ escalada de poste tipo DT (600mm)", "code": "110041000", "desc": "Haste de ancoragem p/ poste.", "img": "img/serveq/p12-img77.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Pedarol p/ escalada de poste tipo DT (800mm)", "code": "1100410800", "desc": "Haste de ancoragem p/ poste (longo)."},

    # Page 13
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de aterramento bico de pato", "code": "1407920000", "desc": "Conexão rápida em condutores.", "img": "img/serveq/p13-img78.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de aterramento tipo olhal", "code": "1407950000", "desc": "Conexão com vara de manobra.", "img": "img/serveq/p13-img79.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de aterramento c/ parafuso tipo T", "code": "140795T000", "desc": "Aperto manual.", "img": "img/serveq/p13-img80.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de aterramento olhal p/ barramento", "code": "1407290000", "desc": "Para subestações.", "img": "img/serveq/p13-img81.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo multiangular", "code": "1407300000", "desc": "Versatilidade na conexão em ângulos.", "img": "img/serveq/p13-img82.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de fixação", "code": "1407550000", "desc": "Grampo para cabos e estruturas.", "img": "img/serveq/p13-img83.png"},
    {"cat": "aterramento", "badge": "NR-10", "title": "Grampo de pressão por mola", "code": "1107720000", "desc": "Aplicação rápida.", "img": "img/serveq/p13-img84.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Carretel c/ sargento", "code": "1107800000", "desc": "Bobina para cabos de aterramento ou serviço.", "img": "img/serveq/p13-img85.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabeçote automático", "code": "1407650000", "desc": "Acessório para varas.", "img": "img/serveq/p13-img86.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabeçote automático p/ grampo de aterramento", "code": "1407640000", "desc": "Para instalação de aterramento.", "img": "img/serveq/p13-img87.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabeçote p/ manobra de chaves c/ encaixe universal", "code": "1107620000", "desc": "Abertura e fechamento de chaves faca/fusível."},
    {"cat": "altura", "badge": "NR-35", "title": "Dispositivo antiqueda de cartucho", "code": "1101250000", "desc": "Proteção metálica."},
    {"cat": "altura", "badge": "NR-35", "title": "Dispositivo antiqueda em poliamida preta", "code": "140125P000", "desc": "Proteção em poliamida isolante."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Trapézio tipo aranha", "code": "1107740000", "desc": "Equipamento para içamento complexo."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Trapézio de elevação", "code": "1107940000", "desc": "Equipamento para elevação."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Trado de aterramento temporário", "code": "1107540000", "desc": "Haste c/ rosca de latão e punho desmontável."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Trado c/ rosca de 800mm", "code": "1107490000", "desc": "Haste perfurante de solo."},
    {"cat": "aterramento", "badge": "NR-10", "title": "Haste lisa", "code": "1107890000", "desc": "Haste para aterramento direto."},

    # Page 14
    {"cat": "linha-viva", "badge": "NR-10", "title": "Sela plataforma", "code": "1403400000", "desc": "Plataforma de ancoragem e amarração.", "img": "img/serveq/p14-img88.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Sela p/ amarração de corda", "code": "1402850000", "desc": "Sela isolada para amarração.", "img": "img/serveq/p14-img89.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Sela c/ extensor e colar de 64 mm", "code": "1402750000", "desc": "Sela de ancoragem prolongada.", "img": "img/serveq/p14-img90.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Trapézio tipo sela", "code": "1403318000", "desc": "Para distribuição de carga.", "img": "img/serveq/p14-img91.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Cabeçote para espaçador", "code": "1107610000", "desc": "Ferramenta para redes multiplexadas."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Separador para cabo multiplexado", "code": "1103450000", "desc": "Ferramenta em resina isolante."},
    {"cat": "altura", "badge": "NR-35", "title": "Estabilizador de escada", "code": "1102020000", "desc": "Apoio para segurança em postes e superfícies curvas."},
    {"cat": "altura", "badge": "NR-35", "title": "Nivelador de escada", "code": "1102010000", "desc": "Nivelador de degraus para terreno irregular."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Guincho portátil p/ tensionamento (1250/2000 KGF)", "code": "1401562000", "desc": "Para cabos elétricos ou telefônicos."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Guincho p/ trabalho em linha viva c/ tirante de Nylon", "code": "140156NVL0", "desc": "Guincho isolado em corda."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Tifor (guincho manual de alavanca)", "code": "1300536000", "desc": "Tifor de aço com cabo."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Talha de Alavanca", "code": "130935A000", "desc": "Talha compacta manual com corrente."},
    {"cat": "epi", "badge": "NR-6", "title": "Inflador de luvas", "code": "1101274000", "desc": "Para teste de furos e rasgos em luvas isolantes."},

    # Page 15
    {"cat": "altura", "badge": "NR-35", "title": "Cinto Tipo Paraquedista (5 pontos)", "code": "120 128 03", "desc": "Cinto paraquedista em fita poliéster retardante a chama, 10 fivelas em aço.", "img": "img/serveq/p15-img92.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Cinto Tipo Paraquedista (4 pontos)", "code": "120 128 01L0", "desc": "Cinto paraquedista em fita poliéster retardante a chama, 5 fivelas em aço.", "img": "img/serveq/p14-img88.png"},

    # Page 16
    {"cat": "altura", "badge": "NR-35", "title": "Cinturão de Nylon tipo abdominal", "code": "1201762000", "desc": "Cinturão para posicionamento e apoio.", "img": "img/serveq/p16-img100.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Coroa de ancoragem p/ poste", "code": "1201281000", "desc": "Ponto de ancoragem circular provisório.", "img": "img/serveq/p16-img101.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Talabarte I c/ absorvedor de energia", "code": "120169M200", "desc": "Talabarte I com 2 mosquetões.", "img": "img/serveq/p15-img92.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Talabarte de corda", "code": "1201680000", "desc": "Com 2 mosquetões de trava simples.", "img": "img/serveq/p16-img102.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Talabarte de posicionamento em corda c/ regulador", "code": "120168R000", "desc": "Regulador de Inox e fita anticorte.", "img": "img/serveq/p16-img103.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Talabarte em fita Duplo Y", "code": "120169YC00", "desc": "Talabarte c/ absorvedor, com 2 mosquetões grandes (55 ou 110mm) e 1 olhal.", "img": "img/serveq/p16-img104.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Trava quedas em Inox p/ corda de 12 mm", "code": "1201174I00", "desc": "Para linha de vida rígida ou flexível.", "img": "img/serveq/p16-img105.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Trava quedas em aço p/ corda de 12 mm", "code": "1201174MO0", "desc": "Com mosquetão caracol de fixação."},
    {"cat": "altura", "badge": "NR-35", "title": "Gancho Isolado p/ ancoragem", "code": "1101910000", "desc": "Gancho isolado revestido de polímero azul."},
    {"cat": "altura", "badge": "NR-35", "title": "Gancho Isolado p/ linha de vida", "code": "1101911000", "desc": "Destinado a fixação para linha de vida."},
    {"cat": "altura", "badge": "NR-35", "title": "Dispositivo de ancoragem de corda p/ linha de vida", "code": "110ICC3000", "desc": "Mola/Espiral de ancoragem modelo ICC."},
    {"cat": "altura", "badge": "NR-35", "title": "Dispositivo mão francesa", "code": "1101816000", "desc": "Ponto de ancoragem estrutural."},
    {"cat": "altura", "badge": "NR-35", "title": "Dispositivo de ancoragem tipo agulhão", "code": "110192A000", "desc": "Ferramenta para perfuração e ancoragem em solo."},

    # Page 17
    {"cat": "altura", "badge": "NR-35", "title": "Fita Eureka p/ uso em sistema de ancoragem", "code": "12052K0000", "desc": "Suporte de escada.", "img": "img/serveq/p17-img106.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita de ancoragem p/ escada c/ absorvedor", "code": "12052S0ABS", "desc": "Sistema de ancoragem p/ fixação em escada de madeira e fibra de vidro.", "img": "img/serveq/p17-img107.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita p/ escalada", "code": "12052ESC69", "desc": "Fitas dupla com fivela e anéis D.", "img": "img/serveq/p17-img108.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita de ancoragem anelar", "code": "1201312000", "desc": "Com ou sem capa protetora.", "img": "img/serveq/p17-img109.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita de ancoragem anelar c/ absorvedor", "code": "12013120AB", "desc": "Com capa protetora absorvedora de atrito e rasgo.", "img": "img/serveq/p17-img110.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita de ancoragem Sling", "code": "1201312050", "desc": "Fita reforçada p/ ancoragem e amarração tipo Sling com olhais.", "img": "img/serveq/p17-img111.png"},
    {"cat": "altura", "badge": "NR-35", "title": "Fita p/ extensão de linha de vida", "code": "1205200000", "desc": "Fita extensora com argola e mosquetão costurado."},
    {"cat": "altura", "badge": "NR-35", "title": "Estropo de Nylon com 2 Olhais", "code": "1207130000", "desc": "Para tração ou suspensão de carga leve."},
    {"cat": "altura", "badge": "NR-35", "title": "Estropo de Nylon Olhal e D", "code": "1207120000", "desc": "Com argola metálica D para encaixe de mosquetão."},
    {"cat": "altura", "badge": "NR-35", "title": "Kit Resgate Serveq", "code": "1202800000", "desc": "Desenvolvido p/ salvamento de eletricista após acidente elétrico, isolante e leve."},

    # Page 18
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate mecânico MD6", "code": "1300067000", "desc": "Ferramenta de prensagem manual para conectores e terminais.", "img": "img/serveq/p18-img112.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Tesoura corta vergalhão isolado", "code": "1300453000", "desc": "Tamanhos: 14, 18, 24, 30, 36 e 42 polegadas. Isolação até o cabo.", "img": "img/serveq/p18-img113.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Tesourão p/ linha viva bico de papagaio", "code": "1401274FV0", "desc": "Cortador de cabos isolado em fibra de vidro para linha viva.", "img": "img/serveq/p18-img114.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate hidráulico Y35", "code": "130Y350000", "desc": "Alicate hidráulico tipo burndy para prensagem 12 toneladas.", "img": "img/serveq/p18-img115.png"},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Moitão de fibra duplo ou triplo p/ linha viva", "code": "1101500115", "desc": "Com ganchos de aço, totalmente isolado p/ elevação de cabos e chaves."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Moitão de aço com 1, 2 ou 3 gornes", "code": "110150BC01", "desc": "Capacidade de 520 Kg até 2800 Kg."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Loadbuster de 24,5 e 34,5KV", "code": "130LB24500", "desc": "Ferramenta de interrupção de carga sob carga para chaves fusíveis e faca."},
    {"cat": "altura", "badge": "NR-35", "title": "Degrau portátil p/ escalada em poste circular ou DT", "code": "1300469000", "desc": "Step em fita sintética e degrau moldado de resina."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Banqueta isolada", "code": "1300105000", "desc": "Plataforma isolante em polímero e fibra para elevação do nível de base para eletricista."},
    {"cat": "sinalizacao", "badge": "NR-6", "title": "Esfera de Sinalização", "code": "1300521000", "desc": "Sinalizador aéreo para cabos e linhas de transmissão, laranja padrão."},

    # Page 19
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate de corte isolado", "code": "1300501000", "desc": "Alicate de corte diagonal 1000V NR-10.", "img": "img/serveq/p18-img112.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate de bico isolado", "code": "1300054000", "desc": "Alicate meia cana bico reto 1000V NR-10.", "img": "img/serveq/p19-img116.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate universal isolado", "code": "1300072000", "desc": "Alicate universal eletricista 1000V NR-10.", "img": "img/serveq/p18-img113.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Alicate bomba d’água isolado", "code": "1300048000", "desc": "Alicate tipo bico de papagaio isolado 1000V.", "img": "img/serveq/p19-img117.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Chave inglesa isolada", "code": "1300455000", "desc": "Chave ajustável com isolamento espesso 1000V.", "img": "img/serveq/p18-img114.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Chave combinada isolada", "code": "1300535000", "desc": "Chave fixa e estrela com proteção isolante 1000V.", "img": "img/serveq/p19-img118.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Chave de fenda isolada", "code": "1300456000", "desc": "Haste totalmente encapada para evitar curtos 1000V.", "img": "img/serveq/p19-img119.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Chave Philips isolada", "code": "1300538000", "desc": "Haste redonda encapada, 1000V NR-10.", "img": "img/serveq/p19-img120.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Chave Allen tipo T isolada", "code": "1300372000", "desc": "Chave sextavada (Allen) com punho em T, 1000V.", "img": "img/serveq/p19-img121.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Arco de serra isolado", "code": "1303000000", "desc": "Serra de arco metálica recoberta de polímero isolante 1000V.", "img": "img/serveq/p19-img122.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Faca lâmina curva isolada", "code": "1101035000", "desc": "Faca para decapar cabos, tipo bico de falcão, isolada.", "img": "img/serveq/p19-img123.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Escova de aço modelo em 'V'", "code": "1102100000", "desc": "Utilizada p/ limpeza de condutores, c/ ou s/ encaixe universal.", "img": "img/serveq/p19-img124.png"},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Serra manual", "code": "1302140000", "desc": "Serrote de lâmina livre com cabo de madeira."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Serra p/ poda, c/ encaixe universal", "code": "1102130000", "desc": "Lâmina curva para poda de galhos com bastão isolante."},
    {"cat": "ferramentas", "badge": "Equipamentos", "title": "Recolhedor de fita", "code": "110742R000", "desc": "Para guardar fitas de sinalização ou medição, com enrolador manual."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Calço de caminhão em alumínio", "code": "1303740000", "desc": "Calço leve e extremamente resistente de liga em alumínio vazado."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Calço de caminhão em borracha", "code": "1300468000", "desc": "Calço maciço em borracha para frenagem e estabilização de rodas."},

    # Page 20
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona ou couro p/ acondicionamento", "code": "1201395000", "desc": "Bolsa de lona p/ EPIs e ferramentas c/ cadeado.", "img": "img/serveq/p19-img116.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona tiracolo c/ tampa", "code": "1201360000", "desc": "Bolsa modelo carteiro tiracolo pequena.", "img": "img/serveq/p20-img125.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona tiracolo s/ tampa", "code": "1201380000", "desc": "Bolsa modelo carteiro aberta.", "img": "img/serveq/p20-img126.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona p/ transporte de luvas", "code": "1201630000", "desc": "Formato ideal para proteção de luvas isolantes de borracha.", "img": "img/serveq/p20-img127.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona dupla p/ transporte de luvas", "code": "120163D000", "desc": "Comporta pares de luvas de borracha e vaqueta.", "img": "img/serveq/p20-img128.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona p/ transporte de manga isolante", "code": "1201310000", "desc": "Alongada, preservando a vida útil da borracha.", "img": "img/serveq/p20-img129.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona p/ transporte de manga e luva isolante", "code": "1201320000", "desc": "Combinada com bolsos externos duplos.", "img": "img/serveq/p20-img130.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona tipo canoa", "code": "1201460000", "desc": "Bolsa longa e aberta em cima para ferramentas manuais pesadas.", "img": "img/serveq/p20-img131.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa p/ ferramentas - modelo FORD", "code": "120138FORD", "desc": "Bolsa reforçada tira-colo média.", "img": "img/serveq/p20-img132.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Balde de lona p/ içamento de materiais", "code": "1201520000", "desc": "Fundo rígido em polímero, alça em nylon ou corda.", "img": "img/serveq/p20-img133.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Porta ferramentas c/ 7 divisórias", "code": "1201440000", "desc": "Para cinto do eletricista, em couro crú.", "img": "img/serveq/p20-img134.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de couro tiracolo c/ tampa", "code": "120136C000", "desc": "Em couro cru bovino reforçado.", "img": "img/serveq/p20-img135.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de couro tiracolo s/ tampa", "code": "120138C000", "desc": "Em couro cru bovino aberta, p/ acesso rápido.", "img": "img/serveq/p20-img136.png"},
    {"cat": "bolsas", "badge": "Acessórios", "title": "Bolsa de lona p/ acondicionamento de kit", "code": "120152KITS", "desc": "Bolsa mochila marinheiro com cordão p/ trabalho em altura."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Capa p/ cesto aéreo", "code": "1201895A00", "desc": "Capa protetora em lona vulcanizada ou trevira."},
    {"cat": "linha-viva", "badge": "NR-10", "title": "Capa p/ munck", "code": "1201891000", "desc": "Capa protetora quadrada."},

    # Page 21
    {"cat": "epi", "badge": "NR-6", "title": "Luva de vaqueta tipo petroleira", "code": "1300532000", "desc": "Proteção mecânica para trabalhos pesados."},
    {"cat": "epi", "badge": "NR-10", "title": "Luva de cobertura", "code": "1300533000", "desc": "Luva de couro vaqueta e raspa para vestir sobre luva isolante de borracha."},
    {"cat": "epi", "badge": "NR-10", "title": "Luva isolante de borracha (Classe 0 a 4)", "code": "1300534000", "desc": "Para proteção elétrica. Classes 00, 0, 1, 2, 3 e 4."},
    {"cat": "epi", "badge": "NR-6", "title": "Capa de chuva em PVC ou trevira", "code": "1303600000", "desc": "Capa de proteção contra chuva, com capuz e mangas."},
    {"cat": "epi", "badge": "NR-6", "title": "Vestimenta de proteção p/ apicultores", "code": "1301110000", "desc": "Manga longa e máscara respirável telada anti-insetos. Tamanhos: M / G / GG."},
    {"cat": "epi", "badge": "NR-6", "title": "Óculos de segurança", "code": "130870J000", "desc": "Lentes verdes, incolor e cinza (fume) com proteção UV."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Fita de Sinalização Zebrada", "code": "1307200000", "desc": "Rolo de fita plástica amarela/preta zebrada para isolamento."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Fita de Sinalização Laranja", "code": "1207420000", "desc": "Rolo contínuo de demarcação de 10, 20, 30, 40 ou 50 metros."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Cones de sinalização", "code": "1306600000", "desc": "Cones de trânsito em PVC flexível com faixas reflexivas (Padrão NBR)."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Placas de sinalização de perigo", "code": "120741E000", "desc": "Atenção: Não Opere Este Equipamento / Homens Trabalhando."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Bandeirola p/ escada", "code": "1202500000", "desc": "Bandeirola de advertência de balanço amarrável laranja."},
    {"cat": "sinalizacao", "badge": "Acessórios", "title": "Bandeirola c/ bastão", "code": "1202400000", "desc": "Bandeirola quadrada laranja com haste rígida."}
]

html_template = """
          <article class="product-card reveal" data-category="{cat}" role="listitem" aria-label="{title}">
            <div class="product-card__inner">
              <div class="product-card__front">
                <div class="product-card__image" onclick="this.closest('.product-card').classList.toggle('flipped')" tabindex="0">
                  <img src="{img_url}" alt="{title}" loading="lazy" width="300" height="300">
                  <div class="product-card__badge">
                    <span class="badge badge--success">Serveq</span>
                  </div>
                  <div class="product-card__overlay">
                    <svg onclick="event.stopPropagation(); openLightbox(this.closest('.product-card'))" class="zoom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                    <h3 class="product-card__overlay-title">{title}</h3>
                    <span class="badge badge--navy">{badge}</span>
                  </div>
                </div>
              </div>
              <div class="product-card__back">
                <div class="product-card__body">
                  <div class="product-card__category">{badge}</div>
                  <h3 class="product-card__name">{title}</h3>
                  <div class="product-card__specs">
                    Ref/Cód: {code}<br>
                    {desc}
                  </div>
                  <div class="product-card__actions">
                    <button class="btn btn--primary btn--sm btn-add-cart" data-product="{title}">Adicionar ao Carrinho</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
"""

with open('produtos.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f, 'html.parser')

grid = soup.find(id='products-grid')
if grid:
    grid.clear() # clear the existing grid to avoid duplication

    for p in products:
        img_url = p.get('img', 'img/serveq/placeholder.png')
        article_html = html_template.format(
            cat=p['cat'],
            title=p['title'].replace('"', '&quot;'),
            badge=p['badge'],
            code=p['code'],
            desc=p['desc'],
            img_url=img_url
        )
        new_tag = bs4.BeautifulSoup(article_html, 'html.parser')
        grid.append(new_tag)

    with open('produtos.html', 'w', encoding='utf-8') as f:
        # Prettify slightly modifies formatting, we write str(soup)
        f.write(str(soup))
    print(f"Inseridos {len(products)} produtos com sucesso no HTML!")
else:
    print("Elemento #products-grid não encontrado no HTML!")
