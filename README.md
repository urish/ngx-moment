# ngx-moment

moment.js pipes for Angular

[![Build Status](https://travis-ci.org/urish/ngx-moment.png?branch=master)](https://travis-ci.org/urish/ngx-moment)
[![npm version](https://img.shields.io/npm/v/ngx-moment.svg)](https://www.npmjs.com/package/ngx-moment)

This module works with Angular 5.0 and newer.

For an Angular 2 / 4 version, please install [angular2-moment](https://npmjs.org/package/angular2-moment). For the AngularJS, please check out [angular-moment](https://github.com/urish/angular-moment).

Installation
------------

```bash
npm install --save moment ngx-moment
```

or if you use yarn:

```bash
yarn add moment ngx-moment
```

### For System.js users:

Don't forget to update your systemjs.config.js:

```
packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            'moment': {
                main: './moment.js',
                defaultExtension: 'js'
            },
            'ngx-moment': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
```

Usage
-----

Import `MomentModule` into your app's modules:

``` typescript
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    MomentModule
  ]
})
```

If you would like to supply any `NgxMomentOptions` that will be made available to the pipes you can also use:

```typescript
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ]
})
```

This makes all the `ngx-moment` pipes available for use in your app components.

Available pipes
---------------

## amTimeAgo pipe
Takes an optional `omitSuffix` argument that defaults to `false` and another optional `formatFn` function which can be used to customise the format of the time ago text.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{myDate | amTimeAgo}}
  `
})
```

Prints `Last updated: a few seconds ago`

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{myDate | amTimeAgo:true}}
  `
})
```

Prints `Last updated: a few seconds`

## amCalendar pipe
Takes optional `referenceTime` argument (defaults to now)
and `formats` argument that could be output formats object or callback function.
See [momentjs docs](http://momentjs.com/docs/#/displaying/calendar-time/) for details.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{myDate | amCalendar}}
  `
})
```

Prints `Last updated: Today at 14:00` (default referenceTime is today by default)

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amCalendar:nextDay }}</time>
  `
})
export class AppComponent {
  nextDay: Date;

  constructor() {
      this.nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
  }
}
```

Prints `Last updated: Yesterday at 14:00` (referenceTime is tomorrow)

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amCalendar:{sameDay:'[Same Day at] h:mm A'} }}</time>
  `
})
```

Prints `Last updated: Same Day at 2:00 PM`

## amDateFormat pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{myDate | amDateFormat:'LL'}}
  `
})
```

Prints `Last updated: January 24, 2016`

## amParse pipe

Parses a custom-formatted date into a moment object that can be used with the other pipes.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{'24/01/2014' | amParse:'DD/MM/YYYY' | amDateFormat:'LL'}}
  `
})
```

Prints `Last updated: January 24, 2016`

The pipe can also accept an array of formats as parameter.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{'24/01/2014 22:00' | amParse: formats | amDateFormat:'LL'}}
  `
})
export class App {

  formats: string[] = ['DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm'];

  constructor() { }

}
```

Prints `Last updated: January 24, 2016`

## amLocal pipe

Converts UTC time to local time.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{mydate | amLocal | amDateFormat: 'YYYY-MM-DD HH:mm'}}
  `
})
```

Prints `Last updated 2016-01-24 12:34`

## amLocale pipe

To be used with amDateFormat pipe in order to change locale.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{'2016-01-24 14:23:45' | amLocale:'en' | amDateFormat:'MMMM Do YYYY, h:mm:ss a'}}
  `
})
```

Prints `Last updated: January 24th 2016, 2:23:45 pm`

Note: The locale might have to be imported (e.g. in the app module).

``` typescript
import 'moment/locale/de';
```

## amFromUnix pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ (1456263980 | amFromUnix) | amDateFormat:'hh:mmA'}}
  `
})
```

Prints `Last updated: 01:46PM`

## amDuration pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Uptime: {{ 365 | amDuration:'seconds' }}
  `
})
```

Prints `Uptime: 6 minutes`

## amDifference pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Expiration: {{nextDay | amDifference: today :'days' : true}} days
  `
})
```
Prints `Expiration: 1 day`

## amAdd and amSubtract pipes

