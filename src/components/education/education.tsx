import { GraduationCap } from 'lucide-react';

import { Education as EducationType } from '@/lib/schema';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-gray-800 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
        <GraduationCap className="w-5 h-5" />
        Education
      </h2>
      <div className="space-y-0 ml-2 border-l-2 border-gray-200 pl-8 relative">
        {education.map((edu, index) => (
          <div key={index} className="break-inside-avoid relative mb-10 last:mb-0">
            {/* Timeline dot */}
            <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-white bg-gray-300 print:border-gray-100" />

            <div className="flex flex-col md:flex-row print:flex-row md:justify-between print:justify-between md:items-baseline print:items-baseline">
              <h3 className="font-bold text-gray-900">{edu.school}</h3>
              <div className="text-sm text-gray-500 font-medium">
                {edu.start && <span>{edu.start} — </span>}
                {edu.end}
              </div>
            </div>

            {edu.notes && (
              <p className="text-gray-600 mt-1">{edu.notes}</p>
            )}

            {edu.competences && edu.competences.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {edu.competences.map((skill) => (
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
