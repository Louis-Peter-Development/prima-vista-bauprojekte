import type { ReactNode } from 'react';
import type { TiptapMark, TiptapNode } from '../../types/blog';

type ArticleRendererProps = {
  content: TiptapNode;
};

function markNode(text: ReactNode, mark: TiptapMark, key: string) {
  if (mark.type === 'bold') return <strong key={key}>{text}</strong>;
  if (mark.type === 'italic') return <em key={key}>{text}</em>;
  if (mark.type === 'link') {
    const href = typeof mark.attrs?.href === 'string' ? mark.attrs.href : '#';
    return (
      <a key={key} href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    );
  }
  return text;
}

function renderChildren(node: TiptapNode, keyPrefix: string) {
  return node.content?.map((child, index) => renderNode(child, `${keyPrefix}-${index}`)) ?? null;
}

function renderText(node: TiptapNode, key: string) {
  return (node.marks ?? []).reduce<ReactNode>(
    (acc, mark, index) => markNode(acc, mark, `${key}-mark-${index}`),
    node.text,
  );
}

function renderNode(node: TiptapNode, key: string): ReactNode {
  switch (node.type) {
    case 'doc':
      return <>{renderChildren(node, key)}</>;
    case 'paragraph':
      return <p key={key}>{renderChildren(node, key)}</p>;
    case 'heading': {
      const level = node.attrs?.level === 3 ? 3 : 2;
      return level === 3 ? (
        <h3 key={key}>{renderChildren(node, key)}</h3>
      ) : (
        <h2 key={key}>{renderChildren(node, key)}</h2>
      );
    }
    case 'bulletList':
      return <ul key={key}>{renderChildren(node, key)}</ul>;
    case 'orderedList':
      return <ol key={key}>{renderChildren(node, key)}</ol>;
    case 'listItem':
      return <li key={key}>{renderChildren(node, key)}</li>;
    case 'blockquote':
      return <blockquote key={key}>{renderChildren(node, key)}</blockquote>;
    case 'horizontalRule':
      return <hr key={key} />;
    case 'hardBreak':
      return <br key={key} />;
    case 'image': {
      const src = typeof node.attrs?.src === 'string' ? node.attrs.src : '';
      const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : '';
      if (!src) return null;
      return <img key={key} src={src} alt={alt} loading="lazy" />;
    }
    case 'text':
      return <span key={key}>{renderText(node, key)}</span>;
    default:
      return <>{renderChildren(node, key)}</>;
  }
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return <div className="blog-article__body">{renderNode(content, 'article')}</div>;
}
