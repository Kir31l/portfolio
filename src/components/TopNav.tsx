import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface TopNavProps {
  label?: string
}

export default function TopNav({ label }: TopNavProps) {
  const { isLight, toggleTheme } = useTheme()

  return (
    <nav className="top-nav">
      <div className="top-nav-left">
        <span className="top-nav-brand" id="topbar-label">
          {label || '// SYS: PORTFOLIO LOADED'}
        </span>
        <div className="top-nav-links">
          <Link to="/">Home</Link>
          <Link to="/certificates">Certificates</Link>
        </div>
      </div>
      <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
        {isLight ? '\u2600' : '\u263E'}
      </button>
    </nav>
  )
}
