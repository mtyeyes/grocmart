import findAverage from './find-average';

describe('testing findAverage function', () => {
  test.each([
    [5, 5],
    [715, 715],
    [-6, -6],
  ])('when passed number %i returns that number', (x, expected) => {
    expect(findAverage(x)).toBe(expected);
  });

  test.each([
    [[5, 5, 4, 4, 3, 3], 4],
    [[2], 2],
    [[2, 2, 3, 4, 3, 4, 5, 1, 2, 3], 2.9],
    [[1, 3, 4, 5, 1, 1, 5, 5], 3.125],
  ])('when passed array returns average', (arr, expected) => {
    expect(findAverage(arr)).toBe(expected);
  });

  test.each([
    [undefined, null],
    [null, null],
    ['test', null],
    ['', null],
  ])('when passed incorrect value should return null', (value, expected) => {
    expect(findAverage(value)).toBe(expected);
  });
});
