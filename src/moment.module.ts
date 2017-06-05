import { NgModule, ModuleWithProviders } from '@angular/core';

import * as moment from 'moment';
import 'moment/min/locales';

import { AddPipe } from './add.pipe';
import { CalendarPipe } from './calendar.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DifferencePipe } from './difference.pipe';
import { DurationPipe } from './duration.pipe';
import { FromUnixPipe } from './from-unix.pipe';
import { SubtractPipe } from './subtract.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { UtcPipe } from './utc.pipe';

const ANGULAR_MOMENT_PIPES = [
  AddPipe,
  CalendarPipe,
  DateFormatPipe,
  DifferencePipe,
  DurationPipe,
  FromUnixPipe,
  SubtractPipe,
  TimeAgoPipe,
  UtcPipe
];

@NgModule({
  declarations: ANGULAR_MOMENT_PIPES,
  exports: ANGULAR_MOMENT_PIPES
})
export class MomentModule {
  static forRoot(locale:string):ModuleWithProviders {
    moment.locale(locale);
    return {
      ngModule:MomentModule
    }
  }
}
