import { useEffect } from 'react'

const SITE_NAME = 'Compound'

export default function Seo({ title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage, lang = 'fr' }) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow')

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'fr_FR')
    setMeta('property', 'og:url', canonical)
    if (ogImage) {
      setMeta('property', 'og:image', ogImage)
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
      setMeta('property', 'og:image:type', 'image/png')
    }

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    if (ogImage) setMeta('name', 'twitter:image', ogImage)

    // Links
    setLink('canonical', canonical)
    setLink('alternate', hreflangFr, 'fr')
    setLink('alternate', hreflangEn, 'en')

    setJsonLd(jsonLd)
  }, [title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage, lang])

  return null
}

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}

function setLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector(selector)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); if (hreflang) el.setAttribute('hreflang', hreflang); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

function setJsonLd(data) {
  let el = document.querySelector('script[type="application/ld+json"]')
  if (!el) { el = document.createElement('script'); el.setAttribute('type', 'application/ld+json'); document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}
