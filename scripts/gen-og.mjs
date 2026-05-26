import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('public/og', { recursive: true })

function makeSvg(title, subtitle) {
  // Escape XML special chars
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#07090d"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#noise)" opacity="0.03"/>
  <defs>
    <linearGradient id="gc" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#e2cb95" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#e2cb95" stop-opacity="0.12"/>
    </linearGradient>
  </defs>

  <!-- Grid lines -->
  <line x1="0" y1="210" x2="1200" y2="210" stroke="#1a1e2a" stroke-width="0.5"/>
  <line x1="0" y1="420" x2="1200" y2="420" stroke="#1a1e2a" stroke-width="0.5"/>
  <line x1="400" y1="0" x2="400" y2="630" stroke="#1a1e2a" stroke-width="0.5"/>
  <line x1="800" y1="0" x2="800" y2="630" stroke="#1a1e2a" stroke-width="0.5"/>

  <!-- Background growth curve -->
  <path d="M0 600 C200 580 400 520 600 420 C800 310 950 180 1200 50" stroke="#e2cb95" stroke-width="1.5" fill="none" opacity="0.15"/>
  <path d="M0 600 C200 580 400 520 600 420 C800 310 950 180 1200 50 L1200 630 L0 630 Z" fill="url(#gc)" opacity="0.6"/>
  <path d="M0 600 L1200 200" stroke="#2e3545" stroke-width="1" fill="none"/>

  <!-- Logo mark -->
  <rect x="80" y="72" width="56" height="56" rx="14" fill="#e2cb9515" stroke="#e2cb9430" stroke-width="1"/>
  <path d="M95 114 C95 102 100 98 105 90 C110 82 115 78 116 70 C117 78 122 82 127 90 C132 98 137 102 137 114" stroke="#e2cb95" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Product name -->
  <text x="156" y="118" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600" fill="#e8eaf0" letter-spacing="-0.5">${esc('Compound')}</text>

  <!-- Left accent bar -->
  <rect x="80" y="220" width="3" height="160" rx="1.5" fill="#e2cb95" opacity="0.6"/>

  <!-- Main title -->
  <text x="104" y="295" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#ffffff" letter-spacing="-1">${esc(title)}</text>

  <!-- Subtitle -->
  <text x="104" y="355" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#4a5568">${esc(subtitle)}</text>

  <!-- Bottom URL -->
  <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#2e3545" letter-spacing="0.5">${esc('compound.my-monkey.fr')}</text>

  <!-- Bottom right badge -->
  <rect x="1000" y="530" width="140" height="36" rx="6" fill="#e2cb9510" stroke="#e2cb9420" stroke-width="1"/>
  <text x="1070" y="553" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#e2cb9580" text-anchor="middle">${esc('Gratuit · Sans inscription')}</text>
</svg>`
}

const pages = [
  {
    key: 'default',
    title: "Intérêts composés",
    subtitle: "Simulez la croissance de votre épargne",
  },
  {
    key: 'pea',
    title: "Simulateur PEA",
    subtitle: "Calculateur d'intérêts composés",
  },
  {
    key: 'livret-a',
    title: "Simulateur Livret A",
    subtitle: "Calcul des intérêts selon le taux en vigueur",
  },
  {
    key: 'assurance-vie',
    title: "Assurance-vie",
    subtitle: "Simulateur d'intérêts composés",
  },
  {
    key: 'retraite',
    title: "Épargne retraite",
    subtitle: "Simulez votre capital long terme",
  },
]

for (const page of pages) {
  const svg = makeSvg(page.title, page.subtitle)
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
  })
  const rendered = resvg.render()
  const pngBuffer = rendered.asPng()
  const outPath = `public/og/${page.key}.png`
  writeFileSync(outPath, pngBuffer)
  console.log(`✓ ${outPath} (${pngBuffer.length} bytes)`)
}
