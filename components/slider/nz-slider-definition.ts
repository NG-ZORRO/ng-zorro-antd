import { Observable } from 'rxjs';

import { StyleMap } from '../core/interface/interface';

export type NzSliderValue = number[] | number;

export interface Marks {
  number: Mark;
}

export type Mark = string | MarkItem;

export interface MarkItem {
  style: StyleMap;
  label: string;
}

/**
 * Data structure often passed to sub components.
 *
 * @export
 * @interface ParsedMark
 */
export interface ParsedMark {
  value: number;
  offset: number;
  config: Mark;
}

/**
 * Marks parsed by sub components and are ready to be rendered.
 *
 * @export
 * @interface DisplayedMark
 */
export interface DisplayedMark {
  value: number;
  offset: number;
  style: StyleMap;
  active: boolean;
  label: Mark;
}

export interface DisplayedStep {
  value: number;
  offset: number;
  style: StyleMap;
  active: boolean;
}

export type NzSliderShowTooltip = 'default' | 'always' | 'never';

/**
 * Examine if a value is an array.
 *
 * @export
 * @param {NzSliderValue} value
 * @returns {value is number[]}
 */
export function isValueARange(value: NzSliderValue): value is number[] {
  return value instanceof Array && value.length === 2;
}

export class SliderHandle {
  offset: number;
  value: number;
  active: boolean;
}

export interface MouseTouchObserverConfig {
  start: string;
  move: string;
  end: string;
  pluckKey: string[];

  filter?(e: Event): boolean;

  startPlucked$?: Observable<number>;
  end$?: Observable<Event>;
  moveResolved$?: Observable<number>;
}
