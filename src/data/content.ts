// ============================================================
// ALL SITE CONTENT LIVES HERE.
// Posts: add to `posts` (set draft:false to publish).
// Projects: append to `building.cards`.
// ============================================================

export const identity = {
  name: "Akshaya Jonnalagadda",
  tagline: "I build systems that make complexity legible.",
  hook: "I ask two questions of every system: where is a person doing by hand what a machine should, and where is a machine deciding something only a person should.",
  sub: "Seven years at Amazon and SS&C. Now a master's at UW Foster.",
  linkedin: "https://www.linkedin.com/in/akshaya-jonnalagadda-00a30615a/",
  github: "https://github.com/Akshaya2612",
  welcome: "Welcome! Everything is figure-out-able.",
};

export const technicalProfile = {
  chapter: "The Signal",
  title: "What I bring to the system",
  sub: "Four habits, each with the moment that made it a habit.",
};

// One list, three uses: home-page capabilities (title + summary),
// Systems-page principles (principle + practice), and evidence links into the case studies.
export type SystemsDomain = {
  title: string;
  summary: string;
  principle: string;
  practice: string;
  stat: { value: string; label: string }; // the one number that proves the rule
  evidence: { label: string; href: string }[];
};

export const systemsDomains: SystemsDomain[] = [
  {
    title: "Build once, reuse often",
    summary: "Every new fulfillment site needed a hand-written config change, a code review, and a pipeline deploy in 13 services. I turned that into generated configuration: site setup from six weeks to two, one engineer-year a year back.",
    principle: "Automate the repeat, keep the judgment. When I automated site setup I kept the approval step on purpose, and reviewers have caught wrong assignments since.",
    practice: "Self-service workflows, configuration as code, metadata-driven onboarding, reusable infrastructure.",
    stat: { value: "6 wk → 2 wk", label: "to set up a fulfillment center, with deploys down from 7–8 hours per service to minutes" },
    evidence: [
      { label: "Configuration as a platform", href: "#configuration-platform" },
      { label: "Code-to-config migration", href: "#code-to-config-migration" },
    ],
  },
  {
    title: "Make failure visible",
    summary: "A self-service workflow was once set up like the wrong type and failed in production, because nothing required a human look. I built the approval gate that every node address change across AFT and SCOT now passes through.",
    principle: "Approved is not applied, and silence is not a yes. Small reviews, one site per line, auto-rejected after seven days. A review nobody reads is not a control.",
    practice: "Event-driven state transitions, asynchronous approvals, retries, audit trails, role-scoped access.",
    stat: { value: "7 days", label: "before an unanswered review rejects itself; every site address change across Amazon's fulfillment and supply-chain tech orgs passes this gate" },
    evidence: [{ label: "Governance built into the path", href: "#governance" }],
  },
  {
    title: "Disagree early, commit fully",
    summary: "Moved ~70 services to a new authentication system with zero downtime, ahead of the rest of the org. The first cross-region migration I led became the team's written blueprint for the rest.",
    principle: "I say the uncomfortable thing in the design review, not in the retro. I have pushed back on sprint priorities to get a deprecation done before it hurt us, and once the call is made I carry it.",
    practice: "Backward-compatible interfaces, production-mirrored validation, zero-downtime migrations, CI/CD, test automation.",
    stat: { value: "Zero downtime", label: "authentication migration across ~70 services, finished ahead of the rest of the org after I pushed to prioritize it" },
    evidence: [
      { label: "Routing and OAuth migrations", href: "#experience" },
    ],
  },
  {
    title: "Make knowledge executable",
    summary: "A registry change that took a developer 3–4 hours now takes the owning team 3–4 minutes, across 800+ services. The roughly 10 incidents a month from orphaned records stopped.",
    principle: "If the answer lives in one engineer's head, it is not a platform yet. I wrote the team's CDK and testing guidelines so the next engineer, or the away team, did not need me in the room.",
    practice: "Document parsing, structured metadata extraction, RAG, semantic search, operational assistants.",
    stat: { value: "3–4 h → 3–4 min", label: "per registry change, developer time to self-service, across 800+ services" },
    evidence: [
      { label: "Code-to-config migration", href: "#code-to-config-migration" },
    ],
  },
];

