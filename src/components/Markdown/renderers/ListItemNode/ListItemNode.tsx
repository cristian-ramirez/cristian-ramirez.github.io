'use client';
import React from 'react';

import styles from './styles.module.css';

export interface ListItemNodeProps {
  children: React.ReactNode;
}

const ListItemNode: React.FC<ListItemNodeProps> = ({ children }) => {
  return <li className={`${styles.list}`}>{children}</li>;
};

export default ListItemNode;
