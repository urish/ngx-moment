/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from 'angular2/core';
import * as moment_ from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Pipe({name: 'amDateFormat', pure: false})
export class DateFormatPipe implements PipeTransform {
  supports(value:any):boolean {
    return value instanceof Date || moment.isMoment(value);
  }

  transform(value:Date | moment.Moment, args?:any[]):any {
    return moment(value).format(args[0]);
  }
}
