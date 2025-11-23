import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from './header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    person: {
      id: 'test-id',
      full_name: 'John Doe',
      image: 'https://via.placeholder.com/150',
      roles: ['Software Engineer', 'Full Stack Developer', 'Tech Lead'],
    },
    contact: {
      site: 'https://johndoe.com',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/johndoe' },
      { label: 'Twitter', url: 'https://twitter.com/johndoe' },
    ],
    summary: 'Experienced software engineer with 10+ years of expertise in building scalable web applications.\n\nPassionate about clean code, best practices, and mentoring junior developers.',
  },
};

export const WithoutImage: Story = {
  args: {
    person: {
      id: 'test-id',
      full_name: 'Jane Smith',
      image: undefined,
      roles: ['Product Manager', 'Scrum Master'],
    },
    contact: {
      site: 'https://janesmith.com',
    },
    links: [],
    summary: 'Product-focused professional with a track record of delivering successful projects.',
  },
};

export const MinimalContact: Story = {
  args: {
    person: {
      id: 'test-id',
      full_name: 'Alex Johnson',
      image: 'https://via.placeholder.com/150',
      roles: ['Designer'],
    },
    summary: 'Creative designer specializing in user experience and interface design.',
  },
};

export const SingleRole: Story = {
  args: {
    person: {
      id: 'test-id',
      full_name: 'Sam Wilson',
      image: 'https://via.placeholder.com/150',
      roles: ['DevOps Engineer'],
    },
    contact: {
      site: 'https://samwilson.dev',
      linkedin: 'https://linkedin.com/in/samwilson',
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/samwilson' },
    ],
    summary: 'DevOps specialist focused on automation and infrastructure as code.',
  },
};
