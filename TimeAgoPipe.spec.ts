import {TimeAgoPipe, TimeAgoPipeFactory} from './TimeAgoPipe';

describe('Capitalize', () => {

  describe('CapitalizePipe', () => {
    var subject;
    var result;
    var pipe;

    beforeEach(() => {
      pipe = new TimeAgoPipe();
    });

    describe('#support', () => {

      it('should support Date objects', () => {
        expect(pipe.supports(new Date())).toBe(true);
      });

      it('should not support string', () => {
        expect(pipe.supports('foobar')).toBe(false);
      });

      it('should not support null', () => {
        expect(pipe.supports(null)).toBe(false);
      });

    });

    describe('#transform', () => {
      it('should transform the current date to "a few seconds ago"', () => {
        expect(pipe.transform(new Date())).toBe("a few seconds ago");
      });
    });
  });

  describe('TimeAgoPipeFactory', () => {
    var factory;

    beforeEach(() => {
      factory = new TimeAgoPipeFactory();
    });

    describe('#support', () => {
      it('should support Date objects', () => {
        expect(factory.supports(new Date())).toBe(true);
      });

      it('should not support string', () => {
        expect(factory.supports('foobar')).toBe(false);
      });

      it('should not support null', () => {
        expect(factory.supports(null)).toBe(false);
      });
    });

    describe('#create', () => {
      it('should be instance of TimeAgoPipe', () => {
        expect(factory.create() instanceof TimeAgoPipe).toBeTruthy();
      });
    });

  });
});
