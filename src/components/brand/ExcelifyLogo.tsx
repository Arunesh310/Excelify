import Link from "next/link";

interface ExcelifyLogoProps {
  href?: string;
  variant?: "full" | "wordmark" | "icon";
  className?: string;
  priority?: boolean;
}

const SOURCES = {
  full: { src: "/logo/excelify-logo.svg", width: 140, height: 28 },
  wordmark: { src: "/logo/excelify-wordmark.svg", width: 120, height: 24 },
  icon: { src: "/logo/excelify-icon.svg", width: 32, height: 32 },
} as const;

export function ExcelifyLogo({
  href = "/",
  variant = "full",
  className = "",
  priority = false,
}: ExcelifyLogoProps) {
  const { src, width, height } = SOURCES[variant];

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Excelify"
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      className={className}
    />
  );

  if (!href) {
    return image;
  }

  return (
        <Link
          href={href}
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          aria-label="Go to Excelify homepage"
        >
      {image}
    </Link>
  );
}
