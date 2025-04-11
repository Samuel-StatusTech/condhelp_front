type TContent =
  | {
      type: "documentTitle" | "title" | "text"
      content: string
    }
  | {
      type: "divider"
    }

export const managerTermsText: TContent[] = [
  {
    type: "documentTitle",
    content: `CONTRATO DE FORNECIMENTO E AUTORIZAÇÃO DE USO DE SOFTWARE`,
  },
  {
    type: "text",
    content: `Seu direito de privacidade é muito importante para nós! Nossa política visa
    proporcionar ao participante o melhor aproveitamento dos nossos eventos, com
    a maior segurança, protegendo as informações disponibilizadas e respeitando
    sua privacidade.`,
  },
  {
    type: "title",
    content: "PARTICIPANTE",
  },
  {
    type: "text",
    content: `Aquele que se inscreve voluntariamente e participa dos eventos promovidos pela CONDHELP.`,
  },
  {
    type: "title",
    content: "WEBSITE CONDHELP",
  },
  {
    type: "text",
    content: `Plataforma tecnológica disponível para o participante realizar sua inscrição
    para eventos, cobrança de contribuições para eventos e a gestão de
    participantes, acessível no endereço eletrônico www.condhelp.com/events.`,
  },
  {
    type: "title",
    content: "A CONDHELP",
  },
  {
    type: "text",
    content: `CONDHELP SOLUÇÕES LTDA, pessoa jurídica de direito privado, inscrita no
    CNPJ nº 53.288.559/0001-25, sediada na Rua Vidal Vicente de Andrade, 1290,
    Forquilhas - São José/SC, CEP: 88107-0001.`,
  },
  {
    type: "title",
    content: "TRATAMENTO DE DADOS",
  },
  {
    type: "text",
    content: `Toda operação realizada com dados pessoais, como as que se referem a
    coleta, produção, recepção, classificação, utilização, acesso, reprodução,
    transmissão, distribuição, processamento, arquivamento, armazenamento,
    eliminação, avaliação ou controle da informação, modificação, comunicação,
    transferência, difusão ou extração.`,
  },
  {
    type: "text",
    content: `A CONDHELP poderá utilizar cookies e outras tecnologias de rastreamento
    para melhorar a experiência do usuário em nossa plataforma, personalizar
    conteúdo, analisar nosso tráfego e entender o comportamento dos
    participantes durante a navegação. O participante poderá configurar seu
    navegador para recusar cookies, mas isso poderá limitar algumas
    funcionalidades do nosso website.`,
  },
  {
    type: "title",
    content: "GLOSSÁRIO",
  },
  {
    type: "text",
    content: `Nossa Política de Privacidade, procura esclarecer nossas práticas com relação
    aos dados fornecidos voluntariamente pelo USUÁRIO à CONDHELP Soluções
    Ltda., usados, compartilhados e armazenados. Como eles nos ajudam a
    proporcionar o cumprimento amplo dos deveres estabelecidos com nossos
    clientes e usuários, que ao se cadastrar terá acesso restrito ao Sistema
    CONDHELP, isso indicará que você está ciente e em total e irrestrito acordo
    com a forma como utilizaremos as suas informações e seus dados, previstas
    nesta política.`,
  },
  {
    type: "title",
    content: "COLETA DE DADOS",
  },
  {
    type: "text",
    content: `Obtenção de informações pessoais e não pessoais`,
  },
  {
    type: "text",
    content: `Ao participar dos nossos eventos, serão coletados alguns dados, inclusive
    pessoais. A CONDHELP coletará tais informações em nome próprio.`,
  },
  {
    type: "text",
    content: `A CONDHELP coletará os dados pessoais de todos os participantes sempre
    que estes fornecerem tais informações de forma voluntária, por exemplo,
    quando inseridas pelo próprio participante no formulário inscrição, quando
    fornecidas por ele durante o processo de análise, validação, confirmação ou
    em fases posteriores. Os dados pessoais que podemos coletar incluem: nome
    pessoal, e-mail, telefone, data de nascimento, local (cidade), número de CPF,
    nome de condomínios, entre outros necessários para atingir os propósitos
    dispostos neste Termo.`,
  },
  {
    type: "text",
    content: `Ocasionalmente, podemos coletar informações sobre o participante de fontes
    manifestamente públicas ou de terceiros. Além disso, o meio de coleta dessas
    informações pode ser oferecido pelo próprio participante, quando ele
    compartilha em suas redes pessoais ou profissionais.`,
  },
  {
    type: "text",
    content: `As informações que a CONDHELP poderá obter em redes pessoais ou
    profissionais dependem das configurações de privacidade definidas pelo
    próprio usuário junto ao serviço da plataforma indicada, assim como somente
    as informações pessoais ou professionais que o usuário compartilha em sua
    página.`,
  },
  {
    type: "text",
    content: `Informações classificadas como sensíveis podem ser fornecidas pelo titular
    opcionalmente e de forma completamente anônima durante o processo de
    inscrição, sendo, portanto, consideradas como dados não pessoais.`,
  },
  {
    type: "text",
    content: `Os titulares de dados pessoais deverão exercer os direitos previstos no item “6”
    deste documento em “Direitos dos participantes”`,
  },
  {
    type: "text",
    content: `Para fins do disposto na Lei nº 13.709/2018 (“Lei Geral de Proteção de Dados
    Pessoais”), a CONDHELP atuará na qualidade de controladora dos dados
    pessoais dos participantes.`,
  },
  {
    type: "text",
    content: `Antes de participar dos nossos eventos, o participante deverá fornecer
    consentimento expresso e inequívoco para o tratamento dos dados pessoais
    descritos nesta política. O consentimento poderá ser revogado a qualquer
    momento mediante solicitação expressa do participante, sem prejuízo da
    legalidade do tratamento realizado até a data da revogação`,
  },
  {
    type: "title",
    content: `USO DE DADOS`,
  },
  {
    type: "text",
    content: `Os dados pessoais serão utilizados de forma compatível com o disposto neste
    Termo de Privacidade, apenas para fins internos, desde o momento da
    inscrição até a confirmação.`,
  },
  {
    type: "title",
    content: `USAMOS SEUS DADOS PARA`,
  },
  {
    type: "text",
    content: `Identificar o participante.`,
  },
  {
    type: "text",
    content: `Confirmar e apoiar o processo de inscrição do participante em todas as etapas necessárias.`,
  },
  {
    type: "text",
    content: `Melhorar a qualidade dos nossos processos e eventos.`,
  },
  {
    type: "text",
    content: `Garantir conformidade com a governança corporativa, requisitos legais e de parceiros de negócio.`,
  },
  {
    type: "text",
    content: `Confirmar, validar e dar continuidade aos trâmites necessários para participação do inscrito nos eventos.`,
  },
  {
    type: "text",
    content: `Comunicar o participante caso o número limite de inscritos exceda a capacidade permitida para o evento e alertá-lo sobre oportunidades futuras.`,
  },
  {
    type: "text",
    content: `A CONDHELP realizará o tratamento dos dados pessoais com base nas seguintes hipóteses legais: cumprimento de obrigação legal, execução de contrato, exercício regular de direitos e atendimento de interesses legítimos. A base legal poderá variar conforme a atividade realizada.`,
  },
  {
    type: "text",
    content: `Caso a CONDHELP utilize quaisquer dados pessoais de forma diversa das
    estabelecidas neste Termo de Privacidade, o participante será previamente
    informado sobre essa nova utilização, antes ou na data em que os dados
    pessoais forem recebidos`,
  },
  {
    type: "title",
    content: `COMO COMPARTILHAMOS OS SEUS DADOS`,
  },
  {
    type: "text",
    content: `A CONDHELP poderá realizar o compartilhamento de dados pessoais, com as
    seguintes finalidades: (i) melhorar a qualidade dos processos de inscrição; (ii)
    garantir o crescimento, estrutura e como realizar eventos de qualidade;`,
  },
  {
    type: "text",
    content: `A CONDHELP poderá vender ou comprar outras empresas ou ativos. Em caso
    de venda, fusão, reorganização, dissolução da empresa ou outra operação
    societária semelhante, os dados pessoais poderão fazer parte dos ativos
    intangíveis compartilhados ou transferidos.`,
  },
  {
    type: "text",
    content: `A CONDHELP poderá compartilhar os dados pessoais de seus participantes
    com parceiros e prestadores de serviços que tratam tais dados em nome da
    CONDHELP, tais como, mas não somente, plataformas de gestão de eventos e
    outros.`,
  },
  {
    type: "text",
    content: `A CONDHELP poderá compartilhar as informações de seus participantes com
    autoridades policiais ou judiciais competentes ou outros terceiros, dentro e fora
    do Brasil, caso seja requerido pela legislação aplicável, por decisão judicial e
    por requisição de autoridades, ou se necessário para responder a processos
    judiciais ou para participar em eventos litígios ou disputas de qualquer
    natureza.`,
  },
  {
    type: "text",
    content: `Nestas situações, a CONDHELP irá cooperar com as autoridades competentes
    na medida em que, discricionariamente, entenda necessário e adequado em
    relação a qualquer investigação de ilícitos, infrações a direitos de propriedade
    industrial ou intelectual, ou outra atividade que seja ilegal ou que possa expor a
    CONDHELP ou outros a qualquer responsabilidade legal ou lhes impor riscos,
    ressalvadas hipóteses de sigilo de informações constantes na legislação
    aplicável.`,
  },
  {
    type: "text",
    content: `Os dados pessoais dos participantes podem ser transferidos e processados em
    outros países que não o Brasil, onde as leis de proteção de dados podem ser
    diferentes. A CONDHELP assegura que tais transferências sejam realizadas
    em conformidade com as leis aplicáveis e implementa medidas de segurança
    apropriadas para proteger os dados pessoais.`,
  },
  {
    type: "title",
    content: `ARMAZENAMENTO DE DADOS`,
  },
  {
    type: "text",
    content: `As informações pessoais coletadas pela CONDHELP serão armazenadas em
    serviços de nuvem confiáveis, providos por parceiros que podem estar
    localizados no Brasil, em países da Europa ou em outros países.`,
  },
  {
    type: "text",
    content: `Na contratação desses serviços, a CONDHELP busca empresas que
    empregam alto nível de segurança no armazenamento de suas informações,
    estabelecendo contratos que não violam as definições de privacidade previstas
    neste Termo de Privacidade.`,
  },
  {
    type: "text",
    content: `A CONDHELP armazena as informações dos participantes para as finalidades
    apresentadas neste Termos de Privacidade, respeitando sempre o período de
    retenção de dados determinado pela legislação aplicável. Caso, o participante
    não conseguir se inscrever para o evento, nós iremos armazenar as suas
    informações por um período razoável para que seja possível realizar contato
    caso apareçam novas oportunidades.`,
  },
  {
    type: "text",
    content: `Caso o participante solicite a exclusão das suas informações pessoais
    fornecidas, seus dados serão anonimizados ou excluídos definitivamente, salvo
    se tais informações forem necessárias para cumprimento de obrigação legal
    pela CONDHELP, execução de contrato, atendimento de interesses legítimos,
    ou para exercício regular de direitos em processo judicial, administrativo ou
    arbitral.`,
  },
  {
    type: "text",
    content: `A CONDHELP emprega seus melhores esforços para respeitar e proteger as
    informações pessoais dos participantes contra perda, roubo ou qualquer
    modalidade de uso indevido, bem como contra acesso não autorizado,
    divulgação, alteração e destruição.`,
  },
  {
    type: "text",
    content: `A CONDHELP realizará o tratamento de dados pessoais mediante alto grau de
    segurança, implementando as melhores práticas em uso na indústria para a
    proteção de dados, tais como técnicas de criptografia, monitoramento e testes
    de segurança periódicos, firewall, entre outros. Contudo, não é possível
    garantir completamente a não ocorrência de interceptações e violações dos
    sistemas e bases de dados, uma vez que a internet possui sua estrutura de
    segurança em permanente aperfeiçoamento.`,
  },
  {
    type: "text",
    content: `Em caso de incidente de segurança da informação que resulte na destruição,
    perda, alteração, acesso não-autorizado, ou vazamento de dados pessoais, a
    CONDHELP irá avaliar, imediatamente, os riscos às liberdades civis e aos
    direitos fundamentais dos titulares dos dados pessoais. A comunicação aos
    titulares ou à Autoridade Nacional de Proteção de Dados será realizada
    conforme o caso concreto, após avaliação dos riscos mencionados.`,
  },
  {
    type: "text",
    content: `A CONDHELP implementa e mantém medidas de segurança administrativas,
    técnicas e físicas adequadas para proteger os dados pessoais dos
    participantes contra perda, roubo, uso indevido, acesso não autorizado,
    divulgação, alteração e destruição. Embora nos esforcemos para proteger as
    informações pessoais, não podemos garantir a segurança absoluta dos dados
    transmitidos via internet.`,
  },
  {
    type: "title",
    content: `DO USO DE IMAGEM E VOZ`,
  },
  {
    type: "text",
    content: `O Participante, declara ciência e autoriza, para todos os fins em direito
    admitidos, a utilização de sua imagem e voz, constantes em fotos, gravações e
    filmagens decorrentes de sua participação no evento devidamente inscrito, sob
    a responsabilidade da CONDHELP Soluções Ltda., sendo que a referência ao
    seu nome, que constitui o direito moral, deverá ser respeitada sempre.`,
  },
  {
    type: "text",
    content: `As imagens e voz poderão ser exibidas durante, ao final do referido evento e
    posterior ao evento, em apresentações audiovisuais do mesmo, em
    publicações e divulgações disponibilizadas em acesso aberto, por meio do
    website, dos perfis em redes sociais, tráfego pago, bem como de outros
    sistemas de disseminação da informação e do conhecimento.`,
  },
  {
    type: "text",
    content: `A autorização neste Termo especificada é gratuita e por prazo indeterminado.
    Por ser esta a expressão de minha vontade, nada terei a reclamar a título de
    direitos conexos à minha imagem e voz.`,
  },
  {
    type: "title",
    content: `O participante poderá solicitar à CONDHELP, de forma fácil e acessível,
    através do nosso endereço eletrônico eventos@condhelp.com (i) a correção de
    dados incompletos, inexatos ou desatualizados; (ii) anonimização, bloqueio ou
    eliminação dos dados desnecessários ou excessivos; (iii) portabilidade dos
    dados, dentro dos limites legais.`,
  },
  {
    type: "text",
    content: `Se o participante solicitar a exclusão dos dados de sua titularidade, a
    CONDHELP estará autorizada a excluir ou anonimizar os dados pessoais do
    solicitante.`,
  },
  {
    type: "text",
    content: `A CONDHELP nomeou um Encarregado de Proteção de Dados (DPO),
    responsável por garantir o cumprimento da Lei Geral de Proteção de Dados
    (LGPD) e atender às solicitações dos participantes relacionadas aos seus
    dados pessoais. Para entrar em contato com o DPO, o participante deve enviar
    um e-mail.`,
  },
  {
    type: "title",
    content: `DAS DISPOSIÇÕES GERAIS`,
  },
  {
    type: "text",
    content: `Ao se inscrever em um evento realizado pela CONDHELP, o participante
    declara estar ciente de todo o disposto neste Termo de Privacidade e demais
    políticas legais que se encontram vigentes na data da inscrição. Por isso, é
    recomendável que o participante se mantenha atualizado.`,
  },
  {
    type: "text",
    content: `O presente Termo de Privacidade, está sujeito a constante melhoria e
    aprimoramento. Assim, a CONDHELP se reserva o direito de modificá-lo a
    qualquer momento, conforme a finalidade e interesse da CONDHELP, tal qual
    para adequação e conformidade legal de disposição de lei ou norma que tenha
    força jurídica equivalente, cabendo ao participante verificá-la.`,
  },
  {
    type: "text",
    content: `A eventual tolerância quanto a qualquer violação dos termos e condições do
    contido neste domínio será considerada mera liberalidade e não será
    interpretada como novação, precedente invocável, renúncia a direitos,
    alteração tácita do termo, direito adquirido ou alteração do preposto.
    Caso alguma disposição deste Termo for julgada inaplicável ou sem efeito, o
    restante das normas continua a viger, sem a necessidade de medida judicial
    que declare tal assertiva. O termo aqui descrito será interpretado segundo a
    legislação brasileira.`,
  },
  {
    type: "text",
    content: `A comunicação entre a CONDHELP e o participante deverá ser realizada pelos
    canais de atendimento indicados e disponibilizados, sobretudo através do
    endereço de e-mail eventos@condhelp.com.`,
  },
  {
    type: "text",
    content: `Sempre que possível, potenciais divergências entre o participante e a
    CONDHELP serão resolvidas de forma amigável. Quando todos os esforços
    neste sentido forem esgotados, você concorda, desde já, que fica eleito o foro
    da comarca de São José, no Estado de Santa Catarina, no Brasil, para resolver
    controvérsias ou queixas oriundas da utilização de nossos objetivos ou
    relacionadas a este Termo de Privacidade para Participantes.`,
  },
]

