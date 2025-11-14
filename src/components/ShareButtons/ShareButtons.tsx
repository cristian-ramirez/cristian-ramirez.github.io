'use client';
import React from 'react';

import Icon from '@/components/Icon/Icon';

import styles from './styles.module.css';

const ShareButtons = ({ url }: { url: string }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className={styles.shareContainer}>
      <button onClick={handleCopy}>
        <Icon name="fa-solid fa-link" /> Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
