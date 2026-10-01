// ============================================================
// ALL SITE CONTENT LIVES HERE.
// Posts: add to `posts` (set draft:false to publish).
// Projects: append to `building.cards`.
// ============================================================

export const identity = {
  name: "Akshaya Jonnalagadda",
  tagline: "I build systems that make complexity legible.",
  hook: "Backend engineer who builds the human side of automation: the reviews, approvals, and self-service paths that let teams move fast without breaking things.",
  sub: "Engineer of seven years at Amazon and SS&C, now doing an MSIS at UW Foster. I learn how systems work: codebases, orgs, transit maps, and how to make them make sense for everyone else.",
  linkedin: "https://www.linkedin.com/in/akshaya-jonnalagadda-00a30615a/",
  github: "https://github.com/Akshaya2612",
  welcome: "Welcome! Everything is figure-out-able.",
};

export const technicalProfile = {
  chapter: "The Signal",
  title: "What I bring to the system",
  sub: "Seven years building internal platforms, event-driven workflows, and AI-assisted tools, and working out what the people using them actually need before building it.",
};

// One list, three uses: home-page capabilities (title + summary),
// Systems-page principles (principle + practice), and evidence links into the case studies.
export type SystemsDomain = {
  title: string;
  summary: string;
  principle: string;
  practice: string;
  evidence: { label: string; href: string }[];
};

export const systemsDomains: SystemsDomain[] = [
  {
    title: "Build once, reuse often",
    summary: "Turn repeated manual setup into a path the next team can run without me.",
    principle: "Document the process once, replace manual configuration with code, and make the next run cheaper and safer than the first.",
    practice: "Self-service workflows, configuration as code, metadata-driven onboarding, reusable infrastructure.",
    evidence: [
      { label: "Configuration as a platform", href: "#/featured-work/configuration-platform" },
      { label: "Service onboarding", href: "#/featured-work/service-onboarding" },
    ],
  },
  {
    title: "Make failure visible",
    summary: "Put approvals in the path, and keep each review small enough that a person actually reads it.",
    principle: "Systems fail. What matters is that they fail loudly enough to be diagnosed and fixed before the problem compounds.",
    practice: "Event-driven state transitions, asynchronous approvals, retries, audit trails, role-scoped access.",
    evidence: [{ label: "Governance built into the path", href: "#/featured-work/governance" }],
  },
  {
    title: "Design for safe change",
    summary: "Migrate live systems without asking the teams that depend on them to stop, or to notice.",
    principle: "Backward compatibility, mirrored environments, and gradual migration paths turn architectural ambition into something teams can adopt.",
    practice: "Backward-compatible interfaces, production-mirrored validation, zero-downtime migrations, CI/CD, test automation.",
    evidence: [
      { label: "Legacy broker modernization", href: "#/featured-work/legacy-modernization" },
      { label: "Routing and OAuth migrations", href: "#/experience" },
    ],
  },
  {
    title: "Make knowledge executable",
    summary: "Turn scattered documentation and live system data into tools people use mid-task.",
    principle: "If the answer is trapped in a document or in one engineer's head, it is not yet a platform. Structure it, search it, and put it in the workflow.",
    practice: "Document parsing, structured metadata extraction, RAG, semantic search, operational assistants.",
    evidence: [
      { label: "Service onboarding", href: "#/featured-work/service-onboarding" },
      { label: "Root-cause analysis", href: "#/featured-work/root-cause-analysis" },
    ],
  },
];

