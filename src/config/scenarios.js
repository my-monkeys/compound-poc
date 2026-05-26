export const scenarios = {
  pea: {
    slug: 'pea',
    enSlug: 'pea',
    fr: {
      name: 'PEA',
      title: "Simulateur PEA — Calculateur d'intérêts composés",
      description: "Calculez la croissance de votre PEA avec versements mensuels. Simulation gratuite, sans inscription.",
      h1: "Simulateur d'intérêts composés — PEA",
    },
    en: {
      name: 'PEA',
      title: 'PEA Compound Interest Calculator',
      description: 'Calculate your PEA growth with monthly contributions. Free simulation, no sign-up.',
      h1: 'PEA Compound Interest Calculator',
    },
    defaults: { initial: 1000, monthly: 100, rate: 7, years: 20, compound: 12 },
    ceiling: 150000,
    ogImage: '/og/pea.png',
  },
  'livret-a': {
    slug: 'livret-a',
    enSlug: 'savings',
    fr: {
      name: 'Livret A',
      title: 'Simulateur Livret A — Calcul des intérêts',
      description: 'Calculez les intérêts de votre Livret A selon le taux en vigueur. Simulation avec versements mensuels.',
      h1: 'Simulateur Livret A — Calcul des intérêts',
    },
    en: {
      name: 'Livret A',
      title: 'Livret A Savings Calculator',
      description: 'Calculate your Livret A savings growth with monthly contributions.',
      h1: 'Livret A Savings Calculator',
    },
    defaults: { initial: 1000, monthly: 100, rate: 3, years: 10, compound: 12 },
    ceiling: 22950,
    ogImage: '/og/livret-a.png',
  },
  'assurance-vie': {
    slug: 'assurance-vie',
    enSlug: 'life-insurance',
    fr: {
      name: 'Assurance-vie',
      title: "Simulateur Assurance-vie — Intérêts composés",
      description: "Simulez la croissance de votre contrat d'assurance-vie avec versements programmés.",
      h1: 'Simulateur Assurance-vie',
    },
    en: {
      name: 'Life Insurance',
      title: 'Life Insurance Compound Interest Calculator',
      description: 'Simulate your life insurance contract growth with scheduled contributions.',
      h1: 'Life Insurance Calculator',
    },
    defaults: { initial: 5000, monthly: 200, rate: 4.5, years: 15, compound: 12 },
    ceiling: null,
    ogImage: '/og/assurance-vie.png',
  },
  retraite: {
    slug: 'retraite',
    enSlug: 'retirement',
    fr: {
      name: 'Retraite',
      title: 'Simulateur retraite — Épargne long terme',
      description: 'Calculez votre capital retraite avec intérêts composés et versements réguliers.',
      h1: "Simulateur d'épargne retraite",
    },
    en: {
      name: 'Retirement',
      title: 'Retirement Savings Calculator — Compound Interest',
      description: 'Calculate your retirement capital with compound interest and regular contributions.',
      h1: 'Retirement Savings Calculator',
    },
    defaults: { initial: 10000, monthly: 300, rate: 6, years: 25, compound: 12 },
    ceiling: null,
    ogImage: '/og/retraite.png',
  },
  custom: {
    slug: 'custom',
    enSlug: 'custom',
    fr: {
      name: 'Personnalisé',
      title: "Simulateur personnalisé — Calculateur d'intérêts composés",
      description: "Créez votre propre simulation avec les paramètres de votre choix. Taux, durée, versements — sans contrainte.",
      h1: 'Simulateur personnalisé',
    },
    en: {
      name: 'Custom',
      title: 'Custom Compound Interest Calculator',
      description: 'Build your own simulation with any parameters you choose. Rate, duration, contributions — no constraints.',
      h1: 'Custom Calculator',
    },
    defaults: { initial: 10000, monthly: 200, rate: 5, years: 15, compound: 12 },
    ceiling: null,
    ogImage: '/og/custom.png',
  },
}

// Map EN slug → FR slug key (pour React Router)
export const enSlugToFr = Object.fromEntries(
  Object.values(scenarios).map(s => [s.enSlug, s.slug])
)
