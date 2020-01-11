import { CommonModule } from '@angular/common';
import { DebugElement, ModuleWithProviders, NO_ERRORS_SCHEMA, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// tslint:disable-next-line:no-any
type ComponentDeps = Array<Type<any> | ModuleWithProviders>;

export interface ComponentBed<T> {
  fixture: ComponentFixture<T>;
  detectChanges(): void;
  nativeElement: HTMLElement;
  debugElement: DebugElement;
  component: T;
  bed: TestBedStatic;
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
    fixture,
    detectChanges: () => fixture.detectChanges(),
    nativeElement: fixture.nativeElement,
    debugElement: fixture.debugElement,
    component: fixture.componentInstance,
    bed
  };
}
