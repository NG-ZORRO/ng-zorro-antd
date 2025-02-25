/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzTimelineMode = 'left' | 'alternate' | 'right' | 'custom';

export type NzTimelinePosition = 'left' | 'right';

export const TimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey', 'gray'] as const;
export type NzTimelineItemColor = (typeof TimelineTimeDefaultColors)[number] | string;
