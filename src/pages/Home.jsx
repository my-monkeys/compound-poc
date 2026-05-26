import { Link } from 'react-router-dom'
import { TrendingUp, Save, Share2, ChevronRight } from 'lucide-react'
import { scenarios } from '../config/scenarios'
import Seo from '../components/Seo'

const BASE = 'https://compound.my-monkey.fr'

const copy = {
  fr: {
    title: "Compound — Simulateur d'intérêts composés",
    description: "Calculez et simulez la croissance de votre épargne avec intérêts composés. PEA, Livret A, Assurance-vie, Retraite. Gratuit, sans inscription.",
    navCta: "Simuler maintenant",
    eyebrow: "Simulateur d'intérêts composés",
    h1a: "Visualisez la puissance",
    h1b: "de votre épargne.",
    sub: "Simulez la croissance de votre capital avec versements réguliers, sauvegardez vos scénarios et partagez vos projections. Gratuit, sans inscription.",
    ctaPrimary: "Démarrer gratuitement",
    ctaSecondary: "Voir les placements",
    trust: [
      { value: "100%", label: "Gratuit" },
      { value: "0", label: "Inscription requise" },
      { value: "5", label: "Placements disponibles" },
      { value: "Local", label: "Données stockées" },
    ],
    featuresLabel: "Fonctionnalités",
    features: [
      { Icon: TrendingUp, title: "Graphiques en temps réel", desc: "Visualisez la courbe exponentielle de vos intérêts composés face à vos versements sur la durée choisie." },
      { Icon: Save, title: "Multi-simulations", desc: "Sauvegardez et comparez autant de scénarios que vous voulez. Vos données restent sur votre appareil." },
      { Icon: Share2, title: "Partage en un clic", desc: "Générez une URL partageable pour envoyer votre simulation à votre conseiller ou vos proches." },
    ],
    previewLabel: "PEA · 7 % · 20 ans",
    previewCaption: "Capital final",
    previewTotal: "56 118 €",
    previewSub: "+31 118 € d'intérêts",
    previewStat1: "Investi",
    previewStat1Val: "25 000 €",
    previewStat2: "Intérêts",
    previewStat2Val: "+31 118 €",
    chooseLabel: "Choisissez votre placement",
    chooseSub: "Paramètres préconfigurés selon chaque type d'investissement.",
    customName: "Personnalisé",
    customSub: "Vos propres paramètres",
    ctaTitle: "Prêt à simuler votre épargne ?",
    ctaSub: "Aucune donnée collectée — tout reste sur votre appareil.",
    ctaBtn: "Commencer gratuitement",
    footerPrivacy: "Aucune donnée collectée",
    langSwitch: "EN — English",
    langSwitchTo: "/en/",
    years: "ans",
  },
  en: {
    title: "Compound — Compound Interest Calculator",
    description: "Calculate and simulate your savings growth with compound interest. PEA, Livret A, Life Insurance, Retirement. Free, no sign-up.",
    navCta: "Start simulating",
    eyebrow: "Compound Interest Calculator",
    h1a: "Visualize the power",
    h1b: "of compound interest.",
    sub: "Simulate your capital growth with regular contributions, save your scenarios and share your projections. Free, no sign-up required.",
    ctaPrimary: "Get started for free",
    ctaSecondary: "See calculators",
    trust: [
      { value: "100%", label: "Free" },
      { value: "0", label: "Sign-up required" },
      { value: "5", label: "Account types" },
      { value: "Local", label: "Data storage" },
    ],
    featuresLabel: "Features",
    features: [
      { Icon: TrendingUp, title: "Real-time charts", desc: "Visualize the exponential curve of your compound interest vs. contributions over your chosen time horizon." },
      { Icon: Save, title: "Multiple simulations", desc: "Save and compare as many scenarios as you want. Your data stays on your device." },
      { Icon: Share2, title: "Share with one click", desc: "Generate a shareable URL to send your simulation to your advisor or family." },
    ],
    previewLabel: "PEA · 7% · 20 years",
    previewCaption: "Final capital",
    previewTotal: "€56,118",
    previewSub: "+€31,118 in interest",
    previewStat1: "Invested",
    previewStat1Val: "€25,000",
    previewStat2: "Interest",
    previewStat2Val: "+€31,118",
    chooseLabel: "Choose a calculator",
    chooseSub: "Pre-configured parameters for each investment type.",
    customName: "Custom",
    customSub: "Your own parameters",
    ctaTitle: "Ready to simulate your savings?",
    ctaSub: "No data collected — everything stays on your device.",
    ctaBtn: "Get started for free",
    footerPrivacy: "No data collected",
    langSwitch: "FR — Français",
    langSwitchTo: "/",
    years: "years",
  },
}

