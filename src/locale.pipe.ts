import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amLocale' })
export class LocalePipe implements PipeTransform {
  transform(value: moment.MomentInput, locale: string): moment.Moment {
    return moment(value).locale(locale);
  }
}
