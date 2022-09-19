/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { DebugElement, NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

type ComponentBedOptions = Pick<NgModule, 'providers' | 'declarations' | 'imports'>;
export interface ComponentBed<T> {
  bed: TestBed;
  fixture: ComponentFixture<T>;
  nativeElement: HTMLElement;
  debugElement: DebugElement;
  component: T;
}
export function createComponentBed<T>(
  component: Type<T>,
  options: ComponentBedOptions = {
    providers: [],
    declarations: [],
    imports: []
  }
): ComponentBed<T> {
  const { imports, declarations, providers } = options;
  const config = {
    imports: [NoopAnimationsModule, CommonModule, ...(imports || [])],
    declarations: [component, ...(declarations || [])],
    schemas: [NO_ERRORS_SCHEMA],
    providers: providers || []
  };
  const bed = TestBed.configureTestingModule(config);
  const fixture = TestBed.createComponent<T>(component);
  fixture.detectChanges();
  return {
    bed,
    fixture,
    nativeElement: fixture.nativeElement,
    debugElement: fixture.debugElement,
    component: fixture.componentInstance
  };
}
