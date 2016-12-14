import { NgModule } from '@angular/core';

import { CalendarPipe } from './calendar.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DifferencePipe } from './difference.pipe';
import { DurationPipe } from './duration.pipe';
import { FromUnixPipe } from './from-unix.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

const ANGULAR_MOMENT_PIPES = [CalendarPipe, DateFormatPipe, DifferencePipe, DurationPipe, FromUnixPipe, TimeAgoPipe];

@NgModule({
  declarations: ANGULAR_MOMENT_PIPES,
  exports: ANGULAR_MOMENT_PIPES
})
export class MomentModule { }
