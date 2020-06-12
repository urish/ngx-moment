import { IsBeforePipe } from './is-before.pipe';

describe('IsBeforePipe', () => {
  let pipe: IsBeforePipe;

  beforeEach(() => (pipe = new IsBeforePipe()));

  describe('#transform', () => {
    it('should return true if value is before otherValue', () => {
      const test = new Date(2018, 11, 13, 0, 0, 0);
      const testDate1 = new Date(2018, 11, 15, 0, 0, 0);
      expect(pipe.transform(test, testDate1)).toBeTruthy();
    });

    it('should support passing "year", "month", "week", "day", etc as a unit parameter', () => {
      const test = new Date(2018, 0, 13, 12, 45, 45);
      const testDate1 = new Date(2019, 0, 13, 12, 45, 45);
      expect(pipe.transform(test, testDate1, 'year')).toBe(true);
      const testDate2 = new Date(2018, 1, 13, 12, 45, 45);
      expect(pipe.transform(test, testDate2, 'month')).toBe(true);
      const testDate3 = new Date(2018, 1, 13, 12, 45, 45);
      expect(pipe.transform(test, testDate3, 'day')).toBe(true);
    });

    it('should return false if value is after otherValue', () => {
      const test = new Date(2018, 11, 15, 0, 0, 0);
      const testDate1 = new Date(2018, 11, 13, 0, 0, 0);
      expect(pipe.transform(test, testDate1)).toBeFalsy();
    });
  });
});
