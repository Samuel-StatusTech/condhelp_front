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
    content: `Ao efetuar o registro, o SÍNDICO, denominado USUÁRIO, declara ter lido e aceito integralmente este CONTRATO e TERMO DE USO para utilização dos serviços CONDHELP.`,
  },
  {
    type: "title",
    content: "OBJETO",
  },
  {
    type: "text",
    content: `A CONDHELP realiza a integração entre Síndicos (USUÁRIOS) e Prestadores de Serviço (CLIENTES), permitindo solicitações de orçamentos via sistema.`,
  },
  {
    type: "title",
    content: "VALOR E FORMA DE PAGAMENTO",
  },
  {
    type: "text",
    content: `O uso do sistema é gratuito inicialmente. A CONDHELP pode alterar a gratuidade mediante aviso. Caso o USUÁRIO não aceite, pode cancelar o cadastro sem custos.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DO USUÁRIO",
  },
  {
    type: "text",
    content: `Disponibilizar informações atualizadas, respeitar leis, arcar com tributos, evitar vínculos com a CONDHELP, manter a empresa isenta de responsabilidades com terceiros, e responder por danos causados.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DA CONDHELP",
  },
  {
    type: "text",
    content: `Executar os serviços contratados com qualidade, respeitar a legislação, e notificar o USUÁRIO em caso de incidentes de segurança.`,
  },
  {
    type: "title",
    content: "VÍNCULO TRABALHISTA",
  },
  {
    type: "text",
    content: `Não se estabelece vínculo empregatício ou solidariedade entre as partes.`,
  },
  {
    type: "title",
    content: "LICENCIAMENTO E RESPONSABILIDADE DO SISTEMA",
  },
  {
    type: "text",
    content: `A licença do software é não exclusiva e não permanente. É proibida a engenharia reversa. A CONDHELP não se responsabiliza por danos indiretos decorrentes do uso.`,
  },
  {
    type: "title",
    content: "SUPORTE TÉCNICO",
  },
  {
    type: "text",
    content: `Suporte via e-mail, com abertura de chamado. Problemas não relacionados ao software são cobrados. Backup pode ser restaurado com dados de até 7 dias anteriores.`,
  },
  {
    type: "title",
    content: "VIGÊNCIA E RESCISÃO",
  },
  {
    type: "text",
    content: `O contrato é por prazo indeterminado. Caso haja cobrança futura, o contrato passa a valer por 12 meses. Pode ser rescindido a qualquer momento por ambas as partes.`,
  },
  {
    type: "title",
    content: "CLÁUSULA PENAL",
  },
  {
    type: "text",
    content: `Em caso de inadimplemento, será aplicada multa de 20% sobre os valores do contrato, mais indenização por perdas e danos.`,
  },
  {
    type: "title",
    content: "CONFIDENCIALIDADE",
  },
  {
    type: "text",
    content: `O USUÁRIO deve manter sigilo sobre informações confidenciais, inclusive após o término do contrato.`,
  },
  {
    type: "title",
    content: "CASO FORTUITO E FORÇA MAIOR",
  },
  {
    type: "text",
    content: `As partes não responderão por prejuízos em caso de eventos fora do controle, como desastres naturais ou ações governamentais.`,
  },
  {
    type: "title",
    content: "TRABALHO INFANTIL E ESCRAVO",
  },
  {
    type: "text",
    content: `O USUÁRIO não poderá contratar mão de obra infantil, forçada ou análoga à escrava, conforme a legislação.`,
  },
  {
    type: "title",
    content: "ANTICORRUPÇÃO",
  },
  {
    type: "text",
    content: `O USUÁRIO se compromete a cumprir a Lei Anticorrupção e não oferecer ou pagar vantagens indevidas a agentes públicos ou privados.`,
  },
  {
    type: "title",
    content: "DISPOSIÇÕES GERAIS",
  },
  {
    type: "text",
    content: `Todas as notificações serão feitas por e-mail. A relação contratual não configura sociedade, parceria ou vínculo empregatício. O nome e logomarca do USUÁRIO poderão ser usados como case de sucesso.`,
  },
  {
    type: "title",
    content: "FORO",
  },
  {
    type: "text",
    content: `As partes elegem o Foro da Comarca de São José/SC para resolução de eventuais litígios.`,
  },
]

