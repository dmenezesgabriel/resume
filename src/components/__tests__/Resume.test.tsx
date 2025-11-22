import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Resume } from '@/components/Resume';
import { Resume as ResumeType } from '@/lib/schema';

const mockData: ResumeType = {
  summary: 'Test Summary',
  person: {
    id: 'test',
    full_name: 'Test User',
    roles: ['Developer'],
  },
  contact: {
    site: 'https://example.com',
    linkedin: 'https://linkedin.com/in/test',
  },
  links: [
    { label: 'GitHub', url: 'https://github.com/test' },
  ],
  experience: [
    {
      company: 'Test Corp',
      title: 'Engineer',
      start: '2020',
      summary: 'Worked on things.',
    },
  ],
  education: [
    {
      school: 'Test Uni',
      start: '2016',
      end: '2020',
    },
  ],
  skills: ['React', 'TypeScript'],
  projects: [
    {
      title: 'Test Project',
      start: '2021',
      summary: 'A test project.',
    },
  ],
};

describe('Resume Component', () => {
  it('renders person info correctly', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders experience', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Worked on things.')).toBeInTheDocument();
  });

  it('renders education', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('Test Uni')).toBeInTheDocument();
  });

  it('renders skills', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders projects', () => {
    render(<Resume data={mockData} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project.')).toBeInTheDocument();
  });
});
