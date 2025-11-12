import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getArticleMetadata = (basePath: string) => {
  const raw = basePath.replace(/^\/+/, '');

  const folder = path.isAbsolute(raw)
    ? path.resolve(raw)
    : path.resolve(process.cwd(), raw.startsWith('src/') ? raw : path.join('src', raw));

  const files = fs.readdirSync(folder);
  const markdownArticles = files.filter((file) => file.endsWith('.md'));

  return markdownArticles.map((filename: string) => {
    const articleContent = fs.readFileSync(path.join(folder, filename), 'utf8');
    const matterResult = matter(articleContent);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      bio: matterResult.data.description,
      slug: filename.replace('.md', ''),
    };
  });
};

export default getArticleMetadata;
