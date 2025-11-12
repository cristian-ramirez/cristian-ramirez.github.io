'use client';
import React from 'react';

import { config } from '@fortawesome/fontawesome-svg-core';
import { Inter } from 'next/font/google';
import { styled } from 'styled-components';

import Header from '@/components/Header/Header';

import { metadata } from './metadata';

import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
  margin-top: 40px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <p>&copy; {currentYear} Cristian Ramírez. All rights reserved.</p>
    </FooterContainer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {metadata.title && <title>{metadata.title as string}</title>}
        {metadata.description && (
          <meta name="description" content={metadata.description as string} />
        )}
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
