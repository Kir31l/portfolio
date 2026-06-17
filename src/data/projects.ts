export interface Project {
  title: string
  desc: string
  badges: string[]
  url: string
  img?: string
  external?: boolean
}

export const spotlightData: Project[] = [
  {
    title: 'EASTWEST Shuttle Management System',
    desc: 'A web-based shuttle dispatching application with secure authentication and role-based access control for Super Admin, Admin, and Dispatcher roles.',
    badges: ['Web App', 'PHP & MySQL', '2026'],
    url: '/shuttle',
    img: '/assets/images/shuttle.png',
  },
  {
    title: 'Dimple Star Transport',
    desc: 'A front-end bus booking system for a Philippine bus company serving Metro Manila and Oriental Mindoro since 1993.',
    badges: ['Front-End', 'Vanilla JS', '2026'],
    url: '/dimple',
    img: '/assets/images/dimple.png',
  },
  {
    title: 'RiderLog Accounting System',
    desc: 'Internal tool for tracking delivery and retrieval expenses for borrowed company assets with Excel and ZIP export features.',
    badges: ['Web App', 'PHP & MySQL', '2026'],
    url: '/retrievals',
    img: '/assets/images/ridelog.png',
  },
  {
    title: 'Sorting Algorithm Visualizer',
    desc: 'Animate five classic sorting algorithms step-by-step with async/await, color-coded bar states, and adjustable controls.',
    badges: ['Tool', 'Vanilla JS', '2026'],
    url: '/sort',
    img: '/assets/images/sort.png',
  },
  {
    title: '2D Platformer',
    desc: 'A browser-based platformer with wall sliding, double jump, and basic movement mechanics — built as a Unity prototype.',
    badges: ['Game', 'Unity', '2026'],
    url: 'https://kir31l.itch.io/platformer',
    external: true,
  },
]

