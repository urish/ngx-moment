/* angular2-moment / v0.0.4 / (c) 2015 Uri Shaked / MIT Licence */

/// <reference path="node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />

import {Pipe, ChangeDetectorRef, PipeTransform} from 'angular2/angular2';
import * as moment_ from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Pipe({name: 'amTimeAgo', pure: false})
export class TimeAgoPipe implements PipeTransform {
  private _currentTimer:number;

  constructor(private _cdRef:ChangeDetectorRef) {
  }

  supports(value:any):boolean {
    return value instanceof Date || moment.isMoment(value);
  }

  transform(value:Date | moment.Moment, args?:any[]):any {
    let momentInstance = moment(value);
    this._removeTimer();
    let timeToUpdate = this._getSecondsUntilUpdate(momentInstance) * 1000;
    this._currentTimer = setTimeout(() => this._cdRef.markForCheck(), timeToUpdate);
    return moment(value).from(moment());
  }

  onDestroy():void {
    this._removeTimer();
  }

  _removeTimer() {
    if (this._currentTimer) {
      clearTimeout(this._currentTimer);
      this._currentTimer = null;
    }
  }

  _getSecondsUntilUpdate(momentInstance:moment.Moment) {
    var howOld = Math.abs(moment().diff(momentInstance, 'minute'));
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
