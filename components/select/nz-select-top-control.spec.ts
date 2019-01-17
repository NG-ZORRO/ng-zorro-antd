import { Component } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { dispatchFakeEvent } from '../core/testing';
import { createListOfOption } from './nz-option-container.spec';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectModule } from './nz-select.module';
import { NzSelectService } from './nz-select.service';

describe('nz-select top control', () => {
  beforeEach(fakeAsync(() => {
    let nzSelectServiceStub: Partial<NzSelectService>;
    nzSelectServiceStub = {
      check$                    : new Subject(),
      listOfSelectedValue$      : new Subject(),
      open$                     : new Subject(),
      clearInput$               : new Subject(),
      listOfSelectedValue       : [ 1, 2, 3 ],
      listOfCachedSelectedOption: createListOfOption(10),
      isMultipleOrTags          : true,
      removeValueFormSelected   : () => {
      },
      tokenSeparate             : () => {
      },
      updateSearchValue         : () => {
      },
      updateListOfSelectedValue : () => {
      },
      compareWith               : (o1, o2) => o1 === o2
    };
    TestBed.configureTestingModule({
      providers   : [ { provide: NzSelectService, useValue: nzSelectServiceStub } ],
      imports     : [ NzSelectModule, NoopAnimationsModule ],
      declarations: [ NzTestSelectTopControlComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let tc;
    let tcComponent;
    let nzSelectService;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectTopControlComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tc = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
      tcComponent = tc.injector.get(NzSelectTopControlComponent);
      nzSelectService = fixture.debugElement.injector.get(NzSelectService);
    });
    it('should clear selection work', () => {
      fixture.detectChanges();
      const clearSpy = spyOn(nzSelectService, 'updateListOfSelectedValue');
      fixture.detectChanges();
      expect(clearSpy).toHaveBeenCalledTimes(0);
      dispatchFakeEvent(tc.nativeElement.querySelector('.ant-select-selection__clear'), 'click');
      fixture.detectChanges();
      expect(clearSpy).toHaveBeenCalledTimes(1);
    });
    it('should setInputValue work', () => {
      fixture.detectChanges();
      const setInputSpy = spyOn(tcComponent, 'setInputValue');
      fixture.detectChanges();
      expect(setInputSpy).toHaveBeenCalledTimes(0);
      nzSelectService.clearInput$.next();
      fixture.detectChanges();
      expect(setInputSpy).toHaveBeenCalledTimes(1);
      expect(setInputSpy).toHaveBeenCalledWith('');
    });
    it('should input work', fakeAsync(() => {
      fixture.detectChanges();
      const inputEl = tc.nativeElement.querySelector('.ant-select-search__field');
      inputEl.value = 'test';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(Math.floor(inputEl.scrollWidth / 10)).toBe(Math.floor(parseInt(inputEl.style.width, 10) / 10));
      inputEl.value = '';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(inputEl.style.width).toBe('');
    }));
    it('should selectedValueDisplay', () => {
      fixture.detectChanges();
      tcComponent.nzShowSearch = false;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('block');
      expect(tcComponent.selectedValueStyle.opacity).toBe('1');
      tcComponent.nzShowSearch = true;
      tcComponent.nzOpen = false;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('block');
      expect(tcComponent.selectedValueStyle.opacity).toBe('1');
      tcComponent.nzShowSearch = true;
      tcComponent.nzOpen = true;
      tcComponent.inputValue = true;
      tcComponent.isComposing = true;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('none');
      expect(tcComponent.selectedValueStyle.opacity).toBe('1');
      tcComponent.nzShowSearch = true;
      tcComponent.nzOpen = true;
      tcComponent.inputValue = true;
      tcComponent.isComposing = false;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('none');
      expect(tcComponent.selectedValueStyle.opacity).toBe('1');
      tcComponent.nzShowSearch = true;
      tcComponent.nzOpen = true;
      tcComponent.inputValue = false;
      tcComponent.isComposing = true;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('none');
      expect(tcComponent.selectedValueStyle.opacity).toBe('1');
      tcComponent.nzShowSearch = true;
      tcComponent.nzOpen = true;
      tcComponent.inputValue = false;
      tcComponent.isComposing = false;
      fixture.detectChanges();
      expect(tcComponent.selectedValueStyle.display).toBe('block');
      expect(tcComponent.selectedValueStyle.opacity).toBe('0.4');
    });
    it('should open focus', () => {
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-search__field') === document.activeElement).toBeFalsy();
      nzSelectService.open$.next(false);
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-search__field') === document.activeElement).toBeFalsy();
      nzSelectService.open$.next(true);
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-search__field') === document.activeElement).toBeTruthy();
    });
    it('should destroy piped', () => {
      fixture.detectChanges();
      const checkSpy = spyOn(tcComponent.cdr, 'markForCheck');
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(0);
      nzSelectService.check$.next();
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
      testComponent.destroy = true;
      fixture.detectChanges();
      nzSelectService.check$.next();
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
    });
    it('should remove option call', () => {
      fixture.detectChanges();
      const removeSpy = spyOn(nzSelectService, 'removeValueFormSelected');
      fixture.detectChanges();
      expect(removeSpy).toHaveBeenCalledTimes(0);
      dispatchFakeEvent(tc.nativeElement.querySelector('.ant-select-selection__choice__remove'), 'click');
      fixture.detectChanges();
      expect(removeSpy).toHaveBeenCalledTimes(1);
    });
  });

});

@Component({
  template: `
    <div nz-select-top-control
      *ngIf="!destroy"
      [nzOpen]="open"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzAllowClear]="nzAllowClear"
      [nzMaxTagCount]="nzMaxTagCount"
      [nzShowArrow]="nzShowArrow"
      [nzLoading]="nzLoading"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzClearIcon]="nzClearIcon"
      [nzRemoveIcon]="nzRemoveIcon"
      [nzShowSearch]="nzShowSearch"
      [nzTokenSeparators]="nzTokenSeparators">
    </div>
    <ng-template #nzMaxTagPlaceholder>nzMaxTagPlaceholder</ng-template>
    <ng-template #nzSuffixIcon>nzSuffixIcon</ng-template>
    <ng-template #nzClearIcon>nzClearIcon</ng-template>
    <ng-template #nzRemoveIcon>nzRemoveIcon</ng-template>
  `
})
export class NzTestSelectTopControlComponent {
  destroy = false;
  open = false;
  nzPlaceHolder = 'placeholder';
  nzAllowClear = true;
  nzMaxTagCount = 3;
  nzShowArrow = true;
  nzLoading = false;
  nzShowSearch = false;
  nzTokenSeparators = [ ',' ];
}
