import { useEffect, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import movieComparerGif from "./images/Movie Comparer.gif";
import cookiesImage from "./images/cookies.gif";
import booksImage from "./images/books.jpg";
import boardGameImage from "./images/board_game.jpg";
import readingImage from "./images/reading.jpg";
import travellingImage from "./images/travelling.jpg";
import amazonPhoto from "./images/amazon.jpg";
import portrait from "./images/portrait.jpg";
import {
  identity, story, writing, building, contact, offClock, technicalProfile,
  experience, systemsWork, systemsDomains, leadership, stack, Post, Experience,
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

// Single scrolling page: sections are anchors; this tracks which one is in view for the nav.
const SECTIONS = [["top", "Home"], ["work", "Work"], ["how-i-build", "How I build"], ["experience", "Experience"], ["lab", "Lab & Writing"], ["about", "About"]] as const;
function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

// ================= pieces =================
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Nav() {
  const active = useActiveSection();
  return (
    <nav className="nav">
      <a className="nav-name" href="#top">AJ</a>
      <div className="nav-links">
        {SECTIONS.map(([id, label]) => <a key={id} aria-current={active === id ? "page" : undefined} href={`#${id}`}>{label}</a>)}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero hero-with-portrait" id="top">
      <div className="hero-copy">
        <p className="welcome">{identity.welcome}</p>
        <h1>{identity.tagline}</h1>
        <p className="hook">{identity.hook}</p>
        <p className="hero-sub hero-sub-short">{identity.sub}</p>
        <p className="hero-name">{identity.name}</p>
        <div className="hero-links"><a href="#work">See the work →</a><a href="#how-i-build">How I build →</a></div>
      </div>
      <img className="hero-portrait" src={portrait} alt={identity.name} width="640" height="640" />
    </header>
  );
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
      "akshaya.status": ["TELEMETRY // NOMINAL", "systems shaped: platform workflows · distributed services · applied AI", "current focus: master's at UW Foster · product judgment · technical strategy"],
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

function TechnicalProfile() {
  return (
    <section id="signal" className="section technical-profile">
      <Eyebrow>{technicalProfile.chapter}</Eyebrow>
      <h2>{technicalProfile.title}</h2>
      <p className="section-sub">{technicalProfile.sub}</p>
      <div className="capability-grid">{systemsDomains.map(domain => <article className="capability" key={domain.title}><span className="capability-marker">+</span><h3>{domain.title}</h3><p>{domain.summary}</p></article>)}</div>
    </section>
  );
}

function Logo({ stop }: { stop: Experience }) {
  // Logos live in public/logos/<file>; if the file is missing, fall back to a monogram so the layout holds.
  const [failed, setFailed] = useState(false);
  if (!stop.logo || failed) return <span className="track-logo track-logo-mono" aria-hidden="true">{stop.company.split(/[^A-Za-z]+/).filter(w => w && w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join("")}</span>;
  return <img className="track-logo" src={`logos/${stop.logo}`} alt={`${stop.company} logo`} loading="lazy" onError={() => setFailed(true)} />;
}

function ExperienceTrackRecord() {
  return <section id="experience" className="section track-record"><Eyebrow>Roles & responsibilities</Eyebrow><div className="track-list">{experience.stops.map(stop => <article className="track-card" key={stop.id}><div className="track-meta"><Logo stop={stop} /><span className="track-dates">{stop.dates}</span><strong>{stop.title}</strong><b>{stop.company}</b><small>{stop.city}</small></div><div className="track-content"><span className="track-kicker">ROLE FOCUS</span><h3>{stop.summary}</h3><p>{stop.owned}</p>{stop.id === "amazon-platforms" && <a className="role-work-link" href="#work">Read the case studies →</a>}{stop.id === "ssc-eze" && <a className="role-work-link" href="#legacy-modernization">Read the modernization case study →</a>}</div></article>)}</div></section>;
}

function SystemsDomains() {
  return <section id="how-i-build" className="section principles"><Eyebrow>How I build</Eyebrow><h2>Four rules, with the numbers behind them.</h2><div className="principle-tiles">{systemsDomains.map(domain => <article className="principle-tile" key={domain.title}><div className="tile-stat"><strong>{domain.stat.value}</strong><span>{domain.stat.label}</span></div><h3>{domain.title}</h3><p>{domain.principle}</p><p className="tile-evidence">{domain.evidence.map((link, i) => <span key={link.href + link.label}>{i > 0 && " · "}<a href={link.href}>{link.label} →</a></span>)}</p></article>)}</div></section>;
}

function FeaturedCaseStudies() {
  return <section id="work" className="section featured-case-studies"><Eyebrow>{systemsWork.chapter}</Eyebrow><h2>{systemsWork.title}</h2><p className="section-sub">{systemsWork.sub}</p><div className="case-study-list">{systemsWork.cards.map((card, i) => <article className="case-study" id={card.id} key={card.id}><div className="case-study-index">0{i + 1}</div><div className="case-study-main"><p className="system-label">{card.label}</p><h3>{card.title}</h3>{card.context && <p className="case-study-context"><span className="case-label">TEAM CONTEXT</span>{card.context}</p>}<div className="case-study-columns"><div><span className="case-label">THE CONSTRAINT</span><p>{card.problem}</p></div><div className="case-study-hard-call"><span className="case-label">THE HARD CALL</span><p>{card.hardCall}</p></div><div><span className="case-label">MY CONTRIBUTION</span><p>{card.contribution}</p></div><div><span className="case-label">THE RESULT</span><p>{card.outcome}</p></div></div>{card.aside && <aside className="case-study-aside"><span className="case-label">{card.aside.label}</span><p>{card.aside.text}</p></aside>}{card.image && <figure className="case-study-figure"><img src={card.image.src} alt={card.image.alt} loading="lazy" /></figure>}<div className="case-tags">{card.pattern.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div>{card.related && <a className="role-work-link" href={card.related.url} target="_blank" rel="noreferrer">Read the write-up: {card.related.title} ↗</a>}</div></article>)}</div></section>;
}

function Leadership() {
  return <section id="leadership" className="section leadership"><Eyebrow>{leadership.chapter}</Eyebrow><h2>{leadership.title}</h2><ul className="leadership-list">{leadership.items.map(item => <li key={item}>{item}</li>)}</ul></section>;
}

function Stack() {
  return <section className="section"><Eyebrow>Tools & languages</Eyebrow><h2>The implementation toolkit.</h2><div className="stack-list">{stack.map(row => <div className="stack-row" key={row.group}><strong>{row.group}</strong><span>{row.items}</span></div>)}</div></section>;
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
    <section id="about" className="section">
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
      <div className="story-split">
        <div>
          <p className="prose">{story.approach}</p>
          <p className="prose">{story.current}</p>
        </div>
        <figure className="story-photo"><img src={amazonPhoto} alt={story.photo.alt} loading="lazy" /><figcaption>{story.photo.caption}</figcaption></figure>
      </div>
      <a className="role-work-link" href={story.workLink.url}>{story.workLink.label}</a>
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
      <a href="#lab" className="back">← All writing</a>
      <h1 className="post-title">{post.title}</h1>
      {(post.body ?? []).map((p, i) => <p key={i} className="prose">{p}</p>)}
    </article>
  );
}

function Building() {
  return (
    <section id="lab" className="section">
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
  const post = slug ? writing.posts.find(p => p.slug === slug && !p.external) : null;
  useEffect(() => {
    // After the page renders, honour a deep link like #governance or #/writing/<slug>.
    const id = window.location.hash.replace(/^#/, "");
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (el) { el.scrollIntoView(); window.addEventListener("load", () => el.scrollIntoView(), { once: true }); }
  }, [post]);
  if (post) return <><Nav /><PostPage post={post} /></>;
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechnicalProfile />
        <FeaturedCaseStudies />
        <SystemsDomains />
        <Stack />
        <ExperienceTrackRecord />
        <Leadership />
        <Building />
        <Writing />
        <Story />
        <OffClock />
        <Terminal />
      </main>
      <Contact />
    </>
  );
}
