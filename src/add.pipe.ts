/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amAdd' })
export class AddPipe implements PipeTransform {
    transform(value: any, amount: moment.DurationInputArg1, unit?: moment.DurationInputArg2): any {
        if (typeof amount === 'undefined' || (typeof amount === 'number' && typeof unit === 'undefined')) {
            throw new Error('AddPipe: missing required arguments');
        }
        return momentConstructor(value).add(amount, unit);
    }
}