export type CaseStudy = {
  id: string;
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
  sub: "The systems I want a hiring team to understand first: the constraint, the call I had to make, what I built, and what changed.",
  cards: [
    {
      id: "configuration-platform",
      title: "Configuration as a platform",
      label: "AMAZON / FULFILLMENT PLATFORM",
      context: "The first of two maker-checker systems I owned. Every new fulfillment site had to be assigned to a serving partition, and that assignment lived in code.",
      problem: "Assignments were hand-built code changes. Sites were allocated to the wrong partition or missed entirely, changes collided with in-flight deployments, and each change took 7–8 hours per service to propagate through the pipeline.",
      hardCall: "Move the assignment out of code into a configuration store that deploys on its own, and keep human approval. With deploys this fast, the review is where a bad change gets stopped, so I made each review small: one per partition, and only when that partition changes.",
      contribution: "Automated partition selection and configuration generation, and built the review loop around it. A conflict or a rejection regenerates the review from the latest configuration instead of patching a stale one. Only the owning team can approve, anyone can view, and an unanswered review rejects itself after seven days. I also built a diff view where each line is one site added to or removed from a partition.",
      outcome: "Removed the manual work in site allocation, about one engineer-year every year. Deploys and rollbacks now take minutes instead of 7–8 hours per service. Reviewers caught bad allocations and stale changes before they deployed, which is what the review was there for.",
      image: { src: "diagrams/review-loop.png", alt: "Review loop: a partition change generates a review; approval deploys in minutes; rejection, conflict, or seven days of silence regenerates it from the latest configuration." },
      pattern: "Configuration as data · maker-checker · reviewable diffs",
      related: { title: "Who is going to read this anyway?", url: "https://medium.com/@j.akshaya1997/who-is-going-to-read-this-anyway-5116ecd69c73" },
    },
    {
      id: "governance",
      title: "Governance built into the path",
      label: "AMAZON / RELIABILITY / PLATFORM",
      context: "The second maker-checker system: a self-service workflow engine for configuration changes that downstream systems depend on, such as site addresses.",
      problem: "When my team ran these workflows, the checks lived in emails and tickets, and we controlled what ran when. Making workflows self-service meant anyone could define one whose inputs would write straight into downstream systems.",
      hardCall: "Self-service without giving up control. I put two gates in the path: a new workflow is approved once before it can be published, and every run's inputs are approved before any data reaches a downstream system.",
      contribution: "With my team, built the engine: users define workflows by drag and drop, and each step is a downstream API call. I built the form layer that collects each step's inputs, and designed and built the approvals framework that routes new workflows and run inputs to my team and the other owners for sign-off.",
      outcome: "Launched and in weekly production use for site launches and configuration updates. No value reaches a downstream system until the required owners sign off, and every decision is on record. Approvers caught wrong addresses before they propagated, and wrong steps in new workflows.",
      aside: { label: "Under the hood: the form layer", text: "The form renders each step's inputs from the workflow definition itself, so a new workflow needs no new UI. Every downstream API wanted different input types, fields depended on each other (one answer changed the options for the next), and the validation rules lived in different systems. The form pulls those together, with value checks and auto-population, so malformed input never reaches a reviewer." },
      image: { src: "diagrams/two-gates.png", alt: "Two approval gates: once when a workflow is created, and on every run after the form validates the inputs." },
      pattern: "Self-service workflows · approval gates · dynamic forms · auditability",
      related: { title: "Who is going to read this anyway?", url: "https://medium.com/@j.akshaya1997/who-is-going-to-read-this-anyway-5116ecd69c73" },
    },
    {
      id: "service-onboarding",
      title: "Service onboarding, without the wait",
      label: "PLATFORM / APPLIED AI",
      problem: "Onboarding a new service meant an engineer reading scattered, unstructured documentation and hand-building its catalog entry. It took weeks, and teams had no way to do it themselves.",
      hardCall: "Ship the self-service part first. Letting teams add and edit their own entries through the UI removed the queue on day one; the LLM parsing that drafts an entry from existing documentation came second, as a tool for the team rather than a gate on the workflow.",
      contribution: "Built and shipped the UI that lets teams add and edit their own service entries, and built an LLM-assisted tool that parses service documentation into structured catalog metadata so my team no longer drafts entries by hand.",
      outcome: "In production: teams onboard and update their own services through the UI instead of waiting on an engineer. The parsing tool turns existing documentation into a draft entry in minutes.",
      pattern: "Metadata-driven design · document parsing · self-service platform",
    },
    {
      id: "root-cause-analysis",
      title: "Root-cause analysis as a workflow",
      label: "APPLIED AI / OPERATIONS",
      problem: "Every on-call rotation absorbed a steady stream of tickets, plus walk-up questions, that a quick search could have answered. Answering them meant correlating live system data with scattered technical knowledge.",
      hardCall: "Answer from live system data, not documents alone. The assistant pairs the knowledge base with live API calls, so answers reflect current state.",
      contribution: "Scoped and designed a secure operations assistant, and directed the intern who built it: live API data plus the team's technical knowledge base behind semantic search.",
      outcome: "The goal was zero searchable-question tickets per rotation, and engineer hours back from walk-up questions. Production rollout was underway when I left in May 2026, so I have no measured result to report.",
      pattern: "RAG · semantic search · secure operational tooling",
    },
    {
      id: "legacy-modernization",
      title: "Modernizing a legacy broker component",
      label: "SS&C EZE / FINANCIAL SOFTWARE",
      problem: "A broker component built in Pascal/Delphi had to move to a modern web application inside a live trading environment.",
      hardCall: "Vue or React for the new interface. I settled it with a proof of concept and chose React, betting on its longevity.",
      contribution: "Migrated the Pascal/Delphi broker component to a modern web application, carrying existing trading functionality into the new interface.",
      outcome: "The web version was 70% more responsive than the Delphi component, and development turnaround on it improved by 60%.",
      pattern: "Legacy modernization · web applications · trading workflows",
    },
  ] as CaseStudy[],
};

