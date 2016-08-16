import { NgModule } from '@angular/core';
import { CalendarPipe } from './CalendarPipe';
import { DateFormatPipe } from './DateFormatPipe';
import { DurationPipe } from './DurationPipe';
import { FromUnixPipe } from './FromUnixPipe';
import { TimeAgoPipe } from './TimeAgoPipe';
import { DifferencePipe } from './DifferencePipe';

@NgModule({ declarations: [CalendarPipe, DateFormatPipe, DurationPipe, FromUnixPipe, TimeAgoPipe, DifferencePipe] })
export class MomentModule { }
