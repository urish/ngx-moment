/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amDifference' })
export class DifferencePipe implements PipeTransform {
  transform(value: Date | moment.Moment,
            otherValue: Date | moment.Moment,
            unit?: moment.unitOfTime.Diff,
            precision?: boolean): number {

    let date = momentConstructor(value);
    let date2 = (otherValue !== null) ? momentConstructor(otherValue) : momentConstructor();

    return date.diff(date2, unit, precision);
  }
}
