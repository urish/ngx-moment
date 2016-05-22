import 'es6-shim';
import 'reflect-metadata';
import * as moment from 'moment';
import {TimeAgoPipe} from './TimeAgoPipe';

describe('TimeAgoPipe', () => {
  describe('#transform', () => {
    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should transform the current date to "a few seconds ago"', () => {
      const pipe = new TimeAgoPipe(null);
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
    });

    it('should automatically update the text as time passes', () => {
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock);
      jasmine.clock().install();
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
      jasmine.clock().tick(60000);
      expect(changeDetectorMock.markForCheck).toHaveBeenCalled();
    });

    it('should remove all timer when destroyed', () => {
      const changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      const pipe = new TimeAgoPipe(changeDetectorMock);
      jasmine.clock().install();
      expect(pipe.transform(new Date())).toBe('a few seconds ago');
      pipe.ngOnDestroy();
      jasmine.clock().tick(60000);
      expect(changeDetectorMock.markForCheck).not.toHaveBeenCalled();
    });
  });
});
