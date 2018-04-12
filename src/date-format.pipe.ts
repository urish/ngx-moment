/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amDateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, ...args: any[]): string {
    if (!value) { return ''; }
    return momentConstructor(value).format(args[0]);
  }
}
