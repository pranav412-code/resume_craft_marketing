/**
 * P3 template-style registry — /resume-templates/{slug} pages.
 * Slugs double as the CTA `template` deep-link param the app pre-selects.
 */
export type TemplateStyle = {
  slug: string;
  name: string;
  /** Who this family is for — one line. */
  audience: string;
  description: string;
  /** 40–60 word AEO answer block. */
  answer: string;
  features: string[];
  atsNotes: string;
  faq: { question: string; answer: string }[];
};

export const templateStyles: TemplateStyle[] = [
  {
    slug: "ats",
    name: "ATS Classic",
    audience: "Any role screened by applicant tracking systems — the safe default.",
    description:
      "Single column, standard headings, zero decoration. Built to parse perfectly first and read cleanly second.",
    answer:
      "The ATS Classic template is a single-column resume with standard section headings, common fonts, and no graphics — the layout applicant tracking systems parse most reliably. Choose it whenever applications go through an online portal; it removes every known parsing risk while staying clean for the human read.",
    features: [
      "Single-column, top-to-bottom reading order",
      "Standard headings parsers key on (Experience, Skills, Education)",
      "No tables, text boxes, icons, or images",
      "Conventional date formats and contact block in the body",
      "Exports as text-based PDF",
    ],
    atsNotes:
      "This family exists to make parsing a non-issue: every element is real text in a linear order. If a posting funnels through Workday, Greenhouse, Lever, or any portal — this is the lowest-risk choice.",
    faq: [
      {
        question: "Is a plain template a disadvantage with human readers?",
        answer:
          "No — recruiters read hundreds of resumes and reward scanability over decoration. Clear hierarchy and strong quantified bullets differentiate you; ornament mostly adds parsing risk without adding signal.",
      },
      {
        question: "Can I add color to an ATS template?",
        answer:
          "Restrained accent color on headings is parse-safe — color doesn't affect text extraction. Keep body text dark on white and never encode information in color alone.",
      },
      {
        question: "Which roles should avoid this template?",
        answer:
          "Almost none. Even design candidates benefit from an ATS-safe version for portal applications, keeping a separate portfolio for visual proof.",
      },
    ],
  },
  {
    slug: "modern",
    name: "Modern Professional",
    audience: "Client-facing and managerial roles where polish carries weight.",
    description:
      "Clean typographic hierarchy with a restrained accent — contemporary without sacrificing parseability.",
    answer:
      "The Modern Professional template adds typographic polish — a stronger name block, accent rules, refined spacing — while keeping the single-column, text-only structure that applicant tracking systems require. It suits managerial, sales, and client-facing roles where the printed or attached resume is part of the impression.",
    features: [
      "Distinct name/title block with accent color",
      "Single column — same parse safety as ATS Classic",
      "Tighter visual rhythm for dense senior resumes",
      "Summary line styled for the six-second skim",
      "PDF export tuned for both screen and print",
    ],
    atsNotes:
      "All styling is typographic — no columns, graphics, or text boxes — so parsing behavior matches the ATS Classic family.",
    faq: [
      {
        question: "Modern vs ATS Classic — how do I choose?",
        answer:
          "Same parse safety; the difference is tone. Choose Modern when the resume will also be read as an attachment or printout — leadership, sales, consulting. Choose Classic when the portal is the only audience.",
      },
      {
        question: "Will the accent color survive ATS parsing?",
        answer:
          "Color is ignored by parsers — it neither helps nor hurts extraction. It only affects the human read, which is the point.",
      },
      {
        question: "Is this template suitable for freshers?",
        answer:
          "It works, but freshers usually benefit from the Fresher family's education-first ordering. Modern assumes experience carries the page.",
      },
    ],
  },
  {
    slug: "latex",
    name: "LaTeX (Developer / Academic)",
    audience: "Software engineers, researchers, and academics who want typeset precision.",
    description:
      "Typeset-quality output with exportable .tex source — version-controllable and pixel-consistent.",
    answer:
      "The LaTeX template produces typeset-quality documents and exports the .tex source itself, so your resume becomes plain text you can version-control and rebuild identically anywhere. It is the standard in academia and a strong signal in software engineering — and almost no resume builder offers it.",
    features: [
      "True LaTeX typesetting (consistent kerning, spacing, hyphenation)",
      "Downloadable .tex source, not just the PDF",
      "Git-friendly: diff and version your resume like code",
      "Clean single-column structure — parse-safe despite the typography",
      "Suited to publications/projects-heavy content",
    ],
    atsNotes:
      "The compiled PDF is text-based and single-column, so it parses like any ATS-safe resume. The typography is the upgrade; the structure stays conservative.",
    faq: [
      {
        question: "Do I need to know LaTeX to use this template?",
        answer:
          "No. ResumeCraft generates and compiles the LaTeX for you — you edit content in the builder. Engineers who want the .tex source can export it; everyone else just downloads the PDF.",
      },
      {
        question: "Why would a software engineer pick LaTeX?",
        answer:
          "Signal and control: the output looks deliberate, and the source lives in git alongside your other work. Hiring managers in engineering recognize the format instantly.",
      },
      {
        question: "Is LaTeX overkill for non-technical roles?",
        answer:
          "Mostly yes — the benefits (source control, typesetting) matter to technical and academic audiences. Other roles get the same outcomes faster from Classic or Modern.",
      },
    ],
  },
  {
    slug: "fresher",
    name: "Fresher / Student",
    audience: "First jobs, internships, and campus placements — India-format aware.",
    description:
      "Education-first ordering with projects and internships doing the heavy lifting.",
    answer:
      "The Fresher template reorders the resume for candidates without work history: education, projects, and internships lead, followed by skills and achievements. It matches the single-page, education-first format Indian campus placements and first-job applications expect, while staying fully ATS-parseable.",
    features: [
      "Education and projects above experience",
      "Project blocks with stack/tools and measurable outcomes",
      "Internships and training formatted as experience",
      "Single page by design",
      "Aligned with Indian fresher-format expectations (no photo, no biodata fields)",
    ],
    atsNotes:
      "Section reordering doesn't affect parsing — parsers detect sections by heading, not position. The family keeps standard headings so portals classify everything correctly.",
    faq: [
      {
        question: "Should a fresher resume include CGPA?",
        answer:
          "Include it when it clears the common cutoffs employers state (often 7.0+/60%+) or when the posting asks. Below that, lead with projects and skills — many screens weight demonstrated work over grades.",
      },
      {
        question: "What goes in projects if I only have coursework?",
        answer:
          "Reframe the strongest coursework as projects: objective, tools, your specific contribution, and a measured result. Two well-told projects beat ten listed titles.",
      },
      {
        question: "Is the biodata format ever required?",
        answer:
          "Only where explicitly requested (some government and traditional contexts). Corporate and campus hiring expects a concise resume; personal details like date of birth or family information should stay off it.",
      },
    ],
  },
];

export function getTemplateStyle(slug: string): TemplateStyle | undefined {
  return templateStyles.find((t) => t.slug === slug);
}
