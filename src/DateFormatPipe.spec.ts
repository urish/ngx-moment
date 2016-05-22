import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {DateFormatPipe} from './DateFormatPipe';

describe('DateFormatPipe', () => {
  describe('#transform', () => {
    it('should properly format a date', () => {
      const pipe = new DateFormatPipe();
      const result = pipe.transform(moment('2016-01-24 01:23:45'), 'MMMM Do YYYY, h:mm:ss a');
      expect(result).toBe('January 24th 2016, 1:23:45 am');
    });
  });
});
