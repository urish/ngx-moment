/* ngx-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amFromUtc' })
export class FromUtcPipe implements PipeTransform {
  transform(value: any, ...args: string[]): any {
    return moment.utc(value);
  }
}
