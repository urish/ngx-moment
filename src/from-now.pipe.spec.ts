import * as moment from 'moment';
import {FromNowPipe} from './from-now.pipe';

describe('FromNowPipe', () => {
  describe('#transform', () => {
    it('should convert provided date to moment string', () => {
      const pipe = new FromNowPipe();
      const value = '2007-01-29';
      const result = pipe.transform(value);
      expect(result).toEqual(moment(value).fromNow());
    });

    it('should return undefined when is was provided', () => {
      const pipe = new FromNowPipe();
      const result = pipe.transform(undefined);
      expect(result).toEqual(undefined);
    });

    it('should return null when is was provided', () => {
      const pipe = new FromNowPipe();
      const result = pipe.transform(null);
      expect(result).toEqual(null);
    });
  });
});
