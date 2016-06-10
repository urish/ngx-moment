/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, WrappedValue} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform {
  private previousResult: string = null;

  transform(value: Date | moment.Moment, ...args: any[]): string | WrappedValue {
    const result = momentConstructor(value).from(momentConstructor());
    if (this.previousResult !== result) {
      this.previousResult = result;
      return WrappedValue.wrap(result);
    }
    return result;
  }
}
