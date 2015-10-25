# angular2-moment

moment.js pipes for Angular2. 

[![Build Status](https://travis-ci.org/urish/angular2-moment.png?branch=master)](https://travis-ci.org/urish/angular2-moment)

For the stable AngularJS 1.x version of this module, please see [angular-moment](https://github.com/urish/angular-moment).

## Installation

`npm install --save angular2-moment`

## Usage

`<time>{{someDate | amTimeAgo }}</time>`

## Complete Example

    import {Component} from 'angular2/angular2';
    import {TimeAgoPipe} from 'angular2-moment';

    @Component({
      selector: 'app',
      pipes: [TimeAgoPipe],
      template: `
	      Last updated: <b>{{myDate | amTimeAgo}}</b>
      `
    })
    export class App {
      myDate: Date;
    
      constructor() {
        this.myDate = new Date();
      }
    }

## Demo

[See online demo on Plunker](http://plnkr.co/edit/ziBJ0mftSjnz0SrYPwbo?p=preview)
