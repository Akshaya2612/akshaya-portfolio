import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import movieComparerGif from "./images/Movie Comparer.gif";
import cookiesImage from "./images/cookies.gif";
import booksImage from "./images/books.jpg";
import boardGameImage from "./images/board_game.jpg";
import readingImage from "./images/reading.jpg";
import travellingImage from "./images/travelling.jpg";
import {
  identity, story, writing, building, work, contact, offClock, technicalProfile,
  experience, systemsWork, engineeringPrinciples, leadership, stack, skillMatrix, Post,
} from "./data/content";

// ================= tiny hash router for posts =================
function useRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const m = hash.match(/^#\/writing\/(.+)$/);
  return m ? m[1] : null;
}

function usePage() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => { const fn = () => setHash(window.location.hash); window.addEventListener("hashchange", fn); return () => window.removeEventListener("hashchange", fn); }, []);
  return hash.replace(/^#\/?/, "").split("/")[0] || "home";
}

// ================= pieces =================
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Nav() {
  const links = [["home", "Home"], ["featured-work", "Featured Work"], ["systems", "Systems"], ["experience", "Experience"], ["projects", "Projects"], ["about", "About"]];
  return (
    <nav className="nav">
      <a className="nav-name" href="#top" onClick={() => (window.location.hash = "")}>AJ</a>
      <div className="nav-links">
        {links.map(([id, label]) => <a key={id} href={id === "home" ? "#top" : `#/${id}`}>{label}</a>)}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <p className="welcome">{identity.welcome}</p>
      <h1>{identity.tagline}</h1>
      <p className="hook">{identity.hook}</p>
      <p className="hero-sub">{identity.sub}</p>
      <p className="hero-name">{identity.name}</p>
    </header>
  );
}

function DossierRibbon() {
  return <div className="dossier-ribbon"><div><span className="status-light" /> <span>DOSSIER: AKSHAYA-JONNALAGADDA</span><i>/</i><span>INDEX: 2018 → PRESENT</span><i>/</i><span className="ribbon-focus">FOCUS: PLATFORM · DISTRIBUTED SYSTEMS · APPLIED AI</span></div><div><span>EXPERIENCE: 7 YEARS</span><i>|</i><span>BASE: SEATTLE</span><i>|</i><span>UW FOSTER MSIS</span></div></div>;
}

