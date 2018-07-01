import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amParseZone' })
export class ParseZonePipe implements PipeTransform {
  transform(value: string): moment.Moment {
    return moment.parseZone(value);
  }
}
