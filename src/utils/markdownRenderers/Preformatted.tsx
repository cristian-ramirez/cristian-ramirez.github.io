'use client';
import React from 'react';

export interface PreformattedProps {
  children: React.ReactNode;
}

const Preformatted: React.FC<PreformattedProps> = ({ children }) => <pre>{children}</pre>;

export default Preformatted;
