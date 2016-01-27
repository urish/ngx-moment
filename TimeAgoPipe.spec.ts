import 'es6-shim';
import 'es6-symbol/implement';
import 'reflect-metadata';
import * as moment from 'moment';
import {TimeAgoPipe} from './TimeAgoPipe.ts';

describe('TimeAgo', () => {

  describe('TimeAgoPipe', () => {
    var pipe:TimeAgoPipe;

    beforeEach(() => {
      pipe = new TimeAgoPipe(null);
    });

    describe('#transform', () => {
      it('should transform the current date to "a few seconds ago"', () => {
        expect(pipe.transform(new Date())).toBe('a few seconds ago');
      });
    });
  });
});
