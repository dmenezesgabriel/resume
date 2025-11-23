import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Education } from './education';

const meta = {
  title: 'Components/Education',
  component: Education,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Education>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    education: [
      {
        school: 'University of Technology',
        start: '2016-09',
        end: '2020-06',
        notes: 'Bachelor of Science in Computer Science',
        competences: ['Java', 'Python', 'Data Structures', 'Algorithms'],
      },
      {
        school: 'Tech Institute',
        start: '2014-09',
        end: '2016-06',
        notes: 'Associate Degree in Information Technology',
        competences: ['HTML', 'CSS', 'JavaScript'],
      },
    ],
  },
};

export const SingleEducation: Story = {
  args: {
    education: [
      {
        school: 'Stanford University',
        start: '2018-09',
        end: '2022-06',
        notes: 'Master of Science in Computer Science',
        competences: ['Machine Learning', 'AI', 'Deep Learning', 'Neural Networks'],
      },
    ],
  },
};

export const WithoutNotes: Story = {
  args: {
    education: [
      {
        school: 'Online University',
        start: '2020-01',
        end: '2021-12',
        notes: null,
        competences: ['React', 'Node.js', 'TypeScript'],
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    education: [],
  },
};
