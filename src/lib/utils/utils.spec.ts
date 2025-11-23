import { describe, expect,it } from 'vitest';

import { preprocessMarkdown } from './utils';

describe('preprocessMarkdown', () => {
  it('returns empty string for empty input', () => {
    expect(preprocessMarkdown('')).toBe('');
  });

  it('returns empty string for null/undefined input', () => {
    expect(preprocessMarkdown(null as unknown as string)).toBe('');
    expect(preprocessMarkdown(undefined as unknown as string)).toBe('');
  });

  it('replaces HTML br tags with double newlines', () => {
    const input = 'Line 1<br>Line 2';
    const expected = 'Line 1\n\nLine 2';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('replaces self-closing br tags', () => {
    const input = 'Line 1<br/>Line 2';
    const expected = 'Line 1\n\nLine 2';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('replaces br tags with spaces', () => {
    const input = 'Line 1< br / >Line 2';
    const expected = 'Line 1\n\nLine 2';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('replaces closing br tags', () => {
    const input = 'Line 1</br>Line 2';
    const expected = 'Line 1\n\nLine 2';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('handles case-insensitive br tags', () => {
    const input = 'Line 1<BR>Line 2<Br>Line 3';
    const expected = 'Line 1\n\nLine 2\n\nLine 3';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('converts hyphen-space-capital pattern to markdown list', () => {
    const input = 'Text - Capital letter';
    const expected = 'Text\n\n- Capital letter';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('does not convert hyphen-space-lowercase', () => {
    const input = 'Text - lowercase letter';
    expect(preprocessMarkdown(input)).toBe(input);
  });

  it('handles multiple list items', () => {
    const input = 'Intro - First item - Second item';
    const expected = 'Intro\n\n- First item\n\n- Second item';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('handles combination of br tags and list items', () => {
    const input = 'Paragraph 1<br>Paragraph 2 - List item';
    const expected = 'Paragraph 1\n\nParagraph 2\n\n- List item';
    expect(preprocessMarkdown(input)).toBe(expected);
  });

  it('preserves content without special patterns', () => {
    const input = 'Regular text without any special formatting';
    expect(preprocessMarkdown(input)).toBe(input);
  });
});
