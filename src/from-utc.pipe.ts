/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amFromUtc' })
export class FromUtcPipe implements PipeTransform {
  transform(value: moment.MomentInput, formats?: string|string[], ...args: string[]): any {
    return formats ? moment.utc(value, formats) : moment.utc(value);
  }
}