export type CaseStudy = {
  id: string;
  kind: "engineering" | "product"; // product = the initiative was mostly research, requirements, and getting people to move
  title: string;
  label: string;
  context?: string;
  problem: string;      // The constraint
  hardCall: string;     // The hard call
  contribution: string; // My contribution
  outcome: string;      // The result
  pattern: string;
  aside?: { label: string; text: string }; // optional implementation note, shown below the four columns
  image?: { src: string; alt: string };    // optional diagram, a PNG under public/diagrams/
  related?: { title: string; url: string }; // Medium article, if any
};

export const systemsWork = {
  chapter: "Selected Systems",
  title: "Selected engineering systems",
  sub: "Three pieces of work in full: the constraint, the call I had to make, what I built, and what changed. Then the rest, in a line each.",
  cards: [
    {
      id: "configuration-platform",
      kind: "engineering",
      title: "Configuration as a platform",
      label: "AMAZON / FULFILLMENT PLATFORM",
      context: "Part of a program to take manual configuration out of fulfillment-center launches across **51 AFT services**. I owned the **13** that use pod-based load balancing.",
      problem: "The system knew which pod a new site belonged to. Getting it there was manual: a hand-written config change, a code review, a change-management approval, and a **7–8 hour** pipeline deploy, per service. Sites got missed or misassigned, and changes collided with in-flight deployments.",
      hardCall: "**Move the assignment out of code into configuration, and keep the human approval.** With deploys this fast, the review is where a bad change gets stopped, so I made each one small: one per pod, only when that pod changes.",
      contribution: "Automated configuration generation and deployment for 13 services, so a launch no longer needs a code review, an approval ticket, or a pipeline run per service. Designed the review loop: **regenerate on conflict or rejection, owning team approves, auto-reject after 7 days**. Built the diff view, one site per line.",
      outcome: "**Fulfillment-center setup: about 6 weeks → about 2.** 10–20 launches a week, deploys and rollbacks in **minutes instead of 7–8 hours** per service, **one engineer-year a year** of manual work gone. Reviewers caught bad allocations and stale changes before they deployed.",
      image: { src: "diagrams/review-loop.png", alt: "Review loop: a pod change generates a review; approval deploys in minutes; rejection, conflict, or seven days of silence regenerates it from the latest configuration." },
      pattern: "Configuration as data · maker-checker · reviewable diffs",
      related: { title: "Who is going to read this anyway?", url: "https://medium.com/@j.akshaya1997/who-is-going-to-read-this-anyway-5116ecd69c73" },
    },
    {
      id: "governance",
      kind: "engineering",
      title: "Governance built into the path",
      label: "AMAZON / RELIABILITY / PLATFORM",
      context: "The second maker-checker system: a self-service workflow engine for configuration changes that downstream systems depend on, starting with **Quick Commerce launches and fulfillment-center address changes**.",
      problem: "Experts used to build each workflow in meetings; one took **up to 8 weeks**. Self-service fixed the wait and exposed a gap: a workflow was configured like the wrong type and **failed in production**, because nothing required a human look. Address changes in particular needed business context no automated check had.",
      hardCall: "**Self-service without giving up control.** Two gates: a new workflow is approved once before it can be published, and every run's inputs are approved before any data reaches a downstream system.",
      contribution: "With my team, built the engine: drag-and-drop workflows where each step is a downstream API call. I built the **form layer** that collects each step's inputs, and designed and built the **approvals framework** that routes new workflows and run inputs to the owners for sign-off.",
      outcome: "**Workflow creation and approval: 8 weeks → 1.** Every site address change across **Amazon's fulfillment and supply-chain tech orgs (AFT and SCOT)** now passes this gate; nothing reaches a downstream system until the owners sign off, and every decision is on record. Approvers caught wrong addresses before they propagated.",
      aside: { label: "Under the hood: the form layer", text: "The form renders each step's inputs from the workflow definition itself, so a new workflow needs no new UI. Every downstream API wanted different input types, fields depended on each other (one answer changed the options for the next), and the validation rules lived in different systems. The form pulls those together, with value checks and auto-population, so malformed input never reaches a reviewer." },
      image: { src: "diagrams/two-gates.png", alt: "Two approval gates: once when a workflow is created, and on every run after the form validates the inputs." },
      pattern: "Self-service workflows · approval gates · dynamic forms · auditability",
      related: { title: "Who is going to read this anyway?", url: "https://medium.com/@j.akshaya1997/who-is-going-to-read-this-anyway-5116ecd69c73" },
    },
    {
      id: "code-to-config-migration",
      kind: "product",
      title: "Forty workflows, from code to configuration",
      label: "AMAZON / PLATFORM MIGRATION",
      context: "Site-launch workflows were hand-written code. The platform was moving to a shared invocation layer that reads **endpoints, request bodies, validations, and auto-fill rules from JSON configuration**, so a new workflow needs no new code.",
      problem: "**About 40 workflows** to move, owned by my team and others. Users would not move until the platform could do everything their code did. Maintainers could not support configuration they had no tools to edit.",
      hardCall: "**Treat it as a product, not a rewrite.** Find the gaps that would make teams say no, build those first, and hand every team a manual they could follow without me in the room.",
      contribution: "Wrote the migration manuals: steps, dependencies, code changes, checklist, acceptance criteria. Catalogued every validation and auto-fill rule buried in code. Identified and built the missing features: **diff screens, create/update/delete tagging, and the service registry portal** where the configuration is added, front to back.",
      outcome: "The registry portal took a change from **3–4 hours of developer time to 3–4 minutes of self-service** across **800+ services**, and ended the ~10 incidents a month from hand edits. **5 of ~40 workflows** had migrated when I left; the migration continues without me, which was the point.",
      pattern: "Platform migration · requirements · enablement · self-service",
    },
  ] as CaseStudy[],
  also: [
    { title: "An AI assistant that got smaller on purpose", line: "We wanted something AI on the page. I wrote the requirements for a workflow assistant; they were too ambitious, so we scaled down to answering operators' questions from live system data. An intern built it under my direction; rollout was underway when I left." },
    { title: "Full continuous deployment", line: "Wrote the acceptance criteria, then led 10 engineers through it: integration test coverage 5% → 95%, release waits 2 weeks → under a day." },
    { title: "Site launches in the EU and Japan", line: "Rebuilt cross-region connectivity so last-mile site launches could leave North America: 31 EU sites live, 30% space savings, 15% throughput gain." },
    { title: "Production-equivalent test environments", line: "10 test sites for last-mile services in 2024, aimed at the 46% of bad deployments that had been causing incidents." },
    { title: "Pascal/Delphi to React, at SS&C", line: "Chose React over Vue after a proof of concept; the web version was 70% more responsive and development turnaround improved 60%." },
  ],
};

