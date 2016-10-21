import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amFromNow' })
export class FromNowPipe implements PipeTransform {
  transform(value: string): any {
    if (value == null) {
      return value;
    }

    return moment(value).fromNow();
  }
}
