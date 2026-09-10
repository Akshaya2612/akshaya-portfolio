// ============================================================
// ALL SITE CONTENT LIVES HERE.
// Posts: add to `posts` (set draft:false to publish).
// Projects: append to `building.cards`.
// ============================================================

export const identity = {
  name: "Akshaya Jonnalagadda",
  tagline: "I build systems that make complexity legible.",
  hook: "Senior software and platform engineer with product judgment and applied AI range.",
  sub: "Engineer of seven years at Amazon and SS&C, now doing an MSIS at UW Foster. I learn how systems work: codebases, orgs, transit maps, and how to make them make sense for everyone else.",
  linkedin: "https://www.linkedin.com/in/akshaya-jonnalagadda-00a30615a/",
  github: "https://github.com/Akshaya2612", // TODO: set
  welcome: "Welcome! Everything is figure-out-able.",
};

export const technicalProfile = {
  chapter: "The Signal",
  title: "What I bring to the system",
  sub: "Seven years building internal platforms, distributed services, and AI-assisted workflows for teams operating at scale.",
  metrics: [
    { value: "70+", label: "services onboarded" },
    { value: "Global", label: "fulfillment network" },
    { value: "29", label: "dependent services" },
    { value: "$1.5M", label: "potential loss prevented" },
  ],
  capabilities: [
    { title: "Platform engineering", text: "Self-service systems, configuration workflows, APIs, metadata-driven design, and developer enablement." },
    { title: "Distributed systems", text: "Multi-region architecture, event-driven workflows, service integration, authentication, and safe migrations." },
    { title: "Applied AI", text: "LLM-assisted onboarding, RAG, semantic search, document parsing, and ML prototypes grounded in real operations." },
    { title: "Technical leadership", text: "Ambiguous problem framing, cross-team alignment, architecture documentation, mentoring, and delivery discipline." },
    { title: "Maintainable by default", text: "Turn one-off operational knowledge into documented, reusable systems. Replace manual configuration with repeatable infrastructure and workflows." },
    { title: "Visible failure modes", text: "Build validation, monitoring, audit trails, and production-mirrored environments so failures are observable, diagnosable, and fixable." },
  ],
};

export const systemsWork = {
  chapter: "Selected Systems",
  title: "Problems I have made smaller",
  sub: "A few representative systems from fulfillment, logistics, and applied AI. Details are intentionally generalized; the engineering patterns and outcomes are real.",
  cards: [
    { title: "Configuration as a platform", label: "FULFILLMENT / PLATFORM", problem: "Fulfillment Center setup and reconfiguration depended on repeated manual configuration work across services.", contribution: "Automated configuration updates across 13 services and turned the process into a reusable path for FC setup, regional migration, and FC reconfiguration.", outcome: "Removed approximately one engineer-year of recurring manual work annually. The system remains the path for FC configuration updates today.", pattern: "Infrastructure as code · reusable workflows · maintainability" },
    { title: "Service onboarding, under an hour", label: "PLATFORM / APPLIED AI", problem: "New-service onboarding depended on scattered, unstructured documentation and took weeks.", contribution: "Designed an LLM-assisted pipeline that parsed service documentation into structured catalog metadata and a self-service workflow.", outcome: "Live across 70+ services in a global fulfillment network, reducing onboarding from weeks to under an hour.", pattern: "Metadata-driven design · document parsing · self-service platform" },
    { title: "Root-cause analysis as a workflow", label: "APPLIED AI / OPERATIONS", problem: "Operations teams spent too much time correlating live system data with scattered technical knowledge.", contribution: "Led an intern to build a secure assistant combining live API data with a 1,500+ document knowledge base.", outcome: "Automated diagnosis across 70+ workflows, with a target of reducing resolution time by 70%. The system was still being productionalized when I left.", pattern: "RAG · semantic search · secure operational tooling" },
    { title: "Governance built into the path", label: "RELIABILITY / PLATFORM", problem: "Self-service logistics workflows created risk when approvals and configuration changes were hard to audit.", contribution: "Architected an event-driven approvals and audit platform with governance guardrails and role-scoped access.", outcome: "Designed to prevent an estimated $1.5M in potential losses from misconfigurations.", pattern: "Event-driven architecture · auditability · access control" },
    { title: "Events as the system of record", label: "ARCHITECTURE / WORKFLOW", problem: "A configuration request had to move through notification, approval, rejection, retries, and status updates without losing context.", contribution: "Modeled each transition as an observable event: request submitted, notification sent, approval awaited, decision emitted, and configuration state updated.", outcome: "Decoupled workflow steps, preserved an audit trail, and made failure boundaries visible enough to retry or investigate.", pattern: "Event-driven workflows · explicit state transitions · idempotent handlers" },
  ],
};

