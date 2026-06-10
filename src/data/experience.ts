export interface Experience {
  title: string
  subtitle: string
  date: string
  paragraphs: string[]
  highlights: string[]
}

export const experience: Experience = {
  title: 'Web Development Intern',
  subtitle: 'EastWest BPO MCI',
  date: 'Jan 2026 – May 2026',
  paragraphs: [
    'Developed and maintained full-stack web applications using modern web technologies and vanilla JavaScript. Built internal systems including a Shuttle Management Portal and the RiderLog Accounting System — designing user-friendly interfaces, integrating RESTful APIs, managing databases, and implementing report export features.',
    'Collaborated closely with the team through code reviews, debugging sessions, and agile sprint-based development. Contributed to workflow efficiency by creating tools that automated expense tracking, driver assignments, and report generation.',
  ],
  highlights: [
    'Full-stack web development',
    'UI/UX design',
    'RESTful API integration',
    'Database management',
    'PHP & MySQL',
    'JavaScript development',
    'Excel and report export automation',
    'Debugging and collaborative development',
  ],
}

export interface Education {
  degree: string
  school: string
  date: string
}

export const education: Education = {
  degree: 'Bachelor of Information Technology',
  school: 'Our Lady of Fatima University',
  date: 'Finished 2026',
}
