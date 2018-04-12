import * as moment from 'moment';
import {DateFormatPipe} from './date-format.pipe';

describe('DateFormatPipe', () => {
  describe('#transform', () => {
    it('should properly format a date', () => {
      const pipe = new DateFormatPipe();
      const result = pipe.transform(moment('2016-01-24 01:23:45'), 'MMMM Do YYYY, h:mm:ss a');
      expect(result).toBe('January 24th 2016, 1:23:45 am');
    });

    it('should not format empty dates', () => {
      const pipe = new DateFormatPipe();

      const result1 = pipe.transform('', 'MMMM Do YYYY, h:mm:ss a');
      expect(result1).toBe('');

      const result2 = pipe.transform(null);
      expect(result2).toBe('');

      const result3 = pipe.transform(undefined);
      expect(result3).toBe('');
    });
  });
});
