import React from 'react';

import Link from 'next/link';

import getDateFormat from '@/utils/getDateFormat';

import styles from './styles.module.css';

const ArticleCard = (props: any) => {
  const { article } = props;

  return article ? (
    <Link className={styles.unstyled} href={`/${article.slug}`}>
      <div className={styles.articleCard}>
        <h3>{article.title}</h3>
        <p className={styles.articleDate}>{getDateFormat(article.date)}</p>
        <p>{article.bio}</p>
      </div>
    </Link>
  ) : null;
};

export default ArticleCard;
