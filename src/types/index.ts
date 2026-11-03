export type ProjectCategory =
  | "all"
  | "fullstack"
  | "web3"
  | "mobile"
  | "opensource";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  technologies: string[];
  category: Exclude<ProjectCategory, "all">;
  githubLink: string;
  demoLink?: string;
  secondaryDemoLink?: string;
  secondaryDemoLabel?: string;
  image: string;
  featured: boolean;
  year: string;
  metrics?: string;
  status:
    | "Live Production"
    | "Open Source"
    | "Smart Contract / dApp"
    | "Mobile App";
}

export interface Blog {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
  tags: string[];
  content: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export interface SkillItem {
  name: string;
  level: number;
  years: string;
  highlight: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  shortLabel: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  honors: string;
  description: string;
  focusAreas: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  credentialUrl?: string;
  domain: string;
}
