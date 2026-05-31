export type PostStatus = 'draft' | 'published';

export type TiptapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
};

export type TiptapDoc = TiptapNode & {
  type: 'doc';
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImageUrl: string;
  body: TiptapDoc;
  excerpt: string;
  readingTime: number;
  status: PostStatus;
  sortOrder: number;
  views: number;
  likes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogComment = {
  id: string;
  name: string;
  body: string;
  createdAt: string;
};

export const EMPTY_TIPTAP_DOC: TiptapDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: '' }],
    },
  ],
};
