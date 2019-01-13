import { InjectionToken } from '@angular/core';

export const NGX_MOMENT_OPTIONS: InjectionToken<NgxMomentOptions> = new InjectionToken<NgxMomentOptions>('NGX_MOMENT_OPTIONS');

export interface NgxMomentOptions {
  /**
   * relativeTimeThresholdOptions
   * @description Provides the `relativeTimeThreshold` units allowing a pipe to set the `moment.relativeTimeThreshold` values.
   * The `key` is a unit defined as one of `ss`, `s`, `m`, `h`, `d`, `M`.
   * @see https://momentjs.com/docs/#/customization/relative-time-threshold/
   * @example by default more than 45 seconds is considered a minute, more than 22 hours is considered a day and so on.
   * So settings the unit 'm' to `59` will adjust the `relativeTimeThreshold` and consider more than 59 minutes
   * to be an hour (default is `45 minutes`)
   */
  relativeTimeThresholdOptions: { [key: string]: number };
}
