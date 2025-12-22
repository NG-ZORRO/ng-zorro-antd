/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NullableDevkitMigration } from '@angular/cdk/schematics';

import { CalendarTemplateRule } from './checks/calendar-input-rule';
import { CarouselTemplateRule } from './checks/carousel-like-template-rule';
import { DropdownClassRule } from './checks/dropdown-class-rule';
import { DropdownTemplateRule } from './checks/dropdown-template-rule';
import { FormTemplateRule } from './checks/form-template-rule';
import { GlobalConfigRule } from './checks/global-config-rule';
import { GridTemplateRule } from './checks/grid-template-rule';
import { IconTemplateRule } from './checks/icon-template-rule';
import { ModalTemplateRule } from './checks/modal-template-rule';
import { SecondaryEntryPointsRule } from './checks/secondary-entry-points-rule';
import { SpaceTemplateRule } from './checks/space-template-rule';
import { TableTemplateRule } from './checks/table-template-rule';
import { TooltipLikeTemplateRule } from './checks/tooltip-like-template-rule';

export const nzUpgradeRules: NullableDevkitMigration[] = [
  TooltipLikeTemplateRule,
  DropdownTemplateRule,
  DropdownClassRule,
  IconTemplateRule,
  CalendarTemplateRule,
  CarouselTemplateRule,
  GlobalConfigRule,
  FormTemplateRule,
  GridTemplateRule,
  TableTemplateRule,
  ModalTemplateRule,
  SecondaryEntryPointsRule,
  SpaceTemplateRule
];