'use client';
import React from 'react';

import styles from './LinkNode.module.css';

export interface LinkNodeProps {
  href?: string | undefined;
  children: React.ReactNode;
}

const LinkNode: React.FC<LinkNodeProps> = ({ href, children }) => {
  return (
    <a className={styles.link} href={href}>
      {children}
    </a>
  );
};

export default LinkNode;
