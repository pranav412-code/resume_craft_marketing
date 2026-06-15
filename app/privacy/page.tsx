import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * ⚠️ TEMPLATE — not legal advice. Tuned to ResumeCraft's actual stack
 * (Supabase auth, Razorpay payments, LLM resume processing, file uploads,
 * Render hosting), but you MUST have counsel review and fill the placeholders
 * below before launch, and confirm compliance with GDPR + India's DPDP Act.
 */
const ENTITY = "ResumeCraft"; // TODO: registered legal entity name
const CONTACT_EMAIL = "privacy@resumecraft.app"; // TODO: real inbox
const EFFECTIVE = "June 12, 2026"; // TODO: keep current on edits

const PAGE = "/privacy";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your data — including resume content, account, and payment information.`,
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
            This Privacy Policy explains how {ENTITY} (&quot;{siteConfig.name}
            &quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, shares, and
            protects information when you use our website and the {siteConfig.name}{" "}
            application. By using the service you agree to this policy.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Account information.</strong> When you sign up we collect
              your email address and authentication credentials, handled by our
              authentication provider (Supabase). We do not store your password
              in plaintext.
            </li>
            <li>
              <strong>Resume content you provide.</strong> Files you upload
              (PDF/DOCX), the text parsed from them, job descriptions you paste,
              and the resumes you generate. This may include personal details
              you choose to include — name, contact details, work history,
              education.
            </li>
            <li>
              <strong>Payment information.</strong> Subscriptions and credits
              are processed by Razorpay. Payments are handled by Razorpay; we
              receive transaction status and metadata but{" "}
              <strong>do not store your full card details</strong>.
            </li>
            <li>
              <strong>Usage data.</strong> Log data, device/browser
              information, and how you interact with the service, used to
              operate, secure, and improve it.
            </li>
            <li>
              <strong>Attribution data.</strong> If you arrive from our
              marketing site, we may record which page referred you, to
              understand how people find us.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>Provide the core service: parse, optimize, score, and export resumes.</li>
            <li>Authenticate you and maintain your account and saved resumes.</li>
            <li>Process payments, credits, and subscriptions.</li>
            <li>Operate, secure, debug, and improve the service.</li>
            <li>Communicate with you about your account and service changes.</li>
          </ul>

          <h2>AI processing of your resume</h2>
          <p>
            To tailor and score your resume, the text of your resume and the
            job description you provide are processed by AI/large-language-model
            providers acting as our processors. We send the minimum content
            needed to perform the optimization. We do not use your resume
            content to train our own public models, and we instruct providers
            not to use submitted content to train theirs where that option is
            available. {/* TODO: confirm exact provider terms and update. */}
          </p>

          <h2>How we share information</h2>
          <p>We do not sell your personal information. We share it only with:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication and database hosting.</li>
            <li><strong>Razorpay</strong> — payment processing.</li>
            <li><strong>AI/LLM providers</strong> — resume optimization and scoring.</li>
            <li><strong>Hosting/infrastructure</strong> — to run the application.</li>
            <li>Authorities when required by law, or to protect rights and safety.</li>
          </ul>

          <h2>Data retention and deletion</h2>
          <p>
            We retain your account and resume data while your account is active.
            You can delete individual resumes in the app, and you can request
            deletion of your account and associated personal data by contacting
            us at {CONTACT_EMAIL}. We may retain limited records where required
            for legal, accounting, or security reasons.
          </p>

          <h2>Security</h2>
          <p>
            We use industry-standard measures including encryption in transit
            (HTTPS) and access controls. No method of transmission or storage is
            perfectly secure, so we cannot guarantee absolute security.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on your location (including under the EU/UK GDPR and
            India&apos;s Digital Personal Data Protection Act), you may have the
            right to access, correct, export, or delete your personal data, and
            to object to or restrict certain processing. To exercise these
            rights, contact {CONTACT_EMAIL}.
          </p>

          <h2>International transfers</h2>
          <p>
            Your data may be processed in countries other than your own,
            including where our providers operate. Where required, we rely on
            appropriate safeguards for such transfers.
          </p>

          <h2>Children</h2>
          <p>
            The service is not directed to children under 16, and we do not
            knowingly collect their personal data.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will
            be reflected by updating the effective date above and, where
            appropriate, notifying you.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy or your data: {CONTACT_EMAIL}. See also
            our <Link href="/terms">Terms of Service</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
