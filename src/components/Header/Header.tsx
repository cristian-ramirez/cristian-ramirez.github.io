import React from 'react';

import {
  faSquareGithub,
  faSquareInstagram,
  faSquareLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

const StyledImage = ({ src, alt, ...props }: { src: string; alt: string }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <span className={styles.imageWrapper}>
      <Image
        className="customImg"
        src={`${basePath}${src}`}
        alt={alt}
        width={100}
        height={100}
        unoptimized
        {...props}
      />
    </span>
  );
};

const Header = () => {
  return (
    <header className={styles.headerStyles}>
      <Link href={'/'}>
        <StyledImage src="/profile.jpeg" alt="The Tech Pulse" />
      </Link>
      <div className={styles.infoWrapper}>
        <Link href={'/'}>
          <h1 className={styles.title}>Cristian Ramírez</h1>
        </Link>
        <div className={styles.socialWrapper}>
          <Link href="https://www.linkedin.com/in/cristian-ramirez-600b5266/" target="_blank">
            <FontAwesomeIcon icon={faSquareLinkedin} size="2x" color="#cbd5e1" />
          </Link>
          <Link href="https://github.com/cristian-ramirez" target="_blank">
            <FontAwesomeIcon icon={faSquareGithub} size="2x" color="#cbd5e1" />
          </Link>
          <Link href="https://www.instagram.com/cramirez.io/" target="_blank">
            <FontAwesomeIcon icon={faSquareInstagram} size="2x" color="#cbd5e1" />
          </Link>
        </div>
      </div>
      <nav className={styles.navStyles}>
        <Link href="/about">About me</Link>
      </nav>
    </header>
  );
};

export default Header;
