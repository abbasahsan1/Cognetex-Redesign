export interface IService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  iconName: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface IProject {
  id: string;
  title: string;
  clientSector: string;
  challenge: string;
  solution: string;
  stats: {
    label: string;
    value: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt?: string;
  expertise?: string[];
  experience?: {
    company: string;
    role: string;
    period: string;
  }[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
}


export interface IApproachItem {
  id: string;
  title: string;
  description: string;
}

export interface IAISolutionPillar {
  id: string;
  title: string;
  description: string;
}

export interface IAIService {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
}

export interface IAITechCategory {
  id: string;
  title: string;
  items: string[];
}

export interface ICourse {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  medium: string;
  duration: string;
  syllabus?: string[];
  instructorId?: string;
  seoTitle?: string;
  seoDescription?: string;
}


export interface IMenuItem {
  label: string;
  href: string;
}

export type ProjectType = 'AI Integration' | 'Full Stack Build' | 'Consultation';
export type BudgetRange = '<$10k' | '$10k-$50k' | '$50k+';

export interface IContactFormData {
  name: string;
  email: string;
  projectType: ProjectType;
  budget: BudgetRange;
  message?: string;
}

export interface ISiteConfig {
  heroTitle: string;
  heroSubTitle: string;
  heroLead: string;
  serviceSectionTitle: string;
  serviceSectionLead: string;
  contactSectionTitle: string;
  contactSectionLead: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}