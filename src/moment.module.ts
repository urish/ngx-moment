import { AddPipe } from './add.pipe';
import { CalendarPipe } from './calendar.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DifferencePipe } from './difference.pipe';
import { DurationPipe } from './duration.pipe';
import { FromUnixPipe } from './from-unix.pipe';
import { FromUtcPipe } from './from-utc.pipe';
import { IsAfterPipe } from './is-after.pipe';
import { IsBeforePipe } from './is-before.pipe';
import { LocalTimePipe } from './local.pipe';
import { LocalePipe } from './locale.pipe';
import { NgModule } from '@angular/core';
import { ParsePipe } from './parse.pipe';
import { ParseZonePipe } from './parse-zone.pipe';
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
  ParsePipe,
  SubtractPipe,
  TimeAgoPipe,
  UtcPipe,
  FromUtcPipe,
  LocalTimePipe,
  LocalePipe,
  ParseZonePipe,
  IsBeforePipe,
  IsAfterPipe
];

@NgModule({
  declarations: [
    ANGULAR_MOMENT_PIPES
  ],
  exports: [
    ANGULAR_MOMENT_PIPES
  ]
})
export class MomentModule { }
