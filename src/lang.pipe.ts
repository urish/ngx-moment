import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'amLang' })
export class LangPipe implements PipeTransform {
  transform(value: string, lang: string): moment.Moment {
    return moment(value).locale(lang);
  }
}
