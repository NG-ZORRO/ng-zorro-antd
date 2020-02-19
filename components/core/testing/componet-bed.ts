import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

type ComponentDeps = Array<Type<NzSafeAny>>;
export interface ComponentBed<T> {
  bed: TestBedStatic;
  fixture: ComponentFixture<T>;
  nativeElement: HTMLElement;
  debugElement: DebugElement;
  component: T;
}
export function createComponentBed<T>(
  component: Type<T>,
  options: {
    providers?: Provider[];
    declarations?: ComponentDeps;
    imports?: ComponentDeps;
  } = {
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
