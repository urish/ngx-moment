import 'es6-shim';
import 'reflect-metadata';
import {NgZone} from '@angular/core';
import {TimeAgoPipe} from './TimeAgoPipe';

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
