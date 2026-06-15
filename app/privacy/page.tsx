import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * ⚠️ TEMPLATE — not legal advice. Drafted to align with:
 *  - Digital Personal Data Protection Act, 2023 (DPDP Act)
 *  - Information Technology Act, 2000 + SPDI Rules, 2011
 *  - IT (Intermediary Guidelines & Digital Media Ethics Code) Rules, 2021
 *  - Consumer Protection (E-Commerce) Rules, 2020
 *  - GDPR / UK GDPR (for non-India users)
 *
 * Counsel MUST review before launch. Replace every [[FILL]] marker.
 */
const PROPRIETOR = "[[FILL: your full legal name as proprietor]]";
const ENTITY = "ResumeCraft"; // SaaS brand name
const REGISTERED_ADDRESS = "[[FILL: operating address (city, state, India)]]";
const PRIVACY_EMAIL = "privacy@resumecraft.app"; // [[FILL: real inbox]]
const GRIEVANCE_EMAIL = "grievance@resumecraft.app"; // [[FILL: real inbox]]
const GRIEVANCE_PHONE = "[[FILL: India phone with country code]]";
const DPO_EMAIL = "dpo@resumecraft.app"; // [[FILL: same as PRIVACY_EMAIL is fine for a solo SaaS]]
const EFFECTIVE = "June 15, 2026";

