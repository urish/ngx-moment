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

    it('should transform date to "January 13th 2016, 1:23:45 AM"', () => {
          let testDate = new Date(2016, 0, 13, 1, 23, 45);
          let params = {
               sameDay: '[Today]',
               nextDay: '[Tomorrow]',
               nextWeek: 'dddd',
               lastDay: '[Yesterday]',
               lastWeek: '[Last] dddd',
               sameElse: 'MMMM Do YYYY, h:mm:ss A'
          };
          expect(pipe.transform(testDate, params)).toBe('January 13th 2016, 1:23:45 AM');
    });
  });
});
