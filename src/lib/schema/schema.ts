import { z } from 'zod';

export const personSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  image: z.string().optional(),
  roles: z.array(z.string()),
});

export const contactSchema = z.object({
  site: z.string().optional(),
  linkedin: z.string().optional(),
});

export const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const experienceSchema = z.object({
  company: z.string(),
  url: z.string().nullable().optional(),
  title: z.string(),
  start: z.union([z.string(), z.number()]),
  end: z.union([z.string(), z.number()]).nullable().optional(),
  current: z.boolean().optional(),
  summary: z.string(),
  competences: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  school: z.string(),
  start: z.union([z.string(), z.number()]).nullable().optional(),
  end: z.union([z.string(), z.number()]).nullable().optional(),
  notes: z.string().nullable().optional(),
  competences: z.array(z.string()).optional(),
});

export const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  issued: z.union([z.string(), z.number()]),
  url: z.string().nullable().optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  summary: z.string().nullable().optional(),
  start: z.union([z.string(), z.number()]),
  end: z.union([z.string(), z.number()]).nullable().optional(),
  highlights: z.array(z.string()).optional(),
  url: z.string().nullable().optional(),
});

export const languageSchema = z.object({
  name: z.string(),
  proficiency: z.string(),
  code: z.string().optional(),
});

export const courseSchema = z.object({
  name: z.string(),
});

export const metaSchema = z.object({
  canonical: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.string().optional(),
  changefreq: z.string().optional(),
  priority: z.number().optional(),
  aliases: z.array(z.string()).optional(),
});

export const resumeSchema = z.object({
  summary: z.string(),
  meta: metaSchema.optional(),
  person: personSchema,
  problem_domains: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
  links: z.array(linkSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(z.string()).optional(),
  certifications: z.array(certificationSchema).optional(),
  projects: z.array(projectSchema).optional(),
  languages: z.array(languageSchema).optional(),
  courses: z.array(courseSchema).optional(),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Person = z.infer<typeof personSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Course = z.infer<typeof courseSchema>;
