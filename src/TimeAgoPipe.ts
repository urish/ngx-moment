/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private _currentTimer: number;

  constructor(private _cdRef: ChangeDetectorRef, private _ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment, omitSuffix?: boolean): string {
    const momentInstance = momentConstructor(value);
    this._removeTimer();
    const timeToUpdate = this._getSecondsUntilUpdate(momentInstance) * 1000;
    this._currentTimer = this._ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        window.setTimeout(() => this._cdRef.markForCheck(), timeToUpdate);
      }
    });
    return momentConstructor(value).from(momentConstructor(), omitSuffix);
  }

  ngOnDestroy(): void {
    this._removeTimer();
  }

  _removeTimer() {
    if (this._currentTimer) {
      window.clearTimeout(this._currentTimer);
      this._currentTimer = null;
    }
  }

  _getSecondsUntilUpdate(momentInstance: moment.Moment) {
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
}
