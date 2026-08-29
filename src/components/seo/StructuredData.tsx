import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo/config";

export function StructuredData() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    featureList: [
      "Clean Excel and CSV files",
      "Remove duplicate rows",
      "Remove blank rows and columns",
      "Trim spreadsheet text",
      "Browser-based local processing",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Excelify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Excelify is a productivity toolkit designed to simplify repetitive Excel and CSV tasks.",
        },
      },
      {
        "@type": "Question",
        name: "Does Excelify upload my files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the current browser-based tools, files are processed locally in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Excelify supports common Excel formats such as XLSX, XLS and CSV for supported tools.",
        },
      },
      {
        "@type": "Question",
        name: "Is Excelify free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The current beta is free.",
        },
      },
    ],
  };

  const jsonLdBlocks = [websiteJsonLd, organizationJsonLd, softwareJsonLd, faqJsonLd];

  return (
    <>
      {jsonLdBlocks.map((block) => (
        <script
          key={block["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
