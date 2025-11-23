import { Experience as ExperienceType } from '@/lib/schema';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Briefcase } from 'lucide-react';
import { preprocessMarkdown } from '@/lib/utils';

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-gray-800 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
        <Briefcase className="w-5 h-5" />
        Experience
      </h2>
      <div className="space-y-0 ml-2 border-l-2 border-gray-200 pl-8 relative">
        {experience.map((job, index) => (
          <div key={index} className="break-inside-avoid relative mb-10 last:mb-0">
            {/* Timeline dot */}
            <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-white bg-gray-300 print:border-gray-100" />

            <div className="flex flex-col md:flex-row print:flex-row md:justify-between print:justify-between md:items-baseline print:items-baseline mb-1">
              <h3 className="font-bold text-lg text-gray-900">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <div className="text-sm text-gray-500 font-medium">
                {job.start} — {job.current ? 'Present' : job.end}
              </div>
            </div>

            <div className="text-gray-700 font-medium mb-2">{job.title}</div>

            <div className="text-gray-600 mb-2 leading-relaxed prose prose-sm max-w-none prose-p:mb-2 prose-ul:my-0 prose-li:my-0">
              <Markdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw]}>{preprocessMarkdown(job.summary)}</Markdown>
            </div>

            {job.competences && job.competences.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {job.competences.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
