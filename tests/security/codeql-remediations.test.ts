import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { sanitizePlainText } from '../../netlify/functions/_shared/content';
import { validatePostPayload } from '../../netlify/functions/posts';
import { escapeRegExp, normalizeCoverImageUrl } from '../../src/utils/contentSecurity';

const TIPTAP_DOC = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Inhalt' }] }],
};

describe('CodeQL security remediations', () => {
  it('does not ship the retired legacy DOM-manipulation bundle', () => {
    const legacyBundle = fileURLToPath(new URL('../../public/assets/site.js', import.meta.url));
    expect(existsSync(legacyBundle)).toBe(false);
  });

  it('escapes every regular-expression metacharacter, including backslashes', () => {
    const literal = String.raw`/route.with+every?meta^char$()[]{}|and\backslash`;
    const matcher = new RegExp(`^${escapeRegExp(literal)}$`);

    expect(matcher.test(literal)).toBe(true);
    expect(matcher.test(`${literal}x`)).toBe(false);
  });

  it('reconstructs only approved local cover-image paths', () => {
    expect(normalizeCoverImageUrl('/assets/img/blog/cover.webp')).toBe(
      '/assets/img/blog/cover.webp',
    );
    expect(normalizeCoverImageUrl('/api/uploads/Neue Küche.webp')).toBe(
      '/api/uploads/Neue%20K%C3%BCche.webp',
    );

    [
      'javascript:alert(1)',
      'data:image/svg+xml,<svg onload=alert(1)>',
      'blob:https://example.com/id',
      'http://cdn.example.com/cover.webp',
      'https://cdn.example.com/cover.webp',
      '//cdn.example.com/cover.webp',
      String.raw`/\cdn.example.com/cover.webp`,
      'https://user:password@cdn.example.com/cover.webp',
      'assets/img/cover.webp',
      '/assets/img/../secret.webp',
      '/assets/img/%2e%2e/secret.webp',
      '/assets/img/folder%2fsecret.webp',
      '/assets/img/folder%5csecret.webp',
      '/assets/img/cover.webp?size=large',
      '/assets/img/cover.webp#image',
      '/assets/img/%E0%A4%A',
      '/assets/img/cover\u0000.webp',
    ].forEach((unsafeUrl) => expect(normalizeCoverImageUrl(unsafeUrl)).toBe(''));
  });

  it('rejects unsafe persisted cover URLs at the server boundary', () => {
    const base = {
      title: 'Sicherer Beitrag',
      author: 'Prima Vista',
      coverImageUrl: '/assets/img/cover.webp',
      status: 'draft',
      body: TIPTAP_DOC,
      translations: {},
    };

    expect(validatePostPayload(base)).toMatchObject({
      coverImageUrl: '/assets/img/cover.webp',
    });
    expect(validatePostPayload({ ...base, coverImageUrl: 'javascript:alert(1)' })).toEqual({
      error: 'coverImageUrl must use /assets/img/ or /api/uploads/',
    });
  });

  it('cannot recreate executable markup while stripping nested tags', () => {
    const nested = '<scr<script>ipt>alert(1)</scr</script>ipt><b>Sicher</b>';
    const result = sanitizePlainText(nested);

    expect(result).toBe('iptalert(1)iptSicher');
    expect(result).not.toMatch(/[<>]/);
    expect(sanitizePlainText('A\u0000B\u0007C')).toBe('ABC');
  });
});
