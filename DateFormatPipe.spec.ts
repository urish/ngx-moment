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

    describe('#transform', () => {
      it('should properly format a date', () => {
        expect(pipe.transform(moment('2016-01-24 01:23:45'), ['MMMM Do YYYY, h:mm:ss a'])).toBe('January 24th 2016, 1:23:45 am');
      });
    });
  });
});
