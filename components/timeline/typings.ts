/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

const TimelineModes = ['left', 'alternate', 'right', 'custom'] as const;
export type NzTimelineMode = typeof TimelineModes[number];

const TimelinePositions = ['left', 'right'] as const;
export type NzTimelinePosition = typeof TimelinePositions[number];

export const TimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey', 'gray'] as const;
export type NzTimelineItemColor = typeof TimelineTimeDefaultColors[number];
