import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import type { Project } from '@/lib/schema';

import { Projects } from './projects';

describe('Projects Component', () => {
  const mockProjectsData: Project[] = [
    {
      title: 'E-commerce Platform',
      url: 'https://github.com/user/ecommerce',
      start: '2023-01',
      end: '2023-12',
      summary: 'Built a scalable e-commerce platform.\n\nImplemented payment integration.',
      highlights: [
        'Increased conversion rate by 30%',
        'Reduced page load time by 50%',
      ],
    },
    {
      title: 'Mobile App',
      url: null,
      start: '2022-06',
      end: null,
      summary: 'Developing a cross-platform mobile application.',
      highlights: [],
    },
  ];

  it('renders projects section with title', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders all project entries', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Mobile App')).toBeInTheDocument();
  });

  it('renders project title as link when URL is provided', () => {
    render(<Projects projects={mockProjectsData} />);

    const projectLink = screen.getByRole('link', { name: 'E-commerce Platform' });
    expect(projectLink).toHaveAttribute('href', 'https://github.com/user/ecommerce');
    expect(projectLink).toHaveAttribute('target', '_blank');
  });

  it('renders project title as plain text when URL is not provided', () => {
    render(<Projects projects={mockProjectsData} />);

    const mobileAppText = screen.getByText('Mobile App');
    expect(mobileAppText.tagName).not.toBe('A');
  });

  it('displays date range with "Present" for ongoing projects', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText(/2022-06 — Present/)).toBeInTheDocument();
  });

  it('displays date range with end date for completed projects', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText(/2023-01 — 2023-12/)).toBeInTheDocument();
  });

  it('renders summary with markdown support', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText(/Built a scalable e-commerce platform/)).toBeInTheDocument();
    expect(screen.getByText(/Implemented payment integration/)).toBeInTheDocument();
  });

  it('renders highlights as list items', () => {
    render(<Projects projects={mockProjectsData} />);

    expect(screen.getByText('Increased conversion rate by 30%')).toBeInTheDocument();
    expect(screen.getByText('Reduced page load time by 50%')).toBeInTheDocument();
  });

  it('does not render highlights section when empty', () => {
    render(<Projects projects={mockProjectsData} />);

    // Mobile App has no highlights, so we check that only one list exists
    const lists = screen.queryAllByRole('list');
    expect(lists).toHaveLength(1); // Only the first project has highlights
  });

  it('handles empty projects array', () => {
    render(<Projects projects={[]} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    // Should still render the section but with no entries
  });

  it('handles project without summary', () => {
    const projectsWithoutSummary: Project[] = [
      {
        title: 'Simple Project',
        url: null,
        start: '2021-01',
        end: '2021-12',
        summary: null,
        highlights: ['Achievement 1'],
      },
    ];

    render(<Projects projects={projectsWithoutSummary} />);

    expect(screen.getByText('Simple Project')).toBeInTheDocument();
    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
  });

  it('applies correct CSS classes for grid layout', () => {
    const { container } = render(<Projects projects={mockProjectsData} />);

    const gridContainer = container.querySelector('.grid.grid-cols-1');
    expect(gridContainer).toBeInTheDocument();
  });

  it('applies print-specific classes for layout', () => {
    const { container } = render(<Projects projects={mockProjectsData} />);

    const printFlexRow = container.querySelector('.print\\:flex-row');
    expect(printFlexRow).toBeInTheDocument();
  });

  it('renders markdown content with prose classes', () => {
    const { container } = render(<Projects projects={mockProjectsData} />);

    const proseElements = container.querySelectorAll('.prose');
    expect(proseElements.length).toBeGreaterThan(0);
  });

  it('renders highlights with correct list styling', () => {
    const { container } = render(<Projects projects={mockProjectsData} />);

    const list = container.querySelector('.list-disc.list-outside');
    expect(list).toBeInTheDocument();
  });

  it('applies break-inside-avoid to prevent awkward page breaks', () => {
    const { container } = render(<Projects projects={mockProjectsData} />);

    const projectCards = container.querySelectorAll('.break-inside-avoid');
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it('renders all highlights for a project', () => {
    render(<Projects projects={mockProjectsData} />);

    const highlights = screen.getAllByRole('listitem');
    expect(highlights).toHaveLength(2); // First project has 2 highlights
  });

  it('handles project with only highlights and no summary', () => {
    const projectsWithOnlyHighlights: Project[] = [
      {
        title: 'Highlights Only Project',
        url: null,
        start: '2020-01',
        end: '2020-12',
        summary: null,
        highlights: ['First highlight', 'Second highlight'],
      },
    ];

    render(<Projects projects={projectsWithOnlyHighlights} />);

    expect(screen.getByText('Highlights Only Project')).toBeInTheDocument();
    expect(screen.getByText('First highlight')).toBeInTheDocument();
    expect(screen.getByText('Second highlight')).toBeInTheDocument();
  });
});
