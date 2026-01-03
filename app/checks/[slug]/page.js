import pseoPages from "../../../data/pseoPages";
import { notFound } from "next/navigation";
import Script from "next/script";

// מומלץ לשים ב-.env.local (ראה הוראות למטה)
// NEXT_PUBLIC_SITE_URL=https://your-domain.com
// NEXT_PUBLIC_UPLOAD_URL=https://app.billfirewall.com/upload
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const UPLOAD_URL =
  process.env.NEXT_PUBLIC_UPLOAD_URL || "https://app.billfirewall.com/upload";

function formatPrice(price) {
  const n = Number(price);
  if (Number.isFinite(n)) return n.toFixed(2);
  return String(price ?? "9.99");
}

// 1) זה מבדיל כל דף בגוגל (חובה ל-pSEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pseoPages.find((p) => p.slug === slug);

  if (!page) return { title: "Page Not Found" };

  const priceStr = formatPrice(page.price);
  const canonical = `${SITE_URL}/checks/${page.slug}`;

  return {
    title: page.title,
    description: `Struggling with a ${page.providerName} bill? Get an instant risk audit for $${priceStr}. Common issues found in ${page.errorRatePercent}% of statements.`,
    alternates: { canonical },
  };
}

export default async function CheckPage({ params }) {
  const { slug } = await params;
  const page = pseoPages.find((p) => p.slug === slug);

  if (!page) notFound();

  const priceStr = formatPrice(page.price);

  // CTA: כפתור שמפנה לאפליקציה (Conversion אמיתי)
  const uploadHref = `${UPLOAD_URL}?source=pseo&provider=${encodeURIComponent(
    page.slug
  )}&price=${encodeURIComponent(priceStr)}`;

  const buttonLabel = page.ctaText?.includes("$")
    ? page.ctaText
    : `${page.ctaText || "Scan Bill"} ($${priceStr})`;

  // 2) Schema Markup (Rich Results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bill Firewall",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: priceStr,
      priceCurrency: "USD",
    },
    description: `Automated audit for ${page.providerName} bills.`,
    url: `${SITE_URL}/checks/${page.slug}`,
  };

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header סמכותי */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span style={{ color: "#2563eb", fontWeight: "bold", fontSize: "14px" }}>
          FINANCIAL PROTECTION
        </span>
        <h1 style={{ fontSize: "2.5rem", marginTop: "10px" }}>{page.title}</h1>
      </div>

      {/* Conversion Widget (כפתור שמפנה) */}
      <section
        style={{
          background: "#f8fafc",
          border: "2px dashed #cbd5e1",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h3>Upload your {page.providerName} bill for a 60-second audit</h3>

        {/* חשוב: לא לטעון טענות רגולטוריות (HIPAA) אם זה לא באמת נכון */}
        <p style={{ color: "#64748b" }}>
          Secure, private analysis — no account required.
        </p>

        <a href={uploadHref} style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "#000",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "20px",
              border: "none",
            }}
          >
            {buttonLabel}
          </button>
        </a>

        <div style={{ marginTop: "12px", fontSize: "12px", color: "#64748b" }}>
          Tip: If this bill is complex (medical + EOB), pricing may be higher.
        </div>
      </section>

      {/* תוכן SEO */}
      <section>
        <h2 style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
          Common Billing Issues at {page.providerName}
        </h2>

        <p style={{ lineHeight: "1.6", color: "#334155", marginTop: "10px" }}>
          {page.intro}
        </p>

        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          {page.commonIssues.map((issue, i) => (
            <li key={i}>
              <strong>Risk Factor:</strong> {issue}
            </li>
          ))}
        </ul>
      </section>

      {/* Value Proof (Stats) */}
      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          background: "#eff6ff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", color: "#1e40af" }}>
            AVG OVERCHARGE
          </span>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {page.avgOverchargeRange}
          </div>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "#1e40af" }}>
            ERROR FREQUENCY
          </span>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {page.errorRatePercent}%
          </div>
        </div>
      </div>
    </main>
  );
}
