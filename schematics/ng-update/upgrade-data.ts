import { RuleUpgradeData } from '@angular/cdk/schematics';
import {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames
} from './data';

/** Upgrade data that will be used for the NG-ZORRO ng-update schematic. */
export const ruleUpgradeData: RuleUpgradeData = {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames
};
