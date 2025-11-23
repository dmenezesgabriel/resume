import { describe, expect,it } from 'vitest';

describe('Data Module', () => {
  it('exports getResumeData function', async () => {
    const { getResumeData } = await import('./data');
    expect(typeof getResumeData).toBe('function');
  });

  it('getResumeData returns a Promise', async () => {
    const { getResumeData } = await import('./data');
    const result = getResumeData();
    expect(result).toBeInstanceOf(Promise);
  });
});
