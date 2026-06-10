import { useParticles } from '../hooks/useParticles'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useSectionGlow } from '../hooks/useSectionGlow'
import { useClipboardCopy } from '../hooks/useClipboardCopy'
import { usePageTransition } from '../hooks/usePageTransition'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { useMobileSidebar } from '../hooks/useMobileSidebar'
import { useEasterEgg } from '../hooks/useEasterEgg'
import { useToggleFeedback } from '../hooks/useToggleFeedback'
import { useIntersectionReveal } from '../hooks/useIntersectionReveal'
import { useServiceWorker } from '../hooks/useServiceWorker'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import SectionReveal from '../components/SectionReveal'
import { certificates } from '../data/certificates'

export default function Certificates() {
  useParticles()
  useCursorGlow()
  useSectionGlow()
  useClipboardCopy()
  usePageTransition()
  useScrollToTop()
  useMobileSidebar()
  useEasterEgg()
  useToggleFeedback()
  useServiceWorker()
  useIntersectionReveal('.cert-card', 0.05)

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="main-content">
        <TopNav />

        <div className="container">
          <SectionReveal>
            <h2>Certificates</h2>
            <div className="cert-list">
              {certificates.map((cert, i) => (
                <div className="cert-card" key={i}>
                  <span className="label">{cert.label}</span>
                  <a href={cert.file} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <Footer />
      </div>
    </div>
  )
}
