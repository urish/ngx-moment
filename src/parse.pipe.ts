import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amParse' })
export class ParsePipe implements PipeTransform {
  transform(value: string, formats: string|string[]): moment.Moment {
    return momentConstructor(value, formats);
  }
}