export const providerTermsText: TContent[] = [
  {
    type: "documentTitle",
    content: `CONTRATO DE FORNECIMENTO E AUTORIZAÇÃO DE USO DE SOFTWARE`,
  },
  {
    type: "text",
    content: `Ao efetuar o registro, o CONTRATANTE declara ter lido e aceito integralmente este CONTRATO e TERMO DE USO, com as condições gerais de uso dos serviços oferecidos pela CONDHELP.`,
  },
  {
    type: "title",
    content: "OBJETO",
  },
  {
    type: "text",
    content: `A CONDHELP realiza integração entre Síndicos e Prestadores de Serviços, permitindo solicitação e resposta de orçamentos via sistema.`,
  },
  {
    type: "title",
    content: "VALOR E FORMA DE PAGAMENTO",
  },
  {
    type: "text",
    content: `Os valores são definidos por proposta comercial. Pagamento implica aceitação contratual. A CONDHELP pode suspender o sistema em caso de inadimplência.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DO CONTRATANTE",
  },
  {
    type: "text",
    content: `Fornecer informações atualizadas, efetuar pagamentos, cumprir as leis aplicáveis, manter a CONDHELP isenta de responsabilidades com terceiros e arcar com tributos e danos eventualmente causados.`,
  },
  {
    type: "title",
    content: "OBRIGAÇÕES DA CONDHELP",
  },
  {
    type: "text",
    content: `Executar os serviços com qualidade, cumprir leis aplicáveis, pagar tributos e limitar sua responsabilidade às obrigações contratuais.`,
  },
  {
    type: "title",
    content: "VÍNCULO TRABALHISTA",
  },
  {
    type: "text",
    content: `Não há vínculo empregatício ou solidariedade entre as Partes.`,
  },
  {
    type: "title",
    content: "LICENCIAMENTO E RESPONSABILIDADES DO SISTEMA",
  },
  {
    type: "text",
    content: `A licença do software não é exclusiva nem permanente. É proibida a engenharia reversa. O uso do sistema é por conta e risco do CONTRATANTE.`,
  },
  {
    type: "title",
    content: "SUPORTE TÉCNICO",
  },
  {
    type: "text",
    content: `O suporte é oferecido via e-mail com abertura de ticket. Casos não atribuídos ao software são cobrados. Restauração de backup é possível com dados de até 7 dias anteriores.`,
  },
  {
    type: "title",
    content: "VIGÊNCIA E RESCISÃO",
  },
  {
    type: "text",
    content: `O contrato tem vigência de 12 meses com renovação automática. Pode ser rescindido por inadimplemento, quebra de cláusulas ou por notificação prévia.`,
  },
  {
    type: "title",
    content: "CLÁUSULA PENAL",
  },
  {
    type: "text",
    content: `Multa de 20% do valor do contrato será aplicada em caso de rescisão motivada por inadimplemento, além da reparação por perdas e danos.`,
  },
  {
    type: "title",
    content: "CONFIDENCIALIDADE",
  },
  {
    type: "text",
    content: `O CONTRATANTE deve manter sigilo sobre informações confidenciais da CONDHELP, inclusive após o fim do contrato.`,
  },
  {
    type: "title",
    content: "FORÇA MAIOR",
  },
  {
    type: "text",
    content: `Casos de força maior ou fortuito eximem responsabilidade das Partes, desde que devidamente comprovados.`,
  },
  {
    type: "title",
    content: "TRABALHO INFANTIL E ESCRAVO",
  },
  {
    type: "text",
    content: `É vedado o uso de mão de obra infantil, forçada ou análoga à escrava, conforme a legislação brasileira.`,
  },
  {
    type: "title",
    content: "ANTICORRUPÇÃO",
  },
  {
    type: "text",
    content: `O CONTRATANTE compromete-se a cumprir a Lei Anticorrupção (Lei 12.846/2013) e a não oferecer vantagens indevidas.`,
  },
  {
    type: "title",
    content: "DISPOSIÇÕES GERAIS",
  },
  {
    type: "text",
    content: `Não há vínculo societário entre as partes. As comunicações são feitas por e-mail. A CONDHELP pode usar o nome e logomarca do CONTRATANTE como case de sucesso.`,
  },
  {
    type: "title",
    content: "FORO",
  },
  {
    type: "text",
    content: `Fica eleito o Foro da Comarca de São José/SC para dirimir quaisquer dúvidas decorrentes deste contrato.`,
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
