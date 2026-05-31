import { type ChangeEvent, useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import type { TiptapDoc } from '../../types/blog';

type BlogEditorProps = {
  value: TiptapDoc;
  onChange: (value: TiptapDoc) => void;
};

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noreferrer', target: '_blank' },
      }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'blog-editor__surface',
      },
    },
    onUpdate({ editor: activeEditor }) {
      onChange(activeEditor.getJSON() as TiptapDoc);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', previousUrl ?? '');
    if (url === null) return;
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const src = window.prompt('Bild-URL');
    if (!src) return;
    editor.chain().focus().setImage({ src }).run();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageError('');
    setUploadingImage(true);

    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Bild konnte nicht hochgeladen werden.');
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      setImageError(err instanceof Error ? err.message : 'Bild konnte nicht hochgeladen werden.');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  return (
    <div className="blog-editor">
      <div className="blog-editor__toolbar" aria-label="Editor Werkzeuge">
        <button type="button" className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <button type="button" className={editor.isActive('bold') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button type="button" className={editor.isActive('italic') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button type="button" className={editor.isActive('bulletList') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          UL
        </button>
        <button type="button" className={editor.isActive('orderedList') ? 'is-active' : ''} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </button>
        <button type="button" className={editor.isActive('link') ? 'is-active' : ''} onClick={setLink}>
          Link
        </button>
        <button type="button" onClick={addImage}>
          Bild-URL
        </button>
        <label className="blog-editor__upload">
          {uploadingImage ? 'Upload...' : 'Bild hochladen'}
          <input type="file" accept="image/*" onChange={uploadImage} disabled={uploadingImage} />
        </label>
      </div>
      {imageError && <p className="blog-editor__error">{imageError}</p>}
      <EditorContent editor={editor} />
    </div>
  );
}
