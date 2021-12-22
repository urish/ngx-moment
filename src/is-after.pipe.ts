import moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amIsAfter',
})
export class IsAfterPipe implements PipeTransform {
  transform(
    value: moment.MomentInput,
    otherValue: moment.MomentInput,
    unit?: moment.unitOfTime.StartOf,
  ): boolean {
    return moment(value).isAfter(moment(otherValue), unit);
  }
}
