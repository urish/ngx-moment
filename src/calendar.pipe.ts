/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import { Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amCalendar', pure: false })
export class CalendarPipe implements PipeTransform, OnDestroy {

  /**
   * @private Internal reference counter, so we can clean up when no instances are in use
   * @type {number}
   */
  private static refs: number = 0;

  private static timer: number;
  private static midnight: EventEmitter<Date>;

  private midnightSub: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
    // using a single static timer for all instances of this pipe for performance reasons
    CalendarPipe.initTimer(ngZone);

    CalendarPipe.refs++;

    // values such as Today will need to be replaced with Yesterday after midnight,
    // so make sure we subscribe to an EventEmitter that we set up to emit at midnight
    this.midnightSub = CalendarPipe.midnight.subscribe(() => {
      this.ngZone.run(() => this.cdRef.markForCheck());
    });
  }

  transform(value: Date | moment.Moment, ...args: any[]): any {
    let formats: any = null;
    let referenceTime: any = null;

    for (let i = 0, len = args.length; i < len; i++) {
      if (args[i] !== null) {
        if (typeof args[i] === 'object' && !moment.isMoment(args[i])) {
          formats = args[i];
        } else {
          referenceTime = momentConstructor(args[i]);
        }
      }
    }

    return momentConstructor(value).calendar(referenceTime, formats);
  }

  ngOnDestroy(): void {
    if (CalendarPipe.refs > 0) {
      CalendarPipe.refs--;
    }

    if (CalendarPipe.refs === 0) {
      CalendarPipe.removeTimer();
    }

    this.midnightSub.unsubscribe();
  }

  private static initTimer(ngZone: NgZone) {
    // initialize the timer
    if (!CalendarPipe.midnight) {
      CalendarPipe.midnight = new EventEmitter<Date>();
      if (typeof window !== 'undefined') {
        let timeToUpdate = CalendarPipe._getMillisecondsUntilUpdate();
        CalendarPipe.timer = ngZone.runOutsideAngular(() => {
          return window.setTimeout(() => {
            // emit the current date
            CalendarPipe.midnight.emit(new Date());

            // refresh the timer
            CalendarPipe.removeTimer();
            CalendarPipe.initTimer(ngZone);
          }, timeToUpdate);
        });
      }
    }
  }

  private static removeTimer() {
    if (CalendarPipe.timer) {
      window.clearTimeout(CalendarPipe.timer);
      CalendarPipe.timer = null;
      CalendarPipe.midnight = null;
    }
  }

  private static _getMillisecondsUntilUpdate() {
    var now = momentConstructor();
    var tomorrow = momentConstructor().startOf('day').add(1, 'days');
    var timeToMidnight = tomorrow.valueOf() - now.valueOf();
    return timeToMidnight + 1000; // 1 second after midnight
  }
}
