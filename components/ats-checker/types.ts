export interface Issue {
  title: string;
  detail: string;
  /** @deprecated API compat — free checker UI must not show optimizer pitches */
  fix_pitch?: string;
  severity?: string;
  component?: string;
  /** Resume section to improve (Experience, Skills, …) */
  section?: string;
  /** What's weak about this location */
  problem?: string;
  /** Role / bullet pointer when available */
  location?: string | null;
  /** Quoted bullet or line text when available */
  snippet?: string | null;
  /** Deterministic improved example (may include [X]% / [N] placeholders) */
  improved?: string | null;
  /** 1-based bullet index within the role, when available */
  line?: number | null;
}

export interface JDMatch {
  match_percent: number;
  matched: string[];
  missing: string[];
  total: number;
}

export interface AnalysisResult {
  score: number;
  category: string;
  breakdown: Record<string, number>;
  issues: Issue[];
  seniority: string;
  missing_keywords?: string[];
  jd_match?: JDMatch | null;
  // legacy fields still returned by the API
  strengths?: string[];
  weaknesses?: string[];
  keyword_coverage?: {
    matched: string[];
    missing: string[];
    coverage_percent: number;
  } | null;
  issues_locked_count?: number;
}
