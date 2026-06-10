export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-deco"></div>
      <div className="sidebar-inner">
        <div className="profile-photo-wrap">
          <img
            src="https://github.com/Kir31l.png"
            alt="Jhon Nicole Landero"
            className="profile-photo"
          />
        </div>

        <div className="sidebar-info">
          <div className="sidebar-name">
            Jhon Nicole<br />Landero
          </div>
          <div className="sidebar-title">Junior Software Dev Intern</div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-contacts">
          <span className="sidebar-contact-item" tabIndex={0} data-copy="nicolelandero16@gmail.com">
            <span className="sidebar-contact-icon">{'\u2709'}</span>
            nicolelandero16@gmail.com
          </span>
          <span className="sidebar-contact-item" tabIndex={0} data-copy="09212054534">
            <span className="sidebar-contact-icon">{'\u260E'}</span>
            09212054534
          </span>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-social">
          <a href="https://github.com/Kir31l" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a
            href="https://www.linkedin.com/in/nicole-landero-50b57b40b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </aside>
  )
}
