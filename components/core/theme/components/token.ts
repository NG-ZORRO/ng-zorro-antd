/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzButtonComponentToken } from './button';
import {
  NzDatePickerComponentToken,
  NzFormComponentToken,
  NzInputNumberComponentToken,
  NzMentionComponentToken,
  NzRadioComponentToken,
  NzSegmentedComponentToken,
  NzSelectComponentToken,
  NzTypographyComponentToken
} from './controls';
import {
  NzAlertComponentToken,
  NzCalendarComponentToken,
  NzDropdownComponentToken,
  NzFloatButtonComponentToken,
  NzMenuComponentToken,
  NzModalComponentToken,
  NzPaginationComponentToken,
  NzSkeletonComponentToken,
  NzSpinComponentToken,
  NzStepsComponentToken,
  NzSwitchComponentToken,
  NzTableComponentToken,
  NzTabsComponentToken,
  NzTimelineComponentToken,
  NzTransferComponentToken,
  NzTreeComponentToken,
  NzUploadComponentToken
} from './global';
import { NzInputComponentToken } from './input';

/**
 * The resolved per-component tokens. Grows as components migrate to the token
 * system; some entries only cover the metrics those components derive from
 * the input control or the global size primitives so far.
 */
export interface NzComponentTokens {
  button: NzButtonComponentToken;
  input: NzInputComponentToken;
  select: NzSelectComponentToken;
  datePicker: NzDatePickerComponentToken;
  inputNumber: NzInputNumberComponentToken;
  mention: NzMentionComponentToken;
  radio: NzRadioComponentToken;
  segmented: NzSegmentedComponentToken;
  typography: NzTypographyComponentToken;
  form: NzFormComponentToken;
  alert: NzAlertComponentToken;
  calendar: NzCalendarComponentToken;
  dropdown: NzDropdownComponentToken;
  floatButton: NzFloatButtonComponentToken;
  menu: NzMenuComponentToken;
  modal: NzModalComponentToken;
  pagination: NzPaginationComponentToken;
  skeleton: NzSkeletonComponentToken;
  spin: NzSpinComponentToken;
  steps: NzStepsComponentToken;
  switch: NzSwitchComponentToken;
  table: NzTableComponentToken;
  tabs: NzTabsComponentToken;
  timeline: NzTimelineComponentToken;
  transfer: NzTransferComponentToken;
  tree: NzTreeComponentToken;
  upload: NzUploadComponentToken;
}

/** Per-component token overrides. */
export type NzComponentTokenMap = {
  [K in keyof NzComponentTokens]?: Partial<NzComponentTokens[K]>;
};
