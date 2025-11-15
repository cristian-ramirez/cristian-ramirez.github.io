import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import path from 'path';

const resolveFolder = (folder: string) => {
  if (!folder) throw new Error('folder is required');

  const raw = folder.replace(/^\/+/, '');
  if (path.isAbsolute(raw)) return path.resolve(raw);

  const srcCandidate = path.resolve(process.cwd(), 'src', raw);
  if (fs.existsSync(srcCandidate)) return srcCandidate;

  const rootCandidate = path.resolve(process.cwd(), raw);
  if (fs.existsSync(rootCandidate)) return rootCandidate;

  throw new Error(`Folder not found: ${folder}`);
};

const getArticleContent = (folder: string, slug: string) => {
  const folderPath = resolveFolder(folder);
  const filename = slug?.endsWith('.md') ? slug : `${slug}.md`;
  const filePath = path.join(folderPath, filename);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return matter(content);
};

export default getArticleContent;
