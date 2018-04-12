/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({name: 'amTimeAgo', pure: false})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastTime: Number;
  private lastValue: Date | moment.Moment;
  private lastOmitSuffix: boolean;
  private lastLocale?: string;
  private lastText: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment, omitSuffix?: boolean): string {
    if (this.hasChanged(value, omitSuffix)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;
      this.lastOmitSuffix = omitSuffix;
      this.lastLocale = this.getLocale(value);
      this.removeTimer();
      this.createTimer();
      this.lastText = momentConstructor(value).from(momentConstructor(), omitSuffix);

    } else {
      this.createTimer();
    }

    return this.lastText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }
    const momentInstance = momentConstructor(this.lastValue);

    const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
    this.currentTimer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.lastText = momentConstructor(this.lastValue).from(momentConstructor(), this.lastOmitSuffix);

          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, timeToUpdate);
      }
    });
  }


  private removeTimer() {
    if (this.currentTimer) {
      window.clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private getSecondsUntilUpdate(momentInstance: moment.Moment) {
    const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
    if (howOld < 1) {
      return 1;
    } else if (howOld < 60) {
      return 30;
    } else if (howOld < 180) {
      return 300;
    } else {
      return 3600;
    }
  }

  private hasChanged(value: Date | moment.Moment, omitSuffix?: boolean) {
    return this.getTime(value) !== this.lastTime
      || this.getLocale(value) !== this.lastLocale
      || omitSuffix !== this.lastOmitSuffix;
  }

  private getTime(value: Date | moment.Moment) {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return momentConstructor(value).valueOf();
    }
  }

  private getLocale(value: Date | moment.Moment): string {
    return moment.isMoment(value) ? value.locale() : null;
  }
}
