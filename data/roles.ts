/**
 * Programmatic P2 registry — one object per /resume-examples/{job} page.
 *
 * QA GATE: lib/validateRole.ts runs against every published role inside
 * generateStaticParams — a role that misses the content thresholds FAILS THE
 * BUILD. That is the anti-thin-content guardrail from the strategy (§8).
 *
 * Scaling path: generate candidate entries with the product's parser/LLM from
 * real job-description corpora → human edits → set status "published" →
 * next build ships them. Launch in batches; watch GSC indexation per batch.
 *
 * NO fabricated stats: salaryNote stays qualitative (no invented numbers).
 * Bullets are example patterns for candidates to adapt — not claims.
 */
export type RoleFaq = { question: string; answer: string };

export type Role = {
  slug: string;
  title: string;
  category: string;
  status: "published" | "draft";
  /** 40–60 word answer block rendered under the H1 (AEO). */
  answer: string;
  hardSkills: string[];
  softSkills: string[];
  /** Keywords pulled from typical postings for this title. */
  atsKeywords: string[];
  /** Quantified example bullets candidates can adapt. */
  bullets: string[];
  /** What recruiters scan for, as a short paragraph. */
  recruiterLook: string;
  /** Common mistakes / tips, rendered as a list. */
  tips: string[];
  /** Qualitative pay/outlook note — NO invented figures. */
  salaryNote: string;
  /** Recommended template slug (CTA deep-link param). */
  template: "ats" | "modern" | "latex" | "fresher";
  faq: RoleFaq[];
};

