import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {TimeAgoPipe} from './TimeAgoPipe';

describe('TimeAgoPipe', () => {
  describe('#transform', () => {
    it('should transform the current date to "a few seconds ago"', () => {
      const pipe = new TimeAgoPipe(null);
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
    });
  });
});
