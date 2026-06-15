import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * ⚠️ TEMPLATE — not legal advice. Reflects ResumeCraft's actual model
 * (credits/subscriptions via Razorpay, AI output, user-uploaded resumes), but
 * MUST be reviewed by counsel and have placeholders filled (entity, governing
 * law/jurisdiction, refund terms) before launch.
 */
const ENTITY = "ResumeCraft"; // TODO: registered legal entity name
const CONTACT_EMAIL = "support@resumecraft.app"; // TODO: real inbox
const JURISDICTION = "India"; // TODO: confirm governing law & venue
const EFFECTIVE = "June 12, 2026";

const PAGE = "/terms";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `The terms governing your use of ${siteConfig.name} — accounts, credits and payments, acceptable use, AI output, and liability.`,
  path: PAGE,
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Terms of Service", url: absoluteUrl(PAGE) },
          ])}
        />
        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Terms of Service
          </nav>
          <h1>Terms of Service</h1>
          <p className="meta">Effective {EFFECTIVE}</p>

          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the {siteConfig.name} website and application operated by{" "}
            {ENTITY} (&quot;we&quot;, &quot;us&quot;). By creating an account or
            using the service, you agree to these Terms. If you do not agree, do
            not use the service.
          </p>

          <h2>Eligibility and accounts</h2>
          <p>
            You must be at least 16 years old (or the age of majority in your
            jurisdiction) to use the service. You are responsible for your
            account credentials and for all activity under your account. Provide
            accurate information and keep it current.
          </p>

          <h2>Credits, subscriptions, and payments</h2>
          <p>
            The service is offered on a free tier plus paid credits and
            subscription plans. Paid plans are billed through Razorpay in INR or
            USD as shown at checkout. By purchasing, you authorize the
            applicable charge. Credits and plan entitlements are described on the{" "}
            <Link href="/pricing">pricing page</Link>. Except where required by
            law or stated in a separate refund policy, fees are non-refundable.
            {/* TODO: link a Refund Policy if you publish one; align with Razorpay rules. */}
          </p>

          <h2>Your content and license</h2>
          <p>
            You retain ownership of the resumes, files, and text you submit
            (&quot;Your Content&quot;). You grant us a limited license to host,
            process, and transmit Your Content solely to provide the service —
            including sending the necessary text to AI providers to optimize and
            score it. You are responsible for ensuring Your Content is accurate
            and that you have the right to submit it.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Submit content that is unlawful, infringing, or that you have no right to use.</li>
            <li>Misrepresent qualifications, credentials, or experience.</li>
            <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to the service.</li>
            <li>Use the service to violate any applicable law or third-party rights.</li>
          </ul>

          <h2>AI output — no guarantees</h2>
          <p>
            The service uses AI to suggest edits and to estimate ATS
            compatibility. AI output and ATS scores are{" "}
            <strong>estimates and suggestions, not guarantees</strong>. We do
            not guarantee interviews, job offers, or that any resume will pass a
            specific employer&apos;s screening. You are responsible for
            reviewing all output for accuracy and truthfulness before using it.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The service, including its software, design, and content (excluding
            Your Content), is owned by {ENTITY} and protected by intellectual
            property laws. These Terms grant you no rights to our trademarks or
            branding.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, express or implied,
            to the fullest extent permitted by law.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {ENTITY} will not be liable
            for indirect, incidental, special, consequential, or punitive
            damages, or for lost profits or opportunities, arising from your use
            of the service. Our aggregate liability for any claim is limited to
            the amount you paid us in the twelve months before the claim.
          </p>

          <h2>Termination</h2>
          <p>
            You may stop using the service at any time. We may suspend or
            terminate access for breach of these Terms or to protect the service
            and its users.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of {JURISDICTION}, without
            regard to conflict-of-laws principles, and the courts there have
            exclusive jurisdiction, except where applicable law provides
            otherwise.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use after
            changes take effect constitutes acceptance. We will update the
            effective date above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms: {CONTACT_EMAIL}. See also our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
