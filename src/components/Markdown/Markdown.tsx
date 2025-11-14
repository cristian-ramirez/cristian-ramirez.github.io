import React from 'react';

import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import CodeBlock from './renderers/CodeBlock/CodeBlock';
import Heading from './renderers/Heading/Heading';
import HrNode from './renderers/HrNode/HrNode';
import ImageNode from './renderers/ImageNode/ImageNode';
import LinkNode from './renderers/LinkNode/LinkNode';
import ListItemNode from './renderers/ListItemNode/ListItemNode';
import ListNode from './renderers/ListNode/ListNode';
import Paragraph from './renderers/Paragraph/Paragraph';
import Preformatted from './renderers/Preformatted/Preformatted';

import './styles.css';

interface MarkdownProps {
  children: string;
}

const inlineCodeStyle = {
  backgroundColor: '#1e293b',
  padding: '2px 4px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
};

const renderInlineCode = ({ children, ...props }: any) => {
  return (
    <code style={inlineCodeStyle} {...props}>
      {children}
    </code>
  );
};

const renderHeading = (level: number) => {
  const Component = ({ children, ...props }: any) => {
    return (
      <Heading level={level} {...props}>
        {children}
      </Heading>
    );
  };
  Component.displayName = `HeadingLevel${level}`;
  return Component;
};

const renderers: Components = {
  a: ({ children, ...props }) => <LinkNode {...props}>{children}</LinkNode>,
  code: ({ className, children, ...props }) =>
    className ? (
      <CodeBlock className={className}>{children}</CodeBlock>
    ) : (
      renderInlineCode({ children, ...props })
    ),
  h1: renderHeading(1),
  h2: renderHeading(2),
  h3: renderHeading(3),
  h4: renderHeading(4),
  h5: renderHeading(5),
  h6: renderHeading(6),
  hr: () => <HrNode />,
  img: ({ alt, src, ...props }) => {
    const resolvedAlt = alt ? alt : '';
    const resolvedSrc = src ? src : '';
    return <ImageNode alt={resolvedAlt} src={resolvedSrc} {...props} />;
  },
  li: ({ children, ...props }) => <ListItemNode {...props}>{children}</ListItemNode>,
  ol: ({ children, ...props }) => (
    <ListNode ordered={true} {...props}>
      {children}
    </ListNode>
  ),
  ul: ({ children, ...props }) => (
    <ListNode ordered={false} {...props}>
      {children}
    </ListNode>
  ),
  p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
  pre: ({ children, ...props }) => <Preformatted {...props}>{children}</Preformatted>,
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      components={renderers}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
