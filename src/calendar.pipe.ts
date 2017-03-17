/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs/Subscription';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amCalendar', pure: false })
export class CalendarPipe implements PipeTransform, OnDestroy {
  private timer: number;
  private midnight: EventEmitter<Date>;

  private midnightSub: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
    this.initTimer();

    // values such as Today will need to be replaced with Yesterday after midnight,
    // so make sure we subscribe to an EventEmitter that we set up to emit at midnight
    this.ngZone.runOutsideAngular(() =>
      this.midnightSub = this.midnight.subscribe(() => {
        this.ngZone.run(() => this.cdRef.markForCheck());
      }));
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
    this.removeTimer();
    this.midnightSub.unsubscribe();
  }

  private initTimer() {
    // initialize the timer
    if (!this.midnight) {
      this.midnight = new EventEmitter<Date>();
      if (typeof window !== 'undefined') {
        let timeToUpdate = this._getMillisecondsUntilUpdate();
        this.timer = this.ngZone.runOutsideAngular(() => {
          window.setTimeout(() => {
            // emit the current date
            this.midnight.emit(new Date());

            // refresh the timer
            this.removeTimer();
            this.initTimer();
            this.ngZone.run(() => this.cdRef.markForCheck());
          }, timeToUpdate);
        });
      }
    }
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
      this.midnight = null;
    }
  }

  private _getMillisecondsUntilUpdate() {
    var now = momentConstructor();
    var tomorrow = momentConstructor().startOf('day').add(1, 'days');
    var timeToMidnight = tomorrow.valueOf() - now.valueOf();
    return timeToMidnight + 1000; // 1 second after midnight
  }
}
