import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Resume } from './resume';
import type { Resume as ResumeType } from '@/lib/schema';

describe('Resume Component', () => {
  const mockResumeData: ResumeType = {
    summary: 'Experienced software engineer',
    person: {
      id: 'test-id',
      full_name: 'John Doe',
      image: 'https://example.com/photo.jpg',
      roles: ['Software Engineer'],
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
        title: 'Senior Engineer',
        start: '2022-01',
        end: null,
        current: true,
        summary: 'Building great software',
        competences: ['React', 'Node.js'],
      },
    ],
    projects: [
      {
        title: 'Cool Project',
        url: 'https://github.com/user/project',
        start: '2023-01',
        end: '2023-12',
        summary: 'A cool project',
        highlights: ['Achievement 1'],
      },
    ],
    education: [
      {
        school: 'University',
        start: '2018-01',
        end: '2022-06',
        notes: 'Computer Science degree',
        competences: ['Java', 'Python'],
      },
    ],
    skills: ['JavaScript', 'TypeScript'],
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
  };

  it('renders the main container with correct styling', () => {
    const { container } = render(<Resume data={mockResumeData} />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('max-w-4xl', 'mx-auto', 'bg-white');
  });

  it('renders Header component with person data', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders Experience component when experience data exists', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('does not render Experience component when experience is empty', () => {
    const dataWithoutExperience = { ...mockResumeData, experience: [] };
    render(<Resume data={dataWithoutExperience} />);

    expect(screen.queryByText('Experience')).not.toBeInTheDocument();
  });

  it('renders Projects component when projects data exists', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Cool Project')).toBeInTheDocument();
  });

  it('does not render Projects component when projects is empty', () => {
    const dataWithoutProjects = { ...mockResumeData, projects: [] };
    render(<Resume data={dataWithoutProjects} />);

    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
  });

  it('renders Education component when education data exists', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('University')).toBeInTheDocument();
  });

  it('does not render Education component when education is empty', () => {
    const dataWithoutEducation = { ...mockResumeData, education: [] };
    render(<Resume data={dataWithoutEducation} />);

    expect(screen.queryByText('Education')).not.toBeInTheDocument();
  });

  it('always renders Skills component', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
  });

  it('renders all sections in correct order', () => {
    const { container } = render(<Resume data={mockResumeData} />);

    const sections = container.querySelectorAll('section, header');
    const sectionTexts = Array.from(sections).map(s => s.textContent);

    // Header should come first, then Experience, Projects, Education, Skills
    expect(sectionTexts[0]).toContain('John Doe');
    expect(sectionTexts[1]).toContain('Experience');
    expect(sectionTexts[2]).toContain('Projects');
    expect(sectionTexts[3]).toContain('Education');
    expect(sectionTexts[4]).toContain('Skills & Certifications');
  });

  it('applies print-specific classes', () => {
    const { container } = render(<Resume data={mockResumeData} />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('print:shadow-none', 'print:p-0', 'print:max-w-none', 'print:w-full');
  });

  it('handles minimal resume data', () => {
    const minimalData: ResumeType = {
      summary: 'Summary',
      person: {
        id: 'id',
        full_name: 'Jane Doe',
        image: undefined,
        roles: ['Developer'],
      },
      experience: [],
      projects: [],
      education: [],
    };

    render(<Resume data={minimalData} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
  });

  it('passes contact information to Header', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('passes links to Header', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('passes summary to Header', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText(/Experienced software engineer/)).toBeInTheDocument();
  });

  it('renders all skills when provided', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders languages when provided', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText(/Native/)).toBeInTheDocument();
  });

  it('renders certifications when provided', () => {
    render(<Resume data={mockResumeData} />);

    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });
});
