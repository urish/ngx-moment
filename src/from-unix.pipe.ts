/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amFromUnix' })
export class FromUnixPipe implements PipeTransform {
  transform(value: any, ...args: string[]): any {
    if (typeof value === 'string') {
      value = +value;
    }
    return (args[0] === 'x') ? moment(value) : moment.unix(value);
  }
}
