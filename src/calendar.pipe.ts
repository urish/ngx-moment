/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

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
    CalendarPipe.initTimer();

    CalendarPipe.refs++;

    // values such as Today will need to be replaced with Yesterday after midnight,
    // so make sure we subscribe to an EventEmitter that we set up to emit at midnight
    this.ngZone.runOutsideAngular(() =>
      this.midnightSub = CalendarPipe.midnight.subscribe(() => {
        this.ngZone.run(() => this.cdRef.markForCheck());
      }));
  }

  transform(value: Date | moment.Moment, ...args: any[]): any {
    return momentConstructor(value).calendar();
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

  private static initTimer() {
    // initialize the timer
    if (!CalendarPipe.midnight) {
      CalendarPipe.midnight = new EventEmitter<Date>();
      if (typeof window !== 'undefined') {
        let timeToUpdate = CalendarPipe._getMillisecondsUntilUpdate();
        CalendarPipe.timer = window.setTimeout(() => {
          // emit the current date
          CalendarPipe.midnight.emit(new Date());

          // refresh the timer
          CalendarPipe.removeTimer();
          CalendarPipe.initTimer();
        }, timeToUpdate);
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
