/* Profile and project content, based on Tommy's résumé. */
window.PORTFOLIO = {
  sampleMode: false,
  name: "Tommy Wang",
  formalName: "ShenYi (Tommy) Wang",
  initials: "TW",
  role: "Software developer · U of T",
  location: "Toronto, Ontario",
  email: "shenyi.wang@mail.utoronto.ca",
  github: "https://github.com/Grimshock1015",
  linkedin: "https://www.linkedin.com/in/tommy-wang1015",
  resumeUrl: "./assets/tommy-wang-resume.pdf",
  intro: "I build practical software across AI, Android, and data. Explore my projects, technical contributions, and experience.",
  about: [
    "I'm ShenYi (Tommy) Wang, a University of Toronto student in the Honours BSc Computer Engineering Specialist Program and a University of Toronto Scholar. My work spans retrieval-augmented generation, Android development, machine learning, and interactive games.",
    "At GienTech, I worked with a three-person cross-functional team to build a medical-device Q&A prototype grounded in company manuals. My projects include sustainability habit tracking, Toronto neighbourhood safety-index modelling, a 48-hour game jam, and a Google Sheets export proposal for Apache Superset."
  ],
  interests: ["Applied AI", "Android development", "Data modelling", "Interactive storytelling"],
  skills: [
    { title: "Languages & web", items: ["Python", "C", "Java", "SQL", "JavaScript", "TypeScript", "HTML/CSS", "PHP", "WebRTC"] },
    { title: "AI & machine learning", items: ["PyTorch", "scikit-learn", "XGBoost", "LangChain", "RAGAS"] },
    { title: "Databases", items: ["MySQL", "Firebase", "MongoDB", "Milvus", "NeDB"] },
    { title: "Tools & practices", items: ["Git", "Linux", "Docker", "Android Studio", "Agile / Scrum"] }
  ],
  experience: [
    {
      period: "Summer 2025",
      title: "Software Design Intern",
      organization: "GienTech · China",
      description: "Built a medical-device Q&A prototype with Python, LangChain, Xinference, and Milvus. Converted company manuals into searchable embeddings, retrieved source passages for answers, and assessed response quality with RAGAS on an internal 500-question benchmark. Delivered the prototype with a three-person cross-functional Agile team."
    }
  ],
  education: {
    degree: "Honours BSc · Computer Engineering Specialist Program",
    institution: "University of Toronto",
    period: "2023–2027",
    distinction: "University of Toronto Scholar",
    additional: [
      { degree: "Exchange Student", institution: "National University of Singapore", period: "2026" }
    ]
  },
  projects: [
    {
      id: "superset",
      title: "Apache Superset",
      subtitle: "A proposal for direct Google Sheets exports.",
      category: "Engineering",
      tags: ["Technical design", "Google Sheets", "Celery"],
      year: "Oct 2026–Present",
      visual: "superset",
      typeLabel: "Technical proposal",
      image: "",
      imageAlt: "",
      overview: "Contributed to a technical proposal for direct Google Sheets export from Apache Superset. The proposal extends the existing SQL Lab design to charts, dashboards, and drill results, replacing the proposed workflow's manual CSV/XLSX upload step.",
      contribution: [
        "Specified synchronous chart exports and Celery-based dashboard jobs with status polling, with an execution design intended to avoid request timeouts during multi-chart exports.",
        "Documented integration into extension menus and a spreadsheet structure with one tab per chart.",
        "Included export metadata in the design to preserve chart context when results are shared."
      ],
      resultTitle: "Proposal scope",
      learned: "The proposal covers chart, dashboard, and drill-result exports, including background job status, spreadsheet organisation, and export metadata.",
      liveUrl: "",
      sourceUrl: ""
    },
    {
      id: "planetze",
      title: "Planetze",
      subtitle: "Sustainability habits, tracked day by day.",
      category: "Mobile",
      tags: ["Java", "Android", "Firebase"],
      year: "Dec 2024",
      visual: "planetze",
      typeLabel: "Android course project",
      image: "./assets/planetze/eco-tracker.jpg",
      imageAlt: "Planetze's Eco Tracker screen showing daily carbon emissions by activity category.",
      imageOrientation: "portrait",
      galleryLabel: "INSIDE THE APP",
      cardImages: ["./assets/planetze/welcome.jpg", "./assets/planetze/eco-tracker.jpg", "./assets/planetze/eco-gauge.jpg"],
      gallery: [
        { src: "./assets/planetze/eco-balance.jpg", caption: "Eco Balance · sustainability projects", alt: "Planetze Eco Balance screen displaying a reforestation project in Kenya." },
        { src: "./assets/planetze/eco-gauge.jpg", caption: "Eco Gauge · emissions comparison", alt: "Planetze Eco Gauge screen with local and global emissions comparisons and a daily chart." },
        { src: "./assets/planetze/eco-tracker.jpg", caption: "Eco Tracker · daily emissions", alt: "Planetze Eco Tracker screen with a circular emissions chart for transportation, food, and shopping." },
        { src: "./assets/planetze/transport-questionnaire.jpg", caption: "Transport questionnaire", alt: "Planetze onboarding question about weekly public transport usage, with selectable time ranges." },
        { src: "./assets/planetze/carbon-footprint-info.jpg", caption: "Carbon footprint information", alt: "Planetze educational screen explaining carbon footprints and their connection to climate change." },
        { src: "./assets/planetze/welcome.jpg", caption: "Welcome · login & registration", alt: "Planetze welcome screen with login and registration buttons." },
        { src: "./assets/planetze/onboarding.jpg", caption: "Sustainability onboarding", alt: "Planetze introduction with an illustrated Earth and the message Empowering You to Live Sustainability Everyday." }
      ],
      overview: "Developed habit-management features for Planetze, an Android carbon-tracking course project for an external company. The completed app lets users adopt sustainability habits, log activity, and find habits relevant to their activity patterns.",
      contribution: [
        "Implemented per-user habit histories in Firebase, duplicate-adoption checks, and date-based logging for calendar views.",
        "Built rule-based recommendations using each user's most frequent activity categories.",
        "Added keyword, category, and impact filters to help users discover relevant habits."
      ],
      resultTitle: "Project outcome",
      learned: "Delivered habit-management features in the completed Android app. Earned a 10/10 individual score; the team received 96% and was selected for an external-company showcase.",
      liveUrl: "",
      sourceUrl: "https://github.com/Grimshock1015/Planetze"
    },
    {
      id: "gamejam",
      title: "Dream Detective",
      subtitle: "A branching narrative puzzle game in 48 hours.",
      category: "Games",
      tags: ["Godot", "GDScript", "JSON"],
      year: "Jan 2026",
      visual: "gamejam",
      typeLabel: "Global Game Jam 2026",
      image: "./assets/dream-detective/dream-investigation.png",
      imageAlt: "Dream Detective gameplay showing a colourful dream scene with characters, clues, and dialogue.",
      gallery: [
        { src: "./assets/dream-detective/dialogue.png", caption: "Dialogue & character interaction", alt: "Dream Detective dialogue scene with an investigator, a seated character, and a hand-drawn room." },
        { src: "./assets/dream-detective/character-notebook.png", caption: "Character notebook", alt: "An open investigation notebook with character portraits and case folders." },
        { src: "./assets/dream-detective/dream-investigation.png", caption: "Dream investigation", alt: "A colourful office dream scene with several characters, a cat, and an investigator's dialogue." },
        { src: "./assets/dream-detective/clue-notebook.png", caption: "Clue notebook & deduction", alt: "An open notebook of illustrated clues and a clue-combination area against a bright dream background." },
        { src: "./assets/dream-detective/kitchen-exploration.png", caption: "Kitchen exploration", alt: "A hand-drawn pink kitchen scene with a character, a cat, and the investigation interface." }
      ],
      overview: "Developed a playable 2D narrative puzzle game with a team during a 48-hour Global Game Jam. The prototype connects scripted interactions, puzzle progression, UI, and branching dialogue.",
      contribution: [
        "Implemented Area2D triggers, scripted interactions, UI elements, and puzzle logic in GDScript.",
        "Connected player actions to in-game events and puzzle progression.",
        "Created JSON-based branching dialogue to represent player choices and display different narrative responses."
      ],
      resultTitle: "Prototype detail",
      learned: "The playable team prototype combines Godot interaction logic with JSON dialogue paths, allowing player selections to affect the story responses shown in the game.",
      liveUrl: "https://mambojiang.itch.io/dream-detective",
      sourceUrl: ""
    },
    {
      id: "safety",
      title: "Toronto Safety Index",
      subtitle: "Time-aware modelling across 158 neighbourhoods.",
      category: "Data & ML",
      tags: ["Python", "scikit-learn", "XGBoost"],
      year: "Dec 2025",
      visual: "safety",
      typeLabel: "Machine learning project",
      image: "",
      imageAlt: "",
      overview: "Built a regression dataset for 158 Toronto neighbourhoods by mapping police-reported crime categories to severity weights and a 0–1 safety-index target. Compared four regression models using a chronological holdout.",
      contribution: [
        "Engineered one- to three-month lag features and trained linear, ridge, random-forest, and XGBoost regressors on 2020–2023 data.",
        "Reserved 2024–2025 as a chronological holdout for model comparison.",
        "Tuned XGBoost tree depth and estimator count with five-fold TimeSeriesSplit before evaluating the held-out period."
      ],
      resultTitle: "Model evaluation",
      learned: "XGBoost achieved the lowest reported test MSE among the four models: 0.00270 MSE and 0.8176 R², approximately 3.6% lower MSE than the linear baseline of 0.00280.",
      liveUrl: "",
      sourceUrl: "https://github.com/Grimshock1015/toronto-nsi-prediction"
    }
  ]
};
