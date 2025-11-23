import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Resume } from './resume';

const meta = {
  title: 'Components/Resume',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Resume>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      summary: 'Experienced software engineer with 10+ years of expertise in building scalable web applications and leading development teams.',
      person: {
        id: 'test-id',
        full_name: 'John Doe',
        image: 'https://via.placeholder.com/150',
        roles: ['Software Engineer', 'Tech Lead'],
      },
      contact: {
        site: 'https://johndoe.com',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
      links: [
        { label: 'GitHub', url: 'https://github.com/johndoe' },
      ],
      experience: [
        {
          company: 'Tech Corp',
          url: 'https://techcorp.com',
          title: 'Senior Software Engineer',
          start: '2022-01',
          end: null,
          current: true,
          summary: 'Leading development of microservices architecture.',
          competences: ['React', 'Node.js', 'AWS'],
        },
      ],
      projects: [
        {
          title: 'E-commerce Platform',
          url: 'https://github.com/user/ecommerce',
          start: '2023-01',
          end: '2023-12',
          summary: 'Built a scalable e-commerce platform.',
          highlights: ['Increased conversion by 30%'],
        },
      ],
      education: [
        {
          school: 'University of Technology',
          start: '2016-09',
          end: '2020-06',
          notes: 'Bachelor of Science in Computer Science',
          competences: ['Java', 'Python'],
        },
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
      languages: [
        { name: 'English', proficiency: 'Native', code: 'en' },
      ],
      certifications: [
        {
          name: 'AWS Certified',
          issuer: 'AWS',
          issued: '2023',
          url: 'https://aws.amazon.com/cert',
        },
      ],
    },
  },
};

export const Minimal: Story = {
  args: {
    data: {
      summary: 'Software developer passionate about clean code.',
      person: {
        id: 'test-id',
        full_name: 'Jane Smith',
        image: undefined,
        roles: ['Developer'],
      },
      experience: [],
      projects: [],
      education: [],
    },
  },
};
