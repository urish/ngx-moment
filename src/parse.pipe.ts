import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amParse' })
export class ParsePipe implements PipeTransform {
  transform(value: string, format: string): moment.Moment {
    return momentConstructor(value, format);
  }
}
