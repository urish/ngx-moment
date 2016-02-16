/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from 'angular2/core';
import * as moment from 'moment';

@Pipe({ name: 'amDateFormat', pure: false })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | moment.Moment, args?: any[]): any {
    return moment(value).format(args[0]);
  }
}