export interface ProjectDetail {
  title: string
  tagline: string
  sections: { heading: string; content: string }[]
  links: { label: string; url: string }[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  shuttle: {
    title: 'EASTWEST Shuttle Management System',
    tagline: 'A web-based application designed to streamline and manage shuttle dispatching operations. Provides a secure, role-based platform tailored for different levels of management and operational staff.',
    sections: [
      {
        heading: 'Features',
        content: '<ul><li><strong>Secure Authentication</strong> — Centralized login portal for all system users</li><li><strong>Role-Based Access Control</strong> — Tailored dashboards for Super Admin, Admin, and Dispatcher roles</li><li><strong>Operational Management</strong> — Full system configuration, day-to-day oversight, and direct dispatching</li><li><strong>Responsive Design</strong> — Accessible on desktop and mobile</li></ul>',
      },
      {
        heading: 'Tech Stack',
        content: '<p>HTML, CSS, JavaScript, PHP, MySQL</p>',
      },
      {
        heading: 'Demo Credentials',
        content: `<table class="project-table"><thead><tr><th>Role</th><th>Username</th><th>Password</th></tr></thead><tbody><tr><td>Super Admin</td><td><code>superadmin</code></td><td><code>password123</code></td></tr><tr><td>Admin</td><td><code>admin</code></td><td><code>password123</code></td></tr><tr><td>Dispatcher</td><td><code>dispatcher</code></td><td><code>password123</code></td></tr></tbody></table>`,
      },
    ],
    links: [
      { label: 'Launch Live Demo', url: 'https://kir31l.github.io/shuttle/' },
      { label: 'View on GitHub', url: 'https://github.com/Kir31l/shuttle' },
    ],
  },
  dimple: {
    title: 'Dimple Star Transport',
    tagline: 'A front-end website for a Philippine bus company serving Metro Manila and Oriental Mindoro since 1993. Browse routes, view terminal information, and book tickets entirely in the browser — no backend required.',
    sections: [
      {
        heading: 'Pages',
        content: '<ul><li><strong>Home</strong> — Hero section with quick route search</li><li><strong>About</strong> — Company history, mission, and vision</li><li><strong>Terminal</strong> — Directory of all terminals across Metro Manila and Mindoro</li><li><strong>Route Schedule</strong> — Full route and schedule browser</li><li><strong>Book</strong> — Seat selection and ticket booking form</li><li><strong>Contact</strong> — Contact information and inquiry form</li><li><strong>Sign Up / Login</strong> — User authentication via <code>sessionStorage</code></li></ul>',
      },
      {
        heading: 'Routes Covered',
        content: '<p>Buses depart from six Metro Manila terminals to San Jose, Oriental Mindoro. Fare: ₱300 (Air Conditioned) · ₱200 (Ordinary).</p>',
      },
      {
        heading: 'Tech Stack',
        content: '<p>Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no server required. Data is handled entirely client-side via <code>sessionStorage</code>.</p>',
      },
    ],
    links: [
      { label: 'Launch Live Demo', url: 'https://kir31l.github.io/Dimple/' },
      { label: 'View on GitHub', url: 'https://github.com/Kir31l/Dimple' },
    ],
  },
  retrievals: {
    title: 'RiderLog — EW BPO Accounting System',
    tagline: 'Internal tool for tracking delivery and retrieval expenses for borrowed company assets. Manages budgets, records per-rider entries, and exports reports as styled Excel sheets or ZIP packages.',
    sections: [
      {
        heading: 'Key Concepts',
        content: '<ul><li><strong>Budget</strong> — a pool of funds. Only one budget active at a time. Auto-closes when it reaches zero.</li><li><strong>Submission</strong> — a dated batch of rider entries under a budget, either delivery or retrieval.</li><li><strong>Rider Entry</strong> — one row: service provider, driver name, vehicle, location, fee, toll in, toll back, and optional photos.</li><li><strong>Expenses</strong> — fee + toll_entry + toll_back per entry. Both service fees and tolls are expenses.</li></ul>',
      },
      {
        heading: 'Features',
        content: '<ul><li>Role-based tabs for Delivery and Retrieval entry</li><li>Live budget bar with expense preview before submission</li><li>In-place editing of past entries</li><li>Excel and ZIP export with styled reports and attached photos</li><li>Full history browser with collapsible submission sheets</li></ul>',
      },
      {
        heading: 'Tech Stack',
        content: '<p>HTML, CSS, vanilla JavaScript, PHP, MySQL. Single-page frontend with a RESTful PHP API backend.</p>',
      },
    ],
    links: [
      { label: 'Launch Live Demo', url: 'https://kir31l.github.io/retrievals_and_deliveries/' },
      { label: 'View on GitHub', url: 'https://github.com/Kir31l/retrievals_and_deliveries' },
    ],
  },
  sort: {
    title: 'Sorting Algorithm Visualizer',
    tagline: 'A frontend portfolio project built with vanilla HTML, CSS, and JavaScript. Animates five classic sorting algorithms step-by-step using <code>async/await</code> and DOM manipulation — no libraries required.',
    sections: [
      {
        heading: 'Algorithms',
        content: '<ul><li><strong>Bubble Sort</strong> — O(n²) — compares adjacent pairs and swaps if out of order</li><li><strong>Selection Sort</strong> — O(n²) — scans for the minimum and swaps it to the front</li><li><strong>Insertion Sort</strong> — O(n²) worst, O(n) best — builds sorted array one element at a time</li><li><strong>Merge Sort</strong> — O(n log n) — divide and conquer with recursive splitting</li><li><strong>Quick Sort</strong> — O(n log n) average — picks a pivot and partitions</li></ul>',
      },
      {
        heading: 'Features',
        content: '<ul><li>Color-coded bar states: comparing (amber), swapping (red), sorted (green), pivot (purple)</li><li>Live tracking of comparisons, swaps, and elapsed time</li><li>Adjustable array size (10–80) and animation speed</li><li>Stop button cleanly interrupts any algorithm mid-sort</li><li>Big-O complexity table highlights the active algorithm</li></ul>',
      },
      {
        heading: 'Key JavaScript Concepts',
        content: '<ul><li><code>async/await</code> + <code>Promise</code> + <code>setTimeout</code> for animation heartbeat</li><li>ES6 destructuring swap, <code>Array.from()</code>, <code>Array.map()</code></li><li>Recursive merge sort and quick sort implementations</li><li>State management via <code>running</code> / <code>stopFlag</code> and <code>arr</code> / <code>bars</code> sync pattern</li></ul>',
      },
      {
        heading: 'Tech Stack',
        content: '<p>Everything in a single <code>index.html</code> — no build tools, no dependencies, no frameworks.</p>',
      },
    ],
    links: [
      { label: 'Launch Live Demo', url: 'https://kir31l.github.io/sort/' },
      { label: 'View on GitHub', url: 'https://github.com/Kir31l/sort' },
    ],
  },
}
