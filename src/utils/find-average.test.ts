import findAverage from './find-average';

describe('testing findAverage function', () => {
  it('when passed number returns that number', () => {
    expect(findAverage(5)).toBe(5);
  });
  it('when passed array of numbers returns average', () => {
    expect(findAverage([5, 5, 4, 4, 3, 3])).toBe(4);
  });
  it('when passed undefined returns null', () => {
    expect(findAverage(undefined)).toBe(null);
  });
  it('when passed null returns null', () => {
    expect(findAverage(null)).toBe(null);
  });
  it('when passed string returns null', () => {
    expect(findAverage('some words')).toBe(null);
  });
});
