'use client'; // Mark this component as client-side

import React from 'react';

import Markdown from '@/components/Markdown/Markdown';
import ShareButtons from '@/components/ShareButtons/ShareButtons';

import styles from './styles.module.css';

interface ArticleContentProps {
  articleContent: string | null;
  folder: string;
  loading: boolean;
  slug: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  articleContent,
  folder,
  loading,
  slug,
}) => {
  return (
    <main>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.spinner} data-testid="spinner"></div>
        </div>
      ) : (
        <article>
          <ShareButtons url={`${process.env.NEXT_PUBLIC_BASE_URL}/${folder}/${slug}`} />
          {articleContent ? <Markdown>{articleContent}</Markdown> : <p>Article not found.</p>}
        </article>
      )}
    </main>
  );
};

export default ArticleContent;
