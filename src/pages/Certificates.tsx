import { useIntersectionReveal } from '../hooks/useIntersectionReveal'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import SectionReveal from '../components/SectionReveal'
import { certificates } from '../data/certificates'

export default function Certificates() {
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
                  <a href={`${import.meta.env.BASE_URL}${cert.file.slice(1)}`} target="_blank" rel="noopener noreferrer">
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
