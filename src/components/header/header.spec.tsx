import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import type { Contact, Link, Person } from '@/lib/schema';

describe('Header Component', () => {
  const mockPerson: Person = {
    id: 'test-id',
    full_name: 'John Doe',
    image: 'https://example.com/photo.jpg',
    roles: ['Software Engineer', 'Full Stack Developer'],
  };

  const mockContact: Contact = {
    site: 'https://johndoe.com',
    linkedin: 'https://linkedin.com/in/johndoe',
  };

  const mockLinks: Link[] = [
    { label: 'GitHub', url: 'https://github.com/johndoe' },
    { label: 'Twitter', url: 'https://twitter.com/johndoe' },
  ];

  const mockSummary = 'Experienced software engineer specializing in web development.\n\nPassionate about building scalable applications.';

  it('renders person full name', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders person image when provided', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('does not render image when not provided', () => {
    const personWithoutImage = { ...mockPerson, image: undefined };
    render(<Header person={personWithoutImage} summary={mockSummary} />);

    const image = screen.queryByAltText('John Doe');
    expect(image).not.toBeInTheDocument();
  });

  it('renders all person roles', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('renders role separators correctly', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    const separators = screen.getAllByText('•');
    expect(separators).toHaveLength(1); // One separator between two roles
  });

  it('renders contact site link when provided', () => {
    render(<Header person={mockPerson} contact={mockContact} summary={mockSummary} />);

    const siteLink = screen.getByText('johndoe.com');
    expect(siteLink).toBeInTheDocument();
    expect(siteLink).toHaveAttribute('href', 'https://johndoe.com');
    expect(siteLink).toHaveAttribute('target', '_blank');
  });

  it('renders LinkedIn link when provided', () => {
    render(<Header person={mockPerson} contact={mockContact} summary={mockSummary} />);

    const linkedinLink = screen.getByText('LinkedIn');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
  });

  it('does not render contact section when contact is not provided', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    expect(screen.queryByText('LinkedIn')).not.toBeInTheDocument();
  });

  it('renders additional links when provided', () => {
    render(<Header person={mockPerson} links={mockLinks} summary={mockSummary} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('renders link URLs correctly', () => {
    render(<Header person={mockPerson} links={mockLinks} summary={mockSummary} />);

    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders summary with markdown support', () => {
    render(<Header person={mockPerson} summary={mockSummary} />);

    expect(screen.getByText(/Experienced software engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Passionate about building/)).toBeInTheDocument();
  });

  it('applies rounded-full class to profile image', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const image = container.querySelector('.rounded-full');
    expect(image).toBeInTheDocument();
  });

  it('applies correct header styling', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('mb-8', 'border-b', 'pb-8');
  });

  it('applies print-specific classes for layout', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const printFlexRow = container.querySelector('.print\\:flex-row');
    expect(printFlexRow).toBeInTheDocument();
  });

  it('renders markdown content with prose classes', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const proseElements = container.querySelectorAll('.prose');
    expect(proseElements.length).toBeGreaterThan(0);
  });

  it('handles empty links array', () => {
    render(<Header person={mockPerson} links={[]} summary={mockSummary} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles person with single role', () => {
    const personWithSingleRole = { ...mockPerson, roles: ['Developer'] };
    render(<Header person={personWithSingleRole} summary={mockSummary} />);

    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });

  it('strips protocol from site URL in display', () => {
    render(<Header person={mockPerson} contact={mockContact} summary={mockSummary} />);

    // Should display without https://
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.queryByText('https://johndoe.com')).not.toBeInTheDocument();
  });

  it('renders name with high contrast styling', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('text-gray-900');
  });

  it('applies correct image sizing classes', () => {
    const { container } = render(<Header person={mockPerson} summary={mockSummary} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toHaveClass('w-24', 'h-24');
  });
});
