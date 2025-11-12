import React from 'react';

import styles from './styles.module.css';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return (
    <span className={styles.icon}>
      <span className={name} />
    </span>
  );
};

export default Icon;
