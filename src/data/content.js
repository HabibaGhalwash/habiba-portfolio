// ──────────────────────────────────────────────────────────────
//  All the text and images shown on the site live in this file.
//  Edit the text here; swap images by replacing files in
//  src/assets/img (keep the same file names).
// ──────────────────────────────────────────────────────────────
import heroPhoto from '../assets/img/hero-habiba.png'
import ccHome from '../assets/img/careconnect-home.jpg'
import ccAppDemo from '../assets/img/careconnect-app-demo.webp'
import ccSignup from '../assets/img/cc-signup.jpg'
import ccChild from '../assets/img/cc-child-profile.jpg'
import ccSchools from '../assets/img/cc-schools.jpg'
import ccParent from '../assets/img/cc-parent-dashboard.jpg'
import ccSpecialist from '../assets/img/cc-specialist-dashboard.jpg'
import ccAdmin from '../assets/img/cc-admin-dashboard.jpg'
import erd from '../assets/img/erd.jpg'
import contextDiagram from '../assets/img/context-diagram.jpg'
import dfd from '../assets/img/dfd.jpg'
import useCases from '../assets/img/use-cases.jpg'
import activity from '../assets/img/activity-diagram.jpg'
import classDiagram from '../assets/img/class-diagram.jpg'
import sequence from '../assets/img/sequence-diagram.jpg'
import salesDashboardImg from '../assets/img/sales-dashboard.jpg'
import jellyAbout from '../assets/img/jellycat-about.jpg'
import jellyShop from '../assets/img/jellycat-shop.jpg'
import jellyCart from '../assets/img/jellycat-cart.jpg'
import jellyCheckout from '../assets/img/jellycat-checkout.jpg'
import ncwActivities from '../assets/img/ncw-activities.jpg'
import ncwWelcome from '../assets/img/ncw-app-welcome.jpg'
import ncwLogin from '../assets/img/ncw-app-login.jpg'

