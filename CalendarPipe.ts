/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amCalendar', pure: false })
export class CalendarPipe implements PipeTransform, OnDestroy {

  /**
   * @private Internal reference counter, so we can clean up when no instances are in use
   * @type {number}
   */
  private static _refs: number = 0;

  private static _timer: number;
  private static _midnight: EventEmitter<Date>;

  constructor(private _cdRef: ChangeDetectorRef) {
    // using a single static timer for all instances of this pipe for performance reasons
    CalendarPipe._initTimer();

    CalendarPipe._refs++;

    // values such as Today will need to be replaced with Yesterday after midnight,
    // so make sure we subscribe to an EventEmitter that we set up to emit at midnight
    CalendarPipe._midnight.subscribe(() => this._cdRef.markForCheck());
  }

  transform(value: Date | moment.Moment, ...args: any[]): any {
    return momentConstructor(value).calendar();
  }

  ngOnDestroy(): void {
    if (CalendarPipe._refs > 0) {
      CalendarPipe._refs--;
    }

    if (CalendarPipe._refs === 0) {
      CalendarPipe._removeTimer();
    }
  }

  private static _initTimer() {
    // initialize the timer
    if (!CalendarPipe._midnight) {
      CalendarPipe._midnight = new EventEmitter<Date>();
      let timeToUpdate = CalendarPipe._getMillisecondsUntilUpdate();
      CalendarPipe._timer = window.setTimeout(() => {
        // emit the current date
        CalendarPipe._midnight.emit(new Date());

        // refresh the timer
        CalendarPipe._removeTimer();
        CalendarPipe._initTimer();
      }, timeToUpdate);
    }
  }

  private static _removeTimer() {
    if (CalendarPipe._timer) {
      window.clearTimeout(CalendarPipe._timer);
      CalendarPipe._timer = null;
      CalendarPipe._midnight = null;
    }
  }

  private static _getMillisecondsUntilUpdate() {
    var now = momentConstructor();
    var tomorrow = momentConstructor().startOf('day').add(1, 'days');
    var timeToMidnight = tomorrow.valueOf() - now.valueOf();
    return timeToMidnight + 1000; // 1 second after midnight
  }
}
