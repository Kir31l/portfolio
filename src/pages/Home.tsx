import { useSysMessages } from '../hooks/useSysMessages'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import Spotlight from '../components/Spotlight'
import SectionReveal from '../components/SectionReveal'
import { experiences, education } from '../data/experience'
import { skills } from '../data/skills'

export default function Home() {
  useSysMessages()

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
            {experiences.map((exp, idx) => (
              <div key={idx} style={idx > 0 ? { marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' } : undefined}>
                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  {exp.date && <span className="date">{exp.date}</span>}
                </div>
                {exp.subtitle && <div className="exp-sub">{exp.subtitle}</div>}
                <div className="exp-desc">
                  {exp.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {exp.highlights && (
                    <ul>
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {exp.summary && <p>{exp.summary}</p>}
                  {exp.description && <p>{exp.description}</p>}
                </div>
              </div>
            ))}
          </SectionReveal>

          <SectionReveal>
            <h2>Education</h2>
            <div className="edu-header">
              <h3>{education.degree}</h3>
              <span className="date">{education.date}</span>
            </div>
            <div className="exp-sub">{education.school}</div>
          </SectionReveal>

        </div>

        <Footer />
      </div>
    </div>
  )
}
