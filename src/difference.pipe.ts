/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amDifference' })
export class DifferencePipe implements PipeTransform {
  transform(value: Date | moment.Moment,
            otherValue: Date | moment.Moment,
            unit?: moment.unitOfTime.Diff,
            precision?: boolean): number {

    const date = momentConstructor(value);
    const date2 = (otherValue !== null) ? momentConstructor(otherValue) : momentConstructor();

    return date.diff(date2, unit, precision);
  }
}
