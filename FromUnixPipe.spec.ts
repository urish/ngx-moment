import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {FromUnixPipe} from './FromUnixPipe';
import {DateFormatPipe} from './DateFormatPipe';

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

    it('should format a unix timestamp', () => {
	  const unixPipe = new FromUnixPipe(),
            datePipe = new DateFormatPipe();
	  const result = datePipe.transform(unixPipe.transform(1456263980), ['hh:mmA']);
      expect(result.length).toEqual(7);
    });
  });
});
