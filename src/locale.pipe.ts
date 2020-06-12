import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// See https://github.com/ng-packagr/ng-packagr/issues/217 for why this is needed:
const momentConstructor = moment;

@Pipe({ name: 'amLocale' })
export class LocalePipe implements PipeTransform {
  transform(value: moment.MomentInput, locale: string): moment.Moment {
    return momentConstructor(value).locale(locale);
  }
}
