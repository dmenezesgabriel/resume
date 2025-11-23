import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skills } from './skills';

const meta = {
  title: 'Components/Skills',
  component: Skills,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    languages: [
      { name: 'English', proficiency: 'Native', code: 'en' },
      { name: 'Spanish', proficiency: 'Professional', code: 'es' },
      { name: 'French', proficiency: 'Intermediate', code: 'fr' },
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        issued: '2023',
        url: 'https://aws.amazon.com/certification',
      },
      {
        name: 'Google Cloud Professional',
        issuer: 'Google',
        issued: '2022',
        url: 'https://cloud.google.com/certification',
      },
    ],
  },
};

export const SkillsOnly: Story = {
  args: {
    skills: ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'],
  },
};

export const LanguagesOnly: Story = {
  args: {
    languages: [
      { name: 'English', proficiency: 'Native', code: 'en' },
      { name: 'Mandarin', proficiency: 'Fluent', code: 'zh' },
    ],
  },
};

export const CertificationsOnly: Story = {
  args: {
    certifications: [
      {
        name: 'Certified Kubernetes Administrator',
        issuer: 'CNCF',
        issued: '2024',
        url: 'https://www.cncf.io/certification/cka/',
      },
      {
        name: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        issued: '2023',
        url: null,
      },
    ],
  },
};

export const Empty: Story = {
  args: {},
};
