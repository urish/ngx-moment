import { DurationPipe } from './duration.pipe';
import { NgxMomentOptions } from './moment-options';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => pipe = new DurationPipe());

  describe('#transform', () => {
    it('should throw when provided no arguments', () => {
      expect(() => pipe.transform(128)).toThrow('DurationPipe: missing required time unit argument');
    });

    it('should convert a duration to a human-readable string', () => {
      expect(pipe.transform(24, 'hours')).toEqual('a day');
      expect(pipe.transform(27, 'days')).toEqual('a month');
      expect(pipe.transform(365, 'seconds')).toEqual('6 minutes');
      expect(pipe.transform(365, 'days')).toEqual('a year');
      expect(pipe.transform(86400, 'seconds')).toEqual('a day');
    });

    it(`should convert '50 minutes' to 'an hour' with default 'relativeTimeThreshold'`, () => {
      expect(pipe.transform(50, 'minutes')).toEqual('an hour');
    });
  });

  describe('ctor with NgxMomentOptions', () => {
    const momentOptions: NgxMomentOptions = {
      relativeTimeThresholdOptions: {
        'm': 59
      }
    };

    beforeEach(() => pipe = new DurationPipe(momentOptions));

    it(`should convert '50 minutes' to '50 minutes' when relativeTimeThreshold for 'm' unit is set to 59`, () => {
      expect(pipe.transform(50, 'minutes')).toEqual('50 minutes');
    });
  });
});
