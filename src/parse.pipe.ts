import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amParse' })
export class ParsePipe implements PipeTransform {
  transform(value: moment.MomentInput, formats: string | string[]): moment.Moment {
    return moment(value, formats);
  }
}
