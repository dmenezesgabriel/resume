import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './experience';
import type { Experience as ExperienceType } from '@/lib/schema';

describe('Experience Component', () => {
  const mockExperienceData: ExperienceType[] = [
    {
      company: 'Tech Corp',
      url: 'https://techcorp.com',
      title: 'Senior Software Engineer',
      start: '2022-01',
      end: '2024-06',
      current: false,
      summary: 'Led development of microservices architecture.\n\nImplemented CI/CD pipelines.',
      competences: ['React', 'Node.js', 'AWS'],
    },
    {
      company: 'Startup Inc',
      url: null,
      title: 'Full Stack Developer',
      start: '2020-01',
      end: null,
      current: true,
      summary: 'Building scalable web applications.',
      competences: ['TypeScript', 'Python'],
    },
  ];

  it('renders experience section with title', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders briefcase icon', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    // Check for the lucide-react icon by its class
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
  });

  it('renders company as link when URL is provided', () => {
    render(<Experience experience={mockExperienceData} />);

    const techCorpLink = screen.getByRole('link', { name: 'Tech Corp' });
    expect(techCorpLink).toHaveAttribute('href', 'https://techcorp.com');
    expect(techCorpLink).toHaveAttribute('target', '_blank');
  });

  it('renders company as plain text when URL is not provided', () => {
    render(<Experience experience={mockExperienceData} />);

    const startupText = screen.getByText('Startup Inc');
    expect(startupText.tagName).not.toBe('A');
  });

  it('displays job title correctly', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('displays date range with "Present" for current jobs', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText(/2020-01 — Present/)).toBeInTheDocument();
  });

  it('displays date range with end date for past jobs', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText(/2022-01 — 2024-06/)).toBeInTheDocument();
  });

  it('renders summary with markdown support', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText(/Led development of microservices architecture/)).toBeInTheDocument();
    expect(screen.getByText(/Implemented CI\/CD pipelines/)).toBeInTheDocument();
  });

  it('renders competences as tags', () => {
    render(<Experience experience={mockExperienceData} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders timeline dots for each entry', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    const timelineDots = container.querySelectorAll('.rounded-full.bg-gray-300');
    expect(timelineDots).toHaveLength(2);
  });

  it('handles empty experience array', () => {
    render(<Experience experience={[]} />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
    // Should still render the section but with no entries
  });

  it('handles experience without competences', () => {
    const experienceWithoutCompetences: ExperienceType[] = [
      {
        company: 'Simple Corp',
        url: null,
        title: 'Developer',
        start: '2019-01',
        end: '2020-12',
        current: false,
        summary: 'Basic development work',
        competences: [],
      },
    ];

    render(<Experience experience={experienceWithoutCompetences} />);

    expect(screen.getByText('Simple Corp')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('applies correct CSS classes for timeline layout', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    const timelineContainer = container.querySelector('.border-l-2.border-gray-200');
    expect(timelineContainer).toBeInTheDocument();
  });

  it('renders competence tags with correct styling', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    const competenceTags = container.querySelectorAll('.bg-gray-100.text-gray-600.rounded-full');
    expect(competenceTags.length).toBeGreaterThan(0);
  });

  it('applies print-specific classes for layout', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    const printFlexRow = container.querySelector('.print\\:flex-row');
    expect(printFlexRow).toBeInTheDocument();
  });

  it('renders markdown content with proper formatting', () => {
    const { container } = render(<Experience experience={mockExperienceData} />);

    // Check for prose classes that indicate markdown rendering
    const proseElements = container.querySelectorAll('.prose');
    expect(proseElements.length).toBeGreaterThan(0);
  });
});
