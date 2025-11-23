import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { preprocessMarkdown } from '@/lib/utils';
import { Contact, Link, Person } from '@/lib/schema';

interface HeaderProps {
  person: Person;
  contact?: Contact;
  links?: Link[];
  summary: string;
}

export function Header({ person, contact, links, summary }: HeaderProps) {
  return (
    <header className="mb-8 border-b pb-8">
      <div className="flex flex-col md:flex-row print:flex-row justify-between items-start md:items-center print:items-center gap-4">
        <div className="flex items-center gap-6">
          {person.image && (
            <img
              src={person.image}
              alt={person.full_name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{person.full_name}</h1>
            <div className="flex flex-wrap gap-2 mt-2 text-gray-600">
              {person.roles.map((role, index) => (
                <span key={index} className="flex items-center">
                  {role}
                  {index < person.roles.length - 1 && (
                    <span className="mx-2 text-gray-400">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end print:items-end gap-1 text-sm text-gray-600">
          {contact?.site && (
            <a href={contact.site} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              {contact.site.replace(/^https?:\/\//, '')}
            </a>
          )}
          {contact?.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
              LinkedIn
            </a>
          )}
          <div className="flex gap-3 mt-1">
            {links?.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors underline decoration-gray-300 underline-offset-4 hover:decoration-black"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-gray-700 leading-relaxed max-w-3xl prose prose-sm max-w-none prose-p:mb-2 prose-ul:my-0 prose-li:my-0">
        <Markdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw]}>{preprocessMarkdown(summary)}</Markdown>
      </div>
    </header>
  );
}
