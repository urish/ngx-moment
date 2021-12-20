import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amUtc' })
export class UtcPipe implements PipeTransform {
  transform(value: moment.MomentInput): moment.Moment {
    return moment(value).utc();
  }
}
