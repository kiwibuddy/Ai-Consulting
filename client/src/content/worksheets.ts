export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  date: string;
  category?: string;
  format?: string;
}

export const worksheets: WorksheetItem[] = [
  {
    id: "placeholder-worksheet-1",
    title: "Coming soon: Family AI Conversation Guide",
    description:
      "A practical worksheet to help families talk through how they want to use AI at home — covering boundaries, values, and age-appropriate guidelines.",
    url: "#",
    date: "2026-03-01",
    category: "Family & Tech",
    format: "PDF",
  },
  {
    id: "placeholder-worksheet-2",
    title: "Coming soon: AI Policy Starter for Churches",
    description:
      "A fill-in-the-blanks template to help church leaders draft a thoughtful AI-use policy for staff, volunteers, and ministry teams.",
    url: "#",
    date: "2026-03-01",
    category: "Leadership",
    format: "PDF",
  },
];
