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

/** One language's content, as edited in the admin editor (en/it). */
export type LocalizedContent = {
  title: string;
  body: TiptapDoc;
  excerpt: string;
  readingTime: number;
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
  // Only present on admin GETs (includeTranslations). The public API resolves
  // the active locale into the top-level title/body/excerpt fields instead.
  translations?: {
    en: LocalizedContent | null;
    it: LocalizedContent | null;
    fr: LocalizedContent | null;
  };
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
