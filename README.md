# angular2-moment

moment.js pipes for Angular 2.0

[![Build Status](https://travis-ci.org/urish/angular2-moment.png?branch=master)](https://travis-ci.org/urish/angular2-moment)

This module works with Angular 2.x.

For the stable AngularJS 1.x version of this module, please see [angular-moment](https://github.com/urish/angular-moment).

Installation
------------

`npm install --save angular2-moment`

If you use typescript 1.8, and [typings](https://github.com/typings/typings), you may also need to install typings for moment.js:

`typings install --save moment`

### For System.js users:

First you need to install moment:

`npm install moment --save`

Don´t forget to update your systemjs.config.js:

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
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
```

Usage
-----

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

``` typescript
@Component({
  selector: 'app',
  template: `
    Last updated: {{myDate | amCalendar}}
  `
})
```

Prints `Last updated: Today at 14:00`

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
