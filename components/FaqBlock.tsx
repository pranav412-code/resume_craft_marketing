import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export type QA = { question: string; answer: string };

/**
 * Visible FAQ section + matching FAQPage schema from the SAME array —
 * guarantees the markup never drifts from on-page content (schema rule #1).
 * AEO: drives People-Also-Ask + voice answers.
 */
export function FaqBlock({ items, title = "Frequently asked questions" }: { items: QA[]; title?: string }) {
  return (
    <section className="faq">
      <JsonLd data={faqSchema(items)} />
      <h2>{title}</h2>
      {items.map((qa) => (
        <details key={qa.question}>
          <summary>{qa.question}</summary>
          <p>{qa.answer}</p>
        </details>
      ))}
    </section>
  );
}
