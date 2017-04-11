/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({name: 'amTimeAgo', pure: false})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastTime: Number;
  private lastValue: Date | moment.Moment;
  private lastOmitSuffix: boolean;
  private lastText: string;
  private fullDateThreshold: number;
  private useFullDateThreshold: boolean;
  private fullDateThresholdFormat: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment,
            omitSuffix?: boolean,
            fullDateThreshold?: number,
            fullDateThresholdFormat?: string
           ): string {

    if (this.hasChanged(value, omitSuffix)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;
      this.lastOmitSuffix = omitSuffix;
      this.fullDateThreshold = fullDateThreshold;
      this.useFullDateThreshold = isNaN(fullDateThreshold) ? false : true;
      this.fullDateThresholdFormat = fullDateThresholdFormat ? fullDateThresholdFormat : moment.defaultFormat;
      this.removeTimer();
      this.createTimer();
      this.lastText = this.calcDisplayedText(
        this.lastValue, this.lastOmitSuffix, this.useFullDateThreshold,
        this.fullDateThreshold, this.fullDateThresholdFormat);

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
          this.lastText = this.calcDisplayedText(
            this.lastValue, this.lastOmitSuffix, this.useFullDateThreshold,
            this.fullDateThreshold, this.fullDateThresholdFormat);

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
    return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
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

  private calcDisplayedText(
    value: Date | moment.Moment,
    omitSuffix: boolean,
    useFullDateThreshold: boolean,
    fullDateThreshold: any,
    fullDateThresholdFormat: string) {

    var displayStrategy: Function;
    var valueMoment = momentConstructor(value);
    var daysDurationPassed = moment.duration(momentConstructor().diff(valueMoment)).days();

    if (useFullDateThreshold && daysDurationPassed >= fullDateThreshold) {
      displayStrategy = this.fullDateDisplayStrategy.bind(null, fullDateThresholdFormat);
    } else {
      displayStrategy = this.timeAgoDisplayStrategy.bind(null, omitSuffix);
    }

    return displayStrategy(value);
  }

  private timeAgoDisplayStrategy(omitSuffix: boolean, value : Date | moment.Moment) {
    return momentConstructor(value).from(momentConstructor(), omitSuffix);
  }

  private fullDateDisplayStrategy(format: string, value: Date | moment.Moment) {
    return momentConstructor(value).format(format);
  }
}
