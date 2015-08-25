import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {TimeAgoPipe} from './TimeAgoPipe.ts';

describe('TimeAgo', () => {

  describe('TimeAgoPipe', () => {
    var subject;
    var result;
    var pipe;

    beforeEach(() => {
      pipe = new TimeAgoPipe(null);
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
      it('should transform the current date to "a few seconds ago"', () => {
        expect(pipe.transform(new Date())).toBe("a few seconds ago");
      });
    });
  });
});
