import { describe, it, expect } from 'vitest';
import { formatPrice } from '../formatPrice.ts';

describe('formatPrice', () => {
  it('formats integer prices with two decimals', () => {
    expect(formatPrice(100)).toBe('100,00');
  });

  it('formats decimal prices', () => {
    expect(formatPrice(99.99)).toBe('99,99');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0,00');
  });

  it('formats large numbers with space separator (ru locale)', () => {
    const result = formatPrice(48652);
    expect(result).toMatch(/48\s?652,00/);
  });

  it('formats small decimal values', () => {
    expect(formatPrice(4.5)).toBe('4,50');
  });
});
