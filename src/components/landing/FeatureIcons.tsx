const iconClass = "h-6 w-6 text-[var(--color-primary)]";

export function CleanFeatureIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth="1.75" strokeLinecap="round" d="M4 7h16M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2M8 11v6M12 11v6M16 11v6" />
      <path strokeWidth="1.75" strokeLinecap="round" d="M5 7l1 14h12l1-14" />
    </svg>
  );
}

export function CompareFeatureIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth="1.75" strokeLinecap="round" d="M8 4h8a2 2 0 012 2v14H6V6a2 2 0 012-2z" />
      <path strokeWidth="1.75" strokeLinecap="round" d="M10 9h4M10 13h4M10 17h2" />
      <path strokeWidth="1.75" strokeLinecap="round" d="M14 8h6v12h-6" />
    </svg>
  );
}

export function MatchFeatureIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth="1.75" strokeLinecap="round" d="M8 12h8M12 8v8" />
      <circle cx="7" cy="7" r="3" strokeWidth="1.75" />
      <circle cx="17" cy="17" r="3" strokeWidth="1.75" />
      <path strokeWidth="1.75" strokeLinecap="round" d="M9.5 9.5l5 5" />
    </svg>
  );
}

export function AgeingFeatureIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="8" strokeWidth="1.75" />
      <path strokeWidth="1.75" strokeLinecap="round" d="M12 8v4l3 2" />
    </svg>
  );
}
