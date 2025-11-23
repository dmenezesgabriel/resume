import { Resume } from '@/components/resume';
import { getResumeData } from '@/lib/data';

export default async function Home() {
  const resumeData = await getResumeData();

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      <Resume data={resumeData} />
    </div>
  );
}
