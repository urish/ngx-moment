import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const momentConstructor = moment;

@Pipe({ name: 'amLocal' })
export class LocalTimePipe implements PipeTransform {
    transform(value: Date | moment.Moment | string | number): moment.Moment {
        return momentConstructor(value).local();
    }
}
