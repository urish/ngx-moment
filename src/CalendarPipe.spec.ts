import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {CalendarPipe} from './CalendarPipe';

describe('CalendarPipe', () => {
  describe('#transform', () => {
    const pipe = new CalendarPipe(null);
    it('should transform the start of the current day to "Today at 12:00 AM"', () => {
      expect(pipe.transform(moment().startOf('day'))).toBe('Today at 12:00 AM');
    });
  });
});