function MiniChart() {
  const W = 460, H = 72, padB = 14
  const total = `M0 ${H} C80 66 160 52 240 32 C320 12 390 4 ${W} 0`
  const contrib = `M0 ${H} L${W} 40`
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + padB}`} preserveAspectRatio="none" style={{ display: 'block', height: 72 }}>
      <defs>
        <linearGradient id="mgt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2cb95" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#e2cb95" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="mgc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b7a8d" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6b7a8d" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d={`M0 ${H} L${W} 40 L${W} ${H} Z`} fill="url(#mgc)"/>
      <path d={contrib} stroke="#526878" strokeWidth="1" fill="none"/>
      <path d={`${total} L${W} ${H} L0 ${H} Z`} fill="url(#mgt)"/>
      <path d={total} stroke="#e2cb95" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

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

      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

        {/* ── Nav ──────────────────────────────────────────────── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(7,9,13,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #141d2a' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <div style={{ width: 26, height: 26, background: '#e2cb9515', border: '1px solid #e2cb9430', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="#e2cb95" strokeWidth="1.5">
                  <path d="M2 10 C2 6 6 6 6 3 C6 6 10 6 10 10" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ color: '#e8eaf0', fontSize: 14, fontWeight: 600, letterSpacing: '-.01em' }}>Compound</span>
            </div>
            <Link
              to={c.langSwitchTo}
              style={{ color: '#526878', fontSize: 11, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#6b7a8d' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#526878' }}
            >
              {c.langSwitch}
            </Link>
            <Link
              to={lang === 'en' ? '/en/pea' : '/pea'}
              style={{ background: '#e2cb95', color: '#0d1117', fontSize: 11, fontWeight: 600, padding: '6px 14px', borderRadius: 5, textDecoration: 'none', letterSpacing: '-.01em' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4bc85' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e2cb95' }}
            >
              {c.navCta}
            </Link>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section style={{ padding: '90px 24px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'radial-gradient(ellipse 900px 500px at 50% -60px, rgba(226,203,149,0.05) 0%, transparent 70%)' }}>

          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e2cb9510', border: '1px solid #e2cb9525', borderRadius: 20, padding: '4px 12px', marginBottom: 28 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#e2cb95' }} />
            <span style={{ color: '#e2cb9590', fontSize: 11, letterSpacing: '.04em' }}>{c.eyebrow}</span>
          </div>

          {/* H1 */}
          <h1 className="hero-title" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: 22, maxWidth: 640 }}>
            <span style={{ color: '#e8eaf0' }}>{c.h1a}</span><br/>
            <span style={{ color: '#e2cb95' }}>{c.h1b}</span>
          </h1>

          {/* Sub */}
          <p style={{ color: '#6b7a8d', fontSize: 15, lineHeight: 1.65, maxWidth: 480, marginBottom: 36 }}>
            {c.sub}
          </p>

          {/* CTAs */}
          <div className="hero-btns" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              to={lang === 'en' ? '/en/pea' : '/pea'}
              style={{ background: '#e2cb95', color: '#0d1117', fontSize: 13, fontWeight: 600, padding: '10px 22px', borderRadius: 6, textDecoration: 'none', letterSpacing: '-.01em', display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4bc85' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e2cb95' }}
            >
              {c.ctaPrimary}
              <ChevronRight size={14}/>
            </Link>
            <a
              href="#calculators"
              style={{ background: 'transparent', color: '#6b7a8d', fontSize: 13, fontWeight: 500, padding: '10px 22px', borderRadius: 6, textDecoration: 'none', border: '1px solid #243345' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#526878'; e.currentTarget.style.color = '#6a7585' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#243345'; e.currentTarget.style.color = '#6b7a8d' }}
            >
              {c.ctaSecondary}
            </a>
          </div>

          {/* Product preview */}
          <div style={{ width: '100%', maxWidth: 640, marginTop: 60, background: '#111825', border: '1px solid #1e2a3c', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 80px rgba(226,203,149,0.06), 0 32px 64px rgba(0,0,0,0.4)', textAlign: 'left' }}>
            {/* Preview nav */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #1b2535', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#243345' }}/>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#243345' }}/>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#243345' }}/>
              </div>
              <span style={{ color: '#526878', fontSize: 10, marginLeft: 6, letterSpacing: '.02em' }}>{c.previewLabel}</span>
            </div>
            {/* Preview content */}
            <div style={{ padding: '16px 18px 0' }}>
              <div style={{ color: '#6b7a8d', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{c.previewCaption}</div>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1 }}>{c.previewTotal}</div>
              <div style={{ color: '#7a9e6e', fontSize: 11, marginTop: 5, marginBottom: 14, fontWeight: 500 }}>{c.previewSub}</div>
            </div>
            <div style={{ padding: '0 6px' }}>
              <MiniChart />
            </div>
            <div style={{ padding: '12px 18px', borderTop: '1px solid #141d2a', display: 'flex', gap: 24 }}>
              <div>
                <div style={{ color: '#526878', fontSize: 9, marginBottom: 2 }}>{c.previewStat1}</div>
                <div style={{ color: '#6b7a8d', fontSize: 12, fontWeight: 600 }}>{c.previewStat1Val}</div>
              </div>
              <div>
                <div style={{ color: '#526878', fontSize: 9, marginBottom: 2 }}>{c.previewStat2}</div>
                <div style={{ color: '#e2cb95', fontSize: 12, fontWeight: 600 }}>{c.previewStat2Val}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust bar ────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid #141d2a', borderBottom: '1px solid #141d2a' }}>
          <div className="trust-strip" style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {c.trust.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px 0', borderRight: i < 3 ? '1px solid #141d2a' : 'none' }}>
                <div style={{ color: '#e8eaf0', fontSize: 18, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 2 }}>{s.value}</div>
                <div style={{ color: '#526878', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#526878', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>{c.featuresLabel}</div>
            </div>
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {c.features.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  style={{ background: '#111825', border: '1px solid #1b2535', borderRadius: 10, padding: '24px 22px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#e2cb9425' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1b2535' }}
                >
                  <div style={{ width: 34, height: 34, background: '#e2cb9510', border: '1px solid #e2cb9425', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={15} color="#e2cb95" />
                  </div>
                  <div style={{ color: '#c9d1d9', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{title}</div>
                  <div style={{ color: '#5e7080', fontSize: 12, lineHeight: 1.65 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calculators ──────────────────────────────────────── */}
        <section id="calculators" style={{ padding: '0 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ color: '#e8eaf0', fontSize: 22, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 8 }}>{c.chooseLabel}</h2>
            <p style={{ color: '#526878', fontSize: 12 }}>{c.chooseSub}</p>
          </div>
          <div className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 560 }}>
            {Object.values(scenarios).filter(s => s.slug !== 'custom').map(s => {
              const href = lang === 'en' ? `/en/${s.enSlug}` : `/${s.slug}`
              const name = s[lang]?.name ?? s.fr.name
              return (
                <Link
                  key={s.slug}
                  to={href}
                  style={{ background: '#111825', border: '1px solid #1b2535', borderRadius: 8, padding: '18px 20px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#e2cb9440' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1b2535' }}
                >
                  <div>
                    <div style={{ color: '#e8eaf0', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{name}</div>
                    <div style={{ color: '#526878', fontSize: 11 }}>{s.defaults.rate}% · {s.defaults.years} {c.years}</div>
                  </div>
                  <ChevronRight size={13} color="#526878" />
                </Link>
              )
            })}
            <Link
              to={lang === 'en' ? '/en/custom' : '/custom'}
              style={{ background: 'transparent', border: '1px dashed #243345', borderRadius: 8, padding: '18px 20px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e2cb9450' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#243345' }}
            >
              <div>
                <div style={{ color: '#6b7a8d', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{c.customName}</div>
                <div style={{ color: '#526878', fontSize: 11 }}>{c.customSub}</div>
              </div>
              <ChevronRight size={13} color="#243345" />
            </Link>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section style={{ background: '#111825', borderTop: '1px solid #141d2a', padding: '72px 24px', textAlign: 'center' }}>
          <h2 style={{ color: '#e8eaf0', fontSize: 28, fontWeight: 700, letterSpacing: '-.03em', marginBottom: 12 }}>{c.ctaTitle}</h2>
          <p style={{ color: '#526878', fontSize: 12, marginBottom: 32 }}>{c.ctaSub}</p>
          <Link
            to={lang === 'en' ? '/en/pea' : '/pea'}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e2cb95', color: '#0d1117', fontSize: 13, fontWeight: 600, padding: '11px 24px', borderRadius: 6, textDecoration: 'none', letterSpacing: '-.01em' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4bc85' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#e2cb95' }}
          >
            {c.ctaBtn}
            <ChevronRight size={14}/>
          </Link>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer style={{ borderTop: '1px solid #141d2a', padding: '18px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ color: '#526878', fontSize: 10 }}>© 2026 Compound</span>
            <span style={{ color: '#526878', fontSize: 10 }}>·</span>
            <a href="https://my-monkey.fr" style={{ color: '#526878', fontSize: 10, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#6b7a8d' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#526878' }}
            >my-monkey.fr</a>
            <Link to={c.langSwitchTo} style={{ color: '#526878', fontSize: 10, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#6b7a8d' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#526878' }}
            >
              {c.langSwitch}
            </Link>
          </div>
        </footer>

      </div>
    </>
  )
}
