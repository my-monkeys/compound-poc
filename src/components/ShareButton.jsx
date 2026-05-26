import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { encodeParams } from '../lib/url'
import { t } from '../lib/i18n'

export default function ShareButton({ params, lang }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}?${encodeParams(params)}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      style={{ background: 'none', border: '1px solid #243345', borderRadius: 4, color: copied ? '#7a9e6e' : '#6b7a8d', fontSize: 10, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}
    >
      <Share2 size={10} />
      {copied ? t(lang, 'copied') : t(lang, 'share')}
    </button>
  )
}
