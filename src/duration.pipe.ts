import * as moment from 'moment';

import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { NGX_MOMENT_OPTIONS, NgxMomentOptions, applyOptions } from './moment-options';

@Pipe({ name: 'amDuration' })
export class DurationPipe implements PipeTransform {
  constructor(@Optional() @Inject(NGX_MOMENT_OPTIONS) momentOptions?: NgxMomentOptions) {
    this._applyOptions(momentOptions);
  }

  transform(value: moment.DurationInputArg1, ...args: string[]): string {
    if (typeof args === 'undefined' || args.length !== 1) {
      throw new Error('DurationPipe: missing required time unit argument');
    }
    return moment.duration(value, args[0] as moment.unitOfTime.DurationConstructor).humanize();
  }

  private _applyOptions(momentOptions: NgxMomentOptions): void {
    applyOptions(momentOptions);
  }
}
