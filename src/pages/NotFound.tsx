import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function NotFound() {

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="main-content">
        <TopNav label="// SYS: 404 NOT FOUND" />

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <section className="revealed" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', lineHeight: 1, color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
              404
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Page not found
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              This page does not exist or has been moved.
            </p>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', padding: '0.7rem 1.8rem',
                background: 'var(--accent2)', color: '#fff', transition: 'all 0.25s',
              }}
            >
              {'\u25B6'} Back to Portfolio
            </Link>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}
