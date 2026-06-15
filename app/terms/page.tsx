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
 *  - Indian Contract Act, 1872 (offer/acceptance, capacity, lawful object)
 *  - Information Technology Act, 2000 + Intermediary Rules, 2021
 *  - Consumer Protection Act, 2019 + Consumer Protection (E-Commerce) Rules, 2020
 *  - DPDP Act, 2023 (cross-reference Privacy Policy)
 *  - Payment and Settlement Systems Act, 2007 (Razorpay-mediated payments)
 *  - GST Act, 2017 (invoicing where applicable)
 *
 * Counsel MUST review before launch. Replace every [[FILL]] marker.
 */
const PROPRIETOR = "[[FILL: your full legal name as proprietor]]";
const ENTITY = "ResumeCraft"; // SaaS brand name
const REGISTERED_ADDRESS = "[[FILL: operating address (city, state, India)]]";
const GSTIN = "Not applicable (services below the GST registration threshold)";
const SUPPORT_EMAIL = "support@resumecraft.app"; // [[FILL: real inbox]]
const GRIEVANCE_EMAIL = "grievance@resumecraft.app"; // [[FILL: real inbox]]
const JURISDICTION_CITY = "[[FILL: your city for courts, e.g., Bengaluru]]";
const JURISDICTION_STATE = "[[FILL: your state, e.g., Karnataka]]";
const EFFECTIVE = "June 15, 2026";