export const engineeringPrinciples = [
  { title: "Design for safe change", text: "Backward compatibility, mirrored environments, and gradual migration paths turn architectural ambition into something teams can actually adopt." },
  { title: "Make knowledge executable", text: "If the answer is trapped in a document or in one engineer's head, it is not yet a platform. Structure it, search it, and put it in the workflow." },
  { title: "Make failure visible", text: "Systems can fail. What matters is that they fail loudly enough to be diagnosed, understood, and fixed before the problem compounds." },
  { title: "Build once, reuse often", text: "Document the process once, replace manual configuration with infrastructure as code, and make the next run cheaper and safer than the first." },
];

export const leadership = {
  chapter: "Technical Leadership",
  title: "The work around the code",
  items: ["Led an intern and cross-team partners through a secure AI operations assistant launch.", "Coached 10 engineers through continuous-delivery adoption, raising coverage to 95% and reducing release waits to under one day.", "Mentored 4+ junior engineers and organized knowledge-sharing forums across two engineering organizations.", "Reduced security risk across five applications as a designated security certifier."],
};

export const stack = [
  { group: "Languages", items: "Python · Java · TypeScript · JavaScript · C# · SQL · Shell" },
  { group: "Cloud and data", items: "AWS Lambda · Step Functions · DynamoDB · Neptune · EventBridge · S3 · API Gateway · CDK" },
  { group: "AI and retrieval", items: "RAG · LLM integration · prompt engineering · semantic search · document parsing · metadata extraction" },
  { group: "Engineering systems", items: "Microservices · REST APIs · system design · CI/CD · test automation · CloudWatch · Jest · JUnit" },
];

export const story = {
  chapter: "The Origin",
  title: "Perpetual New Kid",
  paras: [
    "I grew up across eight cities in India and the US, always the new kid, always mid-decode. New school, new unspoken rules, new system to figure out. I got fast at it, and then I became the person who explained the rules to everyone else.",
    "I thought that instinct meant medicine. Then I watched enterprise dispatch software crash and saw field crews stall, unable to do their jobs. A system isn't just software. It is how people get their life's work done. So I skipped med school and started diagnosing systems instead.",
    "Off the clock, the instinct doesn't switch off: I bake without following the recipe, learn board game rulebooks for fun, read history and science for the how, and plan the trip in a spreadsheet. I'm always learning a new system. I usually end up running it.",
  ],
  cities: ["Andhra Pradesh", "Chennai", "Philadelphia", "Sunnyvale", "San Diego", "Chandigarh", "Chennai", "Hyderabad", "Seattle"],
};

// -------- writing --------
export type Post = {
  slug: string;
  title: string;
  teaser: string;
  external?: string;
  draft: boolean;
  body?: string[];   
};

export const writing = {
  chapter: "The Notebook",
  title: "Things Systems Taught Me",
  sub: "Field notes from seven years of making complex things legible. No numbers, no name-drops, just what I'd tell you over coffee.",
  posts: [
    {
      slug: "seinfeld-transformer",
      title: "I Shrunk nanoGPT Below One Million Parameters",
      teaser: "What building my first transformer on a dying MacBook Air taught me about where parameters in a model actually go.",
      external: "https://medium.com/@j.akshaya1997/i-shrunk-nanogpt-below-one-million-parameters-4bdd72f58737?sharedUserId=j.akshaya1997",
      draft: false,
    },
    {
      slug: "code-older-than-me",
      title: "What a codebase from 1997 taught me about code that outlives you",
      teaser: "I rebuilt a tool written before I was born, in a language most engineers can't read anymore. It was the best software education I never asked for.",
      draft: true,
      body: [
        "[DRAFT: replace the bracketed prompts with your real memories, then set draft: false]",
        "[Opening scene: the first time you opened the Pascal codebase. What did you actually see? What surprised you?]",
        "[What the original authors did RIGHT that kept it alive for 25 years? What did you find yourself respecting?]",
        "[The moment you developed affection for the old code right before deleting it.]",
        "[The lesson: what you now do differently when you write code, because you've been the archaeologist.]",
      ],
    },
    {
      slug: "reviving-dead-projects",
      title: "How to revive a project that's been dead for three years",
      teaser: "Nobody kills projects on purpose. They starve quietly. Here's what I learned bringing one back.",
      draft: true,
      body: [
        "[DRAFT: replace the bracketed prompts with your real memories, then set draft: false]",
        "[Why was it stalled? Not the official reason, the real one.]",
        "[What you did in week one that nobody expected.]",
        "[The three-years-of-abandoned-meeting-notes moment. What did you actually find in there?]",
        "[The lesson: how you'd spot a project worth reviving vs. one worth burying.]",
      ],
    },
  ] as Post[],
};

