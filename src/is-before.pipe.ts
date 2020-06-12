import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

const momentConstructor = moment;

@Pipe({
  name: 'amIsBefore',
})
export class IsBeforePipe implements PipeTransform {
  transform(
    value: moment.MomentInput,
    otherValue: moment.MomentInput,
    unit?: moment.unitOfTime.StartOf,
  ): boolean {
    return momentConstructor(value).isBefore(momentConstructor(otherValue), unit);
  }
}
