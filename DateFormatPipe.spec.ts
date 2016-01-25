import 'es6-shim';
import 'es6-symbol/implement';
import 'reflect-metadata';
import * as moment from 'moment';
import {DateFormatPipe} from './DateFormatPipe.ts';

describe('DateFormat', () => {

  describe('DateFormatPipe', () => {
    var pipe:DateFormatPipe;

    beforeEach(() => {
      pipe = new DateFormatPipe();
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
      it('should properly format a date', () => {
        expect(pipe.transform(moment('2016-01-24 01:23:45'), ['MMMM Do YYYY, h:mm:ss a'])).toBe('January 24th 2016, 1:23:45 am');
      });
    });
  });
});
