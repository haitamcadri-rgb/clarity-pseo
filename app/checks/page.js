import pseoPages from "../../data/pseoPages";

export const metadata = {
  title: "Bill Audits by Provider",
  description: "Choose a provider and scan your bill for hidden fees and errors.",
};

export default function ChecksHub() {
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Bill Audits by Provider</h1>
      <p style={{ color: "#475569" }}>
        Pick your provider to see common billing issues and run a quick audit.
      </p>

      <ul style={{ marginTop: "20px", lineHeight: "2" }}>
        {pseoPages.map((p) => (
          <li key={p.slug}>
            <a href={`/checks/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
