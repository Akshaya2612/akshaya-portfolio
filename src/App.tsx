import { useEffect, useRef, useState, createContext, useContext, ReactNode } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import movieComparerGif from "./images/Movie Comparer.gif";
import cookiesImage from "./images/cookies.jpg";
import readingImage from "./images/reading.jpg";
import travellingImage from "./images/travelling.jpg";
import {
  identity, story, writing, building, work, contact, offClock,
  experience, sectionTotals, finalTally, Post, Experience,
} from "./data/content";

// ================= score engine (quiet thread) =================
type ScoreCtx = { score: number; credit: (id: string, pts: number) => void };
const Ctx = createContext<ScoreCtx>({ score: 0, credit: () => {} });

function ScoreProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState(0);
  const [score, setScore] = useState(0);
  const seen = useRef(new Set<string>());
  const credit = (id: string, pts: number) => {
    if (seen.current.has(id)) return;
    seen.current.add(id);
    setTarget(t => t + pts);
  };
  useEffect(() => {
    if (score === target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setScore(target); return; }
    const step = Math.ceil(Math.abs(target - score) / 12);
    const t = setTimeout(() => setScore(s => s + Math.sign(target - s) * Math.min(step, Math.abs(target - s))), 30);
    return () => clearTimeout(t);
  }, [score, target]);
  return <Ctx.Provider value={{ score, credit }}>{children}</Ctx.Provider>;
}

function useCreditOnView(id: string, pts: number) {
  const ref = useRef<HTMLElement>(null);
  const { credit } = useContext(Ctx);
  useEffect(() => {
    const el = ref.current;
    if (!el || pts === 0) return;
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { credit(id, pts); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, pts, credit]);
  return ref;
}

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

// ================= pieces =================
const fmt = (n: number) => n.toLocaleString("en-US");

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Nav() {
  const { score } = useContext(Ctx);
  const links = [["story", "Story"], ["experience", "Experience"], ["writing", "Writing"], ["building", "Building"], ["contact", "Contact"]];
  return (
    <nav className="nav">
      <a className="nav-name" href="#top" onClick={() => (window.location.hash = "")}>AJ</a>
      <div className="nav-links">
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </div>
      <div className="score-pill" aria-live="polite" title="Keep scrolling. Points accrue.">
        {fmt(score)} pts
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

function Story() {
  const ref = useCreditOnView("story", sectionTotals.story);
  const geoCities = [
    { name: "Andhra Pradesh", coords: [16.5, 79.7] as [number, number] }, { name: "Chennai", coords: [13.1, 80.3] as [number, number] },
    { name: "Philadelphia", coords: [40.0, -75.2] as [number, number] }, { name: "Sunnyvale", coords: [37.4, -122.0] as [number, number] },
    { name: "San Diego", coords: [32.7, -117.2] as [number, number] }, { name: "Chandigarh", coords: [30.7, 76.8] as [number, number] },
    { name: "Chennai", coords: [13.1, 80.3] as [number, number] }, { name: "Hyderabad", coords: [17.4, 78.5] as [number, number] },
    { name: "Seattle", coords: [47.6, -122.3] as [number, number] },
  ];
  const routePoints = geoCities.map(city => city.coords);
  return (
    <section id="story" className="section" ref={ref as React.RefObject<HTMLElement>}>
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
      <div className="life-ledger">
        {story.awards.map((a, i) => <div className={`life-score ${a.pts < 0 ? "negative" : "positive"}`} key={i}><span>{a.pts > 0 ? "+" : ""}{fmt(a.pts)}</span><p>{a.desc}</p></div>)}
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

function ExperienceDetail({ item }: { item: Experience }) {
  return (
    <article className="experience-detail" aria-live="polite">
      <div className="detail-topline">
        <div>
          <p className="detail-kicker">{item.city} · {item.dates}</p>
          <h3>{item.company}</h3>
          <p className="detail-title">{item.title}</p>
        </div>
      </div>
      <p className="detail-summary">{item.summary}</p>
      <div className="detail-grid compact-detail">
        <div><p className="detail-label">Selected work</p><ul>{item.proof.slice(0, 2).map(line => <li key={line}>{line}</li>)}</ul></div>
      </div>
      <p className="detail-impact"><span className="detail-label">Why it mattered</span>{item.impact}</p>
    </article>
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
              <div id={`experience-detail-${stop.id}`} className="inline-detail"><ExperienceDetail item={stop} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { score } = useContext(Ctx);
  return (
    <footer id="contact" className="section contact">
      <Eyebrow>{contact.chapter}</Eyebrow>
      <h2>{contact.title}</h2>
      <p className="section-sub center">{contact.line}</p>
      <div className="links contact-links">
        <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
      <p className="tally">{fmt(score)} / {fmt(finalTally)} points</p>
      <p className="closing">{contact.closing}</p>
      <p className="bonus">{contact.bonus}</p>
    </footer>
  );
}

function OffClock() {
  const images: Record<string, string> = { cookies: cookiesImage, reading: readingImage, travelling: travellingImage };
  return (
    <section id="off-clock" className="section off-clock">
      <Eyebrow>{offClock.chapter}</Eyebrow>
      <h2>{offClock.title}</h2>
      <p className="section-sub">{offClock.sub}</p>
      <div className="off-clock-grid">
        {offClock.cards.map(card => (
          <article className="off-clock-card" key={card.title}>
            <div className="image-slot" aria-label={"imageLabel" in card ? card.imageLabel : card.title}>
              {"image" in card && card.image ? <img src={images[card.image]} alt="" /> : <span>{"imageLabel" in card ? card.imageLabel : ""}</span>}
            </div>
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
  return (
    <ScoreProvider>
      <Nav />
      {post ? (
        <PostPage post={post} />
      ) : (
        <main>
          <Hero />
          <Story />
          <ExperienceMap />
          <Writing />
          <Building />
          <Work />
          <OffClock />
        </main>
      )}
      {!post && <Contact />}
    </ScoreProvider>
  );
}
