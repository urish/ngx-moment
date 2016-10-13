import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {NgZone} from '@angular/core';
import {CalendarPipe} from './calendar.pipe';

class NgZoneMock {
  runOutsideAngular (fn: Function) {
    return fn();
  }
  run(fn: Function) {
    return fn();
  }
};

describe('CalendarPipe', () => {
  describe('#transform', () => {
    const pipe = new CalendarPipe(null, new NgZoneMock() as NgZone);
    it('should transform the start of the current day to "Today at 12:00 AM"', () => {
      expect(pipe.transform(moment().startOf('day'))).toBe('Today at 12:00 AM');
    });
  });
});
