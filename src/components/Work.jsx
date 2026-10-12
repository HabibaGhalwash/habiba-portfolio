import { careconnect, jellycat, ncw, salesDashboard } from '../data/content'
import Reveal from './Reveal'
import Project from './Project'
import CaseStudy from './CaseStudy'
import ZoomImg from './ZoomImg'

export default function Work() {
  return (
    <section className="work" id="work">
      <Reveal as="h2" className="t">
        Sample Works
      </Reveal>

      {/* ── CareConnect ── */}
      <Project
        title="CareConnect"
        media={
          <div className="shots cc">
            <ZoomImg className="w" src={careconnect.home} alt="CareConnect homepage" />
            <img className="ph" src={careconnect.appDemo} alt="CareConnect mobile app demo" loading="lazy" />
          </div>
        }
      >
        <p>
          <b>Graduation project.</b> A web platform and mobile app that supports families of children with special needs
          by connecting them with schools, therapists, shadow teachers and community resources.
        </p>
        <p>
          User research, requirements, use cases, DFDs, ERD, UML, accessible UI/UX, and a full-stack build with React,
          Node.js, SQL and React Native.
        </p>
        <a className="btn" href={careconnect.repo} target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>
        <a className="btn" href="#case">
          Case Study ↓
        </a>
      </Project>

      <Reveal className="tour">
        <h3>CareConnect: The Website</h3>
        <p>Built with React and Node.js for parents, specialists and admins. Click any screen to zoom.</p>
        <div className="tg">
          {careconnect.website.map((s) => (
            <figure key={s.caption}>
              <ZoomImg src={s.src} alt={s.caption} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <CaseStudy />

      {/* ── Sales dashboard ── */}
      <Project
        title="Sales Dashboard"
        tone="sage"
        style={{ marginTop: 28 }}
        media={
          <div className="shots">
            <ZoomImg className="full" src={salesDashboard.src} alt="Power BI sales dashboard" />
          </div>
        }
      >
        <p>
          An interactive Power BI dashboard analysing sales, quantity, discount, segments, categories, regions and ship
          modes, with year filters and drill-down tables to support reporting decisions.
        </p>
        <span className="btn">Power BI</span>
      </Project>

      {/* ── Jellycat ── */}
      <Project
        title="Jellycat Shop"
        media={
          <div className="jgrid">
            {jellycat.shots.map((s) => (
              <figure key={s.caption}>
                <ZoomImg src={s.src} alt={`Jellycat ${s.caption}`} />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        }
      >
        <p>
          A multi-page front-end e-commerce design built with HTML, CSS and JavaScript: a shop with category browsing,
          colour filters and search, a cart with quantity controls and a checkout form, plus an About Us page with the
          brand mission and story.
        </p>
        <a className="btn" href={jellycat.repo} target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>
      </Project>

      {/* ── NCW ── */}
      <Project
        title="NCW Activity Reporting Platform"
        tone="sage"
        media={
          <div className="ncwwrap">
            <ZoomImg className="dk" src={ncw.desktop} alt="NCW activity management screen" />
            <div className="phs">
              {ncw.phones.map((p) => (
                <div className="bz" key={p.alt}>
                  <ZoomImg src={p.src} alt={p.alt} />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <p>
          Built during my internship at the National Council for Women with React Native, JavaScript and Supabase. An
          Arabic (RTL) platform that helps the council's branches document their activities, with a mobile app and an
          activity management view with search, filters, sorting and status tags.
        </p>
        <p>Screens shown with permission; the code is private.</p>
        <span className="btn">Code private</span>
      </Project>
    </section>
  )
}
