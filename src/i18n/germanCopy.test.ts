import { describe, expect, it } from 'vitest';
import blitz from './locales/de/blitz.json';
import home from './locales/de/home.json';

describe('German compound-word copy', () => {
  it('keeps Blitzangebot together without a forced line break', () => {
    expect(blitz.intro.title).toBe('Das <em>Blitzangebot.</em>');
    expect(blitz.intro.title).not.toMatch(/Blitz(?:<br\s*\/?>|\s+)angebot/i);
  });

  it('keeps the four package names together in headings', () => {
    const headings = Object.values(home.packages.items).map((item) => item.title);
    expect(headings).toEqual([
      'Haussanierung',
      'Wohnungssanierung',
      'Gastronomieausbau',
      'Büroausbau',
    ]);
  });
});