function OverviewDossier() {
  const chips = ["Workflow orchestration", "Configuration as code", "AWS Step Functions", "DynamoDB", "Event-driven systems", "Applied AI", "Visible failure modes", "Technical strategy"];
  return <>
    <DossierRibbon />
    <section className="overview-dossier">
      <div className="overview-grid">
        <div className="overview-spine">
          <div className="overview-kicker"><span>[00 // EXECUTIVE SUMMARY]</span><b /> <span>SYSTEMS_EVOLUTION</span></div>
          <h1>Seven years building workflow systems and financial platforms that people can operate with confidence.</h1>
          <p className="overview-lede">Software Development Engineer with production backend and distributed systems experience across Amazon Fulfillment Tech and SS&amp;C Eze. I build the paths that turn requests into governed, observable outcomes, then bring product and strategy judgment to what should happen next.</p>
          <div className="overview-metrics">{technicalProfile.metrics.map(metric => <div className="overview-metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div>
        </div>
        <aside className="overview-signal">
          <div className="signal-visual"><div className="signal-grid" /><div className="signal-orbit orbit-one" /><div className="signal-orbit orbit-two" /><div className="signal-core">AJ<span>SYS</span></div><div className="signal-caption"><span>ENGINEERING PHILOSOPHY</span><strong>Operational clarity is a feature.</strong></div></div>
          <div className="competency-panel"><span className="panel-label">CORE COMPETENCIES</span><div className="competency-chips">{chips.map(chip => <span key={chip}>{chip}</span>)}</div></div>
        </aside>
      </div>
    </section>
    <Terminal />
  </>;
}

function Terminal() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "SYSTEMS CONSOLE // READY",
    "Type a directive below to inspect the portfolio.",
  ]);
  const run = (value: string) => {
    const cmd = value.trim().toLowerCase();
    if (cmd === "clear") {
      setOutput([]);
      setCommand("");
      return;
    }
    const responses: Record<string, string[]> = {
      help: ["Available CLI directives:", "• akshaya.status : Ingest current portfolio stats", "• stack         : Print verified production languages & tools", "• contact       : Print public routing links", "• clear         : Flush current display buffers"],
      "akshaya.status": ["TELEMETRY // NOMINAL", "systems shaped: platform workflows · distributed services · applied AI", "current focus: MSIS · product judgment · technical strategy"],
      stack: ["LANGUAGES  // Python · Java · TypeScript · C# · SQL", "CLOUD      // Lambda · Step Functions · DynamoDB · EventBridge · S3 · CDK", "SYSTEMS    // REST · CI/CD · test automation · CloudWatch · RAG"],
      contact: ["PUBLIC ROUTES", "linkedin  → linkedin.com/in/akshaya-jonnalagadda-00a30615", "github    → github.com/Akshaya2612"],
    };
    setOutput(responses[cmd] ?? [`command not found: ${cmd || "(empty)"}`, "Type help for available directives."]);
    setCommand("");
  };
  return <section className="terminal-shell" aria-label="Interactive portfolio terminal">
    <div className="terminal-bar"><span className="terminal-dot red" /><span className="terminal-dot yellow" /><span className="terminal-dot green" /><span className="terminal-title">akshaya@systems:~</span></div>
    <div className="terminal-body"><p><span className="prompt">$</span> status --now</p><form onSubmit={event => { event.preventDefault(); run(command); }}><label><span className="prompt">$</span><input value={command} onChange={event => setCommand(event.target.value)} placeholder="enter directive" aria-label="Terminal command" /></label></form><div className="terminal-output">{output.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}</div><p className="terminal-directives">Available CLI directives: <button type="button" onClick={() => run("help")}>help</button> · <button type="button" onClick={() => run("akshaya.status")}>akshaya.status</button> · <button type="button" onClick={() => run("stack")}>stack</button> · <button type="button" onClick={() => run("contact")}>contact</button> · <button type="button" onClick={() => run("clear")}>clear</button></p></div>
  </section>;
}

function SkillMatrix() {
  return <section className="section skill-matrix"><div className="domain-heading"><span>02 // CAPABILITY DOMAIN</span><b>::</b><span>DECOUPLED SYSTEMS ARCHITECTURE</span></div><h2>Architectural &amp; Core Skill Matrix</h2><p className="section-sub">The design patterns, infrastructure, and judgment I bring to systems that have to keep moving when the environment is imperfect.</p><div className="skill-matrix-grid">{skillMatrix.map((skill, i) => <article className="skill-matrix-card" key={skill.domain}><span className="matrix-index">0{i + 1}</span><h3>{skill.domain}</h3><p>{skill.focus}</p></article>)}</div></section>;
}

function Topology() {
  const nodes = ["request", "notify", "approve", "decision", "state"];
  return <section className="topology-panel" aria-label="Event-driven workflow topology">
    <div className="topology-heading"><span className="system-label">SYSTEM BLUEPRINT / 01</span><span className="topology-status">● observable path</span></div>
    <div className="topology-flow">{nodes.map((node, i) => <div className="topology-node-wrap" key={node}><div className="topology-node"><span className="node-index">0{i + 1}</span><strong>{node}</strong><small>{i === 0 ? "command" : i === 1 ? "event" : i === 2 ? "human gate" : i === 3 ? "event" : "projection"}</small></div>{i < nodes.length - 1 && <span className="topology-arrow">→</span>}</div>)}</div>
    <p className="topology-caption">Every transition is explicit. Events carry the workflow forward, while audit and monitoring make the failure boundary visible.</p>
  </section>;
}

