import * as moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';
import { UtcPipe } from './utc.pipe';

describe('UtcPipe', () => {

  describe('#transform', () => {

    let utcDatePipe: UtcPipe;

    beforeEach(() => {
      utcDatePipe = new UtcPipe();
    });

    it('should output an invalid momemt object for a null input', () => {
      const utcDate = utcDatePipe.transform(null);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(false);
    });

    it('should output a moment object for a moment input', () => {
      const momentDate = moment();
      const utcDate = utcDatePipe.transform(momentDate);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(true);
    });

    it('should output a moment object for a date input', () => {
      const date = new Date();
      const utcDate = utcDatePipe.transform(date);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(true);
    });

    it('should output a moment object for a string date', () => {
      const dateString = '2016-01-01';
      const utcDate = utcDatePipe.transform(dateString);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(true);
    });

    it('should output a moment object for a timestamp', () => {
      const timestamp: number = Date.now();
      const utcDate = utcDatePipe.transform(timestamp);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(true);
    });

    it('should be pipeable to amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2015-12-31T23:00:00.000-01:00';
      const momentFormatString = 'YYYY-MM-DD';
      const utcOutput = utcDatePipe.transform(datetimeString);
      expect(amDateFormat.transform(utcOutput, momentFormatString)).toEqual('2016-01-01');
    });

  });

});
