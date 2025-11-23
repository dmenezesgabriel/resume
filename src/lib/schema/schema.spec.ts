import { describe, expect,it } from 'vitest';

import {
  certificationSchema,
  educationSchema,
  experienceSchema,
  personSchema,
  projectSchema,
  resumeSchema,
} from './schema';

describe('Schema Validation', () => {
  describe('personSchema', () => {
    it('validates a valid person object', () => {
      const validPerson = {
        id: 'test-id',
        full_name: 'John Doe',
        image: 'https://example.com/photo.jpg',
        roles: ['Developer', 'Engineer'],
      };
      expect(() => personSchema.parse(validPerson)).not.toThrow();
    });

    it('validates person without optional image', () => {
      const person = {
        id: 'test-id',
        full_name: 'John Doe',
        roles: ['Developer'],
      };
      expect(() => personSchema.parse(person)).not.toThrow();
    });

    it('rejects person without required fields', () => {
      const invalidPerson = {
        id: 'test-id',
      };
      expect(() => personSchema.parse(invalidPerson)).toThrow();
    });
  });

  describe('experienceSchema', () => {
    it('validates a valid experience object', () => {
      const validExperience = {
        company: 'Tech Corp',
        url: 'https://techcorp.com',
        title: 'Engineer',
        start: '2020-01',
        end: '2023-12',
        current: false,
        summary: 'Did great work',
        competences: ['React', 'Node.js'],
      };
      expect(() => experienceSchema.parse(validExperience)).not.toThrow();
    });

    it('validates experience with null url', () => {
      const experience = {
        company: 'Tech Corp',
        url: null,
        title: 'Engineer',
        start: '2020-01',
        summary: 'Did great work',
      };
      expect(() => experienceSchema.parse(experience)).not.toThrow();
    });

    it('validates current experience without end date', () => {
      const experience = {
        company: 'Tech Corp',
        title: 'Engineer',
        start: '2020-01',
        current: true,
        summary: 'Currently working',
      };
      expect(() => experienceSchema.parse(experience)).not.toThrow();
    });
  });

  describe('educationSchema', () => {
    it('validates a valid education object', () => {
      const validEducation = {
        school: 'University',
        start: '2016-09',
        end: '2020-06',
        notes: 'Computer Science degree',
        competences: ['Java', 'Python'],
      };
      expect(() => educationSchema.parse(validEducation)).not.toThrow();
    });

    it('validates education with null notes', () => {
      const education = {
        school: 'University',
        start: '2016-09',
        end: '2020-06',
        notes: null,
      };
      expect(() => educationSchema.parse(education)).not.toThrow();
    });
  });

  describe('certificationSchema', () => {
    it('validates a valid certification object', () => {
      const validCert = {
        name: 'AWS Certified',
        issuer: 'AWS',
        issued: '2023',
        url: 'https://aws.amazon.com/cert',
      };
      expect(() => certificationSchema.parse(validCert)).not.toThrow();
    });

    it('validates certification with numeric issued date', () => {
      const cert = {
        name: 'AWS Certified',
        issuer: 'AWS',
        issued: 2023,
      };
      expect(() => certificationSchema.parse(cert)).not.toThrow();
    });
  });

  describe('projectSchema', () => {
    it('validates a valid project object', () => {
      const validProject = {
        title: 'Cool Project',
        summary: 'A cool project',
        start: '2023-01',
        end: '2023-12',
        highlights: ['Achievement 1', 'Achievement 2'],
        url: 'https://github.com/user/project',
      };
      expect(() => projectSchema.parse(validProject)).not.toThrow();
    });

    it('validates project with null summary', () => {
      const project = {
        title: 'Cool Project',
        summary: null,
        start: '2023-01',
      };
      expect(() => projectSchema.parse(project)).not.toThrow();
    });
  });

  describe('resumeSchema', () => {
    it('validates a complete resume object', () => {
      const validResume = {
        summary: 'Experienced developer',
        person: {
          id: 'test-id',
          full_name: 'John Doe',
          roles: ['Developer'],
        },
        contact: {
          site: 'https://example.com',
          linkedin: 'https://linkedin.com/in/johndoe',
        },
        experience: [],
        education: [],
        skills: ['JavaScript', 'TypeScript'],
      };
      expect(() => resumeSchema.parse(validResume)).not.toThrow();
    });

    it('validates minimal resume object', () => {
      const minimalResume = {
        summary: 'Developer',
        person: {
          id: 'id',
          full_name: 'John Doe',
          roles: ['Developer'],
        },
      };
      expect(() => resumeSchema.parse(minimalResume)).not.toThrow();
    });
  });
});
