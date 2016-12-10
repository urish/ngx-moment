import {DifferencePipe} from './difference.pipe';
import * as moment from 'moment';

describe('DifferencePipe', () => {
  var pipe: DifferencePipe;

  beforeEach(() => pipe = new DifferencePipe());

  describe('#transform', () => {

    it('should take the difference of two dates in milliseconds', () => {
      let today = new Date(2012, 0, 22, 0, 0, 0);
      let testDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 33, 33);
      expect(pipe.transform(testDate, today)).toBe(48813000);
    });

    it('should support passing "years", "months", "days", etc as a units parameter', () => {
      let test = new Date(2012, 0, 22, 4, 46, 54);
      let testDate1 = new Date(2013, 0, 22, 4, 46, 54);
      expect(pipe.transform(testDate1, test, 'years')).toBe(1);
      let testDate2 = new Date(2012, 1, 22, 4, 46, 54);
      expect(pipe.transform(testDate2, test, 'months')).toBe(1);
      let testDate3 = new Date(2012, 0, 23, 4, 46, 54);
      expect(pipe.transform(testDate3, test, 'days')).toBe(1);
    });

    it('should allow rounding to be disabled via parameter', () => {
      let test = new Date(2012, 0, 22, 4, 46, 54);
      let testDate1 = new Date(test.getFullYear() + 1, test.getMonth() + 6, test.getDate());
      expect(pipe.transform(testDate1, test, 'years')).toBe(1);
      expect(pipe.transform(testDate1, test, 'years', true)).toBeCloseTo(1.5, 1);
    });

    it('dates from the future should return negative values', () => {
      let today = new Date(2012, 0, 22, 4, 46, 54);
      let testDate = new Date(2013, 0, 22, 4, 46, 54);
      expect(String(pipe.transform(today, testDate))).toContain('-');
    });

  });
});
