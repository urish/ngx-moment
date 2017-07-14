import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';
import { LangPipe } from './lang.pipe';

describe('LangPipe', () => {

  describe('#transform', () => {

    let langPipe: LangPipe;

    beforeEach(() => {
      langPipe = new LangPipe();
    });

    it('should output a moment object for a string date', () => {
      const datetimeString = '2016-01-24 01:23:45';
      const langKeyString1 = 'en';
      const langKeyString2 = 'de';
      const parsedMoment1 = langPipe.transform(datetimeString, langKeyString1);
      const parsedMoment2 = langPipe.transform(datetimeString, langKeyString2);
      expect(parsedMoment1).toEqual(jasmine.any(moment));
      expect(parsedMoment2).toEqual(jasmine.any(moment));
      expect(parsedMoment1.isValid()).toBe(true);
      expect(parsedMoment2.isValid()).toBe(true);
    });

    it('should be pipeable to amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-01-24 14:23:45';
      const langKeyString1 = 'en';
      const langKeyString2 = 'de';
      const momentFormatString1 = 'MMMM Do YYYY, h:mm:ss a';
      const momentFormatString2 = 'MMMM Do YYYY, HH:mm:ss';
      const parseOutput1 = langPipe.transform(datetimeString, langKeyString1);
      const parseOutput2 = langPipe.transform(datetimeString, langKeyString2);
      expect(amDateFormat.transform(parseOutput1, momentFormatString1)).toEqual('January 24th 2016, 2:23:45 pm');
      expect(amDateFormat.transform(parseOutput2, momentFormatString2)).toEqual('Januar 24. 2016, 14:23:45');
    });

  });

});
