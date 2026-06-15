/**
 * P7 comparison registry — /compare/{slug} pages.
 *
 * ACCURACY RULE: competitor claims stay general and durable (their broad
 * positioning), never specific prices or feature minutiae that go stale or
 * wrong. ResumeCraft's side carries the specifics. VERIFY the `knownFor`
 * lines against each competitor's live site before launch — see README TODO.
 */
export type Competitor = {
  slug: string; // "{name}-alternative"
  name: string;
  /** Durable, fair one-line description of what they're known for. */
  knownFor: string;
  /** Where the products genuinely differ — ResumeCraft's angle. */
  edges: { title: string; detail: string }[];
  /** Honest line about when the competitor may fit better. */
  honestFit: string;
  faq: { question: string; answer: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: "zety-alternative",
    name: "Zety",
    knownFor:
      "One of the most popular template-led resume builders, with a large template gallery and guided content suggestions.",
    edges: [
      {
        title: "Tailoring to a specific job description",
        detail:
          "ResumeCraft's core flow rewrites and scores your resume against the exact posting you paste — not generic phrasing suggestions. The output is matched to one job, which is what ATS ranking actually measures.",
      },
      {
        title: "ATS score you can see",
        detail:
          "Every draft gets a transparent compatibility score with the missing keywords listed, so you fix gaps before applying instead of trusting that a template is 'ATS-friendly'.",
      },
      {
        title: "LaTeX export",
        detail:
          "Alongside PDF, ResumeCraft exports .tex source — typeset quality and version control that template-led builders don't offer.",
      },
      {
        title: "INR-native pricing",
        detail:
          "India pays in rupees via Razorpay (UPI, cards, netbanking) at INR-market prices, not a dollar conversion.",
      },
    ],
    honestFit:
      "If you want maximum template variety and prefer composing content yourself with light suggestions, a template-led builder like Zety is a reasonable fit. If the goal is passing screening for specific jobs, tailoring + scoring matters more than gallery size.",
    faq: [
      {
        question: "What is the main difference between ResumeCraft and Zety?",
        answer:
          "Approach: Zety leads with templates and guided phrasing; ResumeCraft leads with AI tailoring against the job description you're applying to, plus an ATS score that shows the match. One optimizes appearance and wording; the other optimizes screening outcomes per application.",
      },
      {
        question: "Can I switch from Zety to ResumeCraft easily?",
        answer:
          "Yes — export your current resume as PDF or DOCX and upload it. ResumeCraft parses it into structured sections automatically; nothing is retyped.",
      },
      {
        question: "Is ResumeCraft cheaper than Zety?",
        answer:
          "Pricing models differ and change; compare current plans directly. ResumeCraft starts free with full-flow credits and bills natively in INR for India and USD elsewhere — see the pricing page for live numbers.",
      },
    ],
  },
  {
    slug: "jobscan-alternative",
    name: "Jobscan",
    knownFor:
      "The best-known resume-vs-job-description match checker, focused on ATS keyword analysis and match reports.",
    edges: [
      {
        title: "Fixing, not just finding",
        detail:
          "A match report tells you what's missing; ResumeCraft's AI rewrites the bullets to close those gaps from your real experience, then re-scores. Analysis and repair in one loop instead of manual editing after every scan.",
      },
      {
        title: "A full builder underneath",
        detail:
          "Templates, structured editing, and PDF/LaTeX export live in the same product — no second tool needed after the scan says 'improve'.",
      },
      {
        title: "Per-application versions",
        detail:
          "Tailored copies are first-class: keep a scored version per job instead of one master file you re-scan repeatedly.",
      },
      {
        title: "INR-native pricing",
        detail:
          "Razorpay-billed INR plans for India alongside USD — relevant if scan-tool pricing in dollars has been the blocker.",
      },
    ],
    honestFit:
      "If you only want diagnostic reports on an existing resume you maintain elsewhere, a dedicated checker like Jobscan does that job well. ResumeCraft is built for closing the loop — diagnose, rewrite, re-score, export — in one place.",
    faq: [
      {
        question: "Does ResumeCraft show a match score like Jobscan?",
        answer:
          "Yes — paste the job description and every draft is scored for ATS compatibility and keyword coverage, with missing terms listed. The difference is the next step: the AI applies fixes from your own experience instead of leaving the rewrite to you.",
      },
      {
        question: "Which is better for high-volume applications?",
        answer:
          "A rewrite loop saves more time per application than a report loop: tailoring that took an editing session becomes minutes. For dozens of applications, automated rewriting plus per-job versions compounds the advantage.",
      },
      {
        question: "Can I use ResumeCraft just to check a resume I built elsewhere?",
        answer:
          "Yes — upload it, paste a posting, and read the score and gap list without exporting anything. You only build on top if you want the fixes applied.",
      },
    ],
  },
  {
    slug: "rezi-alternative",
    name: "Rezi",
    knownFor:
      "An AI-first resume builder known for ATS-oriented formatting and AI writing features.",
    edges: [
      {
        title: "LaTeX export",
        detail:
          "ResumeCraft exports real .tex source alongside PDF — typeset output and git-friendly versioning that AI builders generally don't provide. A concrete edge for engineers and academics.",
      },
      {
        title: "INR-native pricing for India",
        detail:
          "Razorpay billing with UPI/netbanking at INR-market prices — not a USD plan converted at the card's exchange rate.",
      },
      {
        title: "Fresher / India-format awareness",
        detail:
          "Education-first fresher templates aligned with campus-placement expectations, plus guides written for the Indian market alongside global formats.",
      },
      {
        title: "Score + rewrite against one posting",
        detail:
          "Tailoring and ATS scoring run against the specific job description in one pass, with per-application versions kept separately.",
      },
    ],
    honestFit:
      "Rezi and ResumeCraft overlap most among these comparisons — both are AI-led and ATS-focused. The decision usually comes down to LaTeX export, INR pricing, and India-format support versus Rezi's longer market tenure. Try both free tiers on the same job posting and compare outputs.",
    faq: [
      {
        question: "How is ResumeCraft different from other AI resume builders?",
        answer:
          "Three concrete things: LaTeX source export, native INR pricing via Razorpay, and India-aware fresher formats — combined with job-description tailoring and visible ATS scoring that the category shares. If none of the three matter to you, compare outputs head-to-head on a real posting.",
      },
      {
        question: "Do AI resume builders invent experience?",
        answer:
          "They shouldn't. ResumeCraft rewrites and reorders what your uploaded resume actually contains — phrasing and emphasis change, facts don't. Every AI suggestion is reviewable before export, and fabricated content fails interviews anyway.",
      },
      {
        question: "Which AI resume builder is best for software engineers?",
        answer:
          "Engineers benefit most from exact-keyword tailoring (stacks are literal search terms) and from LaTeX output. ResumeCraft does both; evaluate any alternative on those two axes plus price in your currency.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
