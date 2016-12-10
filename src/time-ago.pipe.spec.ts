import 'es6-shim';
import 'reflect-metadata';
import {NgZone} from '@angular/core';
import {TimeAgoPipe} from './time-ago.pipe';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

class NgZoneMock {
  runOutsideAngular (fn: Function) {
    return fn();
  }
  run(fn: Function) {
    return fn();
  }
};

describe('TimeAgoPipe', () => {
  describe('#transform', () => {
    afterEach(function() {
      jasmine.clock().uninstall();
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
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock, new NgZoneMock() as NgZone);
      jasmine.clock().install();
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
      jasmine.clock().tick(60000);
      expect(changeDetectorMock.markForCheck).toHaveBeenCalled();
    });

    it('should update the text with a new date instance different from the previous one', () => {
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock, new NgZoneMock() as NgZone);
      jasmine.clock().mockDate(new Date('2016-05-01'));
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      expect(pipe.transform(new Date(0))).toBe('46 years ago');
      expect(pipe.transform(moment())).toBe('a few seconds ago');
      expect(pipe.transform(moment(0))).toBe('46 years ago');
    });

    it('should update the text when the date instance time is updated', () => {
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock, new NgZoneMock() as NgZone);
      jasmine.clock().mockDate(new Date('2016-05-01'));
      let date = new Date();
      expect(pipe.transform(date)).toBe('a few seconds ago');
      date.setFullYear(2000);
      expect(pipe.transform(date)).toBe('16 years ago');

      let dateAsMoment = moment();
      expect(pipe.transform(dateAsMoment)).toBe('a few seconds ago');
      dateAsMoment.year(2000);
      expect(pipe.transform(dateAsMoment)).toBe('16 years ago');
    });

    it('should remove all timer when destroyed', () => {
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock, new NgZoneMock() as NgZone);
      jasmine.clock().install();
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      pipe.ngOnDestroy();
      jasmine.clock().tick(60000);
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
    });
  });
});