export const leadership = {
  chapter: "Technical Leadership",
  title: "The work around the code",
  items: ["Scoped a secure AI operations assistant and directed the intern who built it; championed AI tooling for the team and authored the requirements for a natural-language workflow assistant.", "Led 10 engineers through continuous-deployment adoption as an away team: wrote the acceptance criteria, ran daily unblock sessions, raised coverage to 95%, cut release waits from two weeks to under a day.", "Wrote the team's CDK and unit-testing guidelines, ran the knowledge-sharing forum, and buddied new engineers through onboarding.", "Designated security certifier for 5 applications; led a knowledge-transfer session on the configuration platform that was cited in my promotion."],
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
  ],
  approach: "That instinct shows up in my engineering: document what someone would otherwise have to rediscover, automate the repeatable parts, and make problems visible. At Amazon and SS&C, I worked on software that other people depended on to get their jobs done. Making it understandable and maintainable mattered as much as getting it to work.",
  current: "After seven years in engineering at Amazon and SS&C, I'm pursuing a master's in Information Systems at UW Foster in Seattle. I'm building on that experience with a closer look at product decisions, data, and technology strategy: how to decide what is worth building, and how to make it useful to the people who rely on it.",
  photo: { alt: "Akshaya in front of the 'It's always Day 1' wall at an Amazon office.", caption: "Amazon, Hyderabad. Four years of Day 1." },
  workLink: { label: "See how that translates into my work →", url: "#work" },
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
      slug: "who-is-going-to-read-this",
      title: "Who is going to read this anyway?",
      teaser: "On automation, approval buttons, and the diffs we pretend to read. Two maker-checker systems, and why the checker was the hard part.",
      external: "https://medium.com/@j.akshaya1997/who-is-going-to-read-this-anyway-5116ecd69c73",
      draft: false,
    },
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
  logo?: string;    // file under public/logos/
  signals?: string[];
};

