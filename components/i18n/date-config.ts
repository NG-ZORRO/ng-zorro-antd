/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// Re-export date config types and tokens from core/time for backward compatibility.
// These are now defined in core/time to avoid circular dependency.
export {
  type WeekDayIndex,
  type NzDateConfig,
  NZ_DATE_CONFIG,
  NZ_DATE_LOCALE,
  NZ_DATE_CONFIG_DEFAULT,
  mergeDateConfig
} from 'ng-zorro-antd/core/time';
