/**
 * Programmatic P2 registry - one object per /resume-examples/{job} page.
 *
 * QA GATE: lib/content/validateRole.ts runs against every published role inside
 * generateStaticParams - a role that misses the content thresholds FAILS THE
 * BUILD. That is the anti-thin-content guardrail from the strategy (§8).
 *
 * Scaling path: generate candidate entries with the product's parser/LLM from
 * real job-description corpora → human edits → set status "published" →
 * next build ships them. Launch in batches; watch GSC indexation per batch.
 *
 * NO fabricated stats: salaryNote stays qualitative (no invented numbers).
 * Bullets are example patterns for candidates to adapt - not claims.
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
  /** Qualitative pay/outlook note - NO invented figures. */
  salaryNote: string;
  /** Recommended export/layout deep-link: ATS-safe layout or LaTeX only. */
  template: "ats" | "latex";
  faq: RoleFaq[];
};

export const roles: Role[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    status: "published",
    answer:
      "A strong software engineer resume leads with languages, frameworks, and systems that match the posting, then proves impact with quantified bullets - latency cut, uptime improved, releases shipped. Single column, projects with stack named, and keywords mirroring the job description so it survives ATS screening.",
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
      "Tech recruiters scan the skills line for the posting's stack first - exact names, not category words - then look at the most recent role for scope (what you owned), scale (users, requests, data volume), and outcomes with numbers. GitHub or portfolio links get clicked for borderline candidates. Buzzword lists without evidence are the fastest pass.",
    tips: [
      "Name the stack per project or role - 'built in React/Node on AWS' beats a separate skills dump alone.",
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
          "Yes when they show skills the work history doesn't - a deployed app, an open-source contribution, measurable users. List the stack and an outcome. Skip tutorial clones; they signal padding rather than capability.",
      },
      {
        question: "How long should a software engineer resume be?",
        answer:
          "One page under ten years of experience; two pages for senior/staff scope with multiple systems owned. Recruiters read the top third first - lead with the stack and scale that match the posting.",
      },
      {
        question: "Do FAANG-style companies use ATS screening?",
        answer:
          "Large tech employers parse every application into an ATS and recruiters search it by keywords, so exact technology names matter. Referrals skip queues, not parsing - the resume still gets indexed and searched.",
      },
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Technology",
    status: "published",
    answer:
      "A data analyst resume should prove you turn raw data into decisions: SQL and a BI tool up top, then bullets where analysis changed an outcome - revenue found, churn reduced, hours saved. Mirror the posting's tools exactly (Tableau vs Power BI) and quantify every claim.",
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
      "Hiring managers look for the tool overlap first - SQL is assumed, the BI tool must match theirs - then for evidence you influenced a decision, not just produced charts. 'Built dashboard' is table stakes; 'dashboard that changed X' is the interview trigger. Domain familiarity (SaaS, retail, banking) often breaks ties.",
    tips: [
      "Every bullet needs a number: rows processed, hours saved, metric moved.",
      "Match the BI tool in the posting exactly; list the other one second if you know both.",
      "Link a portfolio or public dashboard if you have one - analysts who show work convert better.",
    ],
    salaryNote:
      "Pay differs sharply by industry and city; consult Glassdoor, AmbitionBox (India), or recruiter salary guides for current local ranges.",
    template: "ats",
    faq: [
      {
        question: "Do data analysts need Python on the resume?",
        answer:
          "Increasingly yes for mid-level roles - pandas for cleaning and automation is the common bar. Entry roles often clear on SQL + Excel + one BI tool. Listing Python you can't interview on backfires; mark proficiency honestly.",
      },
      {
        question: "What's the difference between a data analyst and data scientist resume?",
        answer:
          "Analyst resumes emphasize SQL, BI tooling, and decision impact; data scientist resumes add modeling, ML libraries, and experiment design depth. Applying across both titles means re-tailoring keywords - the postings are screened differently.",
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
      "A registered nurse resume leads with licensure and certifications (RN license state/number ready, BLS/ACLS), unit type and patient ratios, then EHR systems by name. Quantified bullets - patients per shift, audit scores, protocol outcomes - show competence; exact certification acronyms get you through ATS filters.",
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
      "Nurse recruiters verify the license and certifications before reading anything else - put them in the header or first section with expiry dates. Then unit type, bed count, and ratios to gauge acuity fit. EHR system named exactly (Epic vs Cerner) matters for onboarding cost. Employment gaps need a one-line explanation; unexplained gaps stall clinical files.",
    tips: [
      "List certifications with issuing body and expiry - 'ACLS (AHA, exp 2027)'.",
      "Name the unit and scale: '32-bed med-surg', 'Level II trauma ED'.",
      "Use the posting's terms - 'acute care' vs 'critical care' are different searches.",
    ],
    salaryNote:
      "Nursing pay varies by unit, shift differential, and region; check hospital postings, union scales, or local nursing associations for current figures.",
    template: "ats",
    faq: [
      {
        question: "Should a nurse resume list clinical rotations?",
        answer:
          "For new graduates, yes - unit type, hours, and skills practiced, in an education-adjacent section. After the first year of practice, rotations come off and licensed experience carries the resume.",
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
      "A digital marketing manager resume must prove channel ownership with numbers: budget managed, CAC reduced, ROAS improved, pipeline sourced. Lead with the channels in the posting - paid, SEO, email, lifecycle - name the platforms exactly (Google Ads, GA4, HubSpot), and show team or agency management scope.",
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
      "Marketing leaders screen for scope match: budget size, channels owned, team vs hands-on. Numbers are the credibility filter - a resume without CAC/ROAS/pipeline figures reads junior regardless of titles. Platform names must match the stack in the posting; 'performance marketing' without named tools won't surface in searches.",
    tips: [
      "State budget and team size explicitly - they set the level conversation.",
      "One metric per bullet, channel named, timeframe included.",
      "Tailor channel emphasis per posting: a demand-gen role and a brand role weight the same history differently.",
    ],
    salaryNote:
      "Compensation tracks budget responsibility and channel mix more than title; benchmark with current local postings, Glassdoor, or industry salary reports.",
    template: "ats",
    faq: [
      {
        question: "What metrics belong on a marketing manager resume?",
        answer:
          "The ones tied to money and growth: CAC, ROAS, pipeline or revenue sourced, conversion rate lifts, organic traffic growth, email revenue share. Vanity metrics (impressions, follower counts) only support a story, never lead it.",
      },
      {
        question: "Should I list every marketing tool I've touched?",
        answer:
          "No - list the stack you can run unaided, prioritizing the posting's tools. A 25-logo tool cloud dilutes the signal and reads as keyword stuffing to recruiters who've used them.",
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
      "PM screeners match method and scale first: Agile vs Waterfall, project budget, team size, industry. Certifications act as ATS filters at many companies - PMP spelled out and abbreviated. Then they look for evidence of control: on-time/on-budget percentages, risk saves, recovered projects. Generic 'responsible for end-to-end delivery' lines carry zero signal.",
    tips: [
      "Quantify the triangle: scope (users/modules), schedule (on-time %), cost (budget size, variance).",
      "Write both 'PMP' and 'Project Management Professional' - searches use both.",
      "Mirror the posting's method vocabulary; 'sprint' vs 'phase-gate' flags fit instantly.",
    ],
    salaryNote:
      "Pay scales with program budget and industry; verify ranges on current postings and salary surveys for your market.",
    template: "ats",
    faq: [
      {
        question: "Is PMP worth putting above experience?",
        answer:
          "Put certifications in the header line or a top block when the posting lists them as required - many ATS screens filter on the acronym. Experience still wins the interview; the certification wins the search.",
      },
      {
        question: "How technical should an IT project manager resume be?",
        answer:
          "Enough to prove you can run the room: name the systems, environments, and methodologies you delivered, not implementation detail. Hiring managers want evidence you speak engineer without claiming to be one.",
      },
      {
        question: "How do I show Agile experience without a Scrum Master title?",
        answer:
          "Name the ceremonies and artifacts you ran - sprint planning, retros, backlog grooming, burndown reporting - with team counts and predictability metrics. Practice evidence outranks the title in screening.",
      },
    ],
  },
  {
    slug: "accountant",
    title: "Accountant",
    category: "Finance",
    status: "published",
    answer:
      "An accountant resume leads with qualifications (CPA, CA, B.Com/M.Com), the accounting standards you work under (GAAP, Ind AS, IFRS), and software by name - Tally, QuickBooks, SAP, Excel. Bullets should quantify scope: entities closed, reconciliation volume, audit results, filing accuracy, and process time saved.",
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
      "Finance recruiters filter on qualification first (CPA/CA/inter), then standards and systems fit - a Tally shop and a SAP shop screen differently, so name yours exactly. Evidence of clean closes, audit outcomes, and filing accuracy signals safety; accountants are hired to remove risk. Job-hopping needs explaining; controllership tracks reward visible stability.",
    tips: [
      "State the standard explicitly - 'Ind AS' / 'US GAAP' - it's a hard search term.",
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
          "Yes, with specifics - pivot tables, XLOOKUP, Power Query, macro automation. 'Advanced Excel' alone is unverifiable; naming the techniques you use for reconciliation or reporting makes it concrete and searchable.",
      },
      {
        question: "How do I present CA Inter / CPA-in-progress status?",
        answer:
          "State it precisely: 'CA Inter (both groups cleared), final attempt May 2027'. Ambiguity reads as concealment; a clear timeline reads as trajectory and still matches qualification keyword searches.",
      },
      {
        question: "What matters more - industry or software experience?",
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
      "Closed ₹3.2Cr ($400K) in new business against a ₹2.5Cr quota - 128% attainment, #2 of 14 reps.",
      "Generated 60% of pipeline through outbound sequences averaging a 9% meeting-book rate.",
      "Shortened average sales cycle from 62 to 45 days by introducing a mutual-action-plan close process.",
      "Grew 12 key accounts 35% YoY through quarterly business reviews and upsell plays.",
      "Maintained 95%+ CRM hygiene score; forecasts landed within ±8% of actuals four straight quarters.",
      "Won back 7 churned accounts worth ₹48L ARR with a structured re-engagement campaign.",
    ],
    recruiterLook:
      "Sales leaders read attainment first - quota, percentage, stack ranking, streak - and discount any resume without them. Then motion fit: SMB velocity vs enterprise cycles, inbound vs outbound, new logo vs expansion. Vertical familiarity shortens ramp and often decides interviews. 'Exceeded targets' without numbers is treated as a miss.",
    tips: [
      "Every period gets quota + attainment: '128% of ₹2.5Cr FY25'.",
      "State deal size and cycle length - they screen for motion fit.",
      "Rankings and awards (top 10%, President's Club) go in the summary line.",
    ],
    salaryNote:
      "OTE structures vary by motion and industry; benchmark base/variable splits on current postings and sales-comp surveys rather than averages.",
    template: "ats",
    faq: [
      {
        question: "What if I missed quota - what goes on the resume?",
        answer:
          "Lead with periods you hit and contextualize the miss with controllables: pipeline built, win rate, ramp speed, territory inherited. A miss explained by metrics still interviews; hidden gaps surface in reference checks.",
      },
      {
        question: "Do sales resumes need to name the CRM?",
        answer:
          "Yes - Salesforce vs HubSpot vs Zoho is an ATS keyword and an onboarding-cost signal. Add the sales methodology (MEDDIC, SPIN, Challenger) when the posting mentions one; it's screened the same way.",
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
      "Support managers screen for volume + quality balance - high throughput with low CSAT is churn risk, low volume with high CSAT may not scale. The helpdesk tool matters for ramp time. Stability matters more here than most roles; tenure under a year repeatedly is the red flag. Escalation, QA, or training duties are the promotion signals worth surfacing.",
    tips: [
      "Pair every volume number with a quality number in the same bullet.",
      "Name channels explicitly - 'voice + chat concurrent' is a different job than email-only.",
      "Knowledge-base or training contributions show initiative beyond the queue.",
    ],
    salaryNote:
      "Pay bands track channel complexity and shift coverage; check local postings and staffing-agency guides for current rates.",
    template: "ats",
    faq: [
      {
        question: "What numbers should a customer service resume include?",
        answer:
          "Tickets or calls per day, CSAT or QA score, first-contact resolution rate, and handle time - ideally versus team average. These four cover volume, quality, and efficiency, which is the whole evaluation.",
      },
      {
        question: "How do I move from support to another role via the resume?",
        answer:
          "Surface the bridge work: knowledge-base writing (content), bug triage with engineering (QA/product), onboarding (customer success), save offers (sales). Quantify those slices and tailor toward the target title's keywords.",
      },
      {
        question: "Is remote support experience worth flagging?",
        answer:
          "Yes - note remote tenure, self-managed schedules, and asynchronous communication tools. Remote-first employers screen for proven remote discipline; it removes their biggest hiring doubt.",
      },
    ],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    category: "Operations",
    status: "published",
    answer:
      "A business analyst resume proves you translate between business and build: requirements elicited, processes mapped, and the measurable outcome of what shipped. Name the artifacts (BRDs, user stories, process maps), tools (SQL, Jira, Visio, Excel), and quantify the after-state - cost cut, cycle time reduced, adoption achieved.",
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
      "SQL moves you up the shortlist - name it with a use, not just in the skills line.",
      "Mirror the posting's method: 'user stories + sprints' vs 'BRD + phases' are different shops.",
    ],
    salaryNote:
      "Ranges hinge on domain and technical depth; compare current local postings or consult recruiting-firm salary guides.",
    template: "ats",
    faq: [
      {
        question: "Business analyst vs data analyst - which title should I target?",
        answer:
          "Target the work you can evidence: BA resumes center requirements, process, and delivery outcomes; data analyst resumes center SQL, BI tooling, and analysis impact. Many postings blur them - read requirements and tailor keywords per application.",
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
      "A mechanical engineer resume leads with CAD/CAE tools by exact name (SolidWorks, AutoCAD, ANSYS), domain (design, manufacturing, HVAC, automotive), and standards worked to (GD&T, ASME, ISO). Bullets quantify engineering outcomes - cost per unit cut, cycle time reduced, failures eliminated - and name materials and processes.",
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
      "Engineering recruiters match tools and domain first - a SolidWorks/product-design profile and a plant/manufacturing profile are different searches, so declare yours. Standards (GD&T, ASME, ISO 9001) act as hard filters at many employers. Then they look for the engineering judgment trail: analysis → decision → measured outcome. Project lists without quantified results read academic.",
    tips: [
      "Name tool + version-level proficiency where strong ('SolidWorks - weldments, sheet metal, simulation').",
      "Tie every design bullet to cost, weight, time, or failure-rate movement.",
      "Freshers: lead with projects - objective, your analysis, tools, measured result.",
    ],
    salaryNote:
      "Compensation varies by industry segment (auto, aero, HVAC, consumer) and region; consult current postings and engineering salary surveys.",
    template: "latex",
    faq: [
      {
        question: "Which CAD tools should a mechanical engineer list?",
        answer:
          "The ones in the target posting, honestly graded. Most industry searches run on SolidWorks, CATIA, Creo, or NX - name your primary with depth areas, list secondaries plainly. A tool you can't model in live during an interview shouldn't lead.",
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
  {
    slug: "product-manager",
    title: "Product Manager",
    category: "Product",
    status: "published",
    answer:
      "A product manager resume leads with outcomes owned - revenue moved, adoption lifted, launches shipped - then the methods that produced them: discovery, roadmaps, metrics, and stakeholder alignment. Mirror the posting's domain and stack language so ATS keyword searches surface you before a human ever opens the file.",
    hardSkills: [
      "Product discovery & user research",
      "Roadmapping & prioritization",
      "Metrics / OKRs / North Star",
      "A/B testing & experimentation",
      "SQL (basic–intermediate)",
      "Wireframing / Figma collaboration",
      "Agile / Scrum delivery",
      "Go-to-market planning",
      "Competitive analysis",
      "PRD / user story writing",
    ],
    softSkills: ["Stakeholder influence", "Ambiguity tolerance", "Customer empathy", "Executive communication"],
    atsKeywords: [
      "product strategy",
      "roadmap ownership",
      "user research",
      "MVP",
      "product-market fit",
      "cross-functional leadership",
      "feature prioritization",
      "OKRs",
      "customer interviews",
      "growth metrics",
      "backlog management",
      "product lifecycle",
    ],
    bullets: [
      "Shipped a self-serve onboarding flow that lifted activation 18% and cut support tickets 22% in two quarters.",
      "Owned roadmap for a B2B billing module generating $2.1M ARR within 12 months of GA.",
      "Ran 40+ discovery interviews and 6 A/B tests that killed 3 roadmap bets before engineering spend.",
      "Defined North Star and 8 supporting OKRs; aligned eng, design, and GTM on a single weekly scorecard.",
      "Cut average cycle time from idea to production from 14 to 7 weeks via tighter PRD and sprint rituals.",
      "Partnered with sales on a competitive battlecard used in 90% of enterprise deals that quarter.",
      "Launched pricing tier experiments that improved free-to-paid conversion 11 points without raising churn.",
    ],
    recruiterLook:
      "PM recruiters scan for ownership scope first - what you decided, not what you facilitated - then for metrics that moved under your watch. Domain fit (SaaS, marketplace, consumer) and evidence of discovery discipline separate strong candidates from feature-factory resumes. Tool lists alone rarely get interviews; outcomes plus a crisp product narrative do.",
    tips: [
      "Lead each role with one flagship outcome (metric + timeframe), then supporting discovery or delivery bullets.",
      "Match the posting's vocabulary: 'growth', 'platform', or '0-to-1' signal different searches.",
      "Skip empty soft-skill adjectives; show influence through a stakeholder or launch story with numbers.",
    ],
    salaryNote:
      "PM pay bands vary sharply by company stage, market, and IC vs lead scope; check levels.fyi, Levels, and recent offer data for your city before negotiating.",
    template: "ats",
    faq: [
      {
        question: "Should product managers list technical skills on a resume?",
        answer:
          "Yes when the posting expects them - SQL, basic APIs, or analytics tools - and you can discuss them in interview. Frame technical fluency as collaboration depth with engineering, not as claiming to be an engineer.",
      },
      {
        question: "How long should a product manager resume be?",
        answer:
          "One page for under ~8 years; two pages when you have multiple product lines or leadership scope. Recruiters read the top third first - put the strongest outcome and domain match there.",
      },
      {
        question: "Do associate PM resumes need shipped products?",
        answer:
          "Shipped work helps, but strong APM resumes can lead with internships, side projects, case competitions, or internal tools with clear metrics and your decision role. Show judgment, not just task completion.",
      },
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "Technology",
    status: "published",
    answer:
      "A frontend developer resume leads with the UI stack the posting names - React, TypeScript, Next.js - then proves craft with performance, accessibility, and shipped product outcomes. Quantify load-time wins, conversion lifts, and component systems adopted so both ATS keyword matches and hiring managers see production impact.",
    hardSkills: [
      "React",
      "TypeScript",
      "Next.js / App Router",
      "HTML5 / CSS3 / Tailwind",
      "State management (Redux / Zustand)",
      "REST / GraphQL clients",
      "Jest / React Testing Library",
      "Web performance (Lighthouse / Core Web Vitals)",
      "Accessibility (WCAG / a11y)",
      "Git / CI for frontend",
      "Design system / Storybook",
      "Responsive & cross-browser UI",
    ],
    softSkills: ["Design collaboration", "Code review clarity", "Product sense", "Estimation"],
    atsKeywords: [
      "frontend development",
      "single-page application",
      "component library",
      "responsive design",
      "Core Web Vitals",
      "client-side rendering",
      "server-side rendering",
      "UI engineering",
      "cross-browser compatibility",
      "unit testing",
      "design systems",
      "JavaScript frameworks",
    ],
    bullets: [
      "Rebuilt checkout UI in React/TypeScript; LCP improved 41% and mobile conversion rose 9%.",
      "Authored a shared component library in Storybook adopted by 5 product teams, cutting duplicate UI work ~30%.",
      "Raised a11y audit score from 62 to 94 (WCAG 2.1 AA) across the marketing and app shells.",
      "Migrated a CRA app to Next.js App Router, cutting TTFB 35% and simplifying SEO meta handling.",
      "Wrote RTL/Jest coverage for critical flows from 28% to 82%, blocking two regressions in CI before release.",
      "Partnered with design on a Figma-to-token pipeline that kept spacing/color drift under control across 120+ screens.",
      "Reduced bundle size 27% via route-based code splitting and tree-shaking unused icon packs.",
    ],
    recruiterLook:
      "Frontend recruiters match the framework and language line first - React vs Vue vs Angular is often a hard filter - then look for production evidence: performance numbers, design-system ownership, testing habits, and collaboration with design. Portfolio or live links help for mid-level roles. Buzzword stacks without shipped outcomes get skipped fast.",
    tips: [
      "Name exact libraries from the posting in skills and in project bullets, not only in a dump list.",
      "Include at least one performance or a11y metric; frontend craft is judged on user-visible quality.",
      "Link a GitHub or deployed demo when public work strengthens the story - especially for juniors.",
    ],
    salaryNote:
      "Frontend compensation tracks market, remote vs onsite, and React/TypeScript depth; use levels.fyi and local salary surveys for current bands.",
    template: "latex",
    faq: [
      {
        question: "Should frontend resumes include backend experience?",
        answer:
          "List fullstack exposure when the posting asks for it - Next.js API routes, Node basics - but lead with UI depth. Overclaiming backend ownership you cannot defend in a system-design round hurts more than it helps.",
      },
      {
        question: "How important is a portfolio for frontend developers?",
        answer:
          "Very for junior and mid roles: one or two polished, accessible apps with real constraints beat ten tutorial clones. Senior candidates can lean more on production outcomes if public demos are restricted.",
      },
      {
        question: "Do I list CSS frameworks separately from CSS?",
        answer:
          "Yes when the posting names Tailwind, styled-components, or CSS Modules - ATS searches use those exact strings. Still show you understand layout, responsive behavior, and cascade fundamentals underneath the framework.",
      },
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    category: "Technology",
    status: "published",
    answer:
      "A backend developer resume leads with languages, data stores, and services that match the job - APIs, queues, databases, cloud - then proves reliability with latency, throughput, and uptime outcomes. Mirror posting keywords for frameworks and infrastructure so ATS ranking and recruiter searches both land on your profile.",
    hardSkills: [
      "Python / Go / Node.js (primary language)",
      "REST & GraphQL API design",
      "PostgreSQL / MySQL",
      "Redis caching",
      "Message queues (Kafka / SQS / RabbitMQ)",
      "Docker & container orchestration",
      "AWS / GCP / Azure services",
      "Authentication & authorization (OAuth / JWT)",
      "Observability (metrics, logs, tracing)",
      "Unit & integration testing",
      "CI/CD for services",
      "Database schema & query optimization",
    ],
    softSkills: ["On-call ownership", "API documentation", "Cross-team debugging", "Technical writing"],
    atsKeywords: [
      "backend development",
      "microservices",
      "API gateway",
      "distributed systems",
      "database optimization",
      "scalability",
      "horizontal scaling",
      "event-driven architecture",
      "service reliability",
      "production support",
      "data modeling",
      "cloud infrastructure",
    ],
    bullets: [
      "Designed a GraphQL gateway over 4 microservices handling 1.2M requests/day at p99 <180ms.",
      "Cut payment webhook failures 60% by adding idempotency keys, retries, and dead-letter queues.",
      "Optimized hot PostgreSQL queries and indexes, reducing report generation from 90s to 4s.",
      "Migrated batch jobs to Kafka consumers, absorbing 3× peak traffic without page timeouts.",
      "Introduced OpenTelemetry tracing across 8 services; MTTR for Sev-2 incidents dropped from 95 to 35 minutes.",
      "Hardened auth with short-lived JWTs and scoped refresh tokens, closing two findings from a pen test.",
      "Owned on-call for the billing cluster; documented runbooks that cut after-hours pages 40%.",
    ],
    recruiterLook:
      "Backend recruiters filter on primary language and datastore first, then on evidence you operated systems in production - scale numbers, reliability work, and clear ownership. API design taste and data modeling show up in how you write bullets. Pure framework lists without throughput, latency, or incident outcomes rarely progress past the first screen.",
    tips: [
      "State scale explicitly: RPS, data volume, SLA, or team size consuming your APIs.",
      "Match cloud and queue names from the posting; synonyms often miss ATS keyword searches.",
      "Mention testing and observability - production-minded backends interview differently than CRUD-only resumes.",
    ],
    salaryNote:
      "Backend pay varies by language ecosystem, on-call expectations, and company stage; consult levels.fyi and current market reports for your region.",
    template: "latex",
    faq: [
      {
        question: "Should backend developers list frontend skills?",
        answer:
          "Include light fullstack notes when the role is full-stack or the posting mentions admin UIs. Keep the lead story on APIs, data, and reliability unless you are targeting a true hybrid role.",
      },
      {
        question: "How do I show system design experience on a resume?",
        answer:
          "Describe a system you owned: components, tradeoffs, and a measured result (latency, cost, or failure rate). Diagrams belong in interviews; the resume needs the decision and outcome in one tight bullet.",
      },
      {
        question: "Is DevOps experience expected on backend resumes?",
        answer:
          "Many mid-level postings expect Docker, CI, and basic cloud. Dedicated SRE depth is optional unless the title is platform-heavy. Mirror what the posting emphasizes rather than padding every infra buzzword.",
      },
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    category: "Technology",
    status: "published",
    answer:
      "A DevOps engineer resume leads with cloud, IaC, and CI/CD tools named exactly as in the posting, then proves impact with deploy frequency, MTTR, cost, and reliability metrics. Show you automate delivery and operations - not that you only click consoles - so ATS keyword filters and platform hiring managers both advance you.",
    hardSkills: [
      "AWS / GCP / Azure",
      "Terraform / CloudFormation",
      "Kubernetes / EKS / GKE",
      "Docker",
      "CI/CD (GitHub Actions / GitLab CI / Jenkins)",
      "Linux administration",
      "Observability (Prometheus / Grafana / Datadog)",
      "Networking & load balancing",
      "IAM & secrets management",
      "Scripting (Bash / Python)",
      "GitOps (Argo CD / Flux)",
      "Cost optimization & autoscaling",
    ],
    softSkills: ["Incident communication", "Developer enablement", "Runbook discipline", "Change management"],
    atsKeywords: [
      "infrastructure as code",
      "continuous integration",
      "continuous delivery",
      "container orchestration",
      "site reliability",
      "deployment automation",
      "cloud migration",
      "monitoring and alerting",
      "configuration management",
      "platform engineering",
      "release management",
      "disaster recovery",
    ],
    bullets: [
      "Rebuilt CI/CD in GitHub Actions + Terraform, cutting median deploy time from 45 to 8 minutes.",
      "Migrated 30 services to Kubernetes with HPA; absorbed Black Friday 4× traffic with zero Sev-1s.",
      "Implemented Prometheus/Grafana SLOs and paging; MTTR for production incidents fell 48%.",
      "Codified IAM least-privilege policies and Vault secrets rotation, closing 11 audit findings.",
      "Reduced AWS monthly spend 27% via rightsizing, reserved capacity, and idle resource cleanup.",
      "Introduced GitOps (Argo CD) for staging/prod, eliminating config drift across 4 environments.",
      "Wrote runbooks and game-day drills that cut after-hours pages 35% over two quarters.",
    ],
    recruiterLook:
      "DevOps and platform recruiters match cloud + IaC + orchestration first - those strings are hard ATS filters - then look for reliability and developer-experience outcomes. 'Managed Jenkins' without deploy frequency or incident metrics reads junior. Ownership of production systems, cost, and security posture separates strong profiles from ticket-taker resumes.",
    tips: [
      "Lead with the exact toolchain in the posting (EKS vs GKE, Terraform vs Pulumi).",
      "Quantify delivery and reliability: deploy frequency, lead time, MTTR, change failure rate.",
      "Security and cost bullets help at mid-senior levels where platform ownership expands.",
    ],
    salaryNote:
      "DevOps compensation tracks cloud depth, on-call load, and whether the role leans SRE vs platform; check current market surveys for your region and level.",
    template: "latex",
    faq: [
      {
        question: "Is DevOps the same as SRE on a resume?",
        answer:
          "Overlap is large, but SRE resumes emphasize SLOs, error budgets, and reliability engineering more heavily. Mirror the job title and language in the posting rather than forcing a rebrand of your experience.",
      },
      {
        question: "Should DevOps engineers list programming languages?",
        answer:
          "Yes - Python, Go, or TypeScript for automation and operators is expected at many mid-level roles. Frame language skill as enabling infrastructure automation, not as claiming to be an application backend lead.",
      },
      {
        question: "How do juniors break into DevOps without production ownership?",
        answer:
          "Show labs that resemble the job: Terraform modules, a CI pipeline, a monitored Kubernetes demo, and a write-up of failure modes you tested. Homelab depth with clear outcomes beats certification lists alone.",
      },
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    status: "published",
    answer:
      "A data scientist resume leads with modeling stack and problem type - classification, forecasting, NLP, experimentation - then proves business impact with metrics moved, not just model accuracy. Mirror the posting's libraries and domain so ATS searches and hiring managers both see a decision-science profile, not a coursework dump.",
    hardSkills: [
      "Python (pandas, scikit-learn)",
      "SQL",
      "Machine learning (supervised / unsupervised)",
      "Experiment design & A/B testing",
      "Feature engineering",
      "Model evaluation & monitoring",
      "Deep learning (PyTorch / TensorFlow) - as relevant",
      "Statistics & causal inference basics",
      "Data visualization (Matplotlib / Tableau)",
      "MLOps / model deployment familiarity",
      "Spark / large-scale data processing",
      "Jupyter / reproducible analysis",
    ],
    softSkills: ["Problem framing", "Stakeholder storytelling", "Scientific skepticism", "Cross-team partnership"],
    atsKeywords: [
      "predictive modeling",
      "machine learning models",
      "feature selection",
      "model deployment",
      "statistical analysis",
      "experimental design",
      "natural language processing",
      "recommendation systems",
      "data pipelines",
      "business impact",
      "classification",
      "regression analysis",
    ],
    bullets: [
      "Built a churn model (XGBoost) deployed to CRM; targeted outreach cut voluntary churn 9% in two quarters.",
      "Designed and analyzed 12 product A/B tests; winning variants lifted activation 7 points cumulative.",
      "Shipped a demand-forecast pipeline reducing stockouts 18% for top 200 SKUs.",
      "Productionized a ranking model for search; NDCG@10 improved 0.06 and click-through rose 5%.",
      "Cut feature computation cost 40% by consolidating Spark jobs and pruning unused features.",
      "Partnered with engineering on model monitoring (drift + performance), catching a silent degradation in week one.",
      "Translated executive questions into measurable metrics and delivered decision memos used in quarterly planning.",
    ],
    recruiterLook:
      "Data science recruiters look for problem type fit and production reality - models that shipped and moved a business metric beat Kaggle scores alone. Tool overlap (Python, SQL, specific ML libraries) is the ATS gate; domain familiarity and experiment literacy often decide the interview. Vague 'built ML models' bullets without outcomes get filtered early.",
    tips: [
      "Pair every model bullet with a business or product metric, not only AUC or RMSE.",
      "Match ML framework names in the posting; list secondary tools after your primary stack.",
      "Separate analysis-only internships from production ML clearly so scope is honest.",
    ],
    salaryNote:
      "Data scientist pay varies by industry (tech, finance, healthcare), research vs applied track, and location; use current market reports rather than outdated averages.",
    template: "latex",
    faq: [
      {
        question: "Should data scientists include Kaggle or coursework projects?",
        answer:
          "Yes for early career when production experience is thin - pick projects with a clear business question, clean methodology, and a stated recommendation. Skip leaderboard screenshots without narrative.",
      },
      {
        question: "How is a data scientist resume different from a data analyst's?",
        answer:
          "Scientist resumes emphasize modeling, experimentation depth, and ML tooling; analyst resumes emphasize SQL, BI, and decision support. Tailor keywords per posting - the ATS screens are not interchangeable.",
      },
      {
        question: "Do I need MLOps on a data scientist resume?",
        answer:
          "Helpful when postings mention deployment, monitoring, or feature stores. Collaboration with ML engineers on serving counts; claiming full platform ownership you cannot discuss is risky.",
      },
    ],
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    category: "Design",
    status: "published",
    answer:
      "A UX designer resume leads with research-to-ship outcomes - usability findings acted on, conversion or task-success lifts, design systems adopted - then names tools and methods the posting expects. Portfolio links matter, but ATS still needs plain-text skills and keywords that match the job description's language.",
    hardSkills: [
      "User research (interviews, usability tests)",
      "Wireframing & prototyping (Figma)",
      "Interaction design",
      "Information architecture",
      "Design systems / component libraries",
      "Journey mapping & personas",
      "Accessibility (WCAG) in design",
      "Usability metrics & heuristics",
      "A/B test collaboration with product",
      "FigJam / Miro facilitation",
      "Responsive & mobile UX",
      "Design critique & documentation",
    ],
    softSkills: ["Facilitation", "Stakeholder storytelling", "Empathy with users", "Constructive critique"],
    atsKeywords: [
      "user experience design",
      "user research",
      "usability testing",
      "interaction design",
      "information architecture",
      "prototyping",
      "design thinking",
      "customer journey",
      "wireframes",
      "design system",
      "product design",
      "accessibility",
    ],
    bullets: [
      "Led usability tests (n=18) that uncovered checkout friction; redesign lifted completion 14%.",
      "Owned IA and flows for a B2B admin console used by 8K weekly active admins.",
      "Built Figma component library aligned to engineering tokens; reduced UI inconsistency tickets 45%.",
      "Mapped end-to-end onboarding journeys; cut time-to-first-value from 12 to 6 minutes in prototype tests.",
      "Partnered with PM on three A/B tests; winning variants improved activation 8 points combined.",
      "Ran accessibility reviews against WCAG 2.1 AA before handoff, preventing late engineering rework.",
      "Facilitated discovery workshops with sales and CS that reframed roadmap priorities around top support themes.",
    ],
    recruiterLook:
      "UX recruiters open the portfolio first when linked, but ATS and recruiter keyword search still need a parseable resume with methods and tools spelled out. They scan for research rigor, shipped product collaboration, and measurable UX outcomes - not tool logos alone. Case studies that show problem, process, and result convert better than mood-board galleries.",
    tips: [
      "Put a portfolio URL near the top in plain text; many ATS strip fancy icon links.",
      "Name methods from the posting (usability testing, design systems, research ops) in skills and bullets.",
      "Quantify when you can: task success, time-on-task, conversion, support volume, or adoption.",
    ],
    salaryNote:
      "UX compensation varies by product vs agency track, IC vs lead, and market; check design salary surveys and recent offers in your city.",
    template: "ats",
    faq: [
      {
        question: "Should UX designers use a visual resume?",
        answer:
          "Keep the application file ATS-safe - single column, standard headings - and put visual craft in the portfolio. Heavily designed PDF resumes often parse poorly and never reach the hiring manager.",
      },
      {
        question: "How many case studies should a UX resume mention?",
        answer:
          "Two or three strong cases with outcomes beat a long list of screens. On the resume, one line per case with problem and metric is enough; depth lives in the portfolio.",
      },
      {
        question: "Is UI design experience required on a UX resume?",
        answer:
          "Many product roles expect Figma UI proficiency alongside research. Pure research roles weigh methods and insights heavier - mirror the posting's balance rather than forcing a generalist label.",
      },
    ],
  },
  {
    slug: "human-resources-manager",
    title: "Human Resources Manager",
    category: "People Operations",
    status: "published",
    answer:
      "An HR manager resume leads with people outcomes - retention, time-to-hire, compliance, engagement - and the programs you owned across recruiting, employee relations, and HR operations. Mirror the posting's HRIS and employment-law language so ATS keyword screens surface you for the right people-leadership searches.",
    hardSkills: [
      "Full-cycle recruiting oversight",
      "Employee relations & investigations",
      "Performance management cycles",
      "HRIS administration (Workday / BambooHR / similar)",
      "Compensation & benefits coordination",
      "Policy design & handbook updates",
      "Onboarding / offboarding programs",
      "Labor law compliance awareness",
      "Workforce planning",
      "HR analytics & people metrics",
      "Manager coaching",
      "Conflict resolution",
    ],
    softSkills: ["Confidentiality", "Executive partnership", "Empathetic communication", "Change leadership"],
    atsKeywords: [
      "talent acquisition",
      "employee engagement",
      "performance management",
      "HRIS",
      "workforce planning",
      "employee relations",
      "retention strategies",
      "organizational development",
      "compensation benchmarking",
      "compliance",
      "onboarding",
      "people operations",
    ],
    bullets: [
      "Cut average time-to-fill from 52 to 34 days by rebuilding intake and interview-loop SLAs.",
      "Launched a stay-interview program that correlated with an 8-point drop in regrettable attrition.",
      "Owned annual performance cycle for 220 employees; trained 35 managers on calibration fairness.",
      "Implemented BambooHR workflows for PTO and onboarding, reducing HR ops tickets 30%.",
      "Partnered with legal on handbook refresh covering hybrid work and harassment policy updates.",
      "Designed leveling and compensation bands for three functions using market survey data.",
      "Coached managers through 12 complex ER cases with zero external complaints escalated.",
    ],
    recruiterLook:
      "People-ops recruiters look for scope (headcount supported, geographies, union vs non-union) and proof of programs that moved retention, hiring speed, or risk. HRIS names and compliance language are common ATS filters. Soft claims of being a 'people person' without metrics or program ownership rarely advance past screening.",
    tips: [
      "State headcount, locations, and whether you were generalist or specialist at each role.",
      "Quantify hiring, retention, engagement, or process cycle-time improvements.",
      "Name the HRIS and compliance contexts from the posting exactly when true of your experience.",
    ],
    salaryNote:
      "HR manager pay depends on company size, industry risk profile, and whether the role includes ER or total rewards; use local HR salary surveys for negotiation ranges.",
    template: "ats",
    faq: [
      {
        question: "Should HR resumes include recruiting metrics?",
        answer:
          "Yes when you owned or heavily influenced hiring - time-to-fill, offer-accept rate, diversity of slate. Pure ER or HRBP roles can lead with retention, engagement, and manager enablement metrics instead.",
      },
      {
        question: "How confidential should ER work appear on a resume?",
        answer:
          "Describe scope and outcomes at a high level - case volume, training delivered, policy changes - without naming individuals or sensitive details. Interviewers can dig into method without compromising privacy.",
      },
      {
        question: "Do certifications like SHRM-CP help ATS screening?",
        answer:
          "When the posting lists them, put the credential near the top. They help keyword match and credibility but do not replace evidence of programs you ran and metrics you moved.",
      },
    ],
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    status: "published",
    answer:
      "A financial analyst resume leads with modeling, forecasting, and decision support - Excel/financial models, variance analysis, and tools named in the posting - then proves impact with decisions informed, accuracy improved, or cycle time cut. Exact tool and domain keywords help you clear ATS filters in competitive finance searches.",
    hardSkills: [
      "Financial modeling & forecasting",
      "Excel (advanced: Power Query, Pivot)",
      "Variance & management reporting",
      "Budgeting & FP&A support",
      "SQL (preferred / as required)",
      "Power BI / Tableau",
      "Three-statement analysis",
      "Scenario & sensitivity analysis",
      "ERP data extraction (SAP / NetSuite / similar)",
      "KPI dashboarding",
      "Cost analysis",
      "Investment / business-case support",
    ],
    softSkills: ["Executive-ready writing", "Deadline discipline", "Stakeholder questioning", "Detail accuracy"],
    atsKeywords: [
      "financial planning and analysis",
      "forecasting",
      "budget vs actual",
      "financial modeling",
      "variance analysis",
      "management reporting",
      "business partnering",
      "cash flow analysis",
      "P&L analysis",
      "Excel modeling",
      "financial dashboards",
      "decision support",
    ],
    bullets: [
      "Built a rolling 12-month forecast model that cut monthly close commentary prep from 3 days to 6 hours.",
      "Automated variance packs in Power BI connected to ERP, reducing analyst rework ~12 hours/week.",
      "Partnered with sales ops on pricing scenarios that informed a package change lifting margin 2 points.",
      "Identified $1.4M in duplicate vendor spend during a cost deep-dive; finance recovered 60% within a quarter.",
      "Improved forecast accuracy (MAPE) from 18% to 9% for top revenue lines via driver-based modeling.",
      "Prepared board-ready decks summarizing cash, burn, and runway for two fundraising cycles.",
      "Trained 8 budget owners on driver templates, cutting budget-cycle revision rounds from five to two.",
    ],
    recruiterLook:
      "Finance recruiters match Excel depth and FP&A vocabulary first, then look for business-partnering stories - a model that changed a decision. Industry context (SaaS, manufacturing, banking) and tool names (ERP, BI) are common ATS filters. Bullet lists of duties without accuracy, cycle-time, or dollar impact read interchangeable.",
    tips: [
      "Lead with modeling outcomes: accuracy, speed, or dollar decisions supported.",
      "Mirror posting tools exactly - Hyperion, Anaplan, NetSuite, Power BI - when you used them.",
      "Keep the file parseable: no text boxes for key numbers; put metrics in plain bullets.",
    ],
    salaryNote:
      "Analyst compensation varies by industry, bonus structure, and CFA progress; consult current finance salary guides for your market and level.",
    template: "ats",
    faq: [
      {
        question: "Do financial analysts need SQL on the resume?",
        answer:
          "Increasingly yes for FP&A roles that pull from warehouses. List SQL when you write or adapt queries; if you only consume prepared extracts, say so honestly rather than implying engineering-level data skills.",
      },
      {
        question: "Should I include CFA candidacy?",
        answer:
          "Yes when relevant - Level I/II/III candidacy is a recognized signal. Place it in certifications and ensure your experience bullets still show applied analysis, not only exam progress.",
      },
      {
        question: "How technical should financial models look on a resume?",
        answer:
          "Name model type and business use (three-statement, cohort LTV, capacity plan) plus an outcome. Detailed tab structure belongs in a work sample or interview case, not the resume body.",
      },
    ],
  },
  {
    slug: "operations-manager",
    title: "Operations Manager",
    category: "Operations",
    status: "published",
    answer:
      "An operations manager resume leads with scale owned - sites, headcount, volume - and process outcomes: throughput up, cost down, quality or SLA improved. Name systems and methodologies from the posting so ATS keyword screens and COOs scanning for operators both recognize a delivery leader, not a generic coordinator.",
    hardSkills: [
      "Process design & SOP documentation",
      "KPI / SLA management",
      "Lean / continuous improvement",
      "Workforce scheduling & capacity planning",
      "Vendor & vendor-SLA management",
      "Inventory / supply coordination (as relevant)",
      "Quality & audit readiness",
      "Budget ownership for ops cost centers",
      "Incident & escalation management",
      "ERP / WMS / ops tooling",
      "Cross-functional program delivery",
      "Safety & compliance coordination",
    ],
    softSkills: ["Calm under pressure", "People leadership", "Cross-team negotiation", "Root-cause focus"],
    atsKeywords: [
      "operations management",
      "process improvement",
      "KPI tracking",
      "SLA compliance",
      "continuous improvement",
      "capacity planning",
      "operational excellence",
      "cost reduction",
      "vendor management",
      "standard operating procedures",
      "team leadership",
      "throughput",
    ],
    bullets: [
      "Owned ops for a 90-person multi-shift center processing 25K orders/week at 98.5% on-time SLA.",
      "Led lean kaizen on pick/pack; throughput rose 22% without adding headcount.",
      "Cut overtime spend 18% via capacity planning and demand-smoothing with sales ops.",
      "Implemented daily tier boards and escalation SLAs; Sev-1 customer incidents fell 40%.",
      "Renegotiated two carrier contracts, saving ~12% landed shipping cost at equal service levels.",
      "Built SOPs and audit packs that passed ISO-aligned customer audits with zero major findings.",
      "Hired and developed 6 team leads; internal fill rate for lead roles reached 70%.",
    ],
    recruiterLook:
      "Ops recruiters want scale and accountability in the first lines - what volume, what team, what P&L or SLA you owned - then evidence of process rigor and people leadership. Tools (WMS, ERP) and lean vocabulary often act as ATS filters. Soft leadership claims without throughput, cost, or quality numbers get treated as interchangeable.",
    tips: [
      "Open with scope: sites, headcount, volume, budget, or SLA owned.",
      "Pair every improvement bullet with a before/after metric.",
      "Match industry language (warehouse, plant, customer ops, marketplace) to the posting.",
    ],
    salaryNote:
      "Operations manager pay varies by industry intensity (logistics, manufacturing, SaaS ops) and whether the role includes P&L; use sector salary surveys for current ranges.",
    template: "ats",
    faq: [
      {
        question: "Should operations managers list lean certifications?",
        answer:
          "Yes when the posting mentions Lean, Six Sigma, or continuous improvement. A Green Belt helps, but a kaizen with measured results usually outweighs a certificate without application.",
      },
      {
        question: "How do I show people leadership without sounding vague?",
        answer:
          "State team size, hiring/development outcomes, and a performance or engagement result. 'Managed a team' alone is weak; 'grew 4 associates to lead roles while hitting SLA' is concrete.",
      },
      {
        question: "Is P&L experience required?",
        answer:
          "Not always - many ops roles own cost centers or SLAs without full P&L. If you influenced margin or cost, say how. Do not invent P&L ownership you did not have.",
      },
    ],
  },
  {
    slug: "teacher",
    title: "Teacher",
    category: "Education",
    status: "published",
    answer:
      "A teacher resume leads with certification, subject, grade band, and classroom outcomes - growth scores, engagement, curriculum owned - written in plain parseable text. Mirror district posting language for endorsements and programs so ATS keyword filters used by large school systems actually surface your application.",
    hardSkills: [
      "Classroom instruction & lesson planning",
      "Curriculum alignment (state / national standards)",
      "Differentiated instruction",
      "Formative & summative assessment",
      "Classroom management",
      "IEP / 504 collaboration (as applicable)",
      "Learning management systems (Google Classroom / Canvas)",
      "Parent & guardian communication",
      "Data-informed instructional adjustments",
      "Subject-matter expertise (list your field)",
      "Co-teaching / inclusion practices",
      "Professional learning communities",
    ],
    softSkills: ["Patience under disruption", "Clear communication", "Cultural responsiveness", "Collaborative planning"],
    atsKeywords: [
      "lesson planning",
      "student engagement",
      "differentiated instruction",
      "classroom management",
      "curriculum development",
      "student assessment",
      "learning outcomes",
      "parent communication",
      "standards-based instruction",
      "inclusive classroom",
      "instructional strategies",
      "professional development",
    ],
    bullets: [
      "Raised grade-level reading proficiency 14 points YoY using small-group intervention blocks.",
      "Designed and taught a standards-aligned unit adopted by 4 peer teachers on the grade team.",
      "Maintained 96% average daily attendance through family outreach and early intervention routines.",
      "Co-taught inclusion sections; all IEP accommodations implemented with documented progress notes.",
      "Built Canvas modules that cut homework clarification emails ~40% while improving on-time submission.",
      "Mentored two student teachers through full-cycle planning, observation, and reflection.",
      "Led a PLC analyzing interim data biweekly, adjusting pacing that improved midyear benchmark pass rates 9%.",
    ],
    recruiterLook:
      "School HR and principals scan for valid certification/endorsement, grade/subject match, and evidence students learned - growth data beats adjective-heavy teaching philosophies. Large districts parse applications in ATS, so exact endorsement names and program keywords matter. Soft claims of being passionate without classroom results rarely differentiate candidates.",
    tips: [
      "Put license/endorsement, grade band, and subject in the top third in plain text.",
      "Quantify student outcomes where ethically and accurately allowed by your school data.",
      "Name LMS and curriculum frameworks listed in the posting when you have used them.",
    ],
    salaryNote:
      "Teacher pay is typically set by district salary schedules, steps, and lanes; consult the posting district's published schedule rather than national averages.",
    template: "ats",
    faq: [
      {
        question: "Should teachers include a teaching philosophy on the resume?",
        answer:
          "A short line can help, but lead with certification, subject, and outcomes. Many districts want philosophy in a cover letter or interview - keep the resume scannable and keyword-aligned.",
      },
      {
        question: "How do new teachers compete without years of classroom data?",
        answer:
          "Highlight student teaching metrics, unit plans, classroom management strategies you practiced, and any tutoring or after-school programs with concrete results. Strong recommendations still matter in education hiring.",
      },
      {
        question: "Do private school applications need the same ATS format?",
        answer:
          "Many smaller schools read PDFs by hand, but a clean single-column format still helps. When applying to large districts or networks, assume ATS parsing and avoid tables or text boxes.",
      },
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    category: "Design",
    status: "published",
    answer:
      "A graphic designer resume leads with craft outcomes - brands launched, campaigns shipped, design systems or templates adopted - and the tools the posting names. Keep the application file ATS-parseable while putting visual proof in a portfolio URL hiring managers actually open.",
    hardSkills: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Figma (marketing / UI-adjacent)",
      "Brand identity systems",
      "Typography & layout",
      "Print production & prepress",
      "Social / digital asset design",
      "Presentation & pitch decks",
      "Motion basics (After Effects) - as relevant",
      "Photo retouching",
      "File prep for vendors & developers",
    ],
    softSkills: ["Receiving critique", "Brand stewardship", "Deadline reliability", "Cross-team collaboration"],
    atsKeywords: [
      "graphic design",
      "brand identity",
      "visual design",
      "Adobe Creative Suite",
      "typography",
      "layout design",
      "marketing collateral",
      "print design",
      "digital design",
      "creative production",
      "design systems",
      "campaign assets",
    ],
    bullets: [
      "Redesigned brand system (logo, type, color) rolled out across web and 40+ sales templates.",
      "Produced campaign kits for 6 product launches; social creative contributed to 2.1× engagement vs prior quarter.",
      "Built InDesign template library used by marketing, cutting freelance revision cycles 35%.",
      "Partnered with growth on landing-page visuals that lifted demo-request conversion 11%.",
      "Prepared print-ready packaging files through two vendor rounds with zero press errors.",
      "Created a Figma component set for event and booth graphics reused across 12 regional shows.",
      "Mentored a junior designer on typography and production QA; their first solo campaign shipped on schedule.",
    ],
    recruiterLook:
      "Creative recruiters open the portfolio first, but many employers still parse resumes in ATS - tool names and specialty keywords must appear in text. They look for brand ownership, production reliability, and business-aware outcomes (engagement, conversion, consistency). Decorative resumes that fail parsing never get to the art director.",
    tips: [
      "Place portfolio URL in plain text near contact details.",
      "Match Adobe/Figma tool names from the posting; list specialties (packaging, social, identity).",
      "Use an ATS-safe resume layout; save visual flair for the portfolio case studies.",
    ],
    salaryNote:
      "Graphic design pay varies by agency vs in-house, industry, and motion/UI crossover skills; check AIGA and local creative salary surveys.",
    template: "ats",
    faq: [
      {
        question: "Should a graphic designer resume be highly designed?",
        answer:
          "Prefer a clean, parseable one-pager for applications that go through HR systems. Show layout craft in the portfolio - a beautiful resume that ATS cannot read costs interviews.",
      },
      {
        question: "How many portfolio pieces should I reference on the resume?",
        answer:
          "Two or three flagship projects with outcome lines are enough. The resume points; the portfolio proves. Tailor which projects you emphasize to the posting's medium (print, brand, digital).",
      },
      {
        question: "Do I list every Adobe app I have opened?",
        answer:
          "List tools you can produce production-quality work in under deadline. Inflating After Effects or 3D skills you cannot demo live is a common interview failure.",
      },
    ],
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    category: "Marketing",
    status: "published",
    answer:
      "A content writer resume leads with topics, channels, and performance - traffic, conversions, engagement - then names CMS and SEO skills the posting expects. Mirror keyword language from the job description so ATS screens for content marketing roles actually rank your application.",
    hardSkills: [
      "Long-form & short-form copywriting",
      "SEO content strategy & on-page SEO",
      "CMS (WordPress / Webflow / Contentful)",
      "Editing & style-guide adherence",
      "Keyword research (Ahrefs / SEMrush / GSC)",
      "Content briefs & outlines",
      "Analytics interpretation (GA4)",
      "Interviewing subject-matter experts",
      "Email / newsletter copy",
      "AI-assisted drafting with human editing",
      "Brand voice development",
      "Basic HTML for CMS",
    ],
    softSkills: ["Curiosity", "Deadline ownership", "Receiving editorial feedback", "Stakeholder interviewing"],
    atsKeywords: [
      "content writing",
      "SEO writing",
      "blog content",
      "copywriting",
      "content strategy",
      "editorial calendar",
      "keyword research",
      "content marketing",
      "brand voice",
      "conversion copy",
      "CMS",
      "organic traffic",
    ],
    bullets: [
      "Wrote 48 SEO articles in 12 months; organic sessions grew 62% YoY for target topic clusters.",
      "Refreshed 20 decaying posts using Search Console data; recovered ~35K monthly clicks within a quarter.",
      "Owned product launch narratives and landing copy that lifted free-trial starts 13%.",
      "Built a style guide and brief template adopted by 3 freelance writers, cutting edit rounds in half.",
      "Interviewed 15 SMEs for thought-leadership series syndicated to partner channels.",
      "Produced biweekly newsletter (18K subs) with average 42% open rate and consistent CTA click-through.",
      "Partnered with SEO on internal linking and metadata that raised average position for 30 head terms.",
    ],
    recruiterLook:
      "Content hiring managers want proof your words moved a metric - traffic, leads, engagement - and that you can match brand voice under editorial process. CMS and SEO tool names are frequent ATS filters. Claiming 'great writer' without links or outcomes is the fastest rejection in a portfolio-driven field.",
    tips: [
      "Link 2–3 published samples in plain URLs; password-protected work can be offered on request.",
      "Quantify SEO or conversion impact whenever analytics access allows.",
      "Mirror niche topics from the posting (B2B SaaS, fintech, health) in your lead bullets.",
    ],
    salaryNote:
      "Content writer pay varies by niche expertise, SEO depth, and employee vs contractor status; check current content marketing salary surveys for your market.",
    template: "ats",
    faq: [
      {
        question: "Should content writers show AI tool experience?",
        answer:
          "Yes when postings mention AI-assisted workflows - frame AI as drafting acceleration with human research, fact-checking, and brand editing. Do not imply unedited AI output is your published standard.",
      },
      {
        question: "How long should a content writer resume be?",
        answer:
          "One page is enough for most IC roles if samples are linked. Use space for outcomes and niche authority rather than listing every article title.",
      },
      {
        question: "Do I need a personal blog to get hired?",
        answer:
          "Not required if you have strong published client or employer work. A personal site helps juniors demonstrate niche voice when professional clips are thin.",
      },
    ],
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    category: "Engineering",
    status: "published",
    answer:
      "A civil engineer resume leads with discipline - structural, transportation, geotech, water resources - software by exact name, and codes or standards worked to. Quantify project scale, design packages delivered, and field outcomes so ATS keyword filters and engineering managers both see applied delivery, not only coursework.",
    hardSkills: [
      "AutoCAD / Civil 3D",
      "Structural analysis software (STAAD / ETABS / similar)",
      "Site design & grading",
      "Quantity takeoffs & estimates",
      "Construction document preparation",
      "Code compliance (IBC / local codes as relevant)",
      "Stormwater / drainage design basics",
      "Project coordination with contractors",
      "Technical specifications writing",
      "Field inspection / RFI responses",
      "BIM coordination (as relevant)",
      "Geotechnical report interpretation",
    ],
    softSkills: ["Multidiscipline coordination", "Client communication", "Field pragmatism", "Documentation rigor"],
    atsKeywords: [
      "civil engineering",
      "site development",
      "construction documents",
      "structural design",
      "AutoCAD Civil 3D",
      "project delivery",
      "permitting support",
      "quantity estimation",
      "infrastructure design",
      "engineering calculations",
      "quality assurance",
      "field engineering",
    ],
    bullets: [
      "Produced Civil 3D site packages for a 12-acre commercial development through permitting approval.",
      "Designed drainage improvements that resolved recurring ponding; post-construction complaints dropped to zero.",
      "Coordinated RFIs and submittals on a $28M roadway project, keeping design response SLA under 5 business days.",
      "Prepared quantity takeoffs within 3% of awarded contractor bids on three consecutive jobs.",
      "Supported structural steel package checks against IBC requirements with PE oversight on sealed sheets.",
      "Led weekly coordination with architects and MEP, cutting clash-related change orders 20% on a mid-rise job.",
      "Performed site inspections documenting punch items that closed before certificate of occupancy.",
    ],
    recruiterLook:
      "Civil recruiters match discipline and software first - Civil 3D vs structural analysis tools are different searches - then look for project type, delivery phase, and stamped-work proximity. Codes, permitting, and field coordination experience differentiate jobsite-ready engineers from purely academic profiles. Vague 'worked on projects' bullets without scale or your role get skipped.",
    tips: [
      "State discipline and software in the first skills line using posting-exact names.",
      "Include project type, approximate scale, and your personal deliverables.",
      "Freshers: lead with capstone/internship design packages, calculations, and software depth.",
    ],
    salaryNote:
      "Civil engineer pay varies by public vs private sector, PE licensure, and specialty; consult ASCE and local salary surveys for current ranges.",
    template: "latex",
    faq: [
      {
        question: "Should EIT or PE status appear near the top?",
        answer:
          "Yes - licensure status is often a hard filter. Put EIT/PE and state clearly in the header area in plain text so both ATS and humans see it immediately.",
      },
      {
        question: "How do civil engineers show software skill without a portfolio?",
        answer:
          "Name tools with context in bullets - what you modeled or drafted and the project outcome. Public work samples may be restricted; describe deliverables and QA process instead.",
      },
      {
        question: "Is construction experience valued for design roles?",
        answer:
          "Field or inspection exposure helps design roles that coordinate with contractors. Emphasize RFIs, constructability, and document control when applying to design-build or CM-adjacent postings.",
      },
    ],
  },
  {
    slug: "electrical-engineer",
    title: "Electrical Engineer",
    category: "Engineering",
    status: "published",
    answer:
      "An electrical engineer resume leads with domain - power, controls, electronics, embedded - and tools or standards named in the posting. Quantify designs released, tests passed, uptime improved, or cost saved so ATS keyword matching and engineering hiring managers see production-ready judgment, not only lab coursework.",
    hardSkills: [
      "Circuit design & schematic capture",
      "PCB design (Altium / KiCad / OrCAD)",
      "Power systems / distribution (as relevant)",
      "PLC / industrial controls (as relevant)",
      "MATLAB / simulation",
      "Embedded C / firmware collaboration",
      "Test plans & validation",
      "DFM for electronics",
      "Oscilloscope & lab instrumentation",
      "Standards awareness (IEC / IEEE / NEC as relevant)",
      "BOM & component engineering",
      "Failure analysis / root cause",
    ],
    softSkills: ["Cross-discipline coordination", "Lab documentation", "Vendor technical calls", "Safety mindset"],
    atsKeywords: [
      "electrical design",
      "schematic capture",
      "PCB layout",
      "power electronics",
      "control systems",
      "hardware validation",
      "circuit analysis",
      "embedded systems",
      "electrical schematics",
      "product testing",
      "compliance testing",
      "design for manufacturability",
    ],
    bullets: [
      "Released Altium PCB + schematic for a sensor board through EVT/DVT with zero respins for layout errors.",
      "Cut board cost 15% by alternate sourcing and DFM reviews with the CM before tooling.",
      "Wrote validation plans covering EMI pre-compliance; first-pass EMC chamber result met targets.",
      "Debugged a field power-rail failure; root-cause fix dropped return rate 70% on affected SKU.",
      "Automated MATLAB test scripts that reduced characterization time per board from 2 hours to 20 minutes.",
      "Coordinated with firmware on bring-up checklists that shortened new-board bring-up from 5 days to 2.",
      "Owned electrical BOM risk reviews; flagged EOL parts early enough to avoid a line-down event.",
    ],
    recruiterLook:
      "Electrical recruiters filter hard on domain and toolchains - power vs PCB vs controls are different pipelines. They want evidence of released designs, test rigor, and manufacturing or field feedback loops. Coursework-heavy resumes without hardware outcomes struggle against candidates who shipped and supported products.",
    tips: [
      "Declare your lane early: power, electronics, controls, or embedded-adjacent.",
      "Name EDA tools and standards from the posting exactly when accurate.",
      "Tie lab work to a release, yield, cost, or reliability metric whenever possible.",
    ],
    salaryNote:
      "Electrical engineer compensation varies by specialty (power, semiconductor, controls) and PE status; use IEEE and local market data for negotiation.",
    template: "latex",
    faq: [
      {
        question: "Should electrical engineers include programming skills?",
        answer:
          "Yes when roles touch embedded, test automation, or controls - C, Python, or PLC languages as applicable. Be precise about depth so you are not slotted into a software interview by mistake.",
      },
      {
        question: "How important is a PE for electrical roles?",
        answer:
          "Critical for many power and consulting roles that require stamped drawings; less central for consumer electronics design. Follow the posting - if PE is required, put status upfront.",
      },
      {
        question: "Do personal hardware projects help?",
        answer:
          "Yes for early career: a designed, fabricated, and tested board with documentation beats a parts list. Show schematic/PCB role, tests run, and what you learned from failures.",
      },
    ],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    category: "Technology",
    status: "published",
    answer:
      "A QA engineer resume leads with testing strategy and tools that match the posting - automation frameworks, CI gates, and quality metrics - then proves impact with escaped defects cut, coverage raised, or release risk reduced. Exact tool keywords help ATS screens for SDET and QA roles rank you correctly.",
    hardSkills: [
      "Test strategy & test case design",
      "Automation (Playwright / Cypress / Selenium)",
      "API testing (Postman / REST Assured)",
      "CI test integration (GitHub Actions / Jenkins)",
      "SQL for data validation",
      "Defect triage & reporting",
      "Performance testing basics (k6 / JMeter)",
      "Mobile testing (as relevant)",
      "Exploratory testing",
      "Accessibility testing awareness",
      "Test data management",
      "Quality metrics & release readiness",
    ],
    softSkills: ["Risk communication", "Developer partnership", "Skeptical curiosity", "Clear bug writing"],
    atsKeywords: [
      "quality assurance",
      "test automation",
      "regression testing",
      "end-to-end testing",
      "API testing",
      "continuous testing",
      "defect tracking",
      "test planning",
      "SDET",
      "release quality",
      "manual testing",
      "quality metrics",
    ],
    bullets: [
      "Built Playwright end-to-end suite (320+ tests) wired to CI; production Sev-1 escapes fell 55% YoY.",
      "Cut regression cycle from 4 days to 6 hours by prioritizing automation on critical user journeys.",
      "Designed API contract tests that caught 18 breaking changes before merge over two quarters.",
      "Introduced risk-based test plans for releases; zero customer-facing P0s in three consecutive launches.",
      "Partnered with eng on flake reduction; CI flake rate dropped from 12% to under 2%.",
      "Mentored 3 manual QAs into owning automation PRs; team automation ownership rose from 1 to 4 people.",
      "Added accessibility smoke checks to the pipeline, blocking two WCAG regressions pre-release.",
    ],
    recruiterLook:
      "QA and SDET recruiters match automation stack first - Playwright vs Selenium is often a filter - then look for quality outcomes and collaboration with engineering. 'Wrote test cases' without escape-rate, cycle-time, or CI evidence reads junior. Clear severity judgment and release-readiness storytelling separate strong QA profiles.",
    tips: [
      "Lead with automation tools named in the posting and where they run (CI stage).",
      "Quantify quality: escaped defects, flake rate, cycle time, coverage of critical paths.",
      "Clarify manual vs automation mix honestly for the level you want.",
    ],
    salaryNote:
      "QA compensation varies by manual vs SDET track, domain (fintech, healthcare), and automation depth; check current engineering salary bands for QA/SDET in your market.",
    template: "latex",
    faq: [
      {
        question: "Should QA engineers list programming languages?",
        answer:
          "Yes for automation-heavy roles - TypeScript, Java, or Python as used in your framework. Show you can read application code enough to design better tests, without overclaiming full feature development ownership.",
      },
      {
        question: "Is manual testing still worth putting on a resume?",
        answer:
          "Yes when roles still need exploratory, usability, or compliance testing. Pair it with strategy and impact; pure click-script lists without risk thinking underperform in 2026 postings.",
      },
      {
        question: "How do QA resumes differ from SDET resumes?",
        answer:
          "SDET resumes emphasize framework design, code quality of tests, and CI architecture more heavily. Tailor keywords to the title in the posting - many ATS pipelines treat the strings differently.",
      },
    ],
  },
  {
    slug: "software-engineering-intern",
    title: "Software Engineering Intern",
    category: "Technology",
    status: "published",
    answer:
      "A software engineering intern resume leads with projects, coursework, and internship impact - languages and frameworks named exactly as in the posting - then quantifies contributions like bugs fixed, features shipped, or latency improved. Keep a single-column ATS-safe layout so campus and portal screens parse cleanly.",
    hardSkills: [
      "Python",
      "Java or TypeScript",
      "Git / GitHub",
      "Data structures & algorithms",
      "REST APIs",
      "SQL basics",
      "Unit testing",
      "Linux command line",
      "React or similar UI library",
      "CI familiarity (GitHub Actions)",
    ],
    softSkills: ["Coachability", "Code review etiquette", "Written updates", "Timeboxing"],
    atsKeywords: [
      "software engineering intern",
      "internship",
      "version control",
      "agile",
      "debugging",
      "code review",
      "object-oriented programming",
      "full stack exposure",
      "pair programming",
      "technical documentation",
      "pull requests",
      "student developer",
    ],
    bullets: [
      "Built a TypeScript service endpoint that cut p95 latency 28% on a high-traffic student portal feature.",
      "Shipped 12 merged PRs in an 8-week internship with 90%+ review approval on first or second pass.",
      "Wrote Jest coverage for a payment helper module, raising suite coverage from 61% to 84%.",
      "Debugged a production race condition with senior mentors, documenting root cause for the team wiki.",
      "Automated a weekly data hygiene script that saved ~3 engineer hours per sprint.",
      "Presented internship demo to 40+ engineers; adopted as onboarding sample for next intern class.",
    ],
    recruiterLook:
      "Intern recruiters skim for real code evidence fast: named languages, merged work, and ownership of a vertical slice. Coursework alone is weak; projects with stack, your role, and a measured outcome win screens. Mirror the posting's stack strings exactly when they are true of your work.",
    tips: [
      "Put projects and internships above a thin experience section if you lack full-time roles.",
      "Name frameworks from the posting only when you used them - honesty survives interviews.",
      "Link GitHub if public repos reinforce the bullets; keep the resume self-contained for ATS text extract.",
    ],
    salaryNote:
      "Intern pay varies by company, city, and remote vs onsite; check university career pages and recent intern offer threads for your market rather than inventing a number.",
    template: "latex",
    faq: [
      {
        question: "Should software engineering interns include GPA?",
        answer:
          "Include GPA when it clears common cutoffs or the posting asks. Otherwise lead with projects and shipped internship work - many tech screens weight demonstrated code higher than grades.",
      },
      {
        question: "How many projects belong on an intern resume?",
        answer:
          "Two or three strong projects with stack and outcomes beat a long list of unfinished tutorials. Depth and clarity matter more than volume.",
      },
      {
        question: "Is a one-page resume required for internships?",
        answer:
          "Usually yes for campus and early-career screens. Keep one page unless a research-heavy CV format is explicitly requested.",
      },
    ],
  },
  {
    slug: "marketing-intern",
    title: "Marketing Intern",
    category: "Marketing",
    status: "published",
    answer:
      "A marketing intern resume proves channel work with numbers - campaigns supported, content shipped, analytics pulled - and names the tools in the posting. Lead with projects, coursework, and internship results in a parseable single-column layout so ATS and campus recruiters both see your impact quickly.",
    hardSkills: [
      "Content writing / copy drafts",
      "Canva or Figma basics",
      "Google Analytics or similar",
      "Social scheduling tools",
      "Email campaign assists",
      "SEO fundamentals",
      "Spreadsheet analysis",
      "CRM hygiene (HubSpot/Salesforce lite)",
      "A/B test observation",
      "Competitor research notes",
    ],
    softSkills: ["Curiosity", "Deadline discipline", "Stakeholder updates", "Creative iteration"],
    atsKeywords: [
      "marketing intern",
      "content marketing",
      "social media",
      "campaign support",
      "analytics",
      "brand guidelines",
      "lead generation",
      "email marketing",
      "SEO",
      "market research",
      "internship",
      "go-to-market support",
    ],
    bullets: [
      "Drafted 18 social posts in brand voice that lifted average engagement 24% vs prior intern cohort baseline.",
      "Built a weekly competitor snapshot used by the growth lead in Monday planning.",
      "Assisted a nurture email series that improved click-through 1.8 points over the control.",
      "Tagged UTM parameters and cleaned 400+ CRM contacts, cutting bounce rates on a product launch list.",
      "Produced a one-page SEO brief that informed three blog outlines later published by the content team.",
      "Supported a campus ambassador campaign that drove 120 qualified signups in four weeks.",
    ],
    recruiterLook:
      "Marketing intern screens look for initiative and measurable assists, not vague 'helped with social.' Name channels, tools, and outcomes. Soft creative claims without metrics rarely survive ATS keyword filters tied to the posting.",
    tips: [
      "Mirror exact tool names from the internship posting when you used them.",
      "Quantify even small assists - posts shipped, lists cleaned, events staffed.",
      "Keep design work in a portfolio link; keep the resume ATS-plain.",
    ],
    salaryNote:
      "Marketing intern stipends vary widely by nonprofit vs startup vs enterprise; confirm ranges with your career office for the city and sector.",
    template: "ats",
    faq: [
      {
        question: "Do marketing interns need a portfolio?",
        answer:
          "A light portfolio or drive folder of writing and creatives helps human review. Keep the application resume text-based and ATS-safe; put the link in the contact line.",
      },
      {
        question: "Should I list every social platform?",
        answer:
          "List platforms named in the posting plus those where you have proof. A long unfocused list without results adds noise.",
      },
      {
        question: "How do I show impact without owning the full campaign?",
        answer:
          "Use assist language with metrics: drafts shipped, tests supported, lists cleaned. Clarity about scope builds trust in interviews.",
      },
    ],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Technology",
    status: "published",
    answer:
      "A cybersecurity analyst resume leads with detections handled, incidents contained, controls implemented, and tools named exactly as in the posting - SIEM, EDR, ticketing. Pair certifications with quantified triage outcomes in a single-column ATS-safe layout so keyword screens and humans both find your scope.",
    hardSkills: [
      "SIEM (Splunk / Sentinel / Elastic)",
      "EDR / antivirus triage",
      "Network fundamentals (TCP/IP)",
      "Vulnerability scanning",
      "Incident response playbooks",
      "Log analysis",
      "Identity & access basics",
      "Threat intel feeds",
      "Ticketing (Jira / ServiceNow)",
      "Scripting (Python or PowerShell)",
    ],
    softSkills: ["Calm under pressure", "Clear escalation writing", "Shift handoff discipline", "Continuous learning"],
    atsKeywords: [
      "security operations",
      "SOC",
      "incident response",
      "vulnerability management",
      "threat hunting",
      "SIEM",
      "EDR",
      "security monitoring",
      "alert triage",
      "compliance support",
      "risk assessment",
      "cybersecurity analyst",
    ],
    bullets: [
      "Triaged 40+ SIEM alerts per shift with under 15-minute median acknowledge time for high severity.",
      "Contained a phishing cluster affecting 60 mailboxes; coordinated reset and user coaching within four hours.",
      "Reduced duplicate true-positive noise 30% by tuning three noisy detection rules with engineering.",
      "Ran weekly vulnerability scans and drove remediation of 25 critical CVEs ahead of audit.",
      "Documented IR playbook updates adopted by a 12-person SOC for ransomware tabletop drills.",
      "Automated enrichment scripts that cut average investigation time 18% on recurring alert types.",
    ],
    recruiterLook:
      "Security recruiters scan for tool stack fidelity, incident ownership, and evidence you can escalate clearly. Soft 'passionate about security' lines without triage metrics underperform. Match the posting's SIEM/EDR names when true.",
    tips: [
      "Lead with detections and incidents, then certifications - certs alone rarely clear senior screens.",
      "Spell out SOC tier (L1/L2) if the posting uses that language.",
      "Keep classified details out; quantify impact without exposing sensitive internals.",
    ],
    salaryNote:
      "Cyber pay bands differ by clearance, cloud vs on-prem stack, and market; use levels.fyi and recent SOC salary surveys for your region.",
    template: "latex",
    faq: [
      {
        question: "Which certifications belong on a cybersecurity analyst resume?",
        answer:
          "List certs the posting names or that are standard for the level (e.g., Security+, CySA+, relevant cloud security). Expired or unrelated certs dilute signal.",
      },
      {
        question: "Should I include home lab projects?",
        answer:
          "Yes for early-career roles when framed with tools used and what you detected or built. Keep one or two strong labs, not an endless list.",
      },
      {
        question: "How technical should the resume get?",
        answer:
          "Technical enough to pass keyword screens and interview screens - name protocols and tools - without dumping unreadable log dumps into bullets.",
      },
    ],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Technology",
    status: "published",
    answer:
      "A machine learning engineer resume proves models in production - latency, accuracy, cost, or reliability - then the stack: Python, training pipelines, serving, and monitoring. Mirror the posting's framework and cloud keywords so ATS searches surface you, and keep layout parseable for human review.",
    hardSkills: [
      "Python",
      "PyTorch or TensorFlow",
      "Feature engineering",
      "Model evaluation / metrics",
      "ML pipelines (Airflow / Kubeflow)",
      "Model serving (FastAPI / TorchServe)",
      "SQL / data warehouses",
      "Experiment tracking (MLflow / W&B)",
      "Docker / Kubernetes basics",
      "Cloud ML (AWS/GCP/Azure)",
    ],
    softSkills: ["Cross-team translation", "Experiment discipline", "Documentation", "Stakeholder expectation setting"],
    atsKeywords: [
      "machine learning",
      "model deployment",
      "feature store",
      "MLOps",
      "deep learning",
      "inference optimization",
      "A/B testing",
      "data pipelines",
      "model monitoring",
      "NLP or computer vision",
      "hyperparameter tuning",
      "production ML",
    ],
    bullets: [
      "Deployed a ranking model that lifted CTR 9% while holding p95 inference under 45ms at peak QPS.",
      "Cut training cost 35% by refactoring a GPU pipeline and caching features for repeated experiments.",
      "Built monitoring for data drift that caught a silent feature break two days before a major launch.",
      "Productionized an NLP classifier with 94% precision on the business-critical class after three iterations.",
      "Partnered with platform eng to containerize training jobs, reducing environment setup from days to hours.",
      "Documented model cards and rollback plans adopted as the default template for three product teams.",
    ],
    recruiterLook:
      "ML recruiters separate research-only resumes from production ML by looking for serving, monitoring, and business metrics. Pure Kaggle lists without deployment underperform for MLE titles. Match the framework and cloud named in the JD.",
    tips: [
      "State offline metrics and online impact when you have both.",
      "Clarify your role vs data science vs platform for each project.",
      "Link papers only if they support the production story the posting wants.",
    ],
    salaryNote:
      "MLE compensation varies heavily by lab vs product org and geo; triangulate levels.fyi, company bands, and recent offers rather than a single public average.",
    template: "latex",
    faq: [
      {
        question: "Should ML engineers list every library?",
        answer:
          "List libraries and frameworks the posting names plus your core stack. Endless laundry lists without project proof look like keyword stuffing.",
      },
      {
        question: "How do I show research experience on an MLE resume?",
        answer:
          "One strong paper or thesis bullet is enough if the role is production-first; emphasize what transferred into systems, evaluation, or datasets.",
      },
      {
        question: "Is a two-page resume OK for senior MLEs?",
        answer:
          "Yes when you have multiple production systems. Keep the first page dense with the strongest deployments and metrics.",
      },
    ],
  },
  {
    slug: "fullstack-developer",
    title: "Full Stack Developer",
    category: "Technology",
    status: "published",
    answer:
      "A full stack developer resume balances frontend and backend proof with end-to-end ownership - APIs, UI, data, and deployment - using the exact languages and clouds in the posting. Quantify reliability, speed, and product outcomes in a single-column ATS-safe format.",
    hardSkills: [
      "TypeScript / JavaScript",
      "React or similar SPA framework",
      "Node.js or equivalent backend",
      "PostgreSQL / SQL",
      "REST or GraphQL APIs",
      "Authentication / authorization",
      "Docker",
      "CI/CD pipelines",
      "Cloud hosting (AWS/GCP/Azure)",
      "Testing (unit + integration)",
    ],
    softSkills: ["End-to-end ownership", "Product sense", "Estimation", "Peer review"],
    atsKeywords: [
      "full stack",
      "full-stack developer",
      "web application",
      "API design",
      "frontend",
      "backend",
      "microservices",
      "responsive UI",
      "database design",
      "DevOps collaboration",
      "agile delivery",
      "production support",
    ],
    bullets: [
      "Owned a customer dashboard end-to-end - React UI plus Node API - used weekly by 8k active accounts.",
      "Cut API error rate 40% by adding idempotency keys and structured logging across three services.",
      "Shipped a GraphQL layer that reduced over-fetching and improved median page load 22%.",
      "Migrated a legacy jQuery module to TypeScript React without downtime using feature flags.",
      "Built CI checks that blocked flaky tests, raising main-branch green rate from 78% to 96%.",
      "On-called for a payments surface with MTTR under 30 minutes across two incident seasons.",
    ],
    recruiterLook:
      "Full stack screens look for breadth with depth in at least one layer and evidence you shipped user-facing outcomes. 'Familiar with everything' without metrics fails ATS and humans. Mirror the posting's primary stack strings.",
    tips: [
      "Lead with the stack the job names, even if you are stronger on the other side of the stack.",
      "Show one vertical feature you owned across UI and API.",
      "Separate hobby experiments from production ownership clearly.",
    ],
    salaryNote:
      "Full stack bands track company stage and primary stack; compare offers using levels.fyi and local market data for your title level.",
    template: "latex",
    faq: [
      {
        question: "Should I call myself full stack if I am stronger on frontend?",
        answer:
          "Only if you can defend backend work in interview. Otherwise use the title in the posting (frontend, backend) and show collaboration across the stack.",
      },
      {
        question: "How many languages should appear?",
        answer:
          "Prioritize languages you used professionally and that the JD lists. Secondary languages can sit in a short skills line.",
      },
      {
        question: "Do side projects help full stack resumes?",
        answer:
          "Yes when they show deployed end-to-end work with a real users or clear technical challenge - not unfinished tutorial clones.",
      },
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    category: "Design",
    status: "published",
    answer:
      "A product designer resume pairs portfolio-ready outcomes with process - research, flows, UI systems, and shipped metrics - while staying ATS-parseable in text. Name tools from the posting and quantify adoption or conversion impact so screens and hiring managers both see product craft.",
    hardSkills: [
      "Figma",
      "User flows & wireframes",
      "Design systems",
      "Prototyping",
      "Usability testing",
      "Interaction design",
      "Responsive / mobile UI",
      "Accessibility basics (WCAG)",
      "Design critique facilitation",
      "Handoff to engineering",
    ],
    softSkills: ["Empathy", "Narrative storytelling", "Conflict resolution", "Workshop facilitation"],
    atsKeywords: [
      "product design",
      "UX design",
      "UI design",
      "design system",
      "user research",
      "prototyping",
      "wireframing",
      "usability testing",
      "interaction design",
      "cross-functional collaboration",
      "Figma",
      "customer journey",
    ],
    bullets: [
      "Redesigned checkout that improved conversion 14% after three usability rounds and one A/B ship.",
      "Built a component library adopted by 11 squads, cutting average UI build time ~25%.",
      "Ran 20 moderated tests that killed a navigation concept before engineering investment.",
      "Partnered with PM and eng to ship an accessibility pass that cleared WCAG AA on core flows.",
      "Created onboarding prototypes that reduced time-to-first-value by 2 minutes in analytics.",
      "Facilitated weekly design critiques that improved design-debt visibility for leadership.",
    ],
    recruiterLook:
      "Design recruiters open the portfolio first but ATS still parses the resume PDF. Keep the resume text clean and keyword-aligned; put visual craft in the portfolio URL. Outcomes beat aesthetic adjectives.",
    tips: [
      "Put portfolio URL in the header; ensure the resume stands alone if the link is ignored.",
      "Match 'product designer' vs 'UX' title to the posting.",
      "Quantify when possible - conversion, time-on-task, adoption.",
    ],
    salaryNote:
      "Product design compensation tracks company stage and IC vs lead scope; use Levels, Design Salaries reports, and peer offers for your city.",
    template: "ats",
    faq: [
      {
        question: "Should product designers use creative resume layouts?",
        answer:
          "Keep the application file ATS-safe and single-column for portals. Save expressive layouts for portfolio case studies and optional PDF attachments when a human is guaranteed to open them.",
      },
      {
        question: "How many case studies belong on the resume?",
        answer:
          "The resume should summarize 2–4 flagship outcomes; full case studies live in the portfolio. Resume bullets are the trailer, not the film.",
      },
      {
        question: "Do I list every design tool?",
        answer:
          "List tools in the posting plus your daily drivers. Rare one-off tools without proof add little.",
      },
    ],
  },
  {
    slug: "technical-writer",
    title: "Technical Writer",
    category: "Technology",
    status: "published",
    answer:
      "A technical writer resume shows docs that unblocked users or developers - articles shipped, tickets deflected, adoption of guides - and tools like docs-as-code, APIs, and style guides. Mirror the posting's stack so ATS keyword filters recognize your domain fit.",
    hardSkills: [
      "Docs-as-code (Markdown / Git)",
      "API documentation",
      "Style guides / voice",
      "Information architecture",
      "Screenshots & diagrams",
      "Static site generators",
      "Issue tracking collaboration",
      "Release note writing",
      "Audience analysis",
      "Basic HTML/CSS",
    ],
    softSkills: ["Clarity", "Interviewing SMEs", "Editorial judgment", "Deadline reliability"],
    atsKeywords: [
      "technical writing",
      "documentation",
      "API docs",
      "developer documentation",
      "knowledge base",
      "user guides",
      "content strategy",
      "docs-as-code",
      "release notes",
      "information architecture",
      "style guide",
      "technical communicator",
    ],
    bullets: [
      "Rewrote onboarding docs that cut support tickets 19% on the top three how-to intents.",
      "Shipped OpenAPI-aligned reference pages covering 40 endpoints with copy-ready examples.",
      "Migrated a Confluence corpus to docs-as-code, enabling PR review by engineering.",
      "Created a style guide adopted by five writers, reducing edit cycles on launch week.",
      "Partnered with support to publish 12 troubleshooting playbooks before a major release.",
      "Measured doc helpfulness ratings rising from 3.1 to 4.4 on the core getting-started path.",
    ],
    recruiterLook:
      "Technical writing screens look for domain fit (devdocs vs end-user) and evidence docs changed behavior. Soft claims of 'excellent communicator' without metrics or links underperform. Include a docs portfolio URL when allowed.",
    tips: [
      "State audience (developers, admins, end users) per role.",
      "Name the docs toolchain from the posting when you used it.",
      "Link public docs; keep proprietary samples described, not pasted.",
    ],
    salaryNote:
      "Tech writing pay varies by software vs hardware domain and senior IC vs lead; check STC surveys and local market data.",
    template: "ats",
    faq: [
      {
        question: "Should technical writers show code samples?",
        answer:
          "Show enough to prove you can read APIs and git workflows if the role is developer docs. You are not applying as an engineer unless the posting says so.",
      },
      {
        question: "How long should writing samples be?",
        answer:
          "Link 2–3 best pieces. The resume stays short; samples carry depth.",
      },
      {
        question: "Is SEO experience relevant?",
        answer:
          "Yes for docs sites and knowledge bases when the posting mentions findability, search, or content strategy. Tie it to doc outcomes.",
      },
    ],
  },
  {
    slug: "retail-store-manager",
    title: "Retail Store Manager",
    category: "Operations",
    status: "published",
    answer:
      "A retail store manager resume leads with sales, labor, shrink, and customer metrics you owned, then staffing and operations systems named in the posting. Keep formatting simple and ATS-parseable so multi-unit retailers can find your keyword matches quickly.",
    hardSkills: [
      "P&L / sales targets",
      "Labor scheduling",
      "Inventory & shrink control",
      "POS systems",
      "Visual merchandising oversight",
      "Hiring & coaching",
      "Mystery shop / NPS follow-up",
      "Loss prevention partnership",
      "Opening / closing compliance",
      "Vendor coordination",
    ],
    softSkills: ["People leadership", "Conflict de-escalation", "Pace under peak traffic", "Accountability"],
    atsKeywords: [
      "store manager",
      "retail management",
      "sales performance",
      "team leadership",
      "inventory management",
      "customer experience",
      "shrink reduction",
      "workforce scheduling",
      "key performance indicators",
      "visual standards",
      "loss prevention",
      "multi-unit ready",
    ],
    bullets: [
      "Grew year-over-year store sales 11% while holding labor under plan for three consecutive quarters.",
      "Cut shrink 60 bps through cycle counts and coaching on high-loss categories.",
      "Raised average NPS 8 points by redesigning peak-hour staffing and recovery routines.",
      "Hired and onboarded 22 associates with 90-day retention above district average.",
      "Led a remodel reset completed overnight with zero safety incidents.",
      "Coached three assistants who promoted into manager-in-training roles within 18 months.",
    ],
    recruiterLook:
      "Retail recruiters hunt for numbers: sales vs plan, shrink, labor, and people outcomes. Soft 'team player' language without KPIs rarely clears district screens. Match the retailer's system names when true.",
    tips: [
      "Put the strongest store KPI in the first bullet of each role.",
      "Mention multi-unit or volume context if the posting asks for it.",
      "Keep the resume to one or two pages max for store leadership roles.",
    ],
    salaryNote:
      "Store manager pay includes base plus bonus potential that varies by banner and volume; confirm ranges with district peers and public retail salary surveys.",
    template: "ats",
    faq: [
      {
        question: "Should I list every POS system I have used?",
        answer:
          "List current and posting-named systems. Older systems can sit in a short skills line if space allows.",
      },
      {
        question: "How do I show leadership without sounding soft?",
        answer:
          "Use retention, promotion, and coaching outcomes with numbers. Leadership is a result, not an adjective.",
      },
      {
        question: "Is a two-page retail resume acceptable?",
        answer:
          "One page is preferred for single-store managers; two pages can work for multi-unit or long tenures with dense KPIs.",
      },
    ],
  },
  {
    slug: "supply-chain-analyst",
    title: "Supply Chain Analyst",
    category: "Operations",
    status: "published",
    answer:
      "A supply chain analyst resume proves planning and data impact - forecast accuracy, inventory turns, cost-to-serve, on-time delivery - with tools like Excel, SQL, and ERP modules named in the posting. Keep a clean ATS layout so logistics keyword screens surface you.",
    hardSkills: [
      "Demand planning / forecasting",
      "Inventory optimization",
      "Excel (advanced) / Sheets",
      "SQL",
      "ERP (SAP / Oracle / NetSuite)",
      "KPI dashboards",
      "Supplier performance analysis",
      "Logistics cost modeling",
      "Safety stock methods",
      "Process mapping",
    ],
    softSkills: ["Analytical storytelling", "Cross-functional influence", "Detail under ambiguity", "Meeting cadence ownership"],
    atsKeywords: [
      "supply chain",
      "demand planning",
      "inventory analysis",
      "forecast accuracy",
      "logistics",
      "procurement analytics",
      "SKU rationalization",
      "OTIF",
      "S&OP",
      "ERP",
      "cost reduction",
      "supply chain analyst",
    ],
    bullets: [
      "Improved forecast MAPE 6 points on A-class SKUs through segmentation and weekly exception reviews.",
      "Reduced excess inventory $1.2M by flagging dead stock and aligning buys to revised demand.",
      "Built an OTIF dashboard adopted in S&OP, cutting prep time for leadership reviews in half.",
      "Analyzed expedite spend and recommended mode shifts that saved 9% on a key lane.",
      "Partnered with procurement on supplier scorecards covering quality, cost, and delivery.",
      "Automated a SQL + spreadsheet refresh that eliminated a manual Monday data pull for planners.",
    ],
    recruiterLook:
      "Supply chain screens look for quantified planning outcomes and tool fluency. Generic 'analyzed data' bullets without SKU, cost, or service metrics underperform. Match ERP and planning terms from the JD.",
    tips: [
      "State the industry context (retail, manufacturing, CPG) near the top.",
      "Translate academic models into business outcomes.",
      "Show stakeholder impact - who used your analysis to decide.",
    ],
    salaryNote:
      "Analyst compensation varies by industry and whether the role leans planning vs logistics; check APICS-adjacent salary surveys and local listings.",
    template: "ats",
    faq: [
      {
        question: "Do I need SQL on a supply chain analyst resume?",
        answer:
          "Include SQL when the posting lists it or you used it for real pulls. Excel-only roles still exist - match the JD rather than overclaiming.",
      },
      {
        question: "Should certifications like CSCP appear?",
        answer:
          "Yes when relevant to the level and named by employers you target. Place them near education or a certs line.",
      },
      {
        question: "How technical should forecast methods sound?",
        answer:
          "Name methods briefly, then lead with business results. Interviews can go deeper on models.",
      },
    ],
  },
  {
    slug: "paralegal",
    title: "Paralegal",
    category: "Legal",
    status: "published",
    answer:
      "A paralegal resume highlights practice area, matter support, filings, discovery volume, and tools such as case management or review platforms named in the posting. Emphasize accuracy, deadlines met, and confidentiality discipline in a conservative single-column ATS-safe layout that legal employers can parse.",
    hardSkills: [
      "Legal research",
      "Document drafting / proofing",
      "E-filing",
      "Discovery / document review",
      "Case management software",
      "Citation checking",
      "Client intake support",
      "Calendar / docketing",
      "Privilege logging basics",
      "Transcript / exhibit organization",
    ],
    softSkills: ["Discretion", "Deadline rigor", "Written precision", "Calm under court timelines"],
    atsKeywords: [
      "paralegal",
      "litigation support",
      "legal research",
      "discovery",
      "e-filing",
      "case management",
      "document review",
      "trial preparation",
      "corporate governance support",
      "contracts administration",
      "compliance support",
      "attorney support",
    ],
    bullets: [
      "Supported 30+ active matters with docketing accuracy that avoided missed filing deadlines for two years.",
      "Prepared exhibit binders and timelines used in three hearings without courtroom corrections.",
      "First-pass reviewed 8k documents in a discovery set, flagging key issues for attorney escalation.",
      "Drafted routine correspondence and discovery responses under attorney supervision with low rewrite rates.",
      "Implemented a matter checklist that cut new-file setup time 35% for the practice group.",
      "Trained two junior paralegals on e-filing quirks for state and federal portals.",
    ],
    recruiterLook:
      "Legal recruiters scan for practice area fit, software, and evidence you protect deadlines. Casual creative formatting looks unprofessional in this field. Keyword-match litigation vs corporate language to the JD.",
    tips: [
      "State jurisdiction and practice area near the top.",
      "Never invent bar credentials - paralegal vs attorney must be crystal clear.",
      "Quantify matter volume and deadline reliability.",
    ],
    salaryNote:
      "Paralegal pay depends on market, practice area, and firm size; use local legal staffing reports rather than a single national figure.",
    template: "ats",
    faq: [
      {
        question: "Should paralegals list every court they have filed in?",
        answer:
          "List primary venues and those named in the posting. A short 'additional venues' note can cover the rest.",
      },
      {
        question: "Are certificates required on the resume?",
        answer:
          "Include ABA-approved or state certificates when you have them and employers in your market expect them.",
      },
      {
        question: "How do I handle confidential matter names?",
        answer:
          "Use generic descriptions (industry, matter type) unless public. Never expose sealed or sensitive client details.",
      },
    ],
  },
  {
    slug: "medical-assistant",
    title: "Medical Assistant",
    category: "Healthcare",
    status: "published",
    answer:
      "A medical assistant resume covers clinical and administrative scope - vitals, injections if certified, EHR, scheduling, patient flow - using credentials and system names from the posting. Keep HIPAA-aware wording and an ATS-plain layout for health-system screens.",
    hardSkills: [
      "Vital signs & rooming",
      "EHR (Epic / Cerner / eClinicalWorks)",
      "Appointment scheduling",
      "Phlebotomy or injections (if certified)",
      "Patient intake / insurance basics",
      "Sterile technique support",
      "Vaccine administration (if authorized)",
      "Referral coordination",
      "Inventory of clinical supplies",
      "Patient education handoffs",
    ],
    softSkills: ["Bedside manner", "Team communication", "Multitasking in clinic pace", "Empathy"],
    atsKeywords: [
      "medical assistant",
      "clinical support",
      "electronic health records",
      "patient care",
      "vital signs",
      "scheduling",
      "CMA or RMA",
      "ambulatory care",
      "HIPAA",
      "front desk clinical",
      "injections",
      "care team",
    ],
    bullets: [
      "Roomed 18–22 patients per shift with accurate vitals and chart prep before provider entry.",
      "Cut average check-in wait 4 minutes by redesigning intake form pre-visit reminders.",
      "Maintained vaccine fridge logs with zero compliance findings across two audits.",
      "Trained three new MAs on EHR rooming templates used clinic-wide.",
      "Coordinated referrals that raised completion rate 12 points vs prior quarter baseline.",
      "Supported a flu clinic day serving 200+ patients with zero safety incidents.",
    ],
    recruiterLook:
      "Clinic recruiters look for credential status, EHR names, and reliable patient-flow metrics. Soft caring language without clinical scope underperforms ATS filters. Match outpatient vs specialty keywords to the JD.",
    tips: [
      "Put licensure/certification and expiration status near the top.",
      "Only list procedures you are authorized to perform.",
      "Name the EHR exactly as posted when you used it.",
    ],
    salaryNote:
      "MA wages vary by state, union status, and specialty clinic vs primary care; check BLS occupational data and local job posts for ranges.",
    template: "ats",
    faq: [
      {
        question: "Should medical assistants include CPR certification?",
        answer:
          "Yes when current - many clinics require it. Place it with other credentials.",
      },
      {
        question: "How do I show both front desk and clinical work?",
        answer:
          "Use separate bullet groups or clearly mixed bullets that show both scopes if the posting wants a blended MA role.",
      },
      {
        question: "Is a photo appropriate on a medical resume?",
        answer:
          "No for most US applications. Keep the file text-based and ATS-safe unless a specific employer instructs otherwise.",
      },
    ],
  },
  {
    slug: "hotel-manager",
    title: "Hotel Manager",
    category: "Hospitality",
    status: "published",
    answer:
      "A hotel manager resume leads with occupancy, RevPAR, guest satisfaction, and labor or cost control you owned, plus PMS and brand standards from the posting. Use a clean ATS format so hospitality groups can parse your property metrics quickly.",
    hardSkills: [
      "PMS (Opera / equivalent)",
      "RevPAR / occupancy management",
      "Guest recovery",
      "Labor & scheduling",
      "Budget ownership",
      "Brand standards audits",
      "Vendor & contractor coordination",
      "Safety & security drills",
      "Upselling programs",
      "Team hiring & training",
    ],
    softSkills: ["Service leadership", "Crisis calm", "Cultural fluency", "Owner/GM communication"],
    atsKeywords: [
      "hotel manager",
      "hospitality management",
      "RevPAR",
      "guest satisfaction",
      "property operations",
      "front office",
      "housekeeping oversight",
      "PMS",
      "revenue management collaboration",
      "brand compliance",
      "labor productivity",
      "guest experience",
    ],
    bullets: [
      "Lifted guest satisfaction 12 points YoY while holding payroll under budget in a 180-key property.",
      "Improved RevPAR 8% through packaging and weekend upsell training for front office.",
      "Cut breakfast waste 15% with tighter forecasting tied to occupancy pace.",
      "Led a brand audit prep that scored above corporate average on cleanliness and service standards.",
      "Hired and stabilized a night audit bench, reducing overtime 20% in six months.",
      "Managed a weather emergency stayover plan with zero safety incidents and clear guest comms.",
    ],
    recruiterLook:
      "Hospitality recruiters want property metrics and brand/PMS fit. Soft 'hospitality passion' without RevPAR or GSS numbers rarely clears screens. Match full-service vs limited-service language to the JD.",
    tips: [
      "State key count and brand/flag near each property role.",
      "Lead with GSS/RevPAR/occupancy outcomes.",
      "Mention languages if the posting serves international guests.",
    ],
    salaryNote:
      "Hotel manager pay includes base plus potential bonuses tied to GOP or guest scores; ranges differ sharply by brand and city.",
    template: "ats",
    faq: [
      {
        question: "Should I list every PMS I have touched?",
        answer:
          "List primary systems and those in the posting. Older systems can be summarized if space is tight.",
      },
      {
        question: "How do I show multi-department leadership?",
        answer:
          "Name departments overseen and one metric per major area - rooms, F&B, maintenance - without writing a novel.",
      },
      {
        question: "Are hospitality degrees required on the resume?",
        answer:
          "List degrees and certifications you have. Experience metrics still carry most of the screen for manager roles.",
      },
    ],
  },
  {
    slug: "warehouse-supervisor",
    title: "Warehouse Supervisor",
    category: "Operations",
    status: "published",
    answer:
      "A warehouse supervisor resume emphasizes safety, throughput, accuracy, and labor leadership - units per hour, OTIF, incident rates - with WMS and equipment keywords from the posting. Keep bullets numeric and the layout ATS-plain for logistics employers.",
    hardSkills: [
      "WMS systems",
      "Shift supervision",
      "Pick / pack / ship metrics",
      "Safety (OSHA awareness)",
      "Cycle counting",
      "Labor planning",
      "RF scanner workflows",
      "Carrier pickup coordination",
      "5S / lean basics",
      "Incident investigation",
    ],
    softSkills: ["Frontline coaching", "Fair conflict handling", "Pace setting", "Clear shift handoffs"],
    atsKeywords: [
      "warehouse supervisor",
      "distribution center",
      "WMS",
      "inventory accuracy",
      "shipping and receiving",
      "productivity",
      "safety compliance",
      "order fulfillment",
      "labor management",
      "lean warehouse",
      "quality control",
      "team lead",
    ],
    bullets: [
      "Raised lines picked per hour 14% through slotting changes and mid-shift coaching.",
      "Drove 180 days without a recordable incident on a 40-person shift.",
      "Improved inventory accuracy from 96.2% to 99.1% via tightened cycle-count cadence.",
      "Cut late carrier misses 30% by redesigning dock wave timing.",
      "Onboarded 25 seasonal associates with a buddy system that held quality above site average.",
      "Led a 5S reset on packing stations that reduced travel time for top SKUs.",
    ],
    recruiterLook:
      "Warehouse screens are metric-driven: safety, rate, quality, and attendance culture. Soft leadership claims without numbers fail both ATS and ops interviews. Match WMS and equipment terms to the job description exactly when they are true of your shifts.",
    tips: [
      "Put shift size and facility type (ambient, cold, e-com) near the role header.",
      "Lead with safety and throughput outcomes.",
      "Avoid slang that outside recruiters will not parse.",
    ],
    salaryNote:
      "Supervisor pay varies by shift differential, union status, and region; check local DC listings and logistics salary surveys.",
    template: "ats",
    faq: [
      {
        question: "Should forklift certification appear on the resume?",
        answer:
          "Yes when current and relevant. Note the certification type and date if space allows.",
      },
      {
        question: "How do I show promotion from associate to supervisor?",
        answer:
          "Use separate role entries with dates and show the scope jump - headcount, metrics owned - clearly.",
      },
      {
        question: "Is lean/Six Sigma worth listing?",
        answer:
          "List belt or training when real and when the posting values continuous improvement. Tie to a project outcome.",
      },
    ],
  },
  {
    slug: "career-coach",
    title: "Career Coach",
    category: "Education",
    status: "published",
    answer:
      "A career coach resume proves client outcomes - placements, interview conversion, program completion - and methods like assessments, resume strategy, and workshop delivery. Match coaching niche keywords in the posting while keeping a professional ATS-safe layout.",
    hardSkills: [
      "Career assessment tools",
      "Resume & LinkedIn strategy",
      "Interview coaching",
      "Workshop facilitation",
      "Job search accountability systems",
      "Labor market research",
      "CRM / client tracking",
      "Group coaching",
      "Salary negotiation frameworks",
      "Outplacement program delivery",
    ],
    softSkills: ["Active listening", "Motivational interviewing style", "Boundaries", "Empathetic challenge"],
    atsKeywords: [
      "career coaching",
      "career counselor",
      "outplacement",
      "job search strategy",
      "interview preparation",
      "resume coaching",
      "career transition",
      "workforce development",
      "client outcomes",
      "workshop facilitation",
      "professional development",
      "career coach",
    ],
    bullets: [
      "Coached 60+ clients in 12 months with 70% landing roles within their target window.",
      "Designed a four-session interview clinic that raised mock-to-live offer conversion for participants.",
      "Delivered weekly workshops for an outplacement cohort of 40 with 4.7/5 average satisfaction.",
      "Built resume critique rubrics adopted by three partner coaches for consistency.",
      "Partnered with university career services on a career-change series for mid-career alumni.",
      "Tracked pipeline in CRM, cutting no-show rates 25% with reminder and homework protocols.",
    ],
    recruiterLook:
      "Coaching employers look for niche (exec, tech, career change), credentials, and measured client results. Vague 'helped people find jobs' without numbers underperforms. Align language to counseling vs coaching regulations in your market.",
    tips: [
      "State niche and populations served near the top.",
      "Include certifications (ICF, etc.) only if earned and relevant.",
      "Separate employed coaching roles from side practice clearly.",
    ],
    salaryNote:
      "Career coach income mixes salary and private practice; ranges depend on corporate outplacement vs independent models in your region.",
    template: "ats",
    faq: [
      {
        question: "Should career coaches show their own resume metrics?",
        answer:
          "Yes - practice what you teach. Quantified client outcomes and workshop ratings beat soft branding language.",
      },
      {
        question: "Do I need counseling licenses on the resume?",
        answer:
          "List licenses only if you hold them and the role requires clinical counseling. Do not blur coaching with therapy credentials you lack.",
      },
      {
        question: "How do I handle confidential client stories?",
        answer:
          "Aggregate outcomes and anonymize. Never expose identifiable client details on a public resume.",
      },
    ],
  },
  {
    slug: "research-assistant",
    title: "Research Assistant",
    category: "Research",
    status: "published",
    answer:
      "A research assistant resume highlights methods, tools, publications or posters, and lab or field contributions with honest scope. Name software, assays, or survey methods from the posting and keep a parseable academic-friendly layout for university and lab ATS screens.",
    hardSkills: [
      "Literature review",
      "Data collection & cleaning",
      "Statistical analysis (R / SPSS / Python)",
      "Experimental protocols",
      "Survey design support",
      "Citation management",
      "Lab safety compliance",
      "Figure / table preparation",
      "IRB or ethics paperwork support",
      "Technical writing drafts",
    ],
    softSkills: ["Meticulousness", "PI communication", "Patience with iteration", "Independent follow-through"],
    atsKeywords: [
      "research assistant",
      "data analysis",
      "literature review",
      "experimental design",
      "qualitative research",
      "quantitative methods",
      "lab techniques",
      "SPSS or R",
      "manuscript support",
      "conference poster",
      "grant support",
      "academic research",
    ],
    bullets: [
      "Cleaned and coded a 2,400-respondent survey dataset used in a peer-reviewed submission.",
      "Ran weekly assays with under 2% repeat-rate due to protocol deviations across a semester.",
      "Co-authored a poster presented at a national conference with PI and two graduate students.",
      "Built an R pipeline that cut figure regeneration time from hours to minutes for the lab.",
      "Screened 150 papers for a systematic review and maintained a shared screening log.",
      "Trained three undergraduate assistants on data entry standards that improved inter-rater reliability.",
    ],
    recruiterLook:
      "PIs and lab managers look for method fit and reliability more than flashy verbs. Overclaiming independent PI-level ownership hurts trust. Match wet lab versus social science keywords carefully to the job description, and keep contribution scope honest on papers and posters.",
    tips: [
      "Name the lab, PI, and methods near each role.",
      "Separate coursework projects from paid/credit RA work.",
      "List publications/posters in a short section with clear status (submitted, accepted).",
    ],
    salaryNote:
      "RA pay is often stipend or hourly and varies by institution and field; check the posting and graduate school norms rather than private-sector averages.",
    template: "latex",
    faq: [
      {
        question: "Should research assistants use a CV instead of a resume?",
        answer:
          "Use a CV when applying to academic labs that expect full publication lists. Use a one- to two-page resume for industry research roles unless told otherwise.",
      },
      {
        question: "How do I list papers in progress?",
        answer:
          "Mark status honestly (in prep, submitted, under review). Do not imply published credit you do not have.",
      },
      {
        question: "Are GPA and coursework required?",
        answer:
          "Include them for early-career academic RA roles when strong or requested. Method skills and lab outcomes matter more as experience grows.",
      },
    ],
  },
];

/** Published roles only - the build + sitemap surface. */
export function publishedRoles(): Role[] {
  return roles.filter((r) => r.status === "published");
}

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug && r.status === "published");
}

/** Same-category siblings first, then fill from other categories. */
export function relatedRoles(slug: string, limit = 3): Role[] {
  const current = getRole(slug);
  if (!current) return [];
  const published = publishedRoles().filter((r) => r.slug !== slug);
  const sameCategory = published.filter((r) => r.category === current.category);
  const rest = published.filter((r) => r.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
