/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amFromUnix' })
export class FromUnixPipe implements PipeTransform {
  transform(value: number | string, ...args: string[]): any {
    return (typeof value === 'string') ? moment.unix(parseInt(value, 10)) : moment.unix(value);
  }
}
