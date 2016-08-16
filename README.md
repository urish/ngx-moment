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

## Angular RC 5 and later

Import `MomentModule` into your app's modules:

``` typescript
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    MomentModule
  ]
})
```

This makes all the `angular2-moment` pipes available for use in your app components.

## Angular RC 4 and earlier

Use an older version of the library, such as 0.8.2. You can find the documentation 
[here](https://github.com/urish/angular2-moment/blob/3d67595ed8857347518258817e187bc0043fe9a4/README.md).

Available pipes
---------------

## amTimeAgo pipe
Takes an optional `omitSuffix` argument that defaults to `false`.

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amTimeAgo}}</time>
  `
})
```

Prints `Last updated: a few seconds ago`

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amTimeAgo:true}}</time>
  `
})
```

Prints `Last updated: a few seconds`

## amCalendar pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amCalendar}}</time>
  `
})
```

Prints `Last updated: Today at 14:00`

## amDateFormat pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{myDate | amDateFormat:'LL'}}</time>
  `
})
```

Prints `Last updated: January 24, 2016`

## amFromUnix pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: <time>{{ (1456263980 | amFromUnix) | amDateFormat:'hh:mmA'}}</time>
  `
})
```

Prints `Last updated: 01:46PM`

## amDuration pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Uptime: <time>{{ 365 | amDuration:'seconds' }}</time>
  `
})
```

Prints `Uptime: 6 minutes`

## amDifference pipe

``` typescript
@Component({
  selector: 'app',
  template: `
    Expiration: <time>{{nextDay | amDifference: today :'days' : true}}</time> days
  `
})
```
Prints `Expiration: 1 day`

Complete Example
----------------

``` typescript
import {NgModule, Component} from 'angular2/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MomentModule} from 'angular2-moment';

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
