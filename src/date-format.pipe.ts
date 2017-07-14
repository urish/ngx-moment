/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amDateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, ...args: any[]): string {
    if (!value) return '';
    if (args[1]) return momentConstructor(value).lang(args[1]).format(args[0]);
    return momentConstructor(value).format(args[0]);
  }
}
