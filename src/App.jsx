import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { scenarios, enSlugToFr } from './config/scenarios'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        {Object.values(scenarios).map(s => (
          <Route key={s.slug} path={`/${s.slug}`} element={<Calculator scenario={s} lang="fr" />} />
        ))}
        {Object.entries(enSlugToFr).map(([enSlug, frSlug]) => (
          <Route key={enSlug} path={`/en/${enSlug}`} element={<Calculator scenario={scenarios[frSlug]} lang="en" />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
