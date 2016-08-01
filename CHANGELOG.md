# Changelog

## 0.8.2 - 2015-08-01
- Add `amDifference` pipe ([#54](https://github.com/urish/angular2-moment/pull/54), contributed by [josx](https://github.com/josx))

## 0.8.1 - 2015-07-03
- Add `omitSuffix` parameter to `TimeAgoPipe` ([#47](https://github.com/urish/angular2-moment/pull/47), contributed by [bzums](https://github.com/bzums))

## 0.8.0 - 2015-05-22
- Publish typescript sources under `src` folder, should fix Ionic 2 issues such as [#28](https://github.com/urish/angular2-moment/issues/28) and [#33](https://github.com/urish/angular2-moment/issues/33).

## 0.7.0 - 2016-05-03
- Align with the angular 2.0.0-rc.0 and the new angular packaging system 

## 0.6.0 - 2016-04-28
- Align with angular 2.0.0-beta.16 ([#32](https://github.com/urish/angular2-moment/pull/32), contributed by [fknop](https://github.com/fknop))

## 0.5.0 - 2016-04-08
- Move `angular2` from npm `dependencies` to `peerDependencies` (see [#24](https://github.com/urish/angular2-moment/pull/24))
- Add `amDuration` pipe ([#29](https://github.com/urish/angular2-moment/pull/29), contributed by [xenolinguist](https://github.com/xenolinguist))

## 0.4.3 - 2016-03-06
- include `amFromUnix` pipe in the package's exports
- publish our `typings.json` to npm 

## 0.4.2 - 2016-02-24
- add `amFromUnix` pipe ([#16](https://github.com/urish/angular2-moment/pull/16), contributed by [lanocturne](https://github.com/lanocturne))

## 0.4.1 - 2016-02-21
- Don't run `typings install` on postinstall (fixes [#13](https://github.com/urish/angular2-moment/issues/13))

## 0.4.0 - 2016-02-16
- Switch from `tsd` to `typings`, stop publishing the `moment.js` typings to npm. 
- Additional unit-tests

Note: You may need to manually install moment.js typings, by running `typings install --save moment` in your project directory.

## 0.3.0 - 2016-01-27
- add `amDateFormat` pipe ([#9](https://github.com/urish/angular2-moment/pull/9), contributed by [andreialecu](https://github.com/andreialecu))
- refactor: remove the `supports()` from all the pipes (it is no longer used as of angular2-beta)

## 0.2.1 - 2016-01-16
- bugfix: wrong method name for cleanup, caused resource leak ([#8](https://github.com/urish/angular2-moment/pull/8), contributed by [andreialecu](https://github.com/andreialecu))

## 0.2.0 - 2016-01-12
- add `amCalendar` pipe ([#6](https://github.com/urish/angular2-moment/pull/6), contributed by [andreialecu](https://github.com/andreialecu))

## 0.1.1 - 2015-12-18
- Fix 'Cannot use in app due to triple-slash references' typescript error ([#2](https://github.com/urish/angular2-moment/issues/2))

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