const PAGE = "/terms";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms governing your use of ${siteConfig.name} — accounts, credits, payments, refunds, acceptable use, AI output, and liability, drafted under Indian law.`,
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
            These Terms of Service (&quot;Terms&quot;) constitute a binding
            electronic agreement under Section 10A of the Information
            Technology Act, 2000 between you (&quot;you&quot;, &quot;User&quot;)
            and {ENTITY} (&quot;{siteConfig.name}&quot;, &quot;we&quot;,
            &quot;us&quot;), a SaaS service operated as a sole proprietorship
            by {PROPRIETOR} from {REGISTERED_ADDRESS}, India, on the website{" "}
            {siteConfig.url} and the {siteConfig.name} application. These
            Terms are published in compliance with Rule 3(1)(a) of the
            Information Technology (Intermediary Guidelines and Digital Media
            Ethics Code) Rules, 2021. By creating an account, clicking
            &quot;I agree&quot;, completing a purchase, or otherwise using
            the service you accept these Terms and our{" "}
            <Link href="/privacy">Privacy Policy</Link>. If you do not agree,
            do not use the service.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years of age and competent to contract
            under §11 of the Indian Contract Act, 1872. By using the service
            you represent that you meet this requirement, are not a person
            barred from receiving services under Indian law, and will use the
            service for lawful purposes only. The service is not directed to
            minors; processing of minors&apos; data is governed by §9 of the
            DPDP Act, 2023 (see Privacy Policy §9).
          </p>

          <h2>2. Service description</h2>
          <p>
            {siteConfig.name} is an AI-powered resume builder and ATS
            optimizer. Features include resume upload and parsing, job
            description matching, AI rewriting, ATS scoring, template
            selection (ATS Classic, Modern, LaTeX, Fresher), PDF and JSON
            export, and version history. Features may be added, modified, or
            removed; we will give reasonable notice of material changes.
          </p>

          <h2>3. Account and authentication</h2>
          <p>
            Authentication is provided via email/password or Google OAuth
            through our processor Supabase. You are responsible for
            maintaining the confidentiality of your credentials and for all
            activity under your account. Notify us at {SUPPORT_EMAIL}{" "}
            immediately on any unauthorized access. We may suspend or
            terminate accounts that violate these Terms or applicable law.
          </p>

          <h2>4. Country of origin and pricing transparency</h2>
          <p>
            As required by Rule 5(3) of the Consumer Protection (E-Commerce)
            Rules, 2020, the service is offered from <strong>India</strong>.
            All prices are displayed in INR or USD on the{" "}
            <Link href="/pricing">pricing page</Link> at the time of purchase.
            Indian users are charged in INR. GST status: {GSTIN}. If the
            proprietor crosses the GST registration threshold, prices will be
            updated to be inclusive of GST and tax invoices will issue
            accordingly.
          </p>

          <h2>5. Credits, subscriptions, and payments</h2>
          <ul>
            <li>
              <strong>Free credits:</strong> 10 credits are granted on signup
              for evaluation; they expire on account deletion only.
            </li>
            <li>
              <strong>Subscriptions:</strong> &quot;Job Seeker&quot; is a
              monthly recurring plan; &quot;Career Sprint&quot; is a fixed
              3-month commitment plan. Each delivers 60 credits per month and
              entitles you to the stated resume slots.
            </li>
            <li>
              <strong>One-time refill packs:</strong> &quot;Refill
              Starter&quot; (20 credits) and &quot;Refill Pro&quot; (60
              credits) are one-time purchases that add to your existing
              credit balance.
            </li>
            <li>
              <strong>Payment processor:</strong> All payments are processed
              by Razorpay Software Private Limited, an authorised Payment
              Aggregator under the Payment and Settlement Systems Act, 2007.
              By purchasing, you authorise the applicable charge and agree to
              Razorpay&apos;s terms.
            </li>
            <li>
              <strong>Renewal and cancellation:</strong> &quot;Job
              Seeker&quot; renews monthly until cancelled. You may cancel
              from your account dashboard before the next billing date;
              cancellation takes effect at the end of the paid period.
              &quot;Career Sprint&quot; is a fixed 3-month commitment and is
              not cancellable mid-cycle except as set out in §6.
            </li>
            <li>
              <strong>Failed payments:</strong> If a renewal payment fails we
              will retry; access to paid features may be paused until
              payment succeeds.
            </li>
            <li>
              <strong>Invoices:</strong> An electronic tax invoice will be
              issued for each successful payment to the email on file.
            </li>
          </ul>

          <h2>6. Refunds and cancellation</h2>
          <p>
            This section is published under Rule 5(3)(d) of the Consumer
            Protection (E-Commerce) Rules, 2020 and Razorpay merchant
            requirements:
          </p>
          <ul>
            <li>
              <strong>Free plan:</strong> No payment, so no refund applies.
            </li>
            <li>
              <strong>Subscriptions and refill packs:</strong> Because
              credits and resume slots are digital goods activated
              immediately upon payment, all payments are{" "}
              <strong>final and non-refundable</strong> except in the
              following cases: (a) duplicate or erroneous charge attributable
              to us or Razorpay; (b) credits not delivered within 24 hours of
              successful payment; (c) refund mandated by applicable law or
              court order.
            </li>
            <li>
              <strong>Refund process:</strong> Submit refund requests to{" "}
              {SUPPORT_EMAIL} within 7 days of the charge, with the order ID
              and reason. Approved refunds are processed back to the original
              payment instrument within 7–10 business days of approval.
            </li>
            <li>
              <strong>Career Sprint exception:</strong> If you cancel within
              48 hours of the initial charge and have used fewer than 5
              credits, a pro-rated refund will be issued.
            </li>
          </ul>

          <h2>7. Your content and license to us</h2>
          <p>
            You retain ownership of resumes, files, and text you submit
            (&quot;Your Content&quot;). You grant us a worldwide, royalty-free,
            non-exclusive licence to host, store, reproduce, modify, transmit,
            and process Your Content solely to provide the service —
            including transmitting necessary portions to third-party LLM
            processors for optimization and scoring, as described in the
            Privacy Policy. You represent that you have all rights necessary
            to submit Your Content and that it does not infringe third-party
            rights.
          </p>

          <h2>8. Acceptable use / prohibited content</h2>
          <p>
            In compliance with Rule 3(1)(b) of the IT (Intermediary) Rules,
            2021, you agree not to host, display, upload, modify, publish,
            transmit, store, update, or share information that:
          </p>
          <ul>
            <li>Belongs to another person and to which you have no right;</li>
            <li>
              Is defamatory, obscene, pornographic, paedophilic, invasive of
              another&apos;s privacy (including bodily privacy), insulting or
              harassing on the basis of gender, libellous, racially or
              ethnically objectionable, or otherwise inconsistent with
              applicable law;
            </li>
            <li>Is harmful to a child;</li>
            <li>Infringes any patent, trademark, copyright, or other proprietary right;</li>
            <li>Violates any law for the time being in force;</li>
            <li>Deceives or misleads the addressee about the origin of a message, or knowingly contains any false information;</li>
            <li>Impersonates another person;</li>
            <li>Threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, public order, or causes incitement to an offence;</li>
            <li>Contains software viruses or any other code designed to interrupt, destroy, or limit the functionality of any computer resource;</li>
            <li>Is patently false and untrue, published with the intent to mislead or harass for financial gain or to cause injury.</li>
          </ul>
          <p>
            You additionally agree not to: misrepresent qualifications or
            credentials in resumes you generate, abuse the service to mass-
            generate content for third parties without authorisation, attempt
            to reverse-engineer, scrape, or bypass rate limits or
            authentication, or use the service to violate any third-party
            right.
          </p>

          <h2>9. Notice and takedown</h2>
          <p>
            If you believe content on the service infringes your rights or
            violates §8 above, send a written complaint to {GRIEVANCE_EMAIL}{" "}
            with sufficient particulars to identify the content. On actual
            knowledge of unlawful content we will act within the timelines
            prescribed by the IT (Intermediary) Rules, 2021.
          </p>

          <h2>10. AI output — no guarantee</h2>
          <p>
            The service uses third-party AI models to suggest edits and
            estimate ATS compatibility. AI output and ATS scores are{" "}
            <strong>estimates and suggestions, not guarantees</strong>. We do
            not guarantee interviews, shortlisting, job offers, or that any
            resume will pass a specific employer&apos;s screening. You are
            responsible for reviewing all output for accuracy, completeness,
            and truthfulness before submitting it to any employer.
          </p>

          <h2>11. Intellectual property</h2>
          <p>
            The service, including its software, code, templates, design,
            graphics, trademarks, and content (excluding Your Content), is
            owned by {ENTITY} and protected by Indian and international
            intellectual property law including the Copyright Act, 1957 and
            the Trade Marks Act, 1999. These Terms grant you no licence to
            our trademarks or branding except as required to use the service.
          </p>

          <h2>12. Disclaimers</h2>
          <p>
            To the maximum extent permitted by law, the service is provided
            &quot;as is&quot; and &quot;as available&quot; without warranties
            of any kind, express or implied — including merchantability,
            fitness for a particular purpose, non-infringement, accuracy,
            uninterrupted availability, or that defects will be corrected.
          </p>

          <h2>13. Limitation of liability</h2>
          <p>
            Subject to mandatory consumer protections under the Consumer
            Protection Act, 2019, and to the maximum extent permitted by
            applicable law, {ENTITY} will not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or for
            lost profits, lost opportunities, lost employment, or lost data,
            arising from your use of or inability to use the service. Our
            aggregate liability for any and all claims relating to the
            service in any 12-month period is limited to the greater of (a)
            the total fees you paid us in that period, or (b) INR 5,000.
          </p>

          <h2>14. Indemnification</h2>
          <p>
            You agree to indemnify and hold {ENTITY} and its proprietor
            harmless from any third-party claim arising out of (a) Your
            Content, (b) your violation of these Terms or applicable law,
            or (c) your infringement of any third-party right.
          </p>

          <h2>15. Termination and suspension</h2>
          <p>
            You may close your account at any time from the account
            dashboard or by writing to {SUPPORT_EMAIL}. We may suspend or
            terminate access for breach of these Terms, fraud, abuse,
            non-payment, or to comply with law. Sections that by their
            nature survive (IP, disclaimers, liability, indemnity,
            governing law) survive termination. Refund treatment on
            termination is governed by §6.
          </p>

          <h2>16. Force majeure</h2>
          <p>
            We are not liable for failure or delay caused by events beyond
            reasonable control, including acts of God, war, terrorism,
            pandemic, government action, internet or power outages, or
            third-party service failure.
          </p>

          <h2>17. Grievance Officer (India)</h2>
          <p>
            In accordance with Rule 3(2) of the IT (Intermediary) Rules,
            2021 and §10(2)(b) of the DPDP Act, 2023:
          </p>
          <ul>
            <li><strong>Name:</strong> {PROPRIETOR}</li>
            <li><strong>Designation:</strong> Proprietor & Grievance Officer</li>
            <li><strong>Email:</strong> {GRIEVANCE_EMAIL}</li>
            <li><strong>Postal:</strong> {ENTITY}, {REGISTERED_ADDRESS}</li>
            <li><strong>Hours:</strong> Mon–Fri, 10:00–18:00 IST</li>
          </ul>
          <p>
            We acknowledge complaints within 24 hours and aim to resolve
            them within 15 days.
          </p>

          <h2>18. Governing law and dispute resolution</h2>
          <p>
            These Terms are governed by the laws of the Republic of India.
            Subject to §17 grievance redressal and any mandatory consumer
            forum, the parties agree to resolve disputes by arbitration under
            the Arbitration and Conciliation Act, 1996 by a sole arbitrator
            seated at {JURISDICTION_CITY}, India, in English. Pending
            arbitration, the courts at {JURISDICTION_CITY},{" "}
            {JURISDICTION_STATE} have exclusive jurisdiction to grant
            interim relief. Consumers do not waive any rights under the
            Consumer Protection Act, 2019.
          </p>

          <h2>19. Changes to these Terms</h2>
          <p>
            We may update these Terms. Material changes will be notified by
            email or in-app notice at least 7 days before they take effect,
            and the &quot;Effective&quot; date above will be updated.
            Continued use after the effective date constitutes acceptance.
          </p>

          <h2>20. Contact</h2>
          <p>
            General queries: {SUPPORT_EMAIL}. Grievances: {GRIEVANCE_EMAIL}.
            See our <Link href="/privacy">Privacy Policy</Link> for
            data-protection rights.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
