import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Projects } from './projects';

const meta = {
  title: 'Components/Projects',
  component: Projects,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: [
      {
        title: 'E-commerce Platform',
        url: 'https://github.com/user/ecommerce',
        start: '2023-01',
        end: '2023-12',
        summary: 'Built a scalable e-commerce platform using React and Node.js.\n\nImplemented payment integration with Stripe.',
        highlights: [
          'Increased conversion rate by 30%',
          'Reduced page load time by 50%',
          'Handled 10,000+ daily active users',
        ],
      },
      {
        title: 'Mobile App',
        url: null,
        start: '2022-06',
        end: null,
        summary: 'Developing a cross-platform mobile application using React Native.',
        highlights: [
          'Published on App Store and Google Play',
          '5-star rating with 1000+ reviews',
        ],
      },
    ],
  },
};

export const OngoingProject: Story = {
  args: {
    projects: [
      {
        title: 'AI Chatbot',
        url: 'https://github.com/user/ai-chatbot',
        start: '2024-01',
        end: null,
        summary: 'Building an AI-powered chatbot using GPT-4 and LangChain.',
        highlights: [
          'Integrated with multiple data sources',
          'Supports 10+ languages',
        ],
      },
    ],
  },
};

export const WithoutHighlights: Story = {
  args: {
    projects: [
      {
        title: 'Portfolio Website',
        url: 'https://myportfolio.com',
        start: '2023-06',
        end: '2023-08',
        summary: 'Created a personal portfolio website using Next.js and Tailwind CSS.',
        highlights: [],
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
};
