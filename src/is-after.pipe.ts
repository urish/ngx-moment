import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

const momentConstructor = moment;

@Pipe({
  name: 'amIsAfter'
})
export class IsAfterPipe implements PipeTransform {

  transform(value: Date | moment.Moment,
    otherValue: Date | moment.Moment,
    unit?: moment.unitOfTime.StartOf): boolean {
    return momentConstructor(value).isAfter(momentConstructor(otherValue), unit);
  }

}
