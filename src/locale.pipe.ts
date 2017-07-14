import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amLocale' })
export class LocalePipe implements PipeTransform {
  transform(value: string, locale: string): moment.Moment {
    return moment(value).locale(locale);
  }
}
