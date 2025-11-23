import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import type { Education as EducationType } from '@/lib/schema';

import { Education } from './education';

describe('Education Component', () => {
  const mockEducationData: EducationType[] = [
    {
      school: 'Test University',
      start: '2020-01',
      end: '2024-06',
      notes: 'Bachelor of Computer Science',
      competences: ['JavaScript', 'TypeScript', 'React'],
    },
    {
      school: 'Another College',
      start: '2018-01',
      end: '2020-06',
      notes: null,
      competences: ['Python', 'Django'],
    },
  ];

  it('renders education section with title', () => {
    render(<Education education={mockEducationData} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('renders graduation cap icon', () => {
    const { container } = render(<Education education={mockEducationData} />);

    // Check for the lucide-react icon by its class
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders all education entries', () => {
    render(<Education education={mockEducationData} />);

    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Another College')).toBeInTheDocument();
  });

  it('displays date range correctly', () => {
    render(<Education education={mockEducationData} />);

    expect(screen.getByText(/2020-01 —/)).toBeInTheDocument();
    expect(screen.getByText(/2024-06/)).toBeInTheDocument();
  });

  it('renders notes when provided', () => {
    render(<Education education={mockEducationData} />);

    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument();
  });

  it('does not render notes section when notes is null', () => {
    render(<Education education={mockEducationData} />);

    // The second entry has no notes, so we shouldn't find a paragraph with that school's notes
    const allParagraphs = screen.queryAllByRole('paragraph');
    const notesCount = allParagraphs.filter(p => p.textContent === 'Bachelor of Computer Science').length;
    expect(notesCount).toBe(1);
  });

  it('renders competences as tags', () => {
    render(<Education education={mockEducationData} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Django')).toBeInTheDocument();
  });

  it('renders timeline dots for each entry', () => {
    const { container } = render(<Education education={mockEducationData} />);

    const timelineDots = container.querySelectorAll('.rounded-full.bg-gray-300');
    expect(timelineDots).toHaveLength(2);
  });

  it('handles empty education array', () => {
    render(<Education education={[]} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    // Should still render the section but with no entries
  });

  it('handles education without competences', () => {
    const educationWithoutCompetences: EducationType[] = [
      {
        school: 'Simple School',
        start: '2015-01',
        end: '2019-06',
        notes: 'Simple degree',
        competences: [],
      },
    ];

    render(<Education education={educationWithoutCompetences} />);

    expect(screen.getByText('Simple School')).toBeInTheDocument();
    expect(screen.getByText('Simple degree')).toBeInTheDocument();
  });

  it('applies correct CSS classes for timeline layout', () => {
    const { container } = render(<Education education={mockEducationData} />);

    const timelineContainer = container.querySelector('.border-l-2.border-gray-200');
    expect(timelineContainer).toBeInTheDocument();
  });

  it('renders competence tags with correct styling', () => {
    const { container } = render(<Education education={mockEducationData} />);

    const competenceTags = container.querySelectorAll('.bg-gray-100.text-gray-600.rounded-full');
    expect(competenceTags.length).toBeGreaterThan(0);
  });
});
