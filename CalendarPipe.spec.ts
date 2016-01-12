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

    describe('#support', () => {

      it('should support Date objects', () => {
        expect(pipe.supports(new Date())).toBe(true);
      });

      it('should support moment instances', () => {
        expect(pipe.supports(moment())).toBe(true);
      });

      it('should not support string', () => {
        expect(pipe.supports('foobar')).toBe(false);
      });

      it('should not support null', () => {
        expect(pipe.supports(null)).toBe(false);
      });

    });

    describe('#transform', () => {
      it('should transform the start of the current day to "Today at 12:00 AM"', () => {
        expect(pipe.transform(moment().startOf('day'))).toBe('Today at 12:00 AM');
      });
    });
  });
});