export const profile = {
  name: 'Habiba Ghalwash',
  email: 'habibamohamedghalwash@gmail.com',
  phone: '+201001641539',
  phoneLabel: '+20 100 164 1539',
  linkedin: 'https://www.linkedin.com/in/habiba-ghalwash',
  github: 'https://github.com/HabibaGhalwash',
  city: 'Cairo, Egypt',
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#exp', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export { heroPhoto }

// floating stickers around the hero (positions are viewport-relative)
export const stickers = [
  { text: '⚛ React', depth: 38, style: { top: '30vh', left: '8vw', background: 'var(--butter)', color: 'var(--brown)', '--r': '-8deg', animationDelay: '1.0s' }, hideOnMobile: false, bob: '0s' },
  { text: '📊 Power BI', depth: -44, style: { top: '24vh', right: '9vw', background: 'var(--sage)', color: 'var(--brown)', '--r': '7deg', animationDelay: '1.15s' }, hideOnMobile: false, bob: '.4s' },
  { text: '🎓 3.93 GPA', depth: 52, style: { top: '52vh', left: '20vw', background: 'var(--pink)', color: 'var(--brown)', '--r': '5deg', animationDelay: '1.3s' }, hideOnMobile: true, bob: '.8s' },
  { text: '🗄 SQL', depth: -36, style: { top: '50vh', right: '17vw', background: 'var(--orange)', color: 'var(--brown)', '--r': '-6deg', animationDelay: '1.45s' }, hideOnMobile: true, bob: '1.2s' },
  { text: '📱 React Native', depth: 30, style: { top: '70vh', right: '6vw', background: 'var(--butter)', color: 'var(--brown)', '--r': '9deg', animationDelay: '1.6s' }, hideOnMobile: true, bob: '.2s' },
  { text: '🧩 Systems Analysis', depth: -26, style: { top: '76vh', left: '36vw', background: '#fff', color: 'var(--brown)', '--r': '-5deg', animationDelay: '1.75s' }, hideOnMobile: true, bob: '.6s' },
]

export const heroRoles = ['digital solutions', 'clear requirements', 'data stories', 'working apps']

export const about = {
  text:
    "I'm a Business Information Systems graduate from AASTMT and the University of Northampton, now pursuing my MBA. I like turning messy business problems into clear requirements, useful data stories and working software, using SQL, Power BI, React and React Native.",
  pills: ['Excellent with Honors', 'Dual Degree', 'MBA 2026', 'Cairo, Egypt'],
  stats: [
    { to: 3.93, decimals: 2, label: 'GPA / 4.0' },
    { to: 3, decimals: 0, label: 'Internships & Roles' },
    { to: 4, decimals: 0, label: 'Featured Projects' },
  ],
}

export const marqueeText =
  'React ✦ Node.js ✦ React Native ✦ SQL ✦ Power BI ✦ Supabase ✦ UML ✦ Agile ✦ Data Viz ✦ UI/UX ✦ '

export const skills = [
  { title: 'Business & Systems Analysis', text: 'Requirements gathering & documentation, business process analysis, system analysis & design, UML, DFDs, ERD, SDLC, Agile, stakeholder communication.' },
  { title: 'Data & BI', text: 'SQL, MySQL, Oracle, Power BI, data cleaning & transformation, data visualization, Microsoft Excel.' },
  { title: 'Software Development', text: 'React, React Native, Node.js, JavaScript, HTML, CSS, PHP, Java, Supabase, database design & integration.' },
  { title: 'Beyond the Tech', text: 'UI/UX fundamentals, project management, problem solving, critical thinking, teamwork. Languages: Arabic, English (fluent), French (intermediate).' },
]

export const careconnect = {
  repo: 'https://github.com/HabibaGhalwash/CareConnect',
  home: ccHome,
  appDemo: ccAppDemo,
  website: [
    { src: ccSignup, caption: 'Parent Sign-Up' },
    { src: ccChild, caption: 'Child Profile and Special Needs' },
    { src: ccSchools, caption: 'School Directory with Search and Ratings' },
    { src: ccParent, caption: 'Parent Dashboard and Subscription' },
    { src: ccSpecialist, caption: 'Specialist Dashboard' },
    { src: ccAdmin, caption: 'Admin Dashboard' },
  ],
  diagrams: [
    { tab: 'ERD', alt: 'ERD', src: erd, caption: 'Entity-relationship model of users, schools, therapists, shadow teachers, bookings and donations.' },
    { tab: 'Context Diagram', alt: 'Context diagram', src: contextDiagram, caption: 'Context diagram showing how parents, children and admins exchange data with the system.' },
    { tab: 'DFD', alt: 'Data flow diagram', src: dfd, caption: 'Data flow diagram breaking the system into processes like user data management.' },
    { tab: 'Use Cases', alt: 'Use case diagram', src: useCases, caption: 'Use cases for parents, children and admins, such as sign up, sign in and manage account.' },
    { tab: 'Activity', alt: 'Activity diagram', src: activity, caption: 'Activity diagram of the sign-up and sign-in flow with validation paths.' },
    { tab: 'Class Diagram', alt: 'Class diagram', src: classDiagram, caption: "Class diagram defining the system's objects, attributes and relationships." },
    { tab: 'Sequence', alt: 'Sequence diagram', src: sequence, caption: 'Sequence diagram showing how components interact over time.' },
  ],
}

export const salesDashboard = { src: salesDashboardImg }

export const jellycat = {
  repo: 'https://github.com/HabibaGhalwash/Jellycat',
  shots: [
    { src: jellyAbout, caption: 'About Us' },
    { src: jellyShop, caption: 'Shop and Colour Filter' },
    { src: jellyCart, caption: 'Cart' },
    { src: jellyCheckout, caption: 'Checkout' },
  ],
}

export const ncw = {
  desktop: ncwActivities,
  phones: [
    { src: ncwWelcome, alt: 'NCW app welcome screen' },
    { src: ncwLogin, alt: 'NCW app login screen' },
  ],
}

export const jobs = [
  {
    date: 'Jul – Sep 2025',
    title: 'Intern, National Council for Women',
    points: [
      'Developed a mobile app with React Native, JavaScript and Supabase.',
      'Worked with stakeholders to turn business requirements into technical solutions.',
      'Focused on usability and user experience within a collaborative team.',
    ],
  },
  {
    date: 'Sep – Oct 2024',
    title: 'Data Analyst Intern, WE (Telecom Egypt)',
    points: [
      'Built interactive Power BI dashboards for operational data.',
      'Cleaned and transformed datasets for reporting and decision-making.',
    ],
  },
  {
    date: 'Sep 2024 – Jul 2025',
    title: 'Teaching Assistant, IGCSE English',
    points: [
      'Supported lessons and gave one-on-one feedback on writing and comprehension.',
      'Strengthened communication, mentoring and instructional skills.',
    ],
  },
]

export const highlights = [
  { title: 'Excellent with Honors', text: 'Graduated June 2026 with a 3.93/4.00 GPA.' },
  { title: 'Best Project Award', text: 'Best project in the Information Systems course, freshman year.' },
  { title: 'AI in Mobile Apps Workshop', text: 'International workshop on integrating AI into Flutter apps, GIU Berlin, 2025.' },
  { title: "L'Oréal Brandstorm 2026", text: 'Global innovation competition: team strategy concept presented to industry challenges.' },
]
