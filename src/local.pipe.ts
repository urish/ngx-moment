import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amLocal' })
export class LocalTimePipe implements PipeTransform {
  transform(value: moment.MomentInput): moment.Moment {
    return moment(value).local();
  }
}