function TechnicalProfile() {
  return (
    <section id="signal" className="section technical-profile">
      <Eyebrow>{technicalProfile.chapter}</Eyebrow>
      <h2>{technicalProfile.title}</h2>
      <p className="section-sub">{technicalProfile.sub}</p>
      <div className="metrics-band">{technicalProfile.metrics.map(metric => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
      <div className="capability-grid">{technicalProfile.capabilities.map(capability => <article className="capability" key={capability.title}><span className="capability-marker">+</span><h3>{capability.title}</h3><p>{capability.text}</p></article>)}</div>
    </section>
  );
}

function SystemsWork() {
  return <section id="systems" className="section systems-work"><Eyebrow>{systemsWork.chapter}</Eyebrow><h2>{systemsWork.title}</h2><p className="section-sub">{systemsWork.sub}</p><div className="system-grid">{systemsWork.cards.map(card => <article className="system-card" key={card.title}><p className="system-label">{card.label}</p><h3>{card.title}</h3><p><strong>Problem:</strong> {card.problem}</p><p><strong>Contribution:</strong> {card.contribution}</p><p className="system-outcome"><strong>Outcome:</strong> {card.outcome}</p><p className="system-pattern">{card.pattern}</p></article>)}</div></section>;
}

function HomeWorkPreview() {
  return <section className="section home-preview"><div className="preview-heading"><div><Eyebrow>[02] // SELECTED_WORK</Eyebrow><h2>Two systems worth opening.</h2></div><a href="#/featured-work">View case studies →</a></div><div className="preview-grid">{systemsWork.cards.slice(0, 2).map(card => <article className="preview-card" key={card.title}><p className="system-label">{card.label}</p><h3>{card.title}</h3><p>{card.contribution}</p><span>{card.pattern}</span></article>)}</div></section>;
}

function ExperienceSnapshot() {
  return <section className="section experience-snapshot"><div className="preview-heading"><div><Eyebrow>[03] // EXPERIENCE</Eyebrow><h2>Production systems, then product judgment.</h2></div><a href="#/experience">Open experience →</a></div><div className="snapshot-list">{experience.stops.slice(0, 4).map(stop => <div className="snapshot-row" key={stop.id}><span>{stop.dates}</span><strong>{stop.company}</strong><em>{stop.title}</em></div>)}</div></section>;
}

function ExperienceTrackRecord() {
  return <section className="section track-record"><div className="track-heading"><div><Eyebrow>[01 // CHRONOLOGY]</Eyebrow><h2>Production track record.</h2></div><p>Roles, ownership, and impact across the systems that shaped how I work.</p></div><div className="track-list">{experience.stops.map((stop, i) => <article className="track-card" key={stop.id}><div className="track-meta"><span className="track-number">0{i + 1}</span><span className="track-dates">{stop.dates}</span><strong>{stop.title}</strong><b>{stop.company}</b><small>{stop.city}</small></div><div className="track-content"><span className="track-kicker">PRIMARY SCOPE</span><h3>{stop.summary}</h3><p>{stop.owned}</p><div className="track-proof"><div><span className="track-kicker">EVIDENCE</span><ul>{stop.proof.map(item => <li key={item}>{item}</li>)}</ul></div><div className="track-impact"><span className="track-kicker">IMPACT</span><p>{stop.impact}</p></div></div></div></article>)}</div></section>;
}

function Principles() {
  return <section id="principles" className="section principles"><Eyebrow>How I think</Eyebrow><h2>Philosophies for production systems.</h2><p className="section-sub">The principles behind the architecture: concise enough to remember, specific enough to change how I build.</p><div className="philosophy-list">{engineeringPrinciples.map((principle, i) => <article className="philosophy-row" key={principle.title}><span className="philosophy-number">[PHILOSOPHY_0{i + 1}]</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></section>;
}

function FeaturedCaseStudies() {
  return <section className="section featured-case-studies"><div className="feature-heading"><div><Eyebrow>[02] // FLAGSHIP_CASE_STUDIES</Eyebrow><h2>Architectural blueprints.</h2></div><span className="feature-index">VIEW_INDEX // 04 SYSTEMS</span></div><p className="section-sub">The systems I want a hiring team to understand first: the operating problem, the design move, and the evidence of what changed.</p><div className="case-study-list">{systemsWork.cards.slice(0, 4).map((card, i) => <article className="case-study" key={card.title}><div className="case-study-index">0{i + 1}</div><div className="case-study-main"><p className="system-label">{card.label}</p><h3>{card.title}</h3><p className="case-study-summary">{card.contribution}</p><div className="case-study-columns"><div><span className="case-label">THE CONSTRAINT</span><p>{card.problem}</p></div><div><span className="case-label">THE RESULT</span><p>{card.outcome}</p></div></div><div className="case-tags">{card.pattern.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>;
}

function Leadership() {
  return <section id="leadership" className="section leadership"><Eyebrow>{leadership.chapter}</Eyebrow><h2>{leadership.title}</h2><ul className="leadership-list">{leadership.items.map(item => <li key={item}>{item}</li>)}</ul><div className="stack-list">{stack.map(row => <div className="stack-row" key={row.group}><strong>{row.group}</strong><span>{row.items}</span></div>)}</div></section>;
}

function Story() {
  const geoCities = [
    { name: "Andhra Pradesh", coords: [16.5, 79.7] as [number, number] }, { name: "Chennai", coords: [13.1, 80.3] as [number, number] },
    { name: "Philadelphia", coords: [40.0, -75.2] as [number, number] }, { name: "Sunnyvale", coords: [37.4, -122.0] as [number, number] },
    { name: "San Diego", coords: [32.7, -117.2] as [number, number] }, { name: "Chandigarh", coords: [30.7, 76.8] as [number, number] },
    { name: "Chennai", coords: [13.1, 80.3] as [number, number] }, { name: "Hyderabad", coords: [17.4, 78.5] as [number, number] },
    { name: "Seattle", coords: [47.6, -122.3] as [number, number] },
  ];
  const routePoints = geoCities.map(city => city.coords);
  return (
    <section id="story" className="section">
      <Eyebrow>{story.chapter}</Eyebrow>
      <h2>{story.title}</h2>
      {story.paras.map((p, i) => <p key={i} className="prose">{p}</p>)}
      <div className="geo-map" aria-label="Cities lived in, shown as a geographic route">
        <MapContainer center={[30, 0]} zoom={2} minZoom={2} maxZoom={5} scrollWheelZoom={false} zoomControl={false}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={routePoints} pathOptions={{ color: "#2f9e7d", weight: 2, opacity: 0.72, dashArray: "5 7" }} />
          {geoCities.map((city, i) => <CircleMarker key={`${city.name}-${i}`} center={city.coords} radius={3.5} pathOptions={{ color: "#2f9e7d", weight: 1.5, fillColor: "#2f9e7d", fillOpacity: 1 }} />)}
        </MapContainer>
      </div>
    </section>
  );
}

function Writing() {
  const published = writing.posts.filter(p => !p.draft);
  return (
    <section id="writing" className="section">
      <Eyebrow>{writing.chapter}</Eyebrow>
      <h2>{writing.title}</h2>
      <p className="section-sub">{writing.sub}</p>
      <div className="post-list">
        {published.map(p => (
          <a key={p.slug} className="post-row"
             href={p.external ? p.external : `#/writing/${p.slug}`}
             {...(p.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            <h3>{p.title}{p.external && <span className="ext"> ↗</span>}</h3>
            <p>{p.teaser}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function PostPage({ post }: { post: Post }) {
  useEffect(() => { window.scrollTo(0, 0); }, [post.slug]);
  return (
    <article className="section post-page">
      <a href="#writing" onClick={() => (window.location.hash = "#writing")} className="back">← All writing</a>
      <h1 className="post-title">{post.title}</h1>
      {(post.body ?? []).map((p, i) => <p key={i} className="prose">{p}</p>)}
    </article>
  );
}

function Building() {
  return (
    <section id="building" className="section">
      <Eyebrow>{building.chapter}</Eyebrow>
      <h2>{building.title}</h2>
      <div className="grid grid-2">
        {building.cards.map(c => (
          <article key={c.name} className="card">
            <div className="tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
            <p className="how">{c.how}</p>
            {"previewImage" in c && c.previewImage === "movie-comparer" && <a className="project-preview-link" href={c.previewImageLink} target="_blank" rel="noreferrer"><img className="project-preview" src={movieComparerGif} alt="Animated preview of Movie Comparer. Open live project." loading="lazy" /></a>}
            {"embed" in c && c.embed && <iframe className="project-preview" src={c.embed} title={`${c.name} interactive preview`} loading="lazy" allow="clipboard-write" />}
            <div className="links">
              {c.links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section work">
      <Eyebrow>{work.chapter}</Eyebrow>
      <h2>{work.title}</h2>
      <p className="prose">{work.line}</p>
      <a className="cta" href={work.cta.url} target="_blank" rel="noreferrer">{work.cta.label}</a>
    </section>
  );
}

function ExperienceMap() {
  const [selected, setSelected] = useState(experience.stops[0].id);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    const rows = experience.stops.map(stop => rowRefs.current[stop.id]).filter(Boolean) as HTMLDivElement[];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setSelected((visible.target as HTMLElement).dataset.id ?? experience.stops[0].id);
    }, { rootMargin: "-30% 0px -45%", threshold: [0.2, 0.5, 0.8] });
    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="experience" className="section experience-section">
      <Eyebrow>{experience.chapter}</Eyebrow>
      <h2>{experience.title}</h2>
      <p className="section-sub">{experience.sub}</p>
      <div className="experience-map" aria-label="Career map">
        <div className="map-route" aria-hidden="true"><svg className="route-wave" viewBox="0 0 100 1000" preserveAspectRatio="none"><path d="M50 0 C8 55 8 95 50 150 C92 205 92 245 50 300 C8 355 8 395 50 450 C92 505 92 545 50 600 C8 655 8 695 50 750 C92 805 92 845 50 900 C8 955 8 985 50 1000" /></svg></div>
        <div className="experience-list" aria-label="Professional experience stops">
          {experience.stops.map((stop, i) => (
            <div className={`experience-row ${selected === stop.id ? "active" : ""}`} data-id={stop.id} ref={el => { rowRefs.current[stop.id] = el; }} key={stop.id}>
              <div className="map-stop">
                <span className="stop-dot">{i + 1}</span>
                <span className="stop-copy"><strong>{stop.company}</strong><small>{stop.title}</small><small>{stop.city} · {stop.dates}</small></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkPage() { return <main><Hero /><FeaturedCaseStudies /></main>; }
function SystemsPage() { return <main><TechnicalProfile /><SkillMatrix /><Topology /><SystemsWork /><Principles /><Leadership /></main>; }
function ExperiencePage() { return <main><DossierRibbon /><ExperienceTrackRecord /><ExperienceMap /><Leadership /></main>; }
function ProjectsPage() { return <main><Building /><Writing /></main>; }
function AboutPage() { return <main><Story /><OffClock /><Contact /></main>; }

function Contact() {
  return (
    <footer id="contact" className="section contact">
      <Eyebrow>{contact.chapter}</Eyebrow>
      <h2>{contact.title}</h2>
      <p className="section-sub center">{contact.line}</p>
      <div className="links contact-links">
        <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
      <p className="closing">{contact.closing}</p>
    </footer>
  );
}

function OffClock() {
  const images: Record<string, string> = { cookies: cookiesImage, travelling: travellingImage, books: booksImage, board_game: boardGameImage, reading: readingImage };
  return (
    <section id="off-clock" className="section off-clock">
      <Eyebrow>{offClock.chapter}</Eyebrow>
      <h2>{offClock.title}</h2>
      <p className="section-sub">{offClock.sub}</p>
      <div className="off-clock-grid">
        {offClock.cards.map(card => (
          <article className="off-clock-card" key={card.title}>
            {"image" in card && card.image && <div className="image-slot"><img src={images[card.image]} alt="" /></div>}
            <span className="off-clock-symbol" aria-hidden="true">{card.symbol}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const slug = useRoute();
  const page = usePage();
  const post = slug ? writing.posts.find(p => p.slug === slug && !p.external) : null;
  return (
    <>
      <Nav />
      {post ? (
        <PostPage post={post} />
      ) : page === "featured-work" ? <FeaturedWorkPage />
      : page === "systems" ? <SystemsPage />
      : page === "experience" ? <ExperiencePage />
      : page === "projects" ? <ProjectsPage />
      : page === "about" ? <AboutPage />
      : (
        <main>
          <OverviewDossier />
          <HomeWorkPreview />
          <ExperienceSnapshot />
          <Work />
        </main>
      )}
      {!post && page === "home" && <Contact />}
    </>
  );
}
