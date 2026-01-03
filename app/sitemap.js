import pseoPages from "../data/pseoPages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const pages = pseoPages.map((p) => ({
    url: `${SITE_URL}/checks/${p.slug}`,
    lastModified: new Date(),
  }));

  // גם עמוד ההאב
  pages.push({
    url: `${SITE_URL}/checks`,
    lastModified: new Date(),
  });

  return pages;
}
