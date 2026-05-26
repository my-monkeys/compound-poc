import { Link } from 'react-router-dom'
import { scenarios } from '../config/scenarios'
import Seo from '../components/Seo'

const BASE = 'https://compound.my-monkey.fr'

const copy = {
  fr: {
    title: "Compound — Simulateur d'intérêts composés",
    description: "Calculez et simulez la croissance de votre épargne avec intérêts composés. PEA, Livret A, Assurance-vie, Retraite.",
    hero: "L'intérêt composé,\nla huitième merveille.",
    sub: "Simulez la croissance de votre épargne dans le temps.\nGratuit, sans inscription — vos données restent sur votre appareil.",
    exampleLabel: "Par exemple",
    exampleDesc: "1 000 € de départ · 100 €/mois · 7 % par an · 20 ans",
    stat1: "Investi",
    stat2: "Intérêts",
    stat3: "Capital final",
    invested: "25 000 €",
    interest: "+31 118 €",
    total: "56 118 €",
    chooseLabel: "Choisissez votre placement",
    customName: "Personnalisé",
    customSub: "Vos propres paramètres",
    langSwitch: "EN — English",
    langSwitchTo: "/en/",
  },
  en: {
    title: "Compound — Compound Interest Calculator",
    description: "Calculate and simulate your savings growth with compound interest. PEA, Livret A, Life Insurance, Retirement.",
    hero: "Compound interest,\nthe eighth wonder.",
    sub: "Simulate your savings growth over time.\nFree, no sign-up — your data stays on your device.",
    exampleLabel: "For example",
    exampleDesc: "€1,000 initial · €100/month · 7% per year · 20 years",
    stat1: "Invested",
    stat2: "Interest",
    stat3: "Final capital",
    invested: "€25,000",
    interest: "+€31,118",
    total: "€56,118",
    chooseLabel: "Choose a calculator",
    customName: "Custom",
    customSub: "Your own parameters",
    langSwitch: "FR — Français",
    langSwitchTo: "/",
  },
}

// 1 000 € initial + 100 €/month · 7% · 20y → 56 118 €
// invested: 1000 + 100×12×20 = 25 000 €
const INVESTED_PCT = 44.5

export default function Home({ lang }) {
  const c = copy[lang]
  const path = lang === 'en' ? '/en/' : '/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Compound',
    url: BASE,
    description: c.description,
  }

  return (
    <>
      <Seo
        title={c.title}
        description={c.description}
        canonical={`${BASE}${path}`}
        hreflangFr={`${BASE}/`}
        hreflangEn={`${BASE}/en/`}
        jsonLd={jsonLd}
        ogImage={`${BASE}/og/default.png`}
        lang={lang}
      />

      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid #0d1018' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, background: '#e2cb9515', border: '1px solid #e2cb9430', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#e2cb95" strokeWidth="1.5">
                <path d="M2 10 C2 6 6 6 6 3 C6 6 10 6 10 10" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ color: '#e8eaf0', fontSize: 14, fontWeight: 600, letterSpacing: '-.01em' }}>Compound</span>
          </div>
          <Link
            to={c.langSwitchTo}
            style={{ color: '#2e3545', fontSize: 11, textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4a5568' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#2e3545' }}
          >
            {c.langSwitch}
          </Link>
        </header>

        {/* Main */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '72px 24px 80px' }}>
          <div style={{ width: '100%', maxWidth: 520 }}>

            {/* Hero */}
            <section style={{ marginBottom: 52 }}>
              <h1 className="hero-title" style={{ color: '#e8eaf0', fontSize: 38, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: 20, whiteSpace: 'pre-line' }}>
                {c.hero}
              </h1>
              <p style={{ color: '#4a5568', fontSize: 14, lineHeight: 1.65, maxWidth: 400, whiteSpace: 'pre-line' }}>
                {c.sub}
              </p>
            </section>

            {/* Proof block */}
            <section style={{ background: '#0a0c12', border: '1px solid #161b26', borderRadius: 10, padding: '20px 22px', marginBottom: 52 }}>
              <div style={{ color: '#2e3545', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                {c.exampleLabel}
              </div>
              <div style={{ color: '#e8eaf0', fontSize: 13, marginBottom: 22 }}>
                {c.exampleDesc}
              </div>

              {/* Progress bar: grey = invested, gold = interest */}
              <div style={{ height: 3, borderRadius: 2, background: '#1a1e2a', marginBottom: 22, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${INVESTED_PCT}%`, background: '#2e3545', borderRadius: '2px 0 0 2px' }} />
                <div style={{ flex: 1, background: '#e2cb95', opacity: 0.65, borderRadius: '0 2px 2px 0' }} />
              </div>

              {/* Three stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ color: '#2e3545', fontSize: 10, marginBottom: 5 }}>{c.stat1}</div>
                  <div style={{ color: '#4a5568', fontSize: 15, fontWeight: 600, letterSpacing: '-.02em' }}>{c.invested}</div>
                </div>
                <div>
                  <div style={{ color: '#2e3545', fontSize: 10, marginBottom: 5 }}>{c.stat2}</div>
                  <div style={{ color: '#e2cb95', fontSize: 15, fontWeight: 600, letterSpacing: '-.02em' }}>{c.interest}</div>
                </div>
                <div>
                  <div style={{ color: '#2e3545', fontSize: 10, marginBottom: 5 }}>{c.stat3}</div>
                  <div style={{ color: '#e8eaf0', fontSize: 15, fontWeight: 600, letterSpacing: '-.02em' }}>{c.total}</div>
                </div>
              </div>
            </section>

            {/* Section divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: '#0d1018' }} />
              <span style={{ color: '#2e3545', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {c.chooseLabel}
              </span>
              <div style={{ flex: 1, height: 1, background: '#0d1018' }} />
            </div>

            {/* Scenario cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.values(scenarios).filter(s => s.slug !== 'custom').map(s => {
                const href = lang === 'en' ? `/en/${s.enSlug}` : `/${s.slug}`
                const name = s[lang]?.name ?? s.fr.name
                return (
                  <Link
                    key={s.slug}
                    to={href}
                    style={{ background: '#0d0f14', border: '1px solid #1a1e2a', borderRadius: 8, padding: '16px 18px', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#e2cb9440' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1e2a' }}
                  >
                    <div style={{ color: '#e8eaf0', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{name}</div>
                    <div style={{ color: '#2e3545', fontSize: 11 }}>
                      {s.defaults.rate}% · {s.defaults.years} {lang === 'en' ? 'years' : 'ans'}
                    </div>
                  </Link>
                )
              })}
              <Link
                to={lang === 'en' ? '/en/custom' : '/custom'}
                style={{ background: 'transparent', border: '1px dashed #1e2535', borderRadius: 8, padding: '16px 18px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e2cb9460' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2535' }}
              >
                <div style={{ color: '#4a5568', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{c.customName}</div>
                <div style={{ color: '#2e3545', fontSize: 11 }}>{c.customSub}</div>
              </Link>
            </div>

          </div>
        </main>

      </div>
    </>
  )
}
