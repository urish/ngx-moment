import 'es6-shim';
import 'es6-symbol/implement';
import 'reflect-metadata';
import * as moment from 'moment';
import {CalendarPipe} from './CalendarPipe.ts';

describe('Calendar', () => {

  describe('CalendarPipe', () => {
    var pipe:CalendarPipe;

    beforeEach(() => {
      pipe = new CalendarPipe(null);
    });

    describe('#transform', () => {
      it('should transform the start of the current day to "Today at 12:00 AM"', () => {
        expect(pipe.transform(moment().startOf('day'))).toBe('Today at 12:00 AM');
      });
    });
  });
});
