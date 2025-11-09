'use client';
import React from 'react';

import styles from './ListNode.module.css';

export interface ListNodeProps {
  ordered: boolean;
  children: React.ReactNode;
}

const ListNode: React.FC<ListNodeProps> = ({ ordered, children }) => {
  if (ordered) {
    return <ol className={styles.orderedList}>{children}</ol>;
  } else {
    return <ul className={styles.unorderedList}>{children}</ul>;
  }
};

export default ListNode;
