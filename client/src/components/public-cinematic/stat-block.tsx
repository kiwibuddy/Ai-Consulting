"use client";

interface StatBlockProps {
  value: string;
  label: string;
}

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="nb-stat-value">{value}</span>
      <span className="nb-stat-label">{label}</span>
    </div>
  );
}
