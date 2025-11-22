import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { Resume, resumeSchema } from './schema';

export async function getResumeData(): Promise<Resume> {
  const filePath = path.join(process.cwd(), 'data', 'resume.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);

  return resumeSchema.parse(data);
}
