/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export class AnimationDuration {
  static SLOW = '0.3s'; // Modal
  static BASE = '0.2s';
  static FAST = '0.1s'; // Tooltip
}

export class AnimationCurves {
  static EASE_BASE_OUT = 'cubic-bezier(0.7, 0.3, 0.1, 1)';
  static EASE_BASE_IN = 'cubic-bezier(0.9, 0, 0.3, 0.7)';
  static EASE_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
  static EASE_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
  static EASE_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
  static EASE_OUT_BACK = 'cubic-bezier(0.12, 0.4, 0.29, 1.46)';
  static EASE_IN_BACK = 'cubic-bezier(0.71, -0.46, 0.88, 0.6)';
  static EASE_IN_OUT_BACK = 'cubic-bezier(0.71, -0.46, 0.29, 1.46)';
  static EASE_OUT_CIRC = 'cubic-bezier(0.08, 0.82, 0.17, 1)';
  static EASE_IN_CIRC = 'cubic-bezier(0.6, 0.04, 0.98, 0.34)';
  static EASE_IN_OUT_CIRC = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
  static EASE_OUT_QUINT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  static EASE_IN_QUINT = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
  static EASE_IN_OUT_QUINT = 'cubic-bezier(0.86, 0, 0.07, 1)';
}
