/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amSubtract' })
export class SubtractPipe implements PipeTransform {
    transform(value: any, amount: moment.DurationInputArg1, unit?: moment.DurationInputArg2): any {
        if (typeof amount === 'undefined' || (typeof amount === 'number' && typeof unit === 'undefined')) {
            throw new Error('SubtractPipe: missing required arguments');
        }
        return moment(value).subtract(amount, unit);
    }
}
