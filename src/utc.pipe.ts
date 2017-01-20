import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amUtc' })
export class UtcPipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number): moment.Moment {
    return moment(value).utc();
  }
}
