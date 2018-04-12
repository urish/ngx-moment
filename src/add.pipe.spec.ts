import 'reflect-metadata';
import * as moment from 'moment';
import { AddPipe } from './add.pipe';

describe('AddPipe', () => {
  let pipe: AddPipe;

  beforeEach(() => pipe = new AddPipe());

  describe('#transform', () => {
    it('should throw when provided no arguments', () => {
      expect(() => (pipe.transform as any)(128)).toThrow('AddPipe: missing required arguments');
    });

    it('should add two hours', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'hours');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2016-01-24 17:00:00');
    });

    it('should add two days', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'days');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2016-01-26 15:00:00');
    });

    it('should add two years', () => {
      const result = pipe.transform(moment('2016-01-24 15:00:00'), '2', 'years');
      expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe('2018-01-24 15:00:00');
    });
  });
});
