'use client';
import React from 'react';

import styles from './styles.module.css';

export interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <p className={styles.paragraph}>{children}</p>;
};

export default Paragraph;
