import { getInitialCellsArray, uniqueRandomIntArrayInRange } from '../../functions/array';

describe('Function::getInitialCellsArray', () => {
  it('Should return correct array length', () => {
    const length = 2;
    expect(getInitialCellsArray(length).length).toEqual(length);
  });

  it('Should return correct array of objects', () => {
    expect(getInitialCellsArray(1)).toEqual([{ number: 1, selected: false }]);
  });
});

describe('Function::uniqueRandomIntArrayInRange', () => {
  it('Should return correct array length', () => {
    const min = 1;
    const max = 100;
    const length = 10;
    expect(uniqueRandomIntArrayInRange(min, max, length).length).toEqual(length);
  });

  it('Should return correct unique numbers', () => {
    const min = 1;
    const max = 10;
    const length = 10;
    expect(uniqueRandomIntArrayInRange(min, max, length).sort((a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });
});
