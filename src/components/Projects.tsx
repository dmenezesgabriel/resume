import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { preprocessMarkdown } from '@/lib/utils';
import { Project } from '@/lib/schema';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b-2 border-gray-100 pb-2">Projects</h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="flex flex-col md:flex-row print:flex-row md:justify-between print:justify-between md:items-baseline print:items-baseline mb-1">
              <h3 className="font-bold text-lg text-gray-900">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <div className="text-sm text-gray-500 font-medium">
                {project.start} — {project.end || 'Present'}
              </div>
            </div>

            {project.summary && (
              <div className="text-gray-700 mb-2 prose prose-sm max-w-none prose-p:mb-2 prose-ul:my-0 prose-li:my-0">
                <Markdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw]}>{preprocessMarkdown(project.summary)}</Markdown>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-600">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
