import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzSelectUnselectableDirective } from './nz-select-unselectable.directive';

describe('select unselectable', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [],
      declarations: [ NzTestSelectUnselectableComponent, NzSelectUnselectableDirective ]
    });
    TestBed.compileComponents();
  }));
  describe('basic select unselectable', () => {
    let fixture;
    let testComponent;
    let unselectable;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectUnselectableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      unselectable = fixture.debugElement.query(By.directive(NzSelectUnselectableDirective));
    });
    it('should unselectable style work', () => {
      fixture.detectChanges();
      expect(unselectable.nativeElement.attributes.getNamedItem('unselectable').name).toBe('unselectable');
      expect(unselectable.nativeElement.style.userSelect).toBe('none');
    });
  });
});

@Component({
  selector: 'nz-test-select-unselectable',
  template: `
    <div nz-select-unselectable></div>`
})
export class NzTestSelectUnselectableComponent {
}
