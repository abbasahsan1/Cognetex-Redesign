import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  iconName: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  clientSector: z.string(),
  challenge: z.string(),
  solution: z.string(),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string().min(1),
  imageAlt: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
  })).optional(),
  socials: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
  order: z.number().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});



export const approachItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const aiSolutionPillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const aiServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  outcomes: z.array(z.string()),
});

export const aiTechCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(z.string()),
});

export const courseSchema = z.object({
  id: z.string(),
  badge: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  price: z.string(),
  medium: z.string(),
  duration: z.string(),
  syllabus: z.array(z.string()).optional(),
  instructorId: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});


export const trustLogoSchema = z.object({
  id: z.string(),
  name: z.string(),
  src: z.string(),
  alt: z.string(),
});

export const careerRoleSchema = z.object({
  id: z.string(),
  title: z.string(),
  team: z.string(),
  location: z.string(),
  summary: z.string(),
  focus: z.array(z.string()),
});

export const careerBenefitSchema = z.object({
  id: z.string(),
  title: z.string(),
  detail: z.string(),
});

export const careerStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const siteConfigSchema = z.object({
  heroTitle: z.string(),
  heroSubTitle: z.string(),
  heroLead: z.string(),
  serviceSectionTitle: z.string(),
  serviceSectionLead: z.string(),
  contactSectionTitle: z.string(),
  contactSectionLead: z.string(),
  defaultSeoTitle: z.string(),
  defaultSeoDescription: z.string(),
  footerDescription: z.string().optional(),
  socials: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
});

export const contentSchema = z.object({
  services: z.array(serviceSchema),
  projects: z.array(projectSchema),
  team: z.array(teamMemberSchema),
  trustLogos: z.array(trustLogoSchema),
  uniqueApproach: z.array(approachItemSchema),
  aiSolutionPillars: z.array(aiSolutionPillarSchema),
  aiServices: z.array(aiServiceSchema),
  aiTechStack: z.array(aiTechCategorySchema),
  courses: z.array(courseSchema),
  careers: z.array(careerRoleSchema),
  careerBenefits: z.array(careerBenefitSchema),
  careerSteps: z.array(careerStepSchema),
  siteConfig: siteConfigSchema,
});