export const providerTermsText: TContent[] = [
  {
    type: "documentTitle",
    content: `CONTRATO DE FORNECIMENTO E AUTORIZAÇÃO DE USO DE SOFTWARE`,
  },
  {
    type: "text",
    content: `Ao efetuar o registro, o CONTRATANTE declara ter lido e aceito integralmente este CONTRATO e TERMO DE USO, que apresenta as condições aplicáveis ao uso dos serviços oferecidos pela CONDHELP.`,
  },
  {
    type: "title",
    content: "OBJETO",
  },
  {
    type: "text",
    content: `A prestação de serviço da CONDHELP consiste em integrar síndicos e prestadores de serviço, permitindo que estes ofereçam produtos e serviços aos síndicos por meio do Sistema CONDHELP.`,
  },
  {
    type: "title",
    content: "VALOR E FORMA DE PAGAMENTO",
  },
  {
    type: "text",
    content: `Os valores são definidos conforme proposta comercial enviada. O pagamento total ou parcial implica aceitação do Termo. Pagamentos parciais reconhecem dívidas futuras.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DO CONTRATANTE",
  },
  {
    type: "text",
    content: `Manter seus dados atualizados, efetuar pagamentos conforme acordado, respeitar as leis aplicáveis, responsabilizar-se por tributos e por qualquer dano causado à CONDHELP ou a terceiros.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DA CONDHELP",
  },
  {
    type: "text",
    content: `Executar as atividades contratadas com qualidade, respeitar leis, pagar tributos próprios e limitar sua responsabilidade apenas ao escopo do contrato.`,
  },
  {
    type: "title",
    content: "LICENCIAMENTO E RESPONSABILIDADE DO SISTEMA",
  },
  {
    type: "text",
    content: `O uso do software CONDHELP é licenciado de forma não exclusiva. A propriedade intelectual continua sendo da CONDHELP. É proibida qualquer engenharia reversa ou cópia do software.`,
  },
  {
    type: "title",
    content: "SUPORTE TÉCNICO",
  },
  {
    type: "text",
    content: `Suporte técnico é realizado via central de atendimento. Problemas não relacionados ao software são cobrados à parte. Backups restaurados têm limite de até 7 dias anteriores.`,
  },
  {
    type: "title",
    content: "VIGÊNCIA E RESCISÃO",
  },
  {
    type: "text",
    content: `O contrato tem vigência de 12 meses, renovado automaticamente. Pode ser rescindido por descumprimento, falência ou por conveniência com aviso prévio de 30 dias.`,
  },
  {
    type: "title",
    content: "CONFIDENCIALIDADE",
  },
  {
    type: "text",
    content: `O CONTRATANTE deve manter sigilo absoluto sobre informações da CONDHELP, mesmo após o término do contrato, e garantir que seus funcionários também respeitem esta cláusula.`,
  },
  {
    type: "title",
    content: "ANTICORRUPÇÃO",
  },
  {
    type: "text",
    content: `O CONTRATANTE compromete-se a não oferecer ou aceitar vantagens indevidas, cumprir a Lei Anticorrupção (Lei 12.846/2013) e evitar conflitos de interesse.`,
  },
  {
    type: "title",
    content: "DISPOSIÇÕES GERAIS",
  },
  {
    type: "text",
    content: `O contrato não cria vínculo empregatício. Quaisquer notificações devem ser feitas por escrito. A propriedade intelectual do software pertence exclusivamente à CONDHELP.`,
  },
  {
    type: "title",
    content: "FORO",
  },
  {
    type: "text",
    content: `Fica eleito o Foro da Comarca de São José, Estado de Santa Catarina, para resolver qualquer disputa oriunda deste contrato.`,
  },
]

const termsEnd: TContent[] = [
  {
    type: "divider",
  },
  {
    type: "text",
    content: "São José, 2024.",
  },
  {
    type: "text",
    content: "Versão 1.0",
  },
  {
    type: "text",
    content: "Última atualização 30.11.2024",
  },
  {
    type: "title",
    content: "Lei aplicável",
  },
  {
    type: "text",
    content:
      "Este regulamento será regido, interpretado e executado de acordo com as leis da República Federativa do Brasil, independentemente dos conflitos dessas leis com leis de outros estados ou países, sendo competente o Foro da Comarca de São José, Estado de Santa Catarina, no Brasil, para dirimir qualquer dúvida decorrente deste instrumento",
  },
  {
    type: "text",
    content:
      "Quando você busca apoio através da Central de Atendimento via e-mail, os dados coletados são encaminhados para nossa central que tratará sua demanda. Os dados fornecidos não ficam arquivados para eventuais consultas sendo descartados de forma automática após atendimento.",
  },
  {
    type: "text",
    content:
      "Solicitações relativas a inclusões, alterações ou exclusões de cadastro, deverão ser encaminhadas através do e-mail suporte@condhelp.com",
  },
]

export const terms = {
  SINDICO: [...managerTermsText, ...termsEnd],
  PRESTADOR: [...providerTermsText, ...termsEnd],
}
