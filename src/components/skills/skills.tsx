import { Wrench } from 'lucide-react';

import { Certification, Language } from '@/lib/schema';

interface SkillsProps {
  skills?: string[];
  languages?: Language[];
  certifications?: Certification[];
}

export function Skills({ skills, languages, certifications }: SkillsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-800 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
        <Wrench className="w-5 h-5" />
        Skills & Certifications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6">
        {skills && skills.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-gray-800 text-white text-sm rounded font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">Languages</h3>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang.name} className="text-gray-700">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({lang.proficiency})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-gray-50 p-3 rounded border border-gray-100">
                  <div className="font-bold text-gray-800">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.issuer}</div>
                  <div className="text-xs text-gray-500 mt-1">{cert.issued}</div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
