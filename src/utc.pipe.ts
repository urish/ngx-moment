import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amUtc' })
export class UtcPipe implements PipeTransform {
  transform(value: moment.MomentInput): moment.Moment {
    return momentConstructor(value).utc();
  }
}
