import moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';
import { FromUtcPipe } from './from-utc.pipe';

describe('UtcPipe', () => {
  describe('#transform', () => {
    let utcDatePipe: FromUtcPipe;

    beforeEach(() => {
      utcDatePipe = new FromUtcPipe();
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

    it('should parse with provided timezone and format to UTC', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-12-31T23:00:00.000-01:00';
      const momentFormatString = 'YYYY-MM-DD';
      const utcOutput = utcDatePipe.transform(datetimeString);
      expect(amDateFormat.transform(utcOutput, momentFormatString)).toEqual('2017-01-01');
    });

    it('should parse as UTC without provided timezone', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-12-31T23:00:00.000';
      const momentFormatString = 'YYYY-MM-DD';
      const utcOutput = utcDatePipe.transform(datetimeString);
      expect(amDateFormat.transform(utcOutput, momentFormatString)).toEqual('2016-12-31');
    });

    it('should parse as UTC with a provided format', () => {
      const datetimeString = '31/12/2016, 23:02:00';
      const momentFormatString = 'DD/MM/YYYY, HH:mm:ss';
      const utcOutput = utcDatePipe.transform(datetimeString, momentFormatString);
      expect(utcOutput).toEqual(expect.any(moment));
      expect(utcOutput.isValid()).toBe(true);

      expect(utcOutput.year()).toBe(2016);
      expect(utcOutput.month()).toBe(11);
      expect(utcOutput.date()).toBe(31);
    });

    it('should parse as UTC with an array of provided formats', () => {
      const datetimeString = '31st 12/2016';
      const momentFormatStrings = ['DD/MM/YYYY, HH:mm:ss', 'Do MM/YYYY'];
      const utcOutput = utcDatePipe.transform(datetimeString, momentFormatStrings);
      expect(utcOutput).toEqual(expect.any(moment));
      expect(utcOutput.isValid()).toBe(true);

      expect(utcOutput.year()).toBe(2016);
      expect(utcOutput.month()).toBe(11);
      expect(utcOutput.date()).toBe(31);
    });

    it('should output an invalid moment object for a different formatted input', () => {
      const datetimeString = '31/12/2016, 23:02:00';
      const utcDate = utcDatePipe.transform(datetimeString);
      expect(utcDate).toEqual(expect.any(moment));
      expect(utcDate.isValid()).toBe(false);
    });
  });
});
