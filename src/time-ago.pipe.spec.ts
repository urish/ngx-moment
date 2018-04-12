import { NgZone } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';
import * as moment from 'moment';
import 'moment/min/locales';

declare var global: any;

class NgZoneMock {
  runOutsideAngular(fn: Function) {
    return fn();
  }
  run(fn: Function) {
    return fn();
  }
}

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  global.Date = (arg: any) => new _Date(typeof arg !== 'undefined' ? arg : defaultDate);
  global.Date.UTC = _Date.UTC;
}

describe('TimeAgoPipe', () => {
  describe('#transform', () => {

    beforeEach(() => jest.useFakeTimers());

    afterEach(() => {
      global.Date = _Date;
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('should transform the current date to "a few seconds ago"', () => {
      const pipe = new TimeAgoPipe(null, new NgZoneMock() as NgZone);
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
    });

    it('should omit the suffix if second parameter is truthy', () => {
      const pipe = new TimeAgoPipe(null, new NgZoneMock() as NgZone);
      expect(pipe.transform(new Date(new Date().getTime() + 60000), true)).toBe('a minute');
    });

    it('should automatically update the text as time passes', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
      jest.runTimersToTime(60000);
      expect(changeDetectorMock.markForCheck).toHaveBeenCalled();
    });

    it('should update the text with a new date instance different from the previous one', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      fakeDate('2016-05-01');
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      expect(pipe.transform(new Date(0))).toBe('46 years ago');
      expect(pipe.transform(moment())).toBe('a few seconds ago');
      expect(pipe.transform(moment(0))).toBe('46 years ago');
    });

    it('should update the text when moment locale changes', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      fakeDate('2016-05-01');
      expect(pipe.transform(moment(0))).toBe('46 years ago');
      expect(pipe.transform(moment(0).locale('pl'))).toBe('46 lat temu');
    });

    it('should reset language when localized moment changes to Date', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      fakeDate('2016-05-01');
      expect(pipe.transform(moment(0).locale('pl'))).toBe('46 lat temu');
      expect(pipe.transform(new Date(0))).toBe('46 years ago');
    });

    it('should update the text when the date instance time is updated', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      fakeDate('2016-05-01');
      const date = new Date();
      expect(pipe.transform(date)).toBe('a few seconds ago');
      date.setFullYear(2000);
      expect(pipe.transform(date)).toBe('16 years ago');

      const dateAsMoment = moment();
      expect(pipe.transform(dateAsMoment)).toBe('a few seconds ago');
      dateAsMoment.year(2000);
      expect(pipe.transform(dateAsMoment)).toBe('16 years ago');
    });

    it('should remove all timers when destroyed', () => {
      const changeDetectorMock = { markForCheck: jest.fn() };
      const pipe = new TimeAgoPipe(changeDetectorMock as any, new NgZoneMock() as NgZone);
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      pipe.ngOnDestroy();
      jest.runTimersToTime(60000);
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
    });
  });
});
