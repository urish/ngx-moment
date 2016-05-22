/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amDateFormat', pure: false })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | moment.Moment, ...args: any[]): string {
    return momentConstructor(value).format(args[0]);
  }
}
