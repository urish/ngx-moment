import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amUtc' })
export class UtcPipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number): moment.Moment {
    return momentConstructor(value).utc();
  }
}
