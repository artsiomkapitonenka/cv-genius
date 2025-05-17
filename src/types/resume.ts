export interface Candidate {
  name: string;
  grade: string;
}

export interface Skill {
  name: string;
  rating: number;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface Project {
  title: string;
  description: string;
  position: string;
  team_size: number;
  responsibilities: string[];
  technologies: string[];
}

export interface ResumeData {
  candidate: Candidate;
  overview: string[];
  level_of_experience: Skill[];
  skills: SkillCategory[];
  education: Education[];
  languages: Language[];
  projects: Project[];
} 