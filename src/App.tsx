import { useEffect, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import movieComparerGif from "./images/Movie Comparer.gif";
import cookiesImage from "./images/cookies.gif";
import booksImage from "./images/books.jpg";
import boardGameImage from "./images/board_game.jpg";
import readingImage from "./images/reading.jpg";
import travellingImage from "./images/travelling.jpg";
import {
  identity, story, writing, building, contact, offClock, technicalProfile,
  experience, systemsWork, systemsDomains, leadership, stack, Post,
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
  const page = hash.replace(/^#\/?/, "").split("/")[0];
  return !page || page === "top" ? "home" : page;
}

// ================= pieces =================
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Nav() {
  const page = usePage();
  const links = [["home", "Home"], ["featured-work", "Featured Work"], ["systems", "Systems"], ["experience", "Experience"], ["projects", "Lab & Writing"], ["about", "About"]];
  return (
    <nav className="nav">
      <a className="nav-name" href="#top" onClick={() => (window.location.hash = "")}>AJ</a>
      <div className="nav-links">
        {links.map(([id, label]) => <a key={id} aria-current={page === id ? "page" : undefined} href={id === "home" ? "#/" : `#/${id}`}>{label}</a>)}
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
      <div className="hero-links"><a href="#/featured-work">Explore my work →</a><a href="#/systems">Architecture & skills →</a></div>
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

function ExperienceTrackRecord() {
  return <section className="section track-record"><Eyebrow>Roles & responsibilities</Eyebrow><div className="track-list">{experience.stops.map(stop => <article className="track-card" key={stop.id}><div className="track-meta"><span className="track-dates">{stop.dates}</span><strong>{stop.title}</strong><b>{stop.company}</b><small>{stop.city}</small></div><div className="track-content"><span className="track-kicker">ROLE FOCUS</span><h3>{stop.summary}</h3><p>{stop.owned}</p>{stop.id === "amazon-platforms" && <a className="role-work-link" href="#/featured-work">Read the engineering case studies →</a>}{stop.id === "ssc-eze" && <a className="role-work-link" href="#/featured-work/legacy-modernization">Read the legacy modernization case study →</a>}</div></article>)}</div></section>;
}

function SystemsDomains() {
  return <section id="principles" className="section principles"><Eyebrow>How I build</Eyebrow><h2>Principles, and the practice behind them.</h2><p className="section-sub">Each principle, the patterns I use to apply it, and the case study where it shows up.</p><div className="philosophy-list">{systemsDomains.map(domain => <article className="philosophy-row" key={domain.title}><h3>{domain.title}</h3><p>{domain.principle}</p><div><p className="philosophy-practice">{domain.practice}</p><p className="philosophy-evidence">{domain.evidence.map((link, i) => <span key={link.href + link.label}>{i > 0 && " · "}<a href={link.href}>{link.label} →</a></span>)}</p></div></article>)}</div></section>;
}

function FeaturedCaseStudies() {
  return <section className="section featured-case-studies"><Eyebrow>{systemsWork.chapter}</Eyebrow><h2>{systemsWork.title}</h2><p className="section-sub">{systemsWork.sub}</p><div className="case-study-list">{systemsWork.cards.map((card, i) => <article className="case-study" id={card.id} key={card.id}><div className="case-study-index">0{i + 1}</div><div className="case-study-main"><p className="system-label">{card.label}</p><h3>{card.title}</h3>{card.context && <p className="case-study-context"><span className="case-label">TEAM CONTEXT</span>{card.context}</p>}<div className="case-study-columns"><div><span className="case-label">THE CONSTRAINT</span><p>{card.problem}</p></div><div className="case-study-hard-call"><span className="case-label">THE HARD CALL</span><p>{card.hardCall}</p></div><div><span className="case-label">MY CONTRIBUTION</span><p>{card.contribution}</p></div><div><span className="case-label">THE RESULT</span><p>{card.outcome}</p></div></div>{card.aside && <aside className="case-study-aside"><span className="case-label">{card.aside.label}</span><p>{card.aside.text}</p></aside>}{card.image && <figure className="case-study-figure"><img src={card.image.src} alt={card.image.alt} loading="lazy" /></figure>}<div className="case-tags">{card.pattern.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div>{card.related && <a className="role-work-link" href={card.related.url} target="_blank" rel="noreferrer">Read the write-up: {card.related.title} ↗</a>}</div></article>)}</div></section>;
}

function Leadership() {
  return <section id="leadership" className="section leadership"><Eyebrow>{leadership.chapter}</Eyebrow><h2>{leadership.title}</h2><ul className="leadership-list">{leadership.items.map(item => <li key={item}>{item}</li>)}</ul></section>;
}

function Stack() {
  return <section className="section"><Eyebrow>Tools & languages</Eyebrow><h2>The implementation toolkit.</h2><div className="stack-list">{stack.map(row => <div className="stack-row" key={row.group}><strong>{row.group}</strong><span>{row.items}</span></div>)}</div></section>;
}

function PageIntro({ title, description }: { title: string; description: string }) {
  return <header className="section page-intro"><h1>{title}</h1><p className="section-sub">{description}</p></header>;
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
      <p className="prose">{story.approach}</p>
      <p className="prose">{story.current}</p>
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

function FeaturedWorkPage() {
  return <main><PageIntro title="Featured engineering work." description="Fulfillment platforms at Amazon and financial software at SS&C Eze. My contribution, the operating constraints, and outcomes for each system." /><FeaturedCaseStudies /></main>;
}
function SystemsPage() { return <main><PageIntro title="Systems & architecture." description="How I structure workflows, make failure visible, and build for the next change." /><SystemsDomains /><Stack /></main>; }
function ExperiencePage() { return <main><PageIntro title="Career & experience." description="From enterprise financial software to fulfillment platforms, followed by graduate study at UW Foster." /><ExperienceTrackRecord /><Leadership /></main>; }
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
  useEffect(() => {
    // #/featured-work/<case-study-id> deep-links to one case study; everything else starts at the top.
    const target = page === "featured-work" ? window.location.hash.split("/")[2] : undefined;
    const el = target ? document.getElementById(target) : null;
    if (el) el.scrollIntoView(); else window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, window.location.hash]);
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
          <Hero />
          <TechnicalProfile />
          <Terminal />
        </main>
      )}
      {!post && page === "home" && <Contact />}
    </>
  );
}
