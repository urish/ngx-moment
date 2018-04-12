/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import { Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

const momentConstructor = moment;

@Pipe({ name: 'amCalendar', pure: false })
export class CalendarPipe implements PipeTransform, OnDestroy {

  /**
   * Internal reference counter, so we can clean up when no instances are in use
   */
  private static refs = 0;

  private static timer: number | null = null;
  private static midnight: EventEmitter<Date> | null = null;

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
        const timeToUpdate = CalendarPipe._getMillisecondsUntilUpdate();
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
    const now = momentConstructor();
    const tomorrow = momentConstructor().startOf('day').add(1, 'days');
    const timeToMidnight = tomorrow.valueOf() - now.valueOf();
    return timeToMidnight + 1000; // 1 second after midnight
  }
}
