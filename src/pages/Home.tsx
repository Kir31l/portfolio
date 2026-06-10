import { useParticles } from '../hooks/useParticles'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { useSysMessages } from '../hooks/useSysMessages'
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
import Spotlight from '../components/Spotlight'
import SectionReveal from '../components/SectionReveal'
import ContactForm from '../components/ContactForm'
import { experience, education } from '../data/experience'
import { skills } from '../data/skills'

export default function Home() {
  // Mount all global effects
  useParticles()
  useCursorGlow()
  useSysMessages()
  useSectionGlow()
  useClipboardCopy()
  usePageTransition()
  useScrollToTop()
  useMobileSidebar()
  useEasterEgg()
  useToggleFeedback()
  useServiceWorker()

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <Spotlight />

        <div className="container">
          <SectionReveal>
            <h2>Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <h2>Experience</h2>
            <div className="exp-header">
              <h3>{experience.title}</h3>
              <span className="date">{experience.date}</span>
            </div>
            <div className="exp-sub">{experience.subtitle}</div>
            <div className="exp-desc">
              {experience.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <ul>
                {experience.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <p>
                Successfully delivered internal business tools that streamlined shuttle
                operations, expense tracking, and accounting processes while improving
                data organization and reporting efficiency.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <h2>Education</h2>
            <div className="edu-header">
              <h3>{education.degree}</h3>
              <span className="date">{education.date}</span>
            </div>
            <div className="exp-sub">{education.school}</div>
          </SectionReveal>

          <SectionReveal>
            <h2>Capstone Project</h2>
            <div className="exp-header">
              <h3>SunSweep: The Solar-Powered Biodegradable Waste Robot</h3>
            </div>
            <div className="project-desc">
              <p>
                An autonomous solar-powered robot for biodegradable waste collection in
                outdoor campus environments. Integrates ultrasonic and RGB sensor navigation,
                vacuum-based collection, solar energy, and a real-time web monitoring
                dashboard — built with Agile methodology and evaluated under the
                ISO/IEC 25010 Software Quality Model.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <h2>Contact</h2>
            <p style={{ marginBottom: '1.2rem' }}>
              Have a project in mind or just want to say hi? Drop me a message.
            </p>
            <ContactForm />
          </SectionReveal>
        </div>

        <Footer />
      </div>
    </div>
  )
}
