import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'amParseZone' })
export class ParseZonePipe implements PipeTransform {
  transform(value: moment.MomentInput): moment.Moment {
    return moment.parseZone(value);
  }
}
