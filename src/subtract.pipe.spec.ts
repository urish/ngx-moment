import * as moment from 'moment';
import { SubtractPipe } from './subtract.pipe';

describe('SubtractPipe', () => {
  let pipe: SubtractPipe;

  beforeEach(() => pipe = new SubtractPipe());

  describe('#transform', () => {
    it('should throw when provided no arguments', () => {
      expect(() => (pipe.transform as any)(128)).toThrow('SubtractPipe: missing required arguments');
    });

    it('should subtract two hours', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'hours');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2016-01-24 13:00:00');
    });

    it('should subtract two days', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'days');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2016-01-22 15:00:00');
    });

    it('should subtract two years', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'years');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2014-01-24 15:00:00');
    });
  });
});
