# angular2-moment

moment.js pipes for Angular 2.0

[![Build Status](https://travis-ci.org/urish/angular2-moment.png?branch=master)](https://travis-ci.org/urish/angular2-moment)

This module works with the latest release candidate of Angular 2.0.

For the stable AngularJS 1.x version of this module, please see [angular-moment](https://github.com/urish/angular-moment).

Installation
------------

`npm install --save angular2-moment`

If you use typescript, and [typings](https://github.com/typings/typings), you may also need to install typings for moment.js:

`typings install --save moment`

Usage
-----

## amTimeAgo pipe
Takes an optional `omitSuffix` argument that defaults to `false`.

``` typescript
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [TimeAgoPipe],
  template: `
    Last updated: <time>{{myDate | amTimeAgo}}</time>
  `
})
```

Prints `Last updated: a few seconds ago`

``` typescript
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [TimeAgoPipe],
  template: `
    Last updated: <time>{{myDate | amTimeAgo:true}}</time>
  `
})
```

Prints `Last updated: a few seconds`

## amCalendar pipe

``` typescript
import {CalendarPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [CalendarPipe],
  template: `
    Last updated: <time>{{myDate | amCalendar}}</time>
  `
})
```

Prints `Last updated: Today at 14:00`

## amDateFormat pipe

``` typescript
import {DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [DateFormatPipe],
  template: `
    Last updated: <time>{{myDate | amDateFormat:'LL'}}</time>
  `
})
```

Prints `Last updated: January 24, 2016`

## amFromUnix pipe

``` typescript
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [DateFormatPipe, FromUnixPipe],
  template: `
    Last updated: <time>{{ (1456263980 | amFromUnix) | amDateFormat:'hh:mmA'}}</time>
  `
})
```

Prints `Last updated: 01:46PM`

## amDuration pipe

``` typescript
import {DurationPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [DurationPipe],
  template: `
    Uptime: <time>{{ 365 | amDuration:'seconds' }}</time>
  `
})
```

Prints `Uptime: 6 minutes`

## amDifference pipe

``` typescript
import {DifferencePipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [DifferencePipe],
  template: `
    Expiration: <time>{{nextDay | amDifference: today :'days' : true}}</time> days
  `
})
```
Prints `Expiration: 1 day`

Complete Example
----------------

``` typescript
import {Component} from 'angular2/core';
import {TimeAgoPipe, CalendarPipe, DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'app',
  pipes: [TimeAgoPipe, CalendarPipe, DateFormatPipe],
  template: `
    Last updated: <b>{{myDate | amTimeAgo}}</b>, <b>{{myDate | amCalendar}}</b>, <b>{{myDate | amDateFormat:'LL'}}</b>
  `
})
export class App {
  myDate: Date;

  constructor() {
    this.myDate = new Date();
  }
}
```

Demo
----

[See online demo on Plunker](http://plnkr.co/edit/ziBJ0mftSjnz0SrYPwbo?p=preview)
