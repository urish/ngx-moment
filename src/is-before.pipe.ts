import moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amIsBefore',
})
export class IsBeforePipe implements PipeTransform {
  transform(
    value: moment.MomentInput,
    otherValue: moment.MomentInput,
    unit?: moment.unitOfTime.StartOf,
  ): boolean {
    return moment(value).isBefore(moment(otherValue), unit);
  }
}
