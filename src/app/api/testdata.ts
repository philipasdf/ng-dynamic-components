export const FRAGEBOGEN_BASIC = {
  fragebogenName: 'Default Fragebogen',
  fragen: [
    {
      index: 0,
      formConfig: {
        frageTyp: 'textfeld',
        frage: '',
        pflichtfeld: true,
      },
    },
  ],
};

export const FRAGEBOGEN_ADVANCED = {
  fragebogenName: 'Schon bearbeiteter Fragebogen',
  fragen: [
    {
      index: 0,
      frageTyp: 'ueberschrift',
      formConfig: {
        ueberschrift: 'Filme und Serien',
      },
    },
    {
      index: 1,
      frageTyp: 'textfeld',
      formConfig: {
        frage: 'Dein letzter Film?',
        antwort: '',
        pflichtfeld: true,
      },
    },
    {
      index: 2,
      frageTyp: 'textfeld',
      formConfig: {
        frage: 'Aktuelle Serie?',
        antwort: 'Dragonball Super',
        pflichtfeld: true,
      },
    },
    {
      index: 3,
      frageTyp: 'ueberschrift',
      formConfig: {
        ueberschrift: 'Musik',
      },
    },
    {
      index: 4,
      frageTyp: 'textfeld',
      formConfig: {
        frage: 'Den letzten Song, den du im Kopf hast?',
        antwort: '',
        pflichtfeld: false,
      },
    },
  ],
};
