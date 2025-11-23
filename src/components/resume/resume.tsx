import { Resume as ResumeType } from '@/lib/schema';

import { Education } from '../education';
import { Experience } from '../experience';
import { Header } from '../header';
import { Projects } from '../projects';
import { Skills } from '../skills';

interface ResumeProps {
  data: ResumeType;
}

export function Resume({ data }: ResumeProps) {
  return (
    <main className="max-w-4xl mx-auto p-8 md:p-12 bg-white shadow-lg print:shadow-none print:p-0 print:max-w-none print:w-full">
      <Header
        person={data.person}
        contact={data.contact}
        links={data.links}
        summary={data.summary}
      />

      {data.experience && data.experience.length > 0 && (
        <Experience experience={data.experience} />
      )}

      {data.projects && data.projects.length > 0 && (
        <Projects projects={data.projects} />
      )}

      {data.education && data.education.length > 0 && (
        <Education education={data.education} />
      )}

      <Skills
        skills={data.skills}
        languages={data.languages}
        certifications={data.certifications}
      />
    </main>
  );
}
