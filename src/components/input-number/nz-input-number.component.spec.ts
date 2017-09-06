/* tslint:disable:no-unused-variable */
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputNumberModule } from './nz-input-number.module';
import { NzInputNumberComponent } from './nz-input-number.component';

describe('NzInputNumber', () => {
  let testComponent;
  let fixture;
  let debugElement;
  describe('input number test all', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzInputNumberModule, FormsModule ],
        declarations: [ NzInputNumberComponentSpecComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzInputNumberComponentSpecComponent);
      testComponent = fixture.debugElement.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(NzInputNumberComponent));
    });
    it('should disabled up and down work', fakeAsync(() => {
      fixture.detectChanges();
      const handlerDownElement = debugElement.nativeElement.querySelector('.ant-input-number-handler-down');
      expect(handlerDownElement.classList.contains('ant-input-number-handler-down-disabled')).toBe(true);
      handlerDownElement.click();
      fixture.detectChanges();
      expect(testComponent.initValue).toBe(1);
      testComponent.initValue = 9;
      fixture.detectChanges();
      tick();
      const handlerUpElement = debugElement.nativeElement.querySelector('.ant-input-number-handler-up');
      handlerUpElement.click();
      fixture.detectChanges();
      expect(handlerUpElement.classList.contains('ant-input-number-handler-up-disabled')).toBe(true);
      expect(testComponent.initValue).toBe(10);
    }));
    it('should disable style work', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-input-number-disabled')).toBe(true);
    });
    fit('should size style work', fakeAsync(() => {
      testComponent.size = 'large';
      tick();
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-input-number-lg')).toBe(true);
      testComponent.size = 'small';
      tick();
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-input-number-sm')).toBe(true);
    }));
  });
});

/** Test component that contains an InputNumber. */

@Component({
  selector: 'nz-input-number-component-spec',
  template: `
    <nz-input-number [nzSize]="size" [(ngModel)]="initValue" [nzMin]="1" [nzMax]="10" [nzStep]="1" [nzDisabled]="isDisabled"></nz-input-number>
  `
})
export class NzInputNumberComponentSpecComponent {
  isDisabled = false;
  initValue = 1;
  size = 'default';
}