// -------- currently building --------
export const building = {
  chapter: "The Lab",
  title: "Currently Building",
  cards: [
    {
      name: "Tiny Transformers, Big Personalities",
      desc: "Small transformer models trained on dialogue, to see how much personality fits in a model that trains on one GPU.",
      how: "PyTorch · custom tokenization · character-level and BPE experiments",
      tags: ["AI/ML", "From scratch"],
      embed: "https://huggingface.co/spaces/akshayaGPT/tiny-dialogue-1-character",
      links: [
        { label: "Write-up", url: "https://medium.com/@j.akshaya1997/i-shrunk-nanogpt-below-one-million-parameters-4bdd72f58737" }, 
        { label: "GitHub", url: "https://github.com/Akshaya2612/tiny-dialogue-lab" },   
      ],
    },
    {
      name: "Movie Comparer",
      desc: "A playful frontend project from my early web-development years: compare films, explore differences, and make the case for what to watch next.",
      how: "Frontend · React · API-driven UI",
      tags: ["Earlier work", "Frontend"],
      previewImage: "movie-comparer",
      previewImageLink: "https://akshayaj1997.github.io/movie-comparer/",
      links: [
        { label: "Live demo", url: "https://akshayaj1997.github.io/movie-comparer/" },
        { label: "GitHub", url: "https://github.com/akshayaj1997/movie-comparer" },
      ],
    },
    // Add the next project here. Ship it with a real link or not at all.
  ],
};

export const work = {
  chapter: "The Record",
  title: "The Formal Version",
  line: "Seven years across Amazon and SS&C: backend, distributed systems, and the occasional heroic migration. The dates, titles, and numbers live where they belong:",
  cta: { label: "LinkedIn has the receipts →", url: "https://www.linkedin.com/in/akshaya-jonnalagadda-00a30615a/" },
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  dates: string;
  city: string;
  summary: string;
  owned: string;
  proof: string[];
  impact: string;
};

