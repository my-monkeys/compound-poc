import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { listSimulations, saveSimulation, deleteSimulation, createSimulation } from '../lib/storage'
import { decodeParams, encodeParams } from '../lib/url'
import { t } from '../lib/i18n'
import Seo from '../components/Seo'
import Sidebar from '../components/Sidebar'
import ParamFields from '../components/ParamFields'
import ResultBanner from '../components/ResultBanner'
import GrowthChart from '../components/GrowthChart'
import BreakdownTable from '../components/BreakdownTable'
import ShareButton from '../components/ShareButton'

const BASE = 'https://compound.my-monkey.fr'

export default function Calculator({ scenario, lang }) {
  const location = useLocation()
  const [simulations, setSimulations] = useState(() => listSimulations())
  const [activeId, setActiveId] = useState(null)
  const [params, setParams] = useState(() => {
    const fromUrl = decodeParams(location.search)
    return fromUrl ?? scenario.defaults
  })

  useEffect(() => {
    const qs = encodeParams(params)
    window.history.replaceState(null, '', `${location.pathname}?${qs}`)
  }, [params, location.pathname])

  const copy = scenario[lang]
  const frPath = `/${scenario.slug}`
  const enPath = `/en/${scenario.enSlug}`
  const canonical = `${BASE}${lang === 'en' ? enPath : frPath}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: copy.h1,
    description: copy.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }

  function handleSave() {
    const name = prompt('Nom de la simulation :', scenario[lang].name) ?? scenario[lang].name
    const sim = createSimulation(name, params)
    const next = saveSimulation(sim)
    setSimulations(next)
    setActiveId(sim.id)
  }

  function handleSelect(sim) {
    setActiveId(sim.id)
    setParams(sim.params)
  }

  function handleDelete(id) {
    const next = deleteSimulation(id)
    setSimulations(next)
    if (activeId === id) setActiveId(null)
  }

  function handleNew() {
    setActiveId(null)
    setParams(scenario.defaults)
  }

  return (
    <>
      <Seo
        title={copy.title}
        description={copy.description}
        canonical={canonical}
        hreflangFr={`${BASE}${frPath}`}
        hreflangEn={`${BASE}${enPath}`}
        jsonLd={jsonLd}
        ogImage={`${BASE}${scenario.ogImage}`}
        lang={lang}
      />
      <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
        <Sidebar
          simulations={simulations}
          activeId={activeId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onNew={handleNew}
          lang={lang}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid #161b26', display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ color: '#e8eaf0', fontSize: 14, fontWeight: 500, flex: 1 }}>{copy.h1}</h1>
            <ShareButton params={params} lang={lang} />
            <button
              onClick={handleSave}
              style={{ background: 'none', border: '1px solid #1e2535', borderRadius: 4, color: '#4a5568', fontSize: 10, padding: '3px 8px' }}
            >
              {t(lang, 'save')}
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ResultBanner params={params} lang={lang} />
            <ParamFields params={params} onChange={setParams} lang={lang} />
            <GrowthChart params={params} lang={lang} />
            <BreakdownTable params={params} lang={lang} />
            <div style={{ minHeight: 90, background: '#0a0c11', border: '1px solid #1a1e2a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
