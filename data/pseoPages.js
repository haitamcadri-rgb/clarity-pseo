const pseoPages = [
  {
    slug: "quest-diagnostics-bill-help",
    providerName: "Quest Diagnostics",
    title: "Quest Diagnostics Bill Help: Audit & Risk Check",
    intro:
      "Quest Diagnostics is a leader in lab testing, but their billing statements are often cited for complexity. Many patients receive unexpected bills due to insurance processing lags or 'unbundled' lab codes.",
    commonIssues: [
      "Duplicate billing for single lab panels",
      "Insurance denials due to incorrect CPT coding",
      "Out-of-network charges for in-network referrals",
    ],
    avgOverchargeRange: "$45 - $180",
    errorRatePercent: 22,
    price: 9.99,
    ctaText: "Scan Quest Bill",
  },
  {
    slug: "mayo-clinic-billing-errors",
    providerName: "Mayo Clinic",
    title: "Mayo Clinic Bill Audit: Stop Medical Overcharges",
    intro:
      "As one of the largest health systems, Mayo Clinic bills can involve multiple departments, leading to 'Facility Fees' and professional fee overlaps that confuse patients and insurance providers alike.",
    commonIssues: [
      "Unexplained 'Facility Fees'",
      "Mismatched surgical vs. anesthesia charges",
      "Billing for services not fully rendered",
    ],
    avgOverchargeRange: "$150 - $1,200",
    errorRatePercent: 18,
    price: 39.0,
    ctaText: "Audit Mayo Bill",
  },
  {
    slug: "att-internet-bill-audit",
    providerName: "AT&T",
    title: "AT&T Bill Firewall: Detect Hidden Fees & Price Hikes",
    intro:
      "Telecommunication bills like those from AT&T often contain 'hidden' service fees and expired promotional discounts that go unnoticed for months.",
    commonIssues: [
      "Expired promotional pricing without notice",
      "Administrative service fee increases",
      "Unrequested equipment rental charges",
    ],
    avgOverchargeRange: "$15 - $65",
    errorRatePercent: 31,
    price: 9.99,
    ctaText: "Check AT&T Bill",
  },
];

export default pseoPages;
