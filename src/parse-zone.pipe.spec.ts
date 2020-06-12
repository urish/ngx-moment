import * as moment from 'moment';
import { ParseZonePipe } from './parse-zone.pipe';

describe('ParseZonePipe', () => {
  describe('#transform', () => {
    let parseZonePipe: ParseZonePipe;

    beforeEach(() => {
      parseZonePipe = new ParseZonePipe();
    });

    it('should output an invalid momemt object for a null input', () => {
      const parsedDate = parseZonePipe.transform(null);
      expect(parsedDate).toEqual(expect.any(moment));
      expect(parsedDate.isValid()).toBe(false);
    });

    it('should parse a date in ISO_8601 format', () => {
      const date: string = moment().toISOString();
      const parsedDate = parseZonePipe.transform(date);
      expect(parsedDate).toEqual(expect.any(moment));
      expect(parsedDate.isValid()).toBe(true);
    });

    it('should preserve a positive UTC offset', () => {
      const offset = 720;
      const date = moment().utcOffset(offset).format();
      const parsedDate = parseZonePipe.transform(date);
      expect(parsedDate.utcOffset()).toEqual(offset);
    });

    it('should preserve a negative UTC offset', () => {
      const offset = -720;
      const date = moment().utcOffset(offset).format();
      const parsedDate = parseZonePipe.transform(date);
      expect(parsedDate.utcOffset()).toEqual(offset);
    });
  });
});
