import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';
import { LocalPipe } from './local.pipe';

describe('LocalPipe', () => {

  describe('#transform', () => {

    let localPipe: LocalPipe;

    beforeEach(() => {
      localPipe = new LocalPipe();
    });

    it('should output an invalid momemt object for a null input', () => {
      const localDate = localDatePipe.transform(null);
      expect(localDate).toEqual(jasmine.any(moment));
      expect(localDate.isValid()).toBe(false);
    });

    it('should output a moment object for a moment input', () => {
      const momentDate = moment();
      const localDate = localDatePipe.transform(momentDate);
      expect(localDate).toEqual(jasmine.any(moment));
      expect(localDate.isValid()).toBe(true);
    });

    it('should output a moment object for a date input', () => {
      const date = new Date();
      const localDate = localDatePipe.transform(date);
      expect(localDate).toEqual(jasmine.any(moment));
      expect(localDate.isValid()).toBe(true);
    });

    it('should output a moment object for a string date', () => {
      const dateString = '2016-01-01';
      const localDate = localDatePipe.transform(dateString);
      expect(localDate).toEqual(jasmine.any(moment));
      expect(localDate.isValid()).toBe(true);
    });

    it('should output a moment object for a timestamp', () => {
      const timestamp: number = Date.now();
      const localDate = localDatePipe.transform(timestamp);
      expect(localDate).toEqual(jasmine.any(moment));
      expect(localDate.isValid()).toBe(true);
    });

    it('should be pipeable to amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2015-12-31T23:00:00.000-01:00';
      const momentFormatString = 'YYYY-MM-DD';
      const localOutput = localDatePipe.transform(datetimeString);
      expect(amDateFormat.transform(localOutput, momentFormatString)).toEqual('2016-01-01');
    });

  });

});