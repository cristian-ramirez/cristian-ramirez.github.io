import React from 'react';

import styles from './Icon.module.css';

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
