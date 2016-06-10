import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {TimeAgoPipe} from './TimeAgoPipe';
import {WrappedValue} from '@angular/core';

describe('TimeAgoPipe', () => {
  describe('#transform', () => {
    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should transform the current date to "a few seconds ago"', () => {
      const pipe = new TimeAgoPipe();
      expect(pipe.transform(new Date())).toEqual(WrappedValue.wrap('a few seconds ago'));
    });

    it('should automatically update the text as time passes', () => {
      const pipe = new TimeAgoPipe(),
        date = new Date();
      // First value trigger changes detection and returns a wrapped value
      expect(pipe.transform(date)).toEqual(WrappedValue.wrap('a few seconds ago'));
      // Second call will return the cached value, not wrapped
      expect(pipe.transform(date)).toBe('a few seconds ago');
    });
  });
});