export const roles: Role[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    status: "published",
    answer:
      "A strong software engineer resume leads with languages, frameworks, and systems that match the posting, then proves impact with quantified bullets — latency cut, uptime improved, releases shipped. Single column, projects with stack named, and keywords mirroring the job description so it survives ATS screening.",
    hardSkills: [
      "Python",
      "TypeScript / JavaScript",
      "React",
      "Node.js",
      "SQL (PostgreSQL)",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD pipelines",
      "REST / GraphQL APIs",
      "Git",
      "System design",
    ],
    softSkills: ["Code review collaboration", "Cross-team communication", "Estimation", "Mentoring"],
    atsKeywords: [
      "software development lifecycle",
      "microservices",
      "unit testing",
      "agile",
      "scalability",
      "cloud infrastructure",
      "API design",
      "performance optimization",
      "distributed systems",
      "DevOps",
      "code review",
      "production support",
    ],
    bullets: [
      "Designed and shipped a payments microservice handling 2M+ requests/day with 99.95% uptime.",
      "Cut median API latency 38% by profiling hot paths and adding Redis caching.",
      "Led migration of a monolith to containerized services on Kubernetes, reducing deploy time from 45 to 8 minutes.",
      "Raised unit-test coverage from 41% to 85% and wired tests into CI, cutting regression bugs reported in production by half.",
      "Mentored 3 junior engineers through onboarding and code review; all promoted within 18 months.",
      "Built internal CLI tooling adopted by 40+ engineers, saving ~6 hours/week of manual environment setup.",
      "Reduced cloud spend 22% by right-sizing instances and moving batch jobs to spot capacity.",
    ],
    recruiterLook:
      "Tech recruiters scan the skills line for the posting's stack first — exact names, not category words — then look at the most recent role for scope (what you owned), scale (users, requests, data volume), and outcomes with numbers. GitHub or portfolio links get clicked for borderline candidates. Buzzword lists without evidence are the fastest pass.",
    tips: [
      "Name the stack per project or role — 'built in React/Node on AWS' beats a separate skills dump alone.",
      "One bullet per role should show scale (requests/day, data size, team size).",
      "Skip skill bars and logos; ATS parsers read text only.",
    ],
    salaryNote:
      "Compensation varies widely by market, level, and company stage; check current ranges on levels.fyi, Glassdoor, or local salary surveys for your region before negotiating.",
    template: "latex",
    faq: [
      {
        question: "Should a software engineer resume include personal projects?",
        answer:
          "Yes when they show skills the work history doesn't — a deployed app, an open-source contribution, measurable users. List the stack and an outcome. Skip tutorial clones; they signal padding rather than capability.",
      },
      {
        question: "How long should a software engineer resume be?",
        answer:
          "One page under ten years of experience; two pages for senior/staff scope with multiple systems owned. Recruiters read the top third first — lead with the stack and scale that match the posting.",
      },
      {
        question: "Do FAANG-style companies use ATS screening?",
        answer:
          "Large tech employers parse every application into an ATS and recruiters search it by keywords, so exact technology names matter. Referrals skip queues, not parsing — the resume still gets indexed and searched.",
      },
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Technology",
    status: "published",
    answer:
      "A data analyst resume should prove you turn raw data into decisions: SQL and a BI tool up top, then bullets where analysis changed an outcome — revenue found, churn reduced, hours saved. Mirror the posting's tools exactly (Tableau vs Power BI) and quantify every claim.",
    hardSkills: [
      "SQL",
      "Excel (advanced)",
      "Python (pandas)",
      "Tableau",
      "Power BI",
      "Data cleaning / ETL",
      "Statistics & A/B testing",
      "Google Analytics 4",
      "Data modeling",
      "Dashboard design",
    ],
    softSkills: ["Stakeholder communication", "Problem framing", "Data storytelling", "Prioritization"],
    atsKeywords: [
      "data visualization",
      "business intelligence",
      "KPI reporting",
      "data pipeline",
      "exploratory analysis",
      "forecasting",
      "cohort analysis",
      "data quality",
      "requirements gathering",
      "automation",
      "insights",
      "SQL queries",
    ],
    bullets: [
      "Built a churn-risk dashboard in Tableau used by 3 teams; flagged accounts received outreach that cut quarterly churn 12%.",
      "Wrote SQL models consolidating 6 source systems into one reporting layer, eliminating ~10 hours/week of manual Excel work.",
      "Designed and analyzed an A/B test on onboarding flow; winning variant lifted activation 9 points.",
      "Automated weekly KPI reporting with Python, reducing turnaround from 2 days to 30 minutes.",
      "Identified a pricing data error worth ₹40L/yr in misbilled accounts during a revenue audit.",
      "Partnered with product managers to define 12 core metrics, ending dashboard sprawl across 40+ conflicting reports.",
    ],
    recruiterLook:
      "Hiring managers look for the tool overlap first — SQL is assumed, the BI tool must match theirs — then for evidence you influenced a decision, not just produced charts. 'Built dashboard' is table stakes; 'dashboard that changed X' is the interview trigger. Domain familiarity (SaaS, retail, banking) often breaks ties.",
    tips: [
      "Every bullet needs a number: rows processed, hours saved, metric moved.",
      "Match the BI tool in the posting exactly; list the other one second if you know both.",
      "Link a portfolio or public dashboard if you have one — analysts who show work convert better.",
    ],
    salaryNote:
      "Pay differs sharply by industry and city; consult Glassdoor, AmbitionBox (India), or recruiter salary guides for current local ranges.",
    template: "ats",
    faq: [
      {
        question: "Do data analysts need Python on the resume?",
        answer:
          "Increasingly yes for mid-level roles — pandas for cleaning and automation is the common bar. Entry roles often clear on SQL + Excel + one BI tool. Listing Python you can't interview on backfires; mark proficiency honestly.",
      },
      {
        question: "What's the difference between a data analyst and data scientist resume?",
        answer:
          "Analyst resumes emphasize SQL, BI tooling, and decision impact; data scientist resumes add modeling, ML libraries, and experiment design depth. Applying across both titles means re-tailoring keywords — the postings are screened differently.",
      },
      {
        question: "How do freshers get data analyst interviews without experience?",
        answer:
          "Projects that mimic the job: pick a public dataset, define a business question, publish the SQL/notebook and a short write-up with a recommendation. Two or three of these, quantified, outperform a coursework list.",
      },
    ],
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    category: "Healthcare",
    status: "published",
    answer:
      "A registered nurse resume leads with licensure and certifications (RN license state/number ready, BLS/ACLS), unit type and patient ratios, then EHR systems by name. Quantified bullets — patients per shift, audit scores, protocol outcomes — show competence; exact certification acronyms get you through ATS filters.",
    hardSkills: [
      "Patient assessment",
      "Medication administration",
      "IV therapy",
      "EHR (Epic / Cerner)",
      "Care planning",
      "Triage",
      "Wound care",
      "BLS / ACLS certified",
      "Infection control",
      "Patient education",
    ],
    softSkills: ["Calm under pressure", "Family communication", "Interdisciplinary teamwork", "Advocacy"],
    atsKeywords: [
      "registered nurse",
      "acute care",
      "patient safety",
      "charting",
      "HIPAA compliance",
      "quality improvement",
      "discharge planning",
      "vital signs monitoring",
      "med-surg",
      "ICU",
      "patient ratios",
      "clinical documentation",
    ],
    bullets: [
      "Managed care for 5–6 med-surg patients per shift in a 32-bed unit while precepting new graduate nurses.",
      "Maintained 100% medication-administration audit compliance across 18 months.",
      "Cut patient-fall incidents 30% on the unit by leading an hourly-rounding protocol adoption.",
      "Documented assessments and care plans in Epic with zero charting deficiencies in quarterly reviews.",
      "Coordinated discharge planning with case management, reducing average length of stay 0.8 days.",
      "Trained 12 staff on updated infection-control procedures during accreditation preparation.",
    ],
    recruiterLook:
      "Nurse recruiters verify the license and certifications before reading anything else — put them in the header or first section with expiry dates. Then unit type, bed count, and ratios to gauge acuity fit. EHR system named exactly (Epic vs Cerner) matters for onboarding cost. Employment gaps need a one-line explanation; unexplained gaps stall clinical files.",
    tips: [
      "List certifications with issuing body and expiry — 'ACLS (AHA, exp 2027)'.",
      "Name the unit and scale: '32-bed med-surg', 'Level II trauma ED'.",
      "Use the posting's terms — 'acute care' vs 'critical care' are different searches.",
    ],
    salaryNote:
      "Nursing pay varies by unit, shift differential, and region; check hospital postings, union scales, or local nursing associations for current figures.",
    template: "ats",
    faq: [
      {
        question: "Should a nurse resume list clinical rotations?",
        answer:
          "For new graduates, yes — unit type, hours, and skills practiced, in an education-adjacent section. After the first year of practice, rotations come off and licensed experience carries the resume.",
      },
      {
        question: "How do I show licensure on a nursing resume?",
        answer:
          "A dedicated 'Licenses & Certifications' block near the top: license type, state/registry, status, and expiry, plus BLS/ACLS and specialty certifications with issuing bodies. Recruiters screen for it; ATS searches match the acronyms.",
      },
      {
        question: "Is a one-page resume enough for an experienced nurse?",
        answer:
          "Usually 1–2 pages: licensure block plus the last 8–10 years of clinical roles with unit detail. Older roles compress to one line. Completeness matters less than acuity fit and clean credentials.",
      },
    ],
  },
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    category: "Marketing",
    status: "published",
    answer:
      "A digital marketing manager resume must prove channel ownership with numbers: budget managed, CAC reduced, ROAS improved, pipeline sourced. Lead with the channels in the posting — paid, SEO, email, lifecycle — name the platforms exactly (Google Ads, GA4, HubSpot), and show team or agency management scope.",
    hardSkills: [
      "Google Ads / Meta Ads",
      "SEO (technical + content)",
      "GA4 / attribution",
      "Email & lifecycle (HubSpot/Klaviyo)",
      "Landing page CRO",
      "Marketing automation",
      "Budget management",
      "Copywriting",
      "A/B testing",
      "Reporting dashboards",
    ],
    softSkills: ["Cross-functional leadership", "Agency management", "Prioritization", "Narrative building"],
    atsKeywords: [
      "digital marketing strategy",
      "demand generation",
      "ROAS",
      "customer acquisition cost",
      "conversion rate optimization",
      "campaign management",
      "marketing funnel",
      "lead generation",
      "brand awareness",
      "performance marketing",
      "content strategy",
      "growth",
    ],
    bullets: [
      "Owned a ₹2.4Cr/yr ($300K) paid budget across Google and Meta; cut blended CAC 27% in two quarters via creative testing and bid restructuring.",
      "Grew organic sessions 3.2x in 12 months with a programmatic SEO content engine and technical fixes.",
      "Rebuilt lifecycle emails in HubSpot; win-back flow alone recovered 8% of churned subscribers.",
      "Launched and scaled a referral program generating 18% of new signups within 6 months.",
      "Managed a 4-person team plus 2 agencies; shipped 30+ campaigns/quarter on a unified calendar.",
      "Built GA4 + Looker attribution reporting adopted as the company's source of truth for channel ROI.",
    ],
    recruiterLook:
      "Marketing leaders screen for scope match: budget size, channels owned, team vs hands-on. Numbers are the credibility filter — a resume without CAC/ROAS/pipeline figures reads junior regardless of titles. Platform names must match the stack in the posting; 'performance marketing' without named tools won't surface in searches.",
    tips: [
      "State budget and team size explicitly — they set the level conversation.",
      "One metric per bullet, channel named, timeframe included.",
      "Tailor channel emphasis per posting: a demand-gen role and a brand role weight the same history differently.",
    ],
    salaryNote:
      "Compensation tracks budget responsibility and channel mix more than title; benchmark with current local postings, Glassdoor, or industry salary reports.",
    template: "modern",
    faq: [
      {
        question: "What metrics belong on a marketing manager resume?",
        answer:
          "The ones tied to money and growth: CAC, ROAS, pipeline or revenue sourced, conversion rate lifts, organic traffic growth, email revenue share. Vanity metrics (impressions, follower counts) only support a story, never lead it.",
      },
      {
        question: "Should I list every marketing tool I've touched?",
        answer:
          "No — list the stack you can run unaided, prioritizing the posting's tools. A 25-logo tool cloud dilutes the signal and reads as keyword stuffing to recruiters who've used them.",
      },
      {
        question: "How do I show SEO results credibly?",
        answer:
          "Baseline → action → result with timeframe: 'grew organic sessions from 40K to 130K/month in 12 months via content + technical fixes'. Percentages without baselines invite discounting.",
      },
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    category: "Operations",
    status: "published",
    answer:
      "A project manager resume proves delivery: projects shipped on time and budget, scope size, team count, and method (Agile, Waterfall, hybrid) matching the posting. Certifications (PMP, CSM, PRINCE2) up top, tools named exactly (Jira, MS Project), and bullets quantifying schedule, budget, and risk outcomes.",
    hardSkills: [
      "Project planning & scheduling",
      "Agile / Scrum",
      "Jira / Confluence",
      "MS Project",
      "Budgeting & forecasting",
      "Risk management",
      "Stakeholder management",
      "Resource allocation",
      "Vendor management",
      "Status reporting",
    ],
    softSkills: ["Facilitation", "Conflict resolution", "Executive communication", "Negotiation"],
    atsKeywords: [
      "project lifecycle",
      "scope management",
      "cross-functional teams",
      "milestones",
      "deliverables",
      "change management",
      "PMO",
      "sprint planning",
      "critical path",
      "budget tracking",
      "RAID log",
      "go-live",
    ],
    bullets: [
      "Delivered a 9-month ERP migration for 600 users 2 weeks early and 6% under its ₹1.8Cr budget.",
      "Ran Agile ceremonies for 3 squads (21 engineers); improved sprint predictability from 60% to 92% committed-vs-done.",
      "Built a RAID process that cut escalated risks reaching steering committee by half.",
      "Coordinated 5 vendors and internal IT through a zero-downtime data-center move over one weekend.",
      "Recovered a red program by re-baselining scope with stakeholders; shipped the revised plan on schedule.",
      "Standardized status reporting across the PMO, cutting weekly reporting effort 10+ hours.",
    ],
    recruiterLook:
      "PM screeners match method and scale first: Agile vs Waterfall, project budget, team size, industry. Certifications act as ATS filters at many companies — PMP spelled out and abbreviated. Then they look for evidence of control: on-time/on-budget percentages, risk saves, recovered projects. Generic 'responsible for end-to-end delivery' lines carry zero signal.",
    tips: [
      "Quantify the triangle: scope (users/modules), schedule (on-time %), cost (budget size, variance).",
      "Write both 'PMP' and 'Project Management Professional' — searches use both.",
      "Mirror the posting's method vocabulary; 'sprint' vs 'phase-gate' flags fit instantly.",
    ],
    salaryNote:
      "Pay scales with program budget and industry; verify ranges on current postings and salary surveys for your market.",
    template: "ats",
    faq: [
      {
        question: "Is PMP worth putting above experience?",
        answer:
          "Put certifications in the header line or a top block when the posting lists them as required — many ATS screens filter on the acronym. Experience still wins the interview; the certification wins the search.",
      },
      {
        question: "How technical should an IT project manager resume be?",
        answer:
          "Enough to prove you can run the room: name the systems, environments, and methodologies you delivered, not implementation detail. Hiring managers want evidence you speak engineer without claiming to be one.",
      },
      {
        question: "How do I show Agile experience without a Scrum Master title?",
        answer:
          "Name the ceremonies and artifacts you ran — sprint planning, retros, backlog grooming, burndown reporting — with team counts and predictability metrics. Practice evidence outranks the title in screening.",
      },
    ],
  },
  {
    slug: "accountant",
    title: "Accountant",
    category: "Finance",
    status: "published",
    answer:
      "An accountant resume leads with qualifications (CPA, CA, B.Com/M.Com), the accounting standards you work under (GAAP, Ind AS, IFRS), and software by name — Tally, QuickBooks, SAP, Excel. Bullets should quantify scope: entities closed, reconciliation volume, audit results, filing accuracy, and process time saved.",
    hardSkills: [
      "General ledger & month-end close",
      "Accounts payable / receivable",
      "Bank & account reconciliations",
      "GAAP / Ind AS",
      "GST & TDS filings (India)",
      "Tally / QuickBooks",
      "SAP / Oracle ERP",
      "Advanced Excel",
      "Financial reporting",
      "Audit support",
    ],
    softSkills: ["Accuracy under deadlines", "Documentation discipline", "Cross-department coordination", "Integrity"],
    atsKeywords: [
      "month-end close",
      "journal entries",
      "balance sheet reconciliation",
      "financial statements",
      "compliance",
      "internal controls",
      "variance analysis",
      "fixed assets",
      "tax filing",
      "accruals",
      "ERP",
      "statutory audit",
    ],
    bullets: [
      "Owned month-end close for 3 entities, cutting close time from 9 to 5 business days through checklist automation.",
      "Reconciled 40+ bank and ledger accounts monthly with zero unresolved items aged past 30 days.",
      "Filed GST and TDS returns for 2 years with a 100% on-time, penalty-free record.",
      "Supported statutory audit to an unqualified opinion; cleared 100% of auditor information requests within SLA.",
      "Automated recurring journal entries in Excel/ERP, eliminating ~12 hours of manual posting per month.",
      "Implemented a fixed-asset register cleanup that corrected depreciation errors across 800+ assets.",
    ],
    recruiterLook:
      "Finance recruiters filter on qualification first (CPA/CA/inter), then standards and systems fit — a Tally shop and a SAP shop screen differently, so name yours exactly. Evidence of clean closes, audit outcomes, and filing accuracy signals safety; accountants are hired to remove risk. Job-hopping needs explaining; controllership tracks reward visible stability.",
    tips: [
      "State the standard explicitly — 'Ind AS' / 'US GAAP' — it's a hard search term.",
      "Quantify volume: entities, accounts reconciled, invoice counts, close days.",
      "'Audit' bullets should name the outcome (unqualified opinion, zero findings).",
    ],
    salaryNote:
      "Compensation depends on qualification stage and company size; check AmbitionBox/Naukri (India) or Robert Half-style salary guides for current local bands.",
    template: "ats",
    faq: [
      {
        question: "Should an accountant resume mention Excel?",
        answer:
          "Yes, with specifics — pivot tables, XLOOKUP, Power Query, macro automation. 'Advanced Excel' alone is unverifiable; naming the techniques you use for reconciliation or reporting makes it concrete and searchable.",
      },
      {
        question: "How do I present CA Inter / CPA-in-progress status?",
        answer:
          "State it precisely: 'CA Inter (both groups cleared), final attempt May 2027'. Ambiguity reads as concealment; a clear timeline reads as trajectory and still matches qualification keyword searches.",
      },
      {
        question: "What matters more — industry or software experience?",
        answer:
          "Software fit screens first because onboarding cost is immediate: ATS searches name Tally, SAP, QuickBooks. Industry depth (manufacturing costing, SaaS revenue recognition) decides between parsed candidates at interview.",
      },
    ],
  },
  {
    slug: "sales-executive",
    title: "Sales Executive",
    category: "Sales",
    status: "published",
    answer:
      "A sales executive resume is a numbers sheet with a story: quota and attainment percentage for every period, deal size, sales cycle, and the motion (inbound, outbound, field) matching the posting. CRM named (Salesforce, HubSpot), industry vertical stated, and President's Club-type proof up top.",
    hardSkills: [
      "Pipeline generation & prospecting",
      "Salesforce / HubSpot CRM",
      "Discovery & qualification (MEDDIC/BANT)",
      "Negotiation & closing",
      "Account management",
      "Cold outreach (call + email)",
      "Forecasting",
      "Territory planning",
      "Demos & presentations",
      "Contract management",
    ],
    softSkills: ["Resilience", "Active listening", "Relationship building", "Coachability"],
    atsKeywords: [
      "quota attainment",
      "revenue growth",
      "B2B sales",
      "lead generation",
      "sales cycle",
      "upsell / cross-sell",
      "key accounts",
      "client relationships",
      "sales targets",
      "CRM hygiene",
      "win rate",
      "average deal size",
    ],
    bullets: [
      "Closed ₹3.2Cr ($400K) in new business against a ₹2.5Cr quota — 128% attainment, #2 of 14 reps.",
      "Generated 60% of pipeline through outbound sequences averaging a 9% meeting-book rate.",
      "Shortened average sales cycle from 62 to 45 days by introducing a mutual-action-plan close process.",
      "Grew 12 key accounts 35% YoY through quarterly business reviews and upsell plays.",
      "Maintained 95%+ CRM hygiene score; forecasts landed within ±8% of actuals four straight quarters.",
      "Won back 7 churned accounts worth ₹48L ARR with a structured re-engagement campaign.",
    ],
    recruiterLook:
      "Sales leaders read attainment first — quota, percentage, stack ranking, streak — and discount any resume without them. Then motion fit: SMB velocity vs enterprise cycles, inbound vs outbound, new logo vs expansion. Vertical familiarity shortens ramp and often decides interviews. 'Exceeded targets' without numbers is treated as a miss.",
    tips: [
      "Every period gets quota + attainment: '128% of ₹2.5Cr FY25'.",
      "State deal size and cycle length — they screen for motion fit.",
      "Rankings and awards (top 10%, President's Club) go in the summary line.",
    ],
    salaryNote:
      "OTE structures vary by motion and industry; benchmark base/variable splits on current postings and sales-comp surveys rather than averages.",
    template: "modern",
    faq: [
      {
        question: "What if I missed quota — what goes on the resume?",
        answer:
          "Lead with periods you hit and contextualize the miss with controllables: pipeline built, win rate, ramp speed, territory inherited. A miss explained by metrics still interviews; hidden gaps surface in reference checks.",
      },
      {
        question: "Do sales resumes need to name the CRM?",
        answer:
          "Yes — Salesforce vs HubSpot vs Zoho is an ATS keyword and an onboarding-cost signal. Add the sales methodology (MEDDIC, SPIN, Challenger) when the posting mentions one; it's screened the same way.",
      },
      {
        question: "How long should a sales resume be?",
        answer:
          "One page for under ten years. Recruiters want the number story fast: role, quota, attainment, deal profile. Long activity descriptions bury the only data that gets you called.",
      },
    ],
  },
  {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    category: "Support",
    status: "published",
    answer:
      "A customer service representative resume should quantify volume and quality together: tickets or calls handled per day, CSAT score, resolution rate, and handle time, plus the helpdesk software by name (Zendesk, Freshdesk). Channel mix (voice, chat, email) and any escalation or training duties signal level.",
    hardSkills: [
      "Zendesk / Freshdesk",
      "Live chat & email support",
      "Voice support",
      "CRM data entry",
      "Troubleshooting & triage",
      "Knowledge-base authoring",
      "SLA management",
      "Order / billing systems",
      "Typing speed (50+ WPM)",
      "Escalation handling",
    ],
    softSkills: ["Patience", "De-escalation", "Clear written communication", "Empathy"],
    atsKeywords: [
      "customer satisfaction (CSAT)",
      "first-call resolution",
      "average handle time",
      "ticket queue",
      "service level agreement",
      "customer retention",
      "complaint resolution",
      "multichannel support",
      "quality assurance score",
      "onboarding support",
      "product knowledge",
      "upselling",
    ],
    bullets: [
      "Resolved 60–80 tickets/day across chat and email while holding a 94% CSAT over 12 months.",
      "Achieved 78% first-contact resolution, 11 points above team average, via deeper product troubleshooting.",
      "Cut average handle time from 9.5 to 7 minutes after building macro templates adopted team-wide.",
      "Authored 25 knowledge-base articles that deflected an estimated 300 tickets/month.",
      "Handled tier-2 escalations for a 15-agent team and trained 6 new hires to full productivity.",
      "Retained 85% of cancellation-intent customers through structured save offers.",
    ],
    recruiterLook:
      "Support managers screen for volume + quality balance — high throughput with low CSAT is churn risk, low volume with high CSAT may not scale. The helpdesk tool matters for ramp time. Stability matters more here than most roles; tenure under a year repeatedly is the red flag. Escalation, QA, or training duties are the promotion signals worth surfacing.",
    tips: [
      "Pair every volume number with a quality number in the same bullet.",
      "Name channels explicitly — 'voice + chat concurrent' is a different job than email-only.",
      "Knowledge-base or training contributions show initiative beyond the queue.",
    ],
    salaryNote:
      "Pay bands track channel complexity and shift coverage; check local postings and staffing-agency guides for current rates.",
    template: "ats",
    faq: [
      {
        question: "What numbers should a customer service resume include?",
        answer:
          "Tickets or calls per day, CSAT or QA score, first-contact resolution rate, and handle time — ideally versus team average. These four cover volume, quality, and efficiency, which is the whole evaluation.",
      },
      {
        question: "How do I move from support to another role via the resume?",
        answer:
          "Surface the bridge work: knowledge-base writing (content), bug triage with engineering (QA/product), onboarding (customer success), save offers (sales). Quantify those slices and tailor toward the target title's keywords.",
      },
      {
        question: "Is remote support experience worth flagging?",
        answer:
          "Yes — note remote tenure, self-managed schedules, and asynchronous communication tools. Remote-first employers screen for proven remote discipline; it removes their biggest hiring doubt.",
      },
    ],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    category: "Operations",
    status: "published",
    answer:
      "A business analyst resume proves you translate between business and build: requirements elicited, processes mapped, and the measurable outcome of what shipped. Name the artifacts (BRDs, user stories, process maps), tools (SQL, Jira, Visio, Excel), and quantify the after-state — cost cut, cycle time reduced, adoption achieved.",
    hardSkills: [
      "Requirements elicitation",
      "BRD / user story writing",
      "Process mapping (BPMN/Visio)",
      "SQL",
      "Excel (advanced)",
      "Jira / Confluence",
      "UAT planning & execution",
      "Gap analysis",
      "Stakeholder workshops",
      "Data analysis & reporting",
    ],
    softSkills: ["Facilitation", "Ambiguity tolerance", "Written precision", "Influence without authority"],
    atsKeywords: [
      "business requirements",
      "functional specifications",
      "process improvement",
      "stakeholder management",
      "user acceptance testing",
      "as-is / to-be analysis",
      "workflow automation",
      "KPI definition",
      "change requests",
      "agile ceremonies",
      "documentation",
      "root cause analysis",
    ],
    bullets: [
      "Elicited and documented requirements for a loan-origination revamp; cut application processing time 40% post-launch.",
      "Wrote 200+ user stories with acceptance criteria across 4 releases; 92% passed UAT first cycle.",
      "Mapped as-is/to-be processes for the order-to-cash cycle, identifying automation that saved ~₹35L/yr in manual effort.",
      "Ran UAT with 25 business users across 3 departments; launch go/no-go delivered with zero critical defects open.",
      "Built SQL-backed adoption dashboards that surfaced a failing module, triggering a fix that lifted usage 60%.",
      "Facilitated weekly stakeholder workshops aligning sales, ops, and engineering on a single prioritized backlog.",
    ],
    recruiterLook:
      "BA screeners look for the bridge evidence: can you get requirements out of vague stakeholders and into artifacts engineers build from? Named deliverables (BRD, user stories, process maps) are the keyword layer; outcome numbers after go-live are the quality layer. Domain (banking, healthcare, e-commerce) often gates the shortlist, so mirror the posting's vertical vocabulary.",
    tips: [
      "Every project bullet ends with the post-launch outcome, not the document produced.",
      "SQL moves you up the shortlist — name it with a use, not just in the skills line.",
      "Mirror the posting's method: 'user stories + sprints' vs 'BRD + phases' are different shops.",
    ],
    salaryNote:
      "Ranges hinge on domain and technical depth; compare current local postings or consult recruiting-firm salary guides.",
    template: "ats",
    faq: [
      {
        question: "Business analyst vs data analyst — which title should I target?",
        answer:
          "Target the work you can evidence: BA resumes center requirements, process, and delivery outcomes; data analyst resumes center SQL, BI tooling, and analysis impact. Many postings blur them — read requirements and tailor keywords per application.",
      },
      {
        question: "Do business analysts need certifications?",
        answer:
          "CBAP/CCBA or Agile certifications help ATS screens at larger enterprises but rarely decide interviews. Three strong project narratives with measurable outcomes outrank a certification list everywhere else.",
      },
      {
        question: "How technical should a BA resume look?",
        answer:
          "Show enough to be credible in the build room: SQL queries you ran, systems you specced against, APIs you documented. Claiming development skills you can't defend backfires; precision about your actual lane lands better.",
      },
    ],
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    status: "published",
    answer:
      "A mechanical engineer resume leads with CAD/CAE tools by exact name (SolidWorks, AutoCAD, ANSYS), domain (design, manufacturing, HVAC, automotive), and standards worked to (GD&T, ASME, ISO). Bullets quantify engineering outcomes — cost per unit cut, cycle time reduced, failures eliminated — and name materials and processes.",
    hardSkills: [
      "SolidWorks / CATIA",
      "AutoCAD",
      "ANSYS / FEA",
      "GD&T",
      "DFM / DFA",
      "Sheet metal & machining processes",
      "Tolerance stack-up analysis",
      "Prototyping & testing",
      "Six Sigma / lean manufacturing",
      "BOM management (PLM)",
    ],
    softSkills: ["Cross-functional coordination", "Vendor communication", "Root-cause discipline", "Documentation"],
    atsKeywords: [
      "mechanical design",
      "product development",
      "design for manufacturability",
      "finite element analysis",
      "engineering change orders",
      "quality control",
      "root cause analysis",
      "CAPA",
      "process optimization",
      "technical drawings",
      "validation testing",
      "cost reduction",
    ],
    bullets: [
      "Redesigned a bracket assembly in SolidWorks with DFM input, cutting unit cost 18% across 50K units/yr.",
      "Ran FEA in ANSYS on a load-bearing frame, eliminating a fatigue failure mode found in field returns.",
      "Released 120+ production drawings to GD&T (ASME Y14.5) with a <2% ECO rework rate.",
      "Led root-cause analysis (5-Why/fishbone) on a recurring line defect; corrective action cut scrap 35%.",
      "Coordinated 6 vendors through tooling trials, compressing prototype-to-production from 9 to 6 months.",
      "Implemented lean fixtures on an assembly cell, lifting throughput 22% without added headcount.",
    ],
    recruiterLook:
      "Engineering recruiters match tools and domain first — a SolidWorks/product-design profile and a plant/manufacturing profile are different searches, so declare yours. Standards (GD&T, ASME, ISO 9001) act as hard filters at many employers. Then they look for the engineering judgment trail: analysis → decision → measured outcome. Project lists without quantified results read academic.",
    tips: [
      "Name tool + version-level proficiency where strong ('SolidWorks — weldments, sheet metal, simulation').",
      "Tie every design bullet to cost, weight, time, or failure-rate movement.",
      "Freshers: lead with projects — objective, your analysis, tools, measured result.",
    ],
    salaryNote:
      "Compensation varies by industry segment (auto, aero, HVAC, consumer) and region; consult current postings and engineering salary surveys.",
    template: "latex",
    faq: [
      {
        question: "Which CAD tools should a mechanical engineer list?",
        answer:
          "The ones in the target posting, honestly graded. Most industry searches run on SolidWorks, CATIA, Creo, or NX — name your primary with depth areas, list secondaries plainly. A tool you can't model in live during an interview shouldn't lead.",
      },
      {
        question: "How do fresh mechanical graduates compete with experienced applicants?",
        answer:
          "Through projects that mimic industry work: a design with analysis (hand calcs or FEA), a manufacturing consideration, and a measured or simulated result. Two such projects with drawings beat a list of coursework and CGPA alone.",
      },
      {
        question: "Is Six Sigma worth adding for design roles?",
        answer:
          "Green Belt helps for manufacturing-adjacent and quality-facing roles where postings name it; pure design roles weight CAD/FEA depth and GD&T fluency higher. Match the posting rather than collecting belts.",
      },
    ],
  },
];

/** Published roles only — the build + sitemap surface. */
export function publishedRoles(): Role[] {
  return roles.filter((r) => r.status === "published");
}

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug && r.status === "published");
}
