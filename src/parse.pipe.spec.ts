import * as moment from 'moment';
import { DateFormatPipe } from './date-format.pipe';
import { ParsePipe } from './parse.pipe';

describe('ParsePipe', () => {

  describe('#transform', () => {

    let parsePipe: ParsePipe;

    beforeEach(() => {
      parsePipe = new ParsePipe();
    });

    it('should output a moment object for a string date', () => {
      const dateString = '2015#09#13';
      const formatInputString = 'YYYY#MM#DD';
      const parsedMoment = parsePipe.transform(dateString, formatInputString);
      expect(parsedMoment).toEqual(expect.any(moment));
      expect(parsedMoment.isValid()).toBe(true);

      expect(parsedMoment.year()).toBe(2015);
      expect(parsedMoment.month()).toBe(8);
      expect(parsedMoment.date()).toBe(13);
    });

    it('should be pipeable to amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '01/02/2016';
      const formatInputString = 'DD/MM/YYYY';
      const momentFormatString = 'YYYY-MM-DD';
      const parseOutput = parsePipe.transform(datetimeString, formatInputString);
      expect(amDateFormat.transform(parseOutput, momentFormatString)).toEqual('2016-02-01');
    });

  });

});
