import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('public/og', { recursive: true })

// Compound interest curve data: 1 000€ + 100€/mo, 7%, 20 years
// Chart area: x [665, 1105], y [105, 475] (inverted — 105 = max value 56 118€)
// Year 0: (665, 468)  Year 5: (775, 425)  Year 10: (885, 343)
// Year 15: (995, 224) Year 20: (1105, 105)
const TOTAL_PATH   = 'M665 468 C705 464 748 445 775 425 C808 398 843 365 885 343 C925 320 958 268 995 224 C1040 172 1074 130 1105 105'
const CONTRIB_PATH = 'M665 468 L1105 314'
const TOTAL_AREA   = `${TOTAL_PATH} L1105 475 L665 475 Z`
const CONTRIB_AREA = `M665 468 L1105 314 L1105 475 L665 475 Z`

function makeSvg(title, subtitle) {
  const esc = s => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">

  <!-- Background -->
  <rect width="1200" height="630" fill="#0d1117"/>

  <!-- Subtle full-width divider -->
  <line x1="0" y1="420" x2="1200" y2="420" stroke="#1b2535" stroke-width="0.5" opacity="0.6"/>
  <line x1="630" y1="0" x2="630" y2="630" stroke="#1b2535" stroke-width="0.5" opacity="0.4"/>

  <defs>
    <linearGradient id="g-t" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2cb95" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e2cb95" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="g-c" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#526878" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#526878" stop-opacity="0.02"/>
    </linearGradient>
    <clipPath id="clip">
      <rect x="645" y="90" width="480" height="400"/>
    </clipPath>
  </defs>

  <!-- ── LEFT CONTENT ──────────────────────────────────────── -->

  <!-- Logo icon: rounded rect + trending-up line + dot -->
  <rect x="80" y="74" width="48" height="48" rx="13" fill="#e2cb9512" stroke="#e2cb9540" stroke-width="1.5"/>
  <polyline points="93,110 103,101 114,94 125,83"
    stroke="#e2cb95" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="125" cy="83" r="3.5" fill="#e2cb95"/>

  <!-- Wordmark -->
  <text x="142" y="109"
    font-family="Arial, Helvetica, sans-serif"
    font-size="28" font-weight="700" fill="#e8eaf0" letter-spacing="-0.5">${esc('Compound')}</text>

  <!-- Accent bar -->
  <rect x="80" y="200" width="3" height="155" rx="1.5" fill="#e2cb95" opacity="0.6"/>

  <!-- Page title -->
  <text x="106" y="275"
    font-family="Arial, Helvetica, sans-serif"
    font-size="50" font-weight="700" fill="#e8eaf0" letter-spacing="-1.5">${esc(title)}</text>

  <!-- Subtitle -->
  <text x="106" y="330"
    font-family="Arial, Helvetica, sans-serif"
    font-size="19" fill="#6b7a8d">${esc(subtitle)}</text>

  <!-- Stats pills -->
  <rect x="106" y="376" width="164" height="34" rx="8" fill="#151c27" stroke="#1e2a3c" stroke-width="1"/>
  <text x="188" y="397"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13" fill="#e2cb95" text-anchor="middle" font-weight="700">56 118 € en 20 ans</text>

  <rect x="282" y="376" width="88" height="34" rx="8" fill="#151c27" stroke="#1e2a3c" stroke-width="1"/>
  <text x="326" y="397"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13" fill="#7a9e6e" text-anchor="middle" font-weight="700">× 2,2</text>

  <!-- Bottom URL -->
  <text x="80" y="566"
    font-family="Arial, Helvetica, sans-serif"
    font-size="16" fill="#526878" letter-spacing="0.3">${esc('compound.my-monkey.fr')}</text>

  <!-- ── RIGHT CHART ───────────────────────────────────────── -->

  <!-- Chart card background -->
  <rect x="645" y="58" width="500" height="492" rx="16" fill="#111825" stroke="#1b2535" stroke-width="1"/>

  <!-- Chart header label -->
  <text x="668" y="88"
    font-family="Arial, Helvetica, sans-serif"
    font-size="11" fill="#526878" letter-spacing="0.1">${esc('1 000 € · 100 €/mois · 7 % · 20 ans')}</text>

  <!-- Horizontal grid lines -->
  <line x1="665" y1="172" x2="1120" y2="172" stroke="#1b2535" stroke-width="0.5"/>
  <line x1="665" y1="255" x2="1120" y2="255" stroke="#1b2535" stroke-width="0.5"/>
  <line x1="665" y1="340" x2="1120" y2="340" stroke="#1b2535" stroke-width="0.5"/>
  <line x1="665" y1="425" x2="1120" y2="425" stroke="#1b2535" stroke-width="0.5"/>

  <!-- Vertical grid lines -->
  <line x1="775" y1="98" x2="775" y2="478" stroke="#1b2535" stroke-width="0.5"/>
  <line x1="885" y1="98" x2="885" y2="478" stroke="#1b2535" stroke-width="0.5"/>
  <line x1="995" y1="98" x2="995" y2="478" stroke="#1b2535" stroke-width="0.5"/>

  <!-- Y-axis value labels -->
  <text x="668" y="176" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060">50k €</text>
  <text x="668" y="259" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060">37k €</text>
  <text x="668" y="344" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060">22k €</text>
  <text x="668" y="429" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060">8k €</text>

  <!-- Contributions area + line (clipped) -->
  <path d="${CONTRIB_AREA}" fill="url(#g-c)" clip-path="url(#clip)"/>
  <path d="${CONTRIB_PATH}" stroke="#2e3a4e" stroke-width="1.5" fill="none" clip-path="url(#clip)"/>

  <!-- Total capital area + line (clipped) -->
  <path d="${TOTAL_AREA}" fill="url(#g-t)" clip-path="url(#clip)"/>
  <path d="${TOTAL_PATH}" stroke="#e2cb95" stroke-width="2.5" fill="none"
    stroke-linecap="round" stroke-linejoin="round" clip-path="url(#clip)"/>

  <!-- Endpoint glow + dot -->
  <circle cx="1105" cy="105" r="11" fill="#e2cb95" opacity="0.12"/>
  <circle cx="1105" cy="105" r="5" fill="#e2cb95"/>

  <!-- Value callout bubble -->
  <rect x="1012" y="60" width="104" height="40" rx="9" fill="#e2cb9518" stroke="#e2cb9545" stroke-width="1"/>
  <text x="1064" y="78"
    font-family="Arial, Helvetica, sans-serif"
    font-size="12" fill="#e2cb95" text-anchor="middle" font-weight="700">56 118 €</text>
  <text x="1064" y="93"
    font-family="Arial, Helvetica, sans-serif"
    font-size="9" fill="#526878" text-anchor="middle">capital final</text>

  <!-- X-axis labels -->
  <text x="775" y="500" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060" text-anchor="middle">5 ans</text>
  <text x="885" y="500" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060" text-anchor="middle">10 ans</text>
  <text x="995" y="500" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060" text-anchor="middle">15 ans</text>
  <text x="1105" y="500" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#3a5060" text-anchor="middle">20 ans</text>

  <!-- Legend -->
  <line x1="668" y1="528" x2="688" y2="528" stroke="#e2cb95" stroke-width="2.5"/>
  <text x="695" y="532" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#6b7a8d">Capital total</text>
  <line x1="798" y1="528" x2="818" y2="528" stroke="#2e3a4e" stroke-width="1.5"/>
  <text x="825" y="532" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#6b7a8d">Versements</text>

</svg>`
}

const pages = [
  { key: 'default',       title: 'Intérêts composés',  subtitle: 'Simulez la croissance de votre épargne' },
  { key: 'pea',           title: 'Simulateur PEA',      subtitle: "Calculateur d'intérêts composés" },
  { key: 'livret-a',      title: 'Livret A',             subtitle: 'Calcul des intérêts selon le taux en vigueur' },
  { key: 'assurance-vie', title: 'Assurance-vie',        subtitle: "Simulateur d'intérêts composés" },
  { key: 'retraite',      title: 'Épargne retraite',     subtitle: 'Simulez votre capital long terme' },
  { key: 'custom',        title: 'Personnalisé',         subtitle: 'Vos propres paramètres, sans contrainte' },
]

for (const page of pages) {
  const svg = makeSvg(page.title, page.subtitle)
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
  })
  const pngBuffer = resvg.render().asPng()
  const outPath = `public/og/${page.key}.png`
  writeFileSync(outPath, pngBuffer)
  console.log(`✓ ${outPath} (${(pngBuffer.length / 1024).toFixed(0)} kB)`)
}
