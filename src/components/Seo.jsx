import { useEffect } from 'react'

export default function Seo({ title, description, canonical, hreflangFr, hreflangEn, jsonLd }) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')

    setLink('canonical', canonical)
    setLink('alternate', hreflangFr, 'fr')
    setLink('alternate', hreflangEn, 'en')

    setJsonLd(jsonLd)
  }, [title, description, canonical, hreflangFr, hreflangEn, jsonLd])

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