export const leadership = {
  chapter: "Technical Leadership",
  title: "The work around the code",
  items: ["Scoped a secure AI operations assistant and directed the intern who built it, working with cross-team partners; production rollout was underway when I left.", "Coached my team through continuous-delivery adoption, raising test coverage to 95% and cutting release waits to under one day.", "Mentored junior engineers and organized knowledge-sharing forums across engineering organizations.", "Reduced security risk across the applications I certified as a designated security certifier."],
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
  current: "After seven years in engineering at Amazon and SS&C, I'm pursuing an MSIS at UW Foster in Seattle. I'm building on that experience with a closer look at product decisions, data, and technology strategy: how to decide what is worth building, and how to make it useful to the people who rely on it.",
  workLink: { label: "See how that translates into my work →", url: "#/featured-work" },
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
};

export const experience = {
  chapter: "The Route",
  title: "Professional Experience",
  sub: "From trading software at SS&C to fulfillment platforms at Amazon, then graduate study at UW Foster. Pick a stop to see what I owned and the evidence behind it.",
  stops: [
    {
      id: "uw-foster",
      company: "University of Washington · Foster",
      title: "MSIS Student",
      dates: "2026 - Present",
      city: "Seattle",
      summary: "Adding product, data, and strategy coursework to seven years of engineering.",
      owned: "Coursework in machine learning applications, data mining and analytics, technology project leadership, and IT strategy.",
      proof: ["MS in Management Information Systems, expected June 2027", "Trained sub-one-million-parameter transformers from scratch and published the results with a live demo", "Head of Strategy on the Foster Specialty Masters Committee"],
      impact: "The next leg: pairing technical depth with the judgment to ask what teams actually need before building.",
    },
    {
      id: "specialty-masters-committee",
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
      company: "Amazon",
      title: "Software Development Engineer II",
      dates: "2024 - May 2026",
      city: "Hyderabad",
      summary: "Turning ambiguous platform problems into self-service systems fulfillment teams could run without us.",
      owned: "Platform architecture, AI-assisted onboarding, regional routing, configuration lifecycle, and operations tooling.",
      proof: ["Self-service UI for service onboarding, plus an LLM-assisted tool that drafts catalog entries from documentation", "Backward-compatible routing framework adopted by dependent services without breaking changes", "Secure AI operations assistant grounded in live system data and the team's knowledge base"],
      impact: "Teams onboard and update their own services through the UI instead of waiting on an engineer. The operations assistant was in production rollout when I left in May 2026.",
      signals: ["PM-T", "SDE", "FDE", "Applied Scientist"],
    },
    {
      id: "amazon-delivery",
      company: "Amazon",
      title: "Software Development Engineer",
      dates: "2022 - 2024",
      city: "Hyderabad",
      summary: "Making automation safe to hand to other people: approvals, audit trails, and reviews designed to be read.",
      owned: "Event-driven approvals, auditability, authentication migration, staging strategy, and continuous delivery.",
      proof: ["Two maker-checker systems: automated configuration generation, and a self-service workflow engine with approval gates", "Zero-downtime OAuth migration across core and downstream services", "Production-mirrored validation environments for pre-release testing"],
      impact: "Launched the sign-off workflow into weekly production use. Cut release cycles from two weeks to under one day and removed about one engineer-year of recurring manual work every year.",
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
      impact: "The broker migration made the application 70% more responsive and improved development turnaround by 60%. Mentored junior engineers along the way.",
    },
    {
      id: "apple-internship",
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
