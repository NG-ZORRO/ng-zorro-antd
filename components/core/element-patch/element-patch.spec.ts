import { Component, ViewChild } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentBed, createComponentBed } from '../testing/component-bed';
import { NzElementPatchDirective } from './element-patch.directive';
import { NzElementPatchModule } from './element-patch.module';

describe('nz-element', () => {
  let testBed: ComponentBed<NzTestElementPatchComponent>;
  let component: NzTestElementPatchComponent;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(NzTestElementPatchComponent, {
      imports: [NzElementPatchModule, NzButtonModule]
    });
    component = testBed.component;
  }));

  it('should getters work', () => {
    expect((component.element.nativeElement as HTMLButtonElement).tagName).toBe('BUTTON');
  });
});

@Component({
  template: ` <button nz-button nz-element>Action</button> `
})
export class NzTestElementPatchComponent {
  @ViewChild(NzElementPatchDirective) element!: NzElementPatchDirective;
}
