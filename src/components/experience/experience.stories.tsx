import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Experience } from './experience';

const meta = {
  title: 'Components/Experience',
  component: Experience,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    experience: [
      {
        company: 'Tech Corp',
        url: 'https://techcorp.com',
        title: 'Senior Software Engineer',
        start: '2022-01',
        end: null,
        current: true,
        summary: 'Led development of microservices architecture.\n\nImplemented CI/CD pipelines and improved deployment processes.',
        competences: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
      },
      {
        company: 'Startup Inc',
        url: null,
        title: 'Full Stack Developer',
        start: '2020-01',
        end: '2021-12',
        current: false,
        summary: 'Built scalable web applications using modern technologies.',
        competences: ['TypeScript', 'Python', 'PostgreSQL'],
      },
    ],
  },
};

export const CurrentJob: Story = {
  args: {
    experience: [
      {
        company: 'Google',
        url: 'https://google.com',
        title: 'Software Engineer',
        start: '2023-01',
        end: null,
        current: true,
        summary: 'Working on cutting-edge technology.',
        competences: ['Go', 'Kubernetes', 'Cloud'],
      },
    ],
  },
};

export const WithoutURL: Story = {
  args: {
    experience: [
      {
        company: 'Private Company',
        url: null,
        title: 'Developer',
        start: '2019-01',
        end: '2020-12',
        current: false,
        summary: 'Developed internal tools and applications.',
        competences: ['Java', 'Spring Boot'],
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    experience: [],
  },
};
