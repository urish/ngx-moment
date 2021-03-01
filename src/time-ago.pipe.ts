/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {
  Pipe,
  ChangeDetectorRef,
  PipeTransform,
  OnDestroy,
  NgZone,
  Optional,
  Inject,
} from '@angular/core';
import * as moment from 'moment';
import { applyOptions, NgxMomentOptions, NGX_MOMENT_OPTIONS } from './moment-options';

const momentConstructor = moment;

@Pipe({ name: 'amTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer: number | null;

  private lastTime: Number;
  private lastValue: moment.MomentInput;
  private lastOmitSuffix: boolean;
  private lastLocale?: string;
  private lastText: string;
  private formatFn: (m: moment.Moment) => string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Optional() @Inject(NGX_MOMENT_OPTIONS) momentOptions?: NgxMomentOptions,
  ) {
    this._applyOptions(momentOptions);
  }

  format(m: moment.Moment) {
    return m.from(momentConstructor(), this.lastOmitSuffix);
  }

  transform(
    value: moment.MomentInput,
    omitSuffix?: boolean,
    formatFn?: (m: moment.Moment) => string,
  ): string {
    if (this.hasChanged(value, omitSuffix)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;
      this.lastOmitSuffix = omitSuffix;
      this.lastLocale = this.getLocale(value);
      this.formatFn = formatFn || this.format.bind(this);
      this.removeTimer();
      this.createTimer();
      this.lastText = this.formatFn(momentConstructor(value));
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
          this.lastText = this.formatFn(momentConstructor(this.lastValue));

          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, timeToUpdate);
      } else {
        return null;
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

  private hasChanged(value: moment.MomentInput, omitSuffix?: boolean): boolean {
    return (
      this.getTime(value) !== this.lastTime ||
      this.getLocale(value) !== this.lastLocale ||
      omitSuffix !== this.lastOmitSuffix
    );
  }

  private getTime(value: moment.MomentInput): number {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return momentConstructor(value).valueOf();
    }
  }

  private getLocale(value: moment.MomentInput): string | null {
    return moment.isMoment(value) ? value.locale() : moment.locale();
  }

  private _applyOptions(momentOptions: NgxMomentOptions): void {
    applyOptions(momentOptions);
  }
}
