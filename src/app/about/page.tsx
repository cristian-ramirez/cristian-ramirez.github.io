import type { Metadata } from 'next';

import Markdown from '@/components/Markdown/Markdown';
import getArticleContent from '@/utils/getArticleContent';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `C.R blog - About`,
  };
};

const AboutPage = () => {
  const about = getArticleContent('assets/md/', 'about');
  return (
    <main>
      <article>
        <Markdown>{about.content}</Markdown>
      </article>
    </main>
  );
};

export default AboutPage;