Use these pipes to perform date arithmetics. See [momentjs docs](http://momentjs.com/docs/#/manipulating/add/) for details.

``` typescript
@Component({
  selector: 'app',
  template: `
    Expiration: {{'2017-03-17T16:55:00.000+01:00' | amAdd: 2 : 'hours' | amDateFormat: 'YYYY-MM-DD HH:mm'}}
  `
})
```
Prints `Expiration: 2017-03-17 18:55`

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{'2017-03-17T16:55:00.000+01:00' | amSubtract: 5 : 'years' | amDateFormat: 'YYYY-MM-DD HH:mm'}}
  `
})
```
Prints `Last updated: 2012-03-17 16:55`

## amFromUtc pipe

Parses the date as UTC and enables mode for subsequent moment operations (such as displaying the time in UTC). This can be combined with `amLocal` to display a UTC date in local time.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ '2016-12-31T23:00:00.000-01:00' | amFromUtc | amDateFormat: 'YYYY-MM-DD' }}
  `
})
```

Prints `Last updated: 2017-01-01`

It's also possible to specify a different format than the standard ISO8601.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ '31/12/2016 23:00-01:00' | amFromUtc: 'DD/MM/YYYY HH:mmZZ' | amDateFormat: 'YYYY-MM-DD' }}
  `
})
```

Or even an array of formats:

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ '31/12/2016 23:00-01:00' | amFromUtc: formats | amDateFormat: 'YYYY-MM-DD' }}
  `
})
export class App {
  
  formats: string[] = ['DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mmZZ'];

  constructor() { }

}
```

Both examples above will print `Last updated: 2017-01-01`

## amUtc pipe

Enables UTC mode for subsequent moment operations (such as displaying the time in UTC).

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ '2016-12-31T23:00:00.000-01:00' | amUtc | amDateFormat: 'YYYY-MM-DD' }}
  `
})
```

Prints `Last updated: 2017-01-01`

## amParseZone pipe

Parses a string but keeps the resulting Moment object in a fixed-offset timezone with the provided offset in the string.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{ '2016-12-31T23:00:00.000-03:00' | amParseZone | amDateFormat: 'LLLL (Z)' }}
  `
})
```

Prints `Last updated: Saturday, December 31, 2016 11:00 PM (-03:00)`

## amIsBefore and amIsAfter pipe

Check if a moment is before another moment. Supports limiting granularity to a unit other than milliseconds, pass the units as second parameter

```typescript
@Component({
  selector: 'app',
  template: `
    Today is before tomorrow: {{ today | amIsBefore:tomorrow:'day' }}
  `
})
```

Prints `Today is before tomorrow: true`

```typescript
@Component({
  selector: 'app',
  template: `
    Tomorrow is after today: {{ tomorrow | amIsAfter:today:'day' }}
  `
})
```

Prints `Tomorrow is after today: true`

NgxMomentOptions
----------------
An `NgxMomentOptions` object can be provided to the module using the `forRoot` convention and will provide options for the pipes to use with the `moment` instance, these options are detailed in the table below:

| prop | type | description |
| --- |:---:| --- |
| relativeTimeThresholdOptions | Dictionary<br>key: string<br>value: number | Provides the `relativeTimeThreshold` units allowing a pipe to set the `moment.relativeTimeThreshold` values. <br><br>The `key` is a unit defined as one of `ss`, `s`, `m`, `h`, `d`, `M`.<br><br>See [Relative Time Thresholds](https://momentjs.com/docs/#/customization/relative-time-threshold/) documentation for more details. |

Complete Example
----------------

``` typescript
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'app',
  template: `
    Last updated: <b>{{myDate | amTimeAgo}}</b>, <b>{{myDate | amCalendar}}</b>, <b>{{myDate | amDateFormat:'LL'}}</b>
  `
})
export class AppComponent {
  myDate: Date;

  constructor() {
    this.myDate = new Date();
  }
}

@NgModule({
  imports: [
    BrowserModule,
    MomentModule
  ],
  declarations: [ AppComponent ]
  bootstrap: [ AppComponent ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Demo
----

[See online demo on Plunker](http://plnkr.co/edit/ziBJ0mftSjnz0SrYPwbo?p=preview)
