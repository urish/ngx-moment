# Changelog

## 5.0.0 - 2020-07-03
- fix: support for Angular 10 (see [#240](https://github.com/urish/ngx-moment/issues/240))
- breaking: drop support for Angular < 7

## 4.0.1 - 2020-06-12
- republish to npm without ngcc backup files

## 4.0.0 - 2020-06-12
- fix: correct input types for pipes 906e40c
- chore(deps): angular 9, typescript 3.8 9966a9a
- chore: reformat all code with prettier 10fe5c51
- docs: remove system.js instructions from README

## 3.5.0 - 2019-11-08
- feat: add `formatFn` argument to `amTimeAgo` ([#213](https://github.com/urish/ngx-moment/pull/213), contributed by [chaoyangnz](https://github.com/chaoyangnz))
- feat: add `format|formats` to from-utc pipe and parse-pipe ([#215](https://github.com/urish/ngx-moment/pull/215), contributed by [gigadie](https://github.com/gigadie))
- fix: improve `amLocale` compability with Angular Ivy ([#226](https://github.com/urish/ngx-moment/pull/226), contributed by [sobanieca](https://github.com/sobanieca))

## 3.4.0 - 2019-03-07
- feat: add amIsBefore, amIsAfter pipes ([#208](https://github.com/urish/ngx-moment/pull/208), contributed by [StickNitro](https://github.com/StickNitro))
- Ability to provide options to the MomentModule ([#209](https://github.com/urish/ngx-moment/pull/209), contributed by [StickNitro](https://github.com/StickNitro))
- fix: Improved Text Update on locale change when not using MomentInput ([#210](https://github.com/urish/ngx-moment/pull/210), contributed by [jensweigele](https://github.com/jensweigele))

## 3.3.0 - 2018-12-09
- fix: Allow using all supported Moment inputs with TimeAgoPipe ([#206](https://github.com/urish/ngx-moment/pull/206), contributed by [theodorejb](https://github.com/theodorejb))

## 3.2.0 - 2018-10-30
- Angular 7 support ([#203](https://github.com/urish/ngx-moment/issues/203))

## 3.1.0 - 2018-07-01
- Add 'amParseZone' pipe ([#198](https://github.com/urish/ngx-moment/pull/198), contributed by [davidballester](https://github.com/davidballester))

## 3.0.1 - 2018-06-07
- Update installation instruction in readme (see [#194](https://github.com/urish/ngx-moment/issues/194))

## 3.0.0 - 2018-06-02
- Make `moment` a peerDependency instead of dependency (see [#149](https://github.com/urish/ngx-moment/issues/149) for discussion)

When upgrading to this version, make sure to `npm install --save moment`.

## 2.0.0 - 2018-04-25
- Rename package to ngx-moment
- Migrate project to the Angular CLI
- Switch to [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit), (using [ngPackagr](http://spektrakel.de/ng-packagr/))

2.0.0-beta.0 and 2.0.0-rc.0 are aliases for this version.

## 1.9.0 - 2018-05-03
- Fix: update momentjs version ([#190](https://github.com/urish/ngx-moment/issues/190))
- Fix: amTimeAgo pipe updates it's output when locale changes ([#188](https://github.com/urish/ngx-moment/pull/188), contributed by [lukasz-kusnierz](https://github.com/lukasz-kusnierz))

## 1.8.0 - 2018-01-23
- Fix: Remove `node_modules` from compiled version ([#187](https://github.com/urish/ngx-moment/pull/187), contributed by [wachri](https://github.com/wachri))

## 1.7.1 - 2017-12-22
- Fix bug where FromUtcPipe was being imported instead of exported ([#180](https://github.com/urish/ngx-moment/pull/180), contributed by [fshin123](https://github.com/fshin123))
- test: fix amLocal tests to pass regardless of timezone

## 1.7.0 - 2017-08-19
- Add `amFromUtc` pipe ([#163](https://github.com/urish/ngx-moment/pull/163), contributed by [connormlewis](https://github.com/connormlewis))

## 1.6.0 - 2017-07-18
- Add `amLocal` pipe ([#153](https://github.com/urish/ngx-moment/pull/153), contributed by [benwilkins](https://github.com/benwilkins))

## 1.5.0 - 2017-07-14
- Add `amLocale` pipe ([#155](https://github.com/urish/ngx-moment/pull/155), contributed by [FallenRiteMonk](https://github.com/FallenRiteMonk))
- Migrate testing framework to jest

## 1.4.0 - 2017-06-18
- Add `amParse` pipe to enable parsing of custom-formatted date string ([#148](https://github.com/urish/ngx-moment/pull/148), contributed by [vin-car](https://github.com/vin-car))

## 1.3.3 - 2017-03-18
- Fix: `amCalendar` causes protractor to timeout on waiting async Angular ([#135](https://github.com/urish/ngx-moment/pull/135), contributed by [romanovma](https://github.com/romanovma))

## 1.3.2 - 2017-03-17
- Fix: Add missing `amAdd` and `amSubtract` pipes to the NgModule ([#134](https://github.com/urish/ngx-moment/pull/134), contributed by [datencia](https://github.com/datencia))

## 1.3.1 - 2017-03-16
- Add missing `amAdd` and `amSubtract` pipes (fixes [#130](https://github.com/urish/ngx-moment/issues/130))

## 1.3.0 - 2017-03-10
- Enable Angular 4 as peer dependency

## 1.2.0 - 2017-02-09
- Add `amUtc` pipe ([#121](https://github.com/urish/ngx-moment/pull/121), contributed by [bodnarbm](https://github.com/bodnarbm))

## 1.1.0 - 2017-01-09
Happy new year!

- Add `referenceTime` and `format` args to `amCalendar` ([#64](https://github.com/urish/ngx-moment/pull/64), contributed by [irsick](https://github.com/irsick))
- Add `amAdd` and `amSubtract` pipes ([#113](https://github.com/urish/ngx-moment/pull/113), contributed by [dustin486](https://github.com/dustin486))
- Fix: Do not import whole Rx.js library ([#117](https://github.com/urish/ngx-moment/pull/117), contributed by [FabienDehopre](https://github.com/FabienDehopre))

## 1.0.0 - 2016-12-01
Promoted 1.0.0-rc.1 to final release

## 1.0.0-rc.1 - 2016-11-11
*** Breaking change: Requires moment 2.16.0 or newer

- Fix “Expression has changed after it was checked” ([#111](https://github.com/urish/ngx-moment/pull/111), contributed by [nithril](https://github.com/nithril))
- Fix "Module 'moment' has no exported member 'UnitOfTime'" ([#112](https://github.com/urish/ngx-moment/issues/112))

## 1.0.0-beta.6 - 2016-10-24
*** Breaking change: typescript sources are no longer published in the npm package

- Inline sources in the source map file, should fix [#96](https://github.com/urish/ngx-moment/issues/96).
- Handle undefined dates in `amDateFormat` pipe ([#105](https://github.com/urish/ngx-moment/pull/105/files), contributed by [amcdnl](https://github.com/amcdnl))

## 1.0.0-beta.5 - 2016-10-13

*** Breaking change: source files renamed, which could affect your imports:

    import { TimeAgoPipe } from 'angular-moment/TimeAgoPipe';

now becomes:

    import { TimeAgoPipe } from 'angular-moment/time-ago.pipe';

All changes:

- Rename source files to follow [Angular 2 Style Guide conventions](https://angular.io/styleguide#!#02-02)
- Require `moment` >= 2.13.0, and remove `@types/moment` from our dependencies (as it is already included in `moment`)

## 1.0.0-beta.4 - 2016-10-06
- Add support for server side pre-rendering ([#89](https://github.com/urish/ngx-moment/pull/89), contributed by [https://github.com/jmezach](https://github.com/jmezach))
- Fix a bug caused TimeAgo and Calendar pipes not to update automatically ([#94](https://github.com/urish/ngx-moment/pull/94))
- Add `@types/moment` to package dependencies (see [#91](https://github.com/urish/ngx-moment/issues/91))

## 1.0.0-beta.3 - 2016-10-04
- Fix exports for Rollup / Ionic 2 users ([#86](https://github.com/urish/ngx-moment/pull/86), contributed by [TheMadBug](https://github.com/TheMadBug))
- Protractor fix: run long standing timeouts outside of angular zones ([#74](https://github.com/urish/ngx-moment/pull/74), contributed by [tiagoroldao](https://github.com/tiagoroldao))

## 1.0.0-beta.2 - 2016-10-01
- Switch to Typescript 2.0
- Angular 2 AoT (Ahead of Time) template compilation support ([#68](https://github.com/urish/ngx-moment/issues/68))
- Removed impure flags from pure Pipes: `amDateFormat` and `amDifference` ([#75](https://github.com/urish/ngx-moment/pull/75), contributed by [tiagoroldao](https://github.com/tiagoroldao))

## 1.0.0-beta.1 - 2016-08-16
- Support angular-2.0.0-rc.5 NgModules, see [README](README.md) for details. 

## 0.8.2 - 2016-08-01
- Add `amDifference` pipe ([#54](https://github.com/urish/ngx-moment/pull/54), contributed by [josx](https://github.com/josx))

## 0.8.1 - 2016-07-03
- Add `omitSuffix` parameter to `amTimeAgo` pipe ([#47](https://github.com/urish/ngx-moment/pull/47), contributed by [bzums](https://github.com/bzums))

## 0.8.0 - 2016-05-22
- Publish typescript sources under `src` folder, should fix Ionic 2 issues such as [#28](https://github.com/urish/ngx-moment/issues/28) and [#33](https://github.com/urish/ngx-moment/issues/33).

## 0.7.0 - 2016-05-03
- Align with the angular 2.0.0-rc.0 and the new angular packaging system 

## 0.6.0 - 2016-04-28
- Align with angular 2.0.0-beta.16 ([#32](https://github.com/urish/ngx-moment/pull/32), contributed by [fknop](https://github.com/fknop))

## 0.5.0 - 2016-04-08
- Move `angular2` from npm `dependencies` to `peerDependencies` (see [#24](https://github.com/urish/ngx-moment/pull/24))
- Add `amDuration` pipe ([#29](https://github.com/urish/ngx-moment/pull/29), contributed by [xenolinguist](https://github.com/xenolinguist))

## 0.4.3 - 2016-03-06
- include `amFromUnix` pipe in the package's exports
- publish our `typings.json` to npm 

## 0.4.2 - 2016-02-24
- add `amFromUnix` pipe ([#16](https://github.com/urish/ngx-moment/pull/16), contributed by [lanocturne](https://github.com/lanocturne))

## 0.4.1 - 2016-02-21
- Don't run `typings install` on postinstall (fixes [#13](https://github.com/urish/ngx-moment/issues/13))

## 0.4.0 - 2016-02-16
- Switch from `tsd` to `typings`, stop publishing the `moment.js` typings to npm. 
- Additional unit-tests

Note: You may need to manually install moment.js typings, by running `typings install --save moment` in your project directory.

## 0.3.0 - 2016-01-27
- add `amDateFormat` pipe ([#9](https://github.com/urish/ngx-moment/pull/9), contributed by [andreialecu](https://github.com/andreialecu))
- refactor: remove the `supports()` from all the pipes (it is no longer used as of angular2-beta)

## 0.2.1 - 2016-01-16
- bugfix: wrong method name for cleanup, caused resource leak ([#8](https://github.com/urish/ngx-moment/pull/8), contributed by [andreialecu](https://github.com/andreialecu))

## 0.2.0 - 2016-01-12
- add `amCalendar` pipe ([#6](https://github.com/urish/ngx-moment/pull/6), contributed by [andreialecu](https://github.com/andreialecu))

## 0.1.1 - 2015-12-18
- Fix 'Cannot use in app due to triple-slash references' typescript error ([#2](https://github.com/urish/ngx-moment/issues/2))

## 0.1.0 - 2015-12-15
- Align with angular 2.0.0-beta.0

## 0.0.5 - 2015-11-12
- Align with angular-2.0.0-alpha.46

## 0.0.4 - 2015-10-25
- Add ES5 transpiled version and typescript definitions (.d.ts) file to the published npm package

## 0.0.3 - 2015-10-22
- Align with angular-2.0.0-alpha.44

## 0.0.2 - 2015-09-18
- Align with angular-2.0.0-alpha.37

## 0.0.1 - 2015-08-25

- Initial release
