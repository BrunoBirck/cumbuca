import {formatMoney} from '@utils/formatMoney';

describe('formatMoney', () => {
  it('should correctly format integer values', () => {
    expect(formatMoney(1234)).toBe('R$ 1.234,00');
  });

  it('should correctly format decimal values', () => {
    expect(formatMoney(1234.56)).toBe('R$ 1.234,56');
  });

  it('should correctly format values with only one decimal place', () => {
    expect(formatMoney(1234.5)).toBe('R$ 1.234,50');
  });

  it('should correctly format values with no decimal places', () => {
    expect(formatMoney(1234.0)).toBe('R$ 1.234,00');
  });
});
