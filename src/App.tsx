import { Routes, Route } from 'react-router-dom'
import { useAmbientSound } from './hooks/useAmbientSound'
import { useGlobalEffects } from './hooks/useGlobalEffects'
import Home from './pages/Home'
import Certificates from './pages/Certificates'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'

export default function App() {
  useAmbientSound()
  useGlobalEffects()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/:slug" element={<ProjectPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
