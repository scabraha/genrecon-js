import * as Utils from '../../src/utils/Utils';

describe('Utils', () => {
  it('Other data types are not non-empty arrays', () => {
    expect(Utils.isNonEmptyArray(1)).toBeFalsy();
    expect(Utils.isNonEmptyArray('text')).toBeFalsy();
    expect(Utils.isNonEmptyArray({})).toBeFalsy();
  });

  it('Empty arrays are not non-empty arrays', () => {
    expect(Utils.isNonEmptyArray([])).toBeFalsy();
  });

  it('A populated array is a non-empty array', () => {
    expect(Utils.isNonEmptyArray([1])).toBeTruthy();
  });
});