export const experience = {
  chapter: "The Route",
  title: "Professional Experience",
  sub: "A career map from enterprise systems to product-shaped engineering. Pick a stop to see what I owned, how I worked, and the evidence behind it.",
  stops: [
    {
      id: "uw-foster",
      company: "University of Washington · Foster",
      title: "MSIS Student",
      dates: "2026 - Present",
      city: "Seattle",
      summary: "Turning engineering experience into product, analytics, and organizational leverage.",
      owned: "Coursework in machine learning applications, data mining and analytics, technology project leadership, and IT strategy.",
      proof: ["MS in Management Information Systems, expected June 2027", "Bringing seven years of systems experience into product-shaped problem framing", "Building a bridge between distributed systems, applied AI, and the people who operate them"],
      impact: "The next leg: pairing technical depth with the judgment to ask what teams actually need before building.",
    },
    {
      id: "specialty-masters-committee",
      company: "UW Foster Specialty Masters Committee",
      title: "Head of Strategy",
      dates: "2026 - Present",
      city: "Seattle",
      summary: "Currently serving as Head of Strategy for the Specialty Masters Committee within the UW Foster community.",
      owned: "A student leadership role focused on shaping priorities, connecting perspectives, and helping turn ideas into a clear direction.",
      proof: ["Currently serving as Head of Strategy", "Role began during the 2026 academic year", "No initiatives or outcomes claimed yet"],
      impact: "An active opportunity to practice strategy in a community setting, with the first initiatives still taking shape.",
    },
    {
      id: "amazon-platforms",
      company: "Amazon",
      title: "Software Development Engineer II",
      dates: "2024 - May 2026",
      city: "Hyderabad",
      summary: "Turning ambiguous platform problems into self-service systems for fulfillment teams.",
      owned: "Platform architecture, AI-assisted onboarding, regional routing, configuration lifecycle, and operations tooling.",
      proof: ["LLM-assisted onboarding for 70+ services across 1,200+ fulfillment sites", "Backward-compatible routing framework adopted by 29 dependent services", "Secure AI operations assistant grounded in a 1,500+ document knowledge base"],
      impact: "Made new-service onboarding take under an hour. The operations assistant had a 70% resolution-time reduction target and was still being productionalized when I left in May 2026.",
      signals: ["PM-T", "SDE", "FDE", "Applied Scientist"],
    },
    {
      id: "amazon-delivery",
      company: "Amazon",
      title: "Software Development Engineer",
      dates: "2022 - 2024",
      city: "Hyderabad",
      summary: "Building governed, observable delivery systems that teams could safely operate at scale.",
      owned: "Event-driven approvals, auditability, authentication migration, staging strategy, and continuous delivery.",
      proof: ["Event-driven approvals and audit platform with role-scoped access", "Zero-downtime OAuth migration across 4 core and ~70 downstream services", "Production-mirrored validation across 10 environments and ~180 nodes annually"],
      impact: "Prevented $1.5M in potential losses, cut release cycles from two weeks to under one day, and removed one engineer-year of recurring manual work.",
    },
    {
      id: "ssc-eze",
      company: "SS&C / Eze Software",
      title: "Software Engineer · promoted in 2020",
      dates: "2019 - 2022",
      city: "Hyderabad",
      summary: "Modernizing trading workflows while learning to make old, high-stakes systems legible.",
      owned: "Legacy migration, FIX protocol integration, broker connectivity, applied ML prototyping, and team enablement.",
      proof: ["Migrated a Pascal/Delphi broker component to a modern web application", "Implemented inbound FIX support for dark-pool trading and multi-broker routing", "Prototyped an ML broker-selection model; placed second in an internal hackathon"],
      impact: "Improved development turnaround by 60% and application responsiveness by 70% while mentoring 4+ junior engineers.",
    },
    {
      id: "apple-internship",
      company: "Apple",
      title: "Internship Trainee",
      dates: "2018 - 2019",
      city: "Hyderabad",
      summary: "First full-stack product build: a home and office rental experience from interface to API.",
      owned: "React single-page application, REST API integration, and feature delivery with a product engineering team.",
      proof: ["Built a full-stack rental application for home and office spaces", "Designed a dynamic React front end and scalable REST APIs", "Led integration work and shipped feature enhancements under engineering mentorship"],
      impact: "Learned early that good engineering is experienced at the product surface, not just inside the codebase.",
    },
    {
      id: "ph-technologies",
      company: "PH Technologies",
      title: "Data Science Intern",
      dates: "2018",
      city: "Hyderabad",
      summary: "Where applied AI started: making a Bahasa Indonesia chatbot understand real customer language.",
      owned: "NLP preprocessing for slang, misspellings, mixed-language messages, and continuously growing language data.",
      proof: ["Built a rule-based parts-of-speech tagger, bilingual spellchecker, and trie-based word segmenter", "Extracted colloquialisms and slang from 20,000 customer conversations", "Added a TensorFlow pipeline to grow the language dictionary from new conversations"],
      impact: "Improved intent recognition before messy real-world input reached the chatbot engine. It was the first signal of a career spent translating ambiguity into structure.",
    },
  ] as Experience[],
};

export const contact = {
  chapter: "The Next Adventure",
  title: "Let's Make Things Click.",
  line: "If your team is untangling complex systems, or just wants to debate board game strategy, let's talk.",
  closing: "Next chapter starts at your team.",
};

export const offClock = {
  chapter: "Off the Clock",
  title: "The instinct does not switch off.",
  sub: "A few things I follow for no practical reason, except that they make the world more interesting.",
  cards: [
    { symbol: "✦", title: "Bake without a recipe", text: "A little intuition, a little controlled chaos, and usually something worth sharing.", image: "cookies" },
    { symbol: "◈", title: "Learn the rulebook", text: "Board games are systems with better snacks and much more dramatic edge cases.", image: "board_game" },
    { symbol: "↗", title: "Read the map", text: "Transit maps, city histories, and the quiet logic behind how people move.", image: "travelling" },
    { symbol: "⌁", title: "Keep reading", text: "Books, science, and rabbit holes that turn a five-minute question into an evening.", image: "reading" },
  ],
};
