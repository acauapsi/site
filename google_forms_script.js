/**
 * =========================================================================
 * GOOGLE APPS SCRIPT — Gerador Automático de Briefing Clínico Master (35 Itens)
 * =========================================================================
 * Como usar:
 * 1. Acesse: https://script.google.com/
 * 2. Clique em "Novo Projeto"
 * 3. Cole este código e clique em "Executar" (Run)
 * 4. O formulário master completo será criado no seu Google Drive com link pronto!
 */

function criarFormularioAcauaBriefingMaster35() {
  const form = FormApp.create('Briefing Clínico Master — Acauã Sites');
  form.setDescription('Formulário guiado e completo para criação de site de psicólogo.\nPreencha marcando as opções sugeridas ou detalhando nos campos abertos.');
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);

  // BLOCO 1: IDENTIFICAÇÃO
  form.addSectionHeaderItem().setTitle('BLOCO 1 — Identificação & Registro Profissional (CFP)');
  
  form.addMultipleChoiceItem()
    .setTitle('1. Como deseja assinar seu nome principal no site?')
    .setChoiceValues([
      'Dra. / Dr. [Meu Nome]',
      'Psicóloga / Psicólogo [Meu Nome]',
      '[Meu Nome] | Psicólogo(a) Clínico(a)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem().setTitle('2. Digite seu Nome Completo Profissional').setRequired(true);
  form.addTextItem().setTitle('3. Número do CRP & Região (ex: CRP 06/142980)').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Cadastro Ativo no e-Psi (Atendimento Online)?')
    .setChoiceValues([
      'Sim, possuo cadastro e-Psi ativo',
      'Não atendo online (Apenas presencial)',
      'Estou cadastrando no e-Psi'
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('5. Em quais idiomas você realiza sessões?')
    .setChoiceValues(['Português', 'Inglês', 'Espanhol'])
    .showOtherOption(true);

  form.addTextItem().setTitle('6. WhatsApp Profissional com DDD').setRequired(true);
  form.addTextItem().setTitle('7. Instagram Profissional (ex: @psicologa.camila)');
  form.addTextItem().setTitle('8. Endereço Completo do Consultório Presencial (se houver)');

  // BLOCO 2: ABORDAGEM TEÓRICA (SEPARADAS INDIVIDUALMENTE)
  form.addPageBreakItem().setTitle('BLOCO 2 — Abordagem Teórica & Linha Clínica');

  form.addMultipleChoiceItem()
    .setTitle('9. Qual é a sua Abordagem Teórica Principal?')
    .setChoiceValues([
      'TCC (Terapia Cognitivo-Comportamental)',
      'Psicanálise Freudiana',
      'Psicanálise Lacaniana',
      'Psicanálise Winnicottiana / Kleiniana',
      'Fenomenologia-Existencial',
      'Gestalt-Terapia',
      'Abordagem Centrada na Pessoa (Humanista / Carl Rogers)',
      'Terapia de Aceitação e Compromisso (ACT)',
      'Terapia Comportamental Dialética (DBT)',
      'Terapia do Esquema',
      'Terapia Sistêmica / Familiar',
      'Psicologia Analítica (Junguiana)'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // BLOCO 3: PÚBLICO & QUEIXAS
  form.addPageBreakItem().setTitle('BLOCO 3 — Público-Alvo, Queixas & Diferencial');

  form.addCheckboxItem()
    .setTitle('10. Quem é o seu público prioritário?')
    .setChoiceValues([
      'Adultos em geral',
      'Mulheres (Maternidade, Autoestima, Relacionamentos)',
      'Homens (Pressão profissional, Emoções, Carreira)',
      'Adolescentes (12-17 anos)',
      'Crianças / Orientação Parental',
      'Casais & Relacionamentos',
      'Brasileiros no Exterior / Expatriados',
      'Público 60+ (Terceira Idade)',
      'Comunidade LGBTQIA+'
    ])
    .showOtherOption(true);

  form.addCheckboxItem()
    .setTitle('11. Quais são as principais queixas/dores que você mais trata?')
    .setChoiceValues([
      'Ansiedade, crises de pânico e mente acelerada',
      'Sensação de vazio, desânimo constante, luto e depressão',
      'Baixa autoestima, dificuldade em dizer não e dependência emocional',
      'Burnout, estresse crônico e sobrecarga de trabalho',
      'Conflitos amorosos, ciúmes excessivo e término de relações',
      'TOC, fobias e insônia crônica'
    ])
    .showOtherOption(true);

  form.addTextItem().setTitle('12. ⛔ Existe algum tipo de caso que você NÃO atende e prefere encaminhar? (Ex: dependência química severa, perícias judiciais, menores de 12 anos...)');

  form.addMultipleChoiceItem()
    .setTitle('13. Qual é o seu Diferencial Clínico em 1 frase?')
    .setChoiceValues([
      'Abordagem baseada em evidências científicas com ferramentas práticas para o dia a dia.',
      'Um espaço seguro, sigiloso e livre de julgamentos para você se expressar com total liberdade.',
      'Atendimento personalizado e humanizado, respeitando o seu próprio tempo e ritmo interno.'
    ])
    .showOtherOption(true);

  // BLOCO 4: SERVIÇOS B2B & FORMAÇÃO
  form.addPageBreakItem().setTitle('BLOCO 4 — Serviços Corporativos & Autoridade');

  form.addCheckboxItem()
    .setTitle('14. Você oferece algum destes serviços adicionais?')
    .setChoiceValues([
      'Palestras & Workshops para Empresas (SIPAT, Saúde Mental no Trabalho)',
      'Supervisão Clínica para Psicólogos Recém-formados',
      'Grupos Terapêuticos / Rodas de Conversa Temáticas',
      'Orientação Vocacional / Transição de Carreira'
    ])
    .showOtherOption(true);

  form.addParagraphTextItem().setTitle('15. Sua Formação Acadêmica & Títulos (Graduação, Pós, Especializações):');
  form.addTextItem().setTitle('16. Presença na Mídia, Podcasts, Livros ou Artigos Publicados (se houver):');

  // BLOCO 5: LOGÍSTICA
  form.addPageBreakItem().setTitle('BLOCO 5 — Logística da Sessão & Pagamentos');

  form.addMultipleChoiceItem()
    .setTitle('17. Duração da Sessão:')
    .setChoiceValues(['50 minutos (Padrão ouro)', '60 minutos (1 hora)', '45 minutos'])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('18. Frequência Habitual:')
    .setChoiceValues(['Semanal (Mais recomendado)', 'Quinzenal', 'Definida caso a caso'])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('19. Como prefere conduzir o primeiro contato?')
    .setChoiceValues([
      'A primeira consulta já é um atendimento regular pago.',
      'Ofereço uma conversa inicial gratuita de 15 min (vídeo/áudio) para alinhamento.'
    ])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('20. Política de Planos de Saúde & Reembolso:')
    .setChoiceValues([
      'Particular com Recibo/NF para o paciente solicitar reembolso no plano',
      'Apenas atendimento particular regular'
    ])
    .showOtherOption(true);

  form.addCheckboxItem()
    .setTitle('21. Formas de Pagamento Aceitas:')
    .setChoiceValues(['Pix', 'Cartão de Crédito', 'Boleto Bancário', 'Wise / PayPal (Exterior)'])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('22. Política de Cancelamento / Faltas:')
    .setChoiceValues([
      'Aviso prévio de 24 horas sem cobrança (Mais comum)',
      'Aviso prévio de 48 horas',
      'Sessões desmarcadas no mesmo dia são cobradas'
    ])
    .showOtherOption(true);

  form.addCheckboxItem()
    .setTitle('23. Acessibilidade Presencial (se aplicável):')
    .setChoiceValues([
      'Elevador e Rampa para Cadeirantes',
      'Estacionamento no Local ou Convênio',
      'Próximo ao Metrô / Transporte Público'
    ])
    .showOtherOption(true);

  // BLOCO 6: ESTÉTICA
  form.addPageBreakItem().setTitle('BLOCO 6 — Estética, Cores & Referências');

  form.addMultipleChoiceItem()
    .setTitle('24. Qual estilo visual mais representa o seu consultório?')
    .setChoiceValues([
      'Acolhedor & Natural (Tons sálvia, bege, terracota suave)',
      'Elegante & Sofisticado (Fundo claro/creme, detalhes em cobre/ouro e tipografia clássica)',
      'Clínico & Técnico (Tons petróleo, azul profundo e visual sóbrio/científico)',
      'Minimalista & Clean (Foco total no espaço em branco e leitura limpa)'
    ])
    .showOtherOption(true);

  // 3 LINHAS DE LINKS SEPARADAS
  form.addTextItem().setTitle('25. Link de Referência 1: (Site que você acha bonito)');
  form.addTextItem().setTitle('26. Link de Referência 2: (Outro site de referência)');
  form.addTextItem().setTitle('27. Link de Referência 3: (Outro site de referência)');
  form.addTextItem().setTitle('28. ⛔ O que você ODEIA ver em sites e quer evitar a todo custo?');

  // BLOCO 7: SEÇÕES & COPY
  form.addPageBreakItem().setTitle('BLOCO 7 — Estrutura de Seções & Headline');

  form.addCheckboxItem()
    .setTitle('29. Quais seções você quer no seu site?')
    .setChoiceValues([
      'Hero com Foto e Botão WhatsApp',
      'Sobre Mim e Formação',
      'Especialidades e Queixas Tratadas',
      'Como Funciona o Atendimento (Passo a passo)',
      'Perguntas Frequentes (FAQ)',
      'Valores e Reembolso de Convênio',
      'Localização e Mapa Presencial',
      'Botão Flutuante do WhatsApp'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('30. Material Fotográfico Disponível:')
    .setChoiceValues([
      'Envio fotos de ensaio profissional em alta resolução',
      'Envio fotos de boa qualidade tiradas no celular',
      'Não quero usar fotos minhas / Prefiro elementos ilustrativos e acolhedores'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('31. Título Principal da Página (Headline da Hero):')
    .setChoiceValues([
      'Psicoterapia para cuidar da sua saúde emocional com acolhimento e base científica.',
      'Um espaço seguro para você superar a ansiedade, resgatar sua autoestima e viver com leveza.',
      'Psicoterapia clínica para quem busca se reconectar consigo mesmo e transformar seus relacionamentos.'
    ])
    .showOtherOption(true);

  form.addMultipleChoiceItem()
    .setTitle('32. Texto do Botão Principal:')
    .setChoiceValues(['FALAR NO WHATSAPP', 'AGENDAR CONSULTA', 'CONVERSAR COM A PSICÓLOGA', 'SOLICITAR HORÁRIO']);

  form.addMultipleChoiceItem()
    .setTitle('33. Mensagem Automática do WhatsApp:')
    .setChoiceValues([
      'Olá! Vi seu site e gostaria de saber sobre horários para psicoterapia.',
      'Olá! Gostaria de entender melhor como funciona a terapia online e tirar algumas dúvidas.',
      'Olá! Gostaria de agendar uma primeira consulta de avaliação.'
    ])
    .showOtherOption(true);

  // BLOCO 8: DOMÍNIO & SEO
  form.addPageBreakItem().setTitle('BLOCO 8 — Domínio, Google & Tráfego Pago');

  form.addTextItem().setTitle('34. Domínio na Internet (ex: www.seunome.com.br):');
  form.addTextItem().setTitle('35. Termos de busca prioritários para aparecer no Google (ex: "Psicóloga TCC em Pinheiros"):');

  Logger.log('Formulário Master (35 Questões) Criado com Sucesso!');
  Logger.log('Link de Edição: ' + form.getEditUrl());
  Logger.log('Link para o Cliente: ' + form.getPublishedUrl());
}
