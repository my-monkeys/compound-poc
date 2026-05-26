export function detectLang(pathname) {
  return pathname.startsWith('/en') ? 'en' : 'fr'
}

const strings = {
  fr: {
    newSimulation: 'Nouvelle simulation',
    share: 'Partager',
    copied: 'Copié !',
    save: 'Sauvegarder',
    delete: 'Supprimer',
    rename: 'Renommer',
    initialCapital: 'Capital initial',
    monthlyContribution: 'Versement / mois',
    annualRate: 'Taux annuel',
    duration: 'Durée',
    compounding: 'Capitalisation',
    monthly: 'Mensuelle',
    yearly: 'Annuelle',
    daily: 'Quotidienne',
    finalCapital: 'Capital final estimé',
    totalContributed: 'Capital versé',
    totalInterest: 'Intérêts générés',
    years: 'ans',
    evolutionChart: 'Évolution du capital',
    contributed: 'Capital versé',
    interest: 'Intérêts composés',
    year: 'Année',
    simulationsLabel: 'Simulations',
    exportCsv: 'Exporter CSV',
    langSwitch: 'EN',
  },
  en: {
    newSimulation: 'New simulation',
    share: 'Share',
    copied: 'Copied!',
    save: 'Save',
    delete: 'Delete',
    rename: 'Rename',
    initialCapital: 'Initial capital',
    monthlyContribution: 'Monthly contribution',
    annualRate: 'Annual rate',
    duration: 'Duration',
    compounding: 'Compounding',
    monthly: 'Monthly',
    yearly: 'Yearly',
    daily: 'Daily',
    finalCapital: 'Estimated final capital',
    totalContributed: 'Total contributed',
    totalInterest: 'Total interest',
    years: 'years',
    evolutionChart: 'Capital growth',
    contributed: 'Contributed',
    interest: 'Compound interest',
    year: 'Year',
    simulationsLabel: 'Simulations',
    exportCsv: 'Export CSV',
    langSwitch: 'FR',
  },
}

export function t(lang, key) {
  return strings[lang]?.[key] ?? strings.fr[key] ?? key
}