const PAGE = "/privacy";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, shares, and protects your personal data — drafted to comply with India's DPDP Act 2023, the IT Act 2000, and applicable global privacy law.`,
  path: PAGE,
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Privacy Policy", url: absoluteUrl(PAGE) },
          ])}
        />
        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Privacy Policy
          </nav>
          <h1>Privacy Policy</h1>
          <p className="meta">Effective {EFFECTIVE}</p>

          <p>
            This Privacy Policy is published in accordance with Rule 3(1) of the
            Information Technology (Intermediary Guidelines and Digital Media
            Ethics Code) Rules, 2021 and Rule 4 of the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal
            Data or Information) Rules, 2011 (&quot;SPDI Rules&quot;), and is
            drafted with the Digital Personal Data Protection Act, 2023
            (&quot;DPDP Act&quot;) in mind for India, and the EU/UK GDPR for
            users in those jurisdictions. It explains how {ENTITY} (&quot;{siteConfig.name}&quot;,
            &quot;we&quot;, &quot;us&quot;) — a SaaS service operated as a
            sole proprietorship by {PROPRIETOR} from {REGISTERED_ADDRESS},
            India, and acting as a Data Fiduciary under the DPDP Act —
            collects, uses, shares, and protects personal data when you use
            our website at {siteConfig.url} and the {siteConfig.name}{" "}
            application.
          </p>
          <p>
            By creating an account or using the service, you (the &quot;Data
            Principal&quot; / &quot;you&quot;) consent to processing of your
            personal data as described here. You may withdraw consent at any
            time as set out below.
          </p>

          <h2>1. Personal data we collect</h2>
          <ul>
            <li>
              <strong>Account data.</strong> Email address, name (optional),
              authentication identifiers, and OAuth tokens (Google) handled by
              our authentication provider. Passwords are stored as salted
              hashes, never plaintext.
            </li>
            <li>
              <strong>Resume content you upload or create.</strong> PDF/DOCX
              files, parsed text, the structured resume JSON, job descriptions
              you paste, optimized drafts, and ATS scores. This typically
              includes your name, contact details, work history, education, and
              skills. Some resumes may contain sensitive personal information
              (e.g., disability disclosure, identity documents) — please do not
              include data you do not want processed by AI providers.
            </li>
            <li>
              <strong>Payment and billing data.</strong> Subscriptions and
              credits are processed by Razorpay Software Private Limited
              (&quot;Razorpay&quot;), a Reserve Bank of India authorised
              Payment Aggregator. Razorpay collects card / UPI / netbanking
              details directly; we receive only transaction status, order id,
              payment id, amount, currency, billing country, and partial
              instrument metadata. We do <strong>not</strong> store full card
              numbers or CVV.
            </li>
            <li>
              <strong>Usage and device data.</strong> IP address, approximate
              location derived from IP (used for INR/USD currency detection),
              browser type, device identifiers, pages viewed, time-stamps, and
              error logs.
            </li>
            <li>
              <strong>Marketing attribution.</strong> Where you arrive on the
              app from our marketing site, we record the referring page and
              campaign parameters to understand acquisition.
            </li>
            <li>
              <strong>Cookies and similar technologies.</strong> Essential
              cookies for authentication and session; first-party analytics
              cookies for product usage. We do not use third-party advertising
              cookies. You may control cookies through your browser settings.
            </li>
          </ul>

          <h2>2. Purposes and legal basis for processing</h2>
          <p>
            Under DPDP Act §5–§7 we process personal data only for the
            following specific, lawful purposes, primarily on the legal basis
            of your consent (and, where relevant, &quot;legitimate uses&quot;
            under §7 such as performance of the service and compliance with
            law):
          </p>
          <ul>
            <li>Operating the core service: parsing, AI optimization, ATS scoring, version history, and export of resumes.</li>
            <li>Account creation, authentication, and security (fraud, abuse, and rate-limit enforcement).</li>
            <li>Processing payments, credits, subscriptions, refunds, and invoicing.</li>
            <li>Customer support and grievance redressal.</li>
            <li>Service improvement, aggregated analytics (no individual profiling for advertising).</li>
            <li>Compliance with applicable Indian law, court orders, and lawful requests by government authorities.</li>
            <li>Communications about your account, security, and service changes.</li>
          </ul>

          <h2>3. AI processing of your content</h2>
          <p>
            To tailor and score your resume, the text of your resume and any
            job description you paste are transmitted to third-party
            large-language-model (LLM) providers acting as our processors.
            We transmit only the minimum content needed for the optimization,
            over TLS, and rely on provider terms that prohibit training on
            submitted content where available. We do <strong>not</strong>{" "}
            train our own foundation models on your content. If you do not
            want a particular piece of information processed by an LLM, do
            not include it in the resume or job description you submit.
          </p>

          <h2>4. Sharing and disclosure</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade personal data. We
            share it only with the following categories of recipients, under
            written contracts that require equivalent protection:
          </p>
          <ul>
            <li><strong>Authentication and database provider</strong> — for sign-in, account storage, and resume storage.</li>
            <li><strong>Razorpay</strong> — payment processing (regulated by the Reserve Bank of India).</li>
            <li><strong>LLM/AI providers</strong> — third-party inference endpoints for resume optimization and scoring.</li>
            <li><strong>Hosting and CDN providers</strong> — to run and deliver the application.</li>
            <li><strong>Email and customer-support tooling</strong> — for transactional and support emails.</li>
            <li><strong>Government and law-enforcement authorities</strong> — only when required by valid order under Indian law, including §69 of the IT Act, 2000 or directions under the DPDP Act.</li>
          </ul>

          <h2>5. Cross-border transfers</h2>
          <p>
            Our processors and infrastructure operate globally; your personal
            data may be processed outside India (including in the United States
            and the European Economic Area). DPDP Act §16 permits cross-border
            transfer except to countries notified by the Central Government as
            restricted; we will not transfer data to any such notified country.
            For EU/UK users, transfers outside the EEA/UK rely on Standard
            Contractual Clauses or other lawful safeguards.
          </p>

          <h2>6. Retention and deletion</h2>
          <p>
            We retain your account and resume content while your account is
            active. Specific retention windows:
          </p>
          <ul>
            <li><strong>Account profile</strong>: until you delete the account.</li>
            <li><strong>Resumes and AI-generated drafts</strong>: until you delete them, subject to your active resume-slot limit.</li>
            <li><strong>Payment records and invoices</strong>: retained up to 8 financial years as required by Indian tax and accounting law.</li>
            <li><strong>Security and audit logs</strong>: up to 180 days under Rule 3 of the IT (Intermediary) Rules, 2021 and CERT-In Directions of April 2022.</li>
            <li><strong>Aggregated analytics</strong>: indefinitely, in non-identifiable form.</li>
          </ul>
          <p>
            On account deletion we erase personal data within 30 days, except
            records we are legally required to retain (e.g., financial and tax
            records), which we will isolate from active processing.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement &quot;reasonable security practices and procedures&quot;
            within the meaning of §43A of the IT Act, 2000 and Rule 8 of the
            SPDI Rules, including: encryption in transit (TLS 1.2+), at-rest
            encryption of database and file storage, principle-of-least-
            privilege access controls, secret rotation, vulnerability patching,
            audit logging, and a written information security policy. No system
            is perfectly secure; in the event of a personal data breach we will
            notify the Data Protection Board of India and affected users in
            accordance with DPDP Act §8(6) and CERT-In Directions.
          </p>

          <h2>8. Your rights as a Data Principal</h2>
          <p>
            Subject to applicable law you have the following rights with
            respect to your personal data:
          </p>
          <ul>
            <li><strong>Right to access</strong> a summary of your personal data and processing (DPDP Act §11).</li>
            <li><strong>Right to correction and erasure</strong> of inaccurate or no-longer-required data (§12).</li>
            <li><strong>Right to grievance redressal</strong> via the Grievance Officer named below (§13). Unresolved grievances may be escalated to the Data Protection Board of India.</li>
            <li><strong>Right to nominate</strong> another person to exercise your rights in case of incapacity or death (§14).</li>
            <li><strong>Right to withdraw consent</strong> at any time, with effect from withdrawal; processing already done remains lawful (§6(4)–(6)).</li>
            <li><strong>Right to data portability and erasure</strong> for EU/UK users under GDPR Articles 17 & 20.</li>
          </ul>
          <p>
            To exercise any right, write to {DPO_EMAIL}. We will respond within
            30 days. Identity verification may be required.
          </p>

          <h2>9. Children</h2>
          <p>
            The service is intended for users aged 18 and above. Under DPDP Act
            §9, processing personal data of a child (under 18) requires
            verifiable parental or guardian consent and prohibits behavioural
            tracking or targeted advertising directed at children. We do not
            knowingly collect personal data of children. If you believe a child
            has provided us data, contact {PRIVACY_EMAIL} for immediate
            deletion.
          </p>

          <h2>10. Grievance Officer (India)</h2>
          <p>
            As required by Rule 3(2) of the IT (Intermediary) Rules, 2021 and
            DPDP Act §10(2)(b):
          </p>
          <ul>
            <li><strong>Name:</strong> {PROPRIETOR}</li>
            <li><strong>Designation:</strong> Proprietor & Grievance Officer</li>
            <li><strong>Email:</strong> {GRIEVANCE_EMAIL}</li>
            <li><strong>Phone:</strong> {GRIEVANCE_PHONE}</li>
            <li><strong>Postal:</strong> {ENTITY}, {REGISTERED_ADDRESS}</li>
            <li><strong>Hours:</strong> Monday–Friday, 10:00–18:00 IST (excluding public holidays)</li>
          </ul>
          <p>
            We acknowledge complaints within 24 hours and resolve them within
            15 days. If your complaint relates to content removal, we act on
            actual knowledge within the timelines prescribed by the IT Rules.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this policy. Material changes will be notified by
            email or in-app notice at least 7 days before they take effect, and
            the &quot;Effective&quot; date above will be updated. Continued use
            after the effective date constitutes acceptance.
          </p>

          <h2>12. Contact</h2>
          <p>
            General privacy questions: {PRIVACY_EMAIL}. Data-protection /
            rights requests: {DPO_EMAIL}. Grievances: {GRIEVANCE_EMAIL}. See
            also our <Link href="/terms">Terms of Service</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