export const experience = {
  chapter: "The Route",
  title: "Professional Experience",
  sub: "From trading software at SS&C to fulfillment platforms at Amazon, then graduate study at UW Foster. Pick a stop to see what I owned and the evidence behind it.",
  stops: [
    {
      id: "uw-foster",
      logo: "uw-foster.svg",
      company: "University of Washington · Foster",
      title: "Master's Student",
      dates: "2026 - Present",
      city: "Seattle",
      summary: "Adding product, data, and strategy coursework to seven years of engineering.",
      owned: "Coursework in machine learning applications, data mining and analytics, technology project leadership, and IT strategy.",
      proof: ["MS in Management Information Systems, expected June 2027", "Trained sub-one-million-parameter transformers from scratch and published the results with a live demo", "Head of Strategy on the Foster Specialty Masters Committee"],
      impact: "The next leg: pairing technical depth with the judgment to ask what teams actually need before building.",
    },
    {
      id: "specialty-masters-committee",
      logo: "uw-foster.svg",
      company: "UW Foster Specialty Masters Committee",
      title: "Head of Strategy",
      dates: "2026 - Present",
      city: "Seattle",
      summary: "Moved the committee's event and article publishing to a UW-managed site, so members can publish without touching code.",
      owned: "Committee strategy and priorities, plus co-maintaining the committee website.",
      proof: ["Moved event and article publishing off a code-only site onto a UW-managed platform", "Members can now post events and articles themselves, with no developer in the loop", "Co-maintain the committee website's front end"],
      impact: "Removed the developer bottleneck on committee publishing.",
    },
    {
      id: "amazon-platforms",
      logo: "amazon.svg",
      company: "Amazon",
      title: "Software Development Engineer II",
      dates: "2024 - May 2026",
      city: "Hyderabad",
      summary: "Turning ambiguous platform problems into self-service systems fulfillment teams could run without us.",
      owned: "Platform architecture, AI-assisted onboarding, regional routing, configuration lifecycle, and operations tooling.",
      proof: ["Service registry portal: 3–4 hours of developer time to 3–4 minutes of self-service across 800+ services; ~10 monthly incidents from orphaned records eliminated", "Led the team's first cross-region service migration; the write-up became the blueprint for the rest of the org", "Authored the requirements for a natural-language workflow assistant and led the team code-a-thon that built the proof of concept"],
      impact: "Teams manage their own registry entries instead of waiting on an engineer. Migrated the platform's web infrastructure to CDK with zero downtime to close a high-severity vulnerability. The AI operations assistant was in production rollout when I left in May 2026.",
      signals: ["PM-T", "SDE", "FDE", "Applied Scientist"],
    },
    {
      id: "amazon-delivery",
      logo: "amazon.svg",
      company: "Amazon",
      title: "Software Development Engineer",
      dates: "2022 - 2024",
      city: "Hyderabad",
      summary: "Making automation safe to hand to other people: approvals, audit trails, and reviews designed to be read.",
      owned: "Event-driven approvals, auditability, authentication migration, staging strategy, and continuous delivery.",
      proof: ["Two maker-checker systems: pod assignment as generated configuration for 13 services, and an approvals framework that cut workflow creation from 8 weeks to 1", "Led 10 engineers to full continuous deployment: integration test coverage 5% → 95%, release waits 2 weeks → under a day", "Opened last-mile site launches in the EU and Japan by rebuilding cross-region connectivity: 31 EU sites live, 30% space savings, 15% throughput gain, 4 hours a week back per manager"],
      impact: "Stood up production-equivalent test environments for last-mile services: 10 test sites in 2024, targeting the 46% of bad deployments that had been causing incidents. Zero-downtime OAuth migration across 4 core and ~70 downstream services, ahead of the rest of the org.",
    },
    {
      id: "ssc-eze",
      logo: "ssc.svg",
      company: "SS&C / Eze Software",
      title: "Software Engineer · promoted in 2020",
      dates: "2019 - 2022",
      city: "Hyderabad",
      summary: "Modernizing trading workflows while learning to make old, high-stakes systems legible.",
      owned: "Legacy migration, FIX protocol integration, broker connectivity, applied ML prototyping, and team enablement.",
      proof: ["Migrated a Pascal/Delphi broker component to a modern web application", "Implemented inbound FIX support for dark-pool trading and multi-broker routing", "Prototyped an ML broker-selection model; placed second in an internal hackathon"],
      impact: "The broker migration made the application 70% more responsive and improved development turnaround by 60%. Mentored junior engineers along the way.",
    },
    {
      id: "apple-internship",
      logo: "apple.svg",
      company: "Apple",
      title: "Internship Trainee",
      dates: "2018 - 2019",
      city: "Hyderabad",
      summary: "First full-stack product build: a home and office rental experience from interface to API.",
      owned: "React single-page application, REST API integration, and feature delivery with a product engineering team.",
      proof: ["Built a full-stack rental application for home and office spaces", "Built the React front end and the REST APIs behind it", "Led integration work and shipped feature enhancements under engineering mentorship"],
      impact: "Learned early that good engineering is experienced at the product surface, not just inside the codebase.",
    },
    {
      id: "ph-technologies",
      logo: "ph-technologies.svg",
      company: "PH Technologies",
      title: "Data Science Intern",
      dates: "2018",
      city: "Hyderabad",
      summary: "Where applied AI started: making a Bahasa Indonesia chatbot understand real customer language.",
      owned: "NLP preprocessing for slang, misspellings, mixed-language messages, and continuously growing language data.",
      proof: ["Built a rule-based parts-of-speech tagger, bilingual spellchecker, and trie-based word segmenter", "Extracted colloquialisms and slang from real customer conversations", "Added a TensorFlow pipeline to grow the language dictionary from new conversations"],
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
  title: "A few things I make time for.",
  sub: "A few things I follow for no practical reason, except that they make the world more interesting.",
  cards: [
    { symbol: "✦", title: "Bake without a recipe", text: "A little intuition, a little controlled chaos, and usually something worth sharing.", image: "cookies" },
    { symbol: "◈", title: "Learn the rulebook", text: "I read board game rulebooks for fun. Snacks and a little friendly competition help too.", image: "board_game" },
    { symbol: "↗", title: "Read the map", text: "Transit maps, city histories, and the quiet logic behind how people move.", image: "travelling" },
    { symbol: "⌁", title: "Keep reading", text: "Books, science, and rabbit holes that turn a five-minute question into an evening.", image: "reading" },
  ],
};
