import * as moment from 'moment';
import {FromUnixPipe} from './from-unix.pipe';

describe('FromUnixPipe', () => {
  describe('#transform', () => {
    it('should parse a unix timestamp number to moment', () => {
      const pipe = new FromUnixPipe();
      const result = pipe.transform(1456263980);
      expect(result).toEqual(moment.unix(1456263980));
    });

    it('should parse a unix timestamp string to moment', () => {
      const pipe = new FromUnixPipe();
      const result = pipe.transform('1456263980');
      expect(result).toEqual(moment.unix(1456263980));
    });
  });
});
