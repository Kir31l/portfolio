import { useParticles } from '../hooks/useParticles'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useSectionGlow } from '../hooks/useSectionGlow'
import { useClipboardCopy } from '../hooks/useClipboardCopy'
import { usePageTransition } from '../hooks/usePageTransition'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { useMobileSidebar } from '../hooks/useMobileSidebar'
import { useEasterEgg } from '../hooks/useEasterEgg'
import { useToggleFeedback } from '../hooks/useToggleFeedback'
import { useServiceWorker } from '../hooks/useServiceWorker'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import SectionReveal from '../components/SectionReveal'
import { projectDetails } from '../data/projects'
import { useParams, Link } from 'react-router-dom'

const otherProjects = ['shuttle', 'dimple', 'retrievals', 'sort']

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectDetails[slug] : null

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

  if (!project) {
    return (
      <div className="page-wrapper">
        <Sidebar />
        <div className="main-content">
          <TopNav />
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <SectionReveal style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', lineHeight: 1, color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>404</div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Project not found</p>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.7rem 1.8rem', background: 'var(--accent2)', color: '#fff', transition: 'all 0.25s' }}>{'\u25B6'} Back to Portfolio</Link>
            </SectionReveal>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="main-content">
        <TopNav />

        <div className="container">
          <section className="showcase-hero revealed">
            <h1>{project.title}</h1>
            <p className="showcase-tagline" dangerouslySetInnerHTML={{ __html: project.tagline }} />
            <div className="showcase-actions">
              {project.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          {project.sections.map((section, i) => (
            <SectionReveal key={i}>
              <h2>{section.heading}</h2>
              <div className="project-content" dangerouslySetInnerHTML={{ __html: section.content }} />
            </SectionReveal>
          ))}

          <section className="feature-projects revealed">
            <h2>Other Projects</h2>
            <div className="feature-project-links">
              {otherProjects.filter(p => p !== slug).map((p) => (
                <Link key={p} to={`/${p}`}>
                  {p === 'shuttle' ? 'Shuttle' : p === 'dimple' ? 'Dimple' : p === 'retrievals' ? 'R&D' : 'Sort'}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}
