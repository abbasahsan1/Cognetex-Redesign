import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  iconName: z.string(),
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
});

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string().url(),
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
});

export const contentSchema = z.object({
  services: z.array(serviceSchema),
  projects: z.array(projectSchema),
  team: z.array(teamMemberSchema),
  trustLogos: z.array(z.object({ name: z.string(), icon: z.any() })),
  uniqueApproach: z.array(approachItemSchema),
  aiSolutionPillars: z.array(aiSolutionPillarSchema),
  aiServices: z.array(aiServiceSchema),
  aiTechStack: z.array(aiTechCategorySchema),
  courses: z.array(courseSchema),
});
