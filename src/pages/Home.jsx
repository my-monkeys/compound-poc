import { Link } from 'react-router-dom'
import { scenarios } from '../config/scenarios'
import Seo from '../components/Seo'

const BASE = 'https://compound.app'

const labels = {
  fr: {
    title: "Compound — Simulateur d'intérêts composés",
    description: "Calculez et simulez la croissance de votre épargne avec intérêts composés. PEA, Livret A, Assurance-vie, Retraite.",
    h1: "Simulateur d'intérêts composés",
    sub: "Choisissez un placement pour démarrer votre simulation.",
  },
  en: {
    title: "Compound — Compound Interest Calculator",
    description: "Calculate and simulate your savings growth with compound interest. PEA, Livret A, Life Insurance, Retirement.",
    h1: "Compound Interest Calculator",
    sub: "Choose an account type to start your simulation.",
  },
}

export default function Home({ lang }) {
  const copy = labels[lang]
  const path = lang === 'en' ? '/en/' : '/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Compound',
    url: BASE,
    description: copy.description,
  }

  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        canonical={`${BASE}${path}`}
        hreflangFr={`${BASE}/`}
        hreflangEn={`${BASE}/en/`}
        jsonLd={jsonLd}
      />
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, background: '#e2cb9520', border: '1px solid #e2cb9440', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="#e2cb95" strokeWidth="1.5">
              <path d="M2 10 C2 6 6 6 6 3 C6 6 10 6 10 10" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ color: '#e8eaf0', fontSize: 22, fontWeight: 600, letterSpacing: '-.02em' }}>{copy.h1}</h1>
        </div>
        <p style={{ color: '#4a5568', fontSize: 13, marginBottom: 40, textAlign: 'center', maxWidth: 400 }}>{copy.sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 480 }}>
          {Object.values(scenarios).map(s => {
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
        </div>
        <div style={{ marginTop: 48 }}>
          <Link
            to={lang === 'en' ? '/' : '/en/'}
            style={{ color: '#2e3545', fontSize: 11, textDecoration: 'none' }}
          >
            {lang === 'en' ? 'FR — Français' : 'EN — English'}
          </Link>
        </div>
      </div>
    </>
  )
}
