import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import type { Certification, Language } from '@/lib/schema';

import { Skills } from './skills';

describe('Skills Component', () => {
  const mockSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js'];

  const mockLanguages: Language[] = [
    { name: 'English', proficiency: 'Native', code: 'en' },
    { name: 'Spanish', proficiency: 'Professional', code: 'es' },
  ];

  const mockCertifications: Certification[] = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issued: '2023',
      url: 'https://aws.amazon.com/certification',
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google',
      issued: '2022',
      url: null,
    },
  ];

  it('renders section with title and wrench icon', () => {
    render(<Skills skills={mockSkills} />);

    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
  });

  it('renders wrench icon', () => {
    const { container } = render(<Skills skills={mockSkills} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders all technical skills', () => {
    render(<Skills skills={mockSkills} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders technical skills section header', () => {
    render(<Skills skills={mockSkills} />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('does not render technical skills section when skills is undefined', () => {
    render(<Skills />);

    expect(screen.queryByText('Technical Skills')).not.toBeInTheDocument();
  });

  it('does not render technical skills section when skills is empty', () => {
    render(<Skills skills={[]} />);

    expect(screen.queryByText('Technical Skills')).not.toBeInTheDocument();
  });

  it('renders all languages', () => {
    render(<Skills languages={mockLanguages} />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('renders language proficiency levels', () => {
    render(<Skills languages={mockLanguages} />);

    expect(screen.getByText(/Native/)).toBeInTheDocument();
    expect(screen.getByText(/Professional/)).toBeInTheDocument();
  });

  it('renders languages section header', () => {
    render(<Skills languages={mockLanguages} />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('does not render languages section when languages is undefined', () => {
    render(<Skills />);

    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
  });

  it('does not render languages section when languages is empty', () => {
    render(<Skills languages={[]} />);

    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
  });

  it('renders all certifications', () => {
    render(<Skills certifications={mockCertifications} />);

    expect(screen.getByText('AWS Certified Solutions Architect')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud Professional')).toBeInTheDocument();
  });

  it('renders certification issuers', () => {
    render(<Skills certifications={mockCertifications} />);

    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('renders certification issue dates', () => {
    render(<Skills certifications={mockCertifications} />);

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('renders certification links when URL is provided', () => {
    render(<Skills certifications={mockCertifications} />);

    const viewCertLinks = screen.getAllByText('View Certificate');
    expect(viewCertLinks).toHaveLength(1); // Only first cert has URL
    expect(viewCertLinks[0]).toHaveAttribute('href', 'https://aws.amazon.com/certification');
  });

  it('does not render certification link when URL is null', () => {
    render(<Skills certifications={mockCertifications} />);

    const viewCertLinks = screen.getAllByText('View Certificate');
    expect(viewCertLinks).toHaveLength(1); // Only one link, not two
  });

  it('renders certifications section header', () => {
    render(<Skills certifications={mockCertifications} />);

    expect(screen.getByText('Certifications')).toBeInTheDocument();
  });

  it('does not render certifications section when certifications is undefined', () => {
    render(<Skills />);

    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
  });

  it('does not render certifications section when certifications is empty', () => {
    render(<Skills certifications={[]} />);

    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
  });

  it('applies correct grid layout for main container', () => {
    const { container } = render(<Skills skills={mockSkills} languages={mockLanguages} />);

    const gridContainer = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  it('applies print-specific grid classes', () => {
    const { container } = render(<Skills skills={mockSkills} />);

    const printGrid = container.querySelector('.print\\:grid-cols-2');
    expect(printGrid).toBeInTheDocument();
  });

  it('renders skills with correct badge styling', () => {
    const { container } = render(<Skills skills={mockSkills} />);

    const skillBadges = container.querySelectorAll('.bg-gray-800.text-white');
    expect(skillBadges.length).toBeGreaterThan(0);
  });

  it('renders certifications with card styling', () => {
    const { container } = render(<Skills certifications={mockCertifications} />);

    const certCards = container.querySelectorAll('.bg-gray-50.p-3.rounded');
    expect(certCards).toHaveLength(2);
  });

  it('certifications section spans full width on larger screens', () => {
    const { container } = render(<Skills certifications={mockCertifications} />);

    const certSection = container.querySelector('.col-span-1.md\\:col-span-2');
    expect(certSection).toBeInTheDocument();
  });

  it('renders all three sections when all data is provided', () => {
    render(<Skills skills={mockSkills} languages={mockLanguages} certifications={mockCertifications} />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
  });

  it('handles empty component gracefully', () => {
    render(<Skills />);

    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
    // Should still render the section title even with no data
  });
});
