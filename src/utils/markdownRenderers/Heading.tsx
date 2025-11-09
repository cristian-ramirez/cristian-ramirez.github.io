'use client';
import React from 'react';

import styles from './Heading.module.css';

export interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, children }) => {
  switch (level) {
    case 1:
      return <h1 className={styles.heading1}>{children}</h1>;
    case 2:
      return <h2 className={styles.heading2}>{children}</h2>;
    case 3:
      return <h3 className={styles.heading3}>{children}</h3>;
    case 4:
      return <h4 className={styles.heading4}>{children}</h4>;
    case 5:
      return <h5 className={styles.heading5}>{children}</h5>;
    case 6:
      return <h6 className={styles.heading6}>{children}</h6>;
    default:
      return <h1 className={styles.heading1}>{children}</h1>;
  }
};

export default Heading;
