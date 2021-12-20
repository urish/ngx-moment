/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amDifference' })
export class DifferencePipe implements PipeTransform {
  transform(
    value: moment.MomentInput,
    otherValue: moment.MomentInput,
    unit?: moment.unitOfTime.Diff,
    precision?: boolean,
  ): number {
    const date = moment(value);
    const date2 = otherValue !== null ? moment(otherValue) : moment();

    return date.diff(date2, unit, precision);
  }
}
