'use client';
import React from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

export interface ImageProps {
  alt: string;
  src: string | Blob;
}

const StyledImage = ({ src, alt, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedSrc = src ? `${basePath}${src}` : `${basePath}/default-image.jpg`;

  return (
    <span
      data-testid="image-wrapper"
      className={`${styles.imageWrapper} ${isLoaded ? styles.isLoaded : styles.loading}`}
    >
      <Image
        className={styles.customImg} // Apply the CSS module class
        src={resolvedSrc}
        alt={alt || 'Image'}
        unoptimized
        onLoad={() => setIsLoaded(true)} // Set the image as loaded when it finishes
        sizes="(max-width: 800px) 100vw, 800px" /* Allow responsive resizing */
        width={800} /* Set a default width */
        height={450} /* Set a default height to maintain 16:9 ratio */
        {...props}
      />
    </span>
  );
};

const ImageNode: React.FC<ImageProps> = ({ alt, src }) => {
  return <StyledImage alt={alt} src={src} />;
};

export default ImageNode;
