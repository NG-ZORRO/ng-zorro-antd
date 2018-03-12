import { Component, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchKeyboardEvent } from '../core/testing'
import { NzOptionComponent } from './nz-option.component';

import { OverlayContainer } from '@angular/cdk/overlay';
import { NzSelectComponent } from './nz-select.component';
import { NzSelectModule } from './nz-select.module';

describe('nz-select component', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSelectModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestSelectBasicComponent ]
    });
    TestBed.compileComponents();
    inject([ OverlayContainer ], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));
  afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let select;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      select = fixture.debugElement.query(By.directive(NzSelectComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select');
    });
    it('should size work', () => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-lg');
    });
    it('should allowClear work', () => {
      fixture.detectChanges();
      expect(select.nativeElement.classList).not.toContain('ant-select-allow-clear');
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-allow-clear');
    });
    it('should open work', () => {
      fixture.detectChanges();
      expect(select.nativeElement.classList).not.toContain('ant-select-open');
      testComponent.open = true;
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-open');
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
    });
    it('should click toggle open', () => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      expect(testComponent.openChange).toHaveBeenCalledTimes(1);
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(false);
      expect(testComponent.openChange).toHaveBeenCalledTimes(2);
    });
    it('should disabled work', fakeAsync(() => {
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-enabled');
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(select.nativeElement.classList).not.toContain('ant-select-enabled');
      expect(select.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
      select.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.open).toBe(false);
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
    }));
    it('should close dropdown when set disabled', async(() => {
      testComponent.open = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(select.nativeElement.classList).toContain('ant-select-open');
        expect(testComponent.openChange).toHaveBeenCalledTimes(0);
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(testComponent.open).toBe(false);
        expect(testComponent.openChange).toHaveBeenCalledTimes(1);
      });
    }));
    it('should clear value work', fakeAsync(() => {
      testComponent.allowClear = true;
      fixture.detectChanges();
      select.nativeElement.querySelector('.ant-select-selection__clear').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(select.selectedValue).toBe(undefined);
    }));
    it('should autofocus work', () => {
      testComponent.showSearch = true;
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(select.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(select.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should focus and blur function work', async(() => {
      testComponent.showSearch = true;
      testComponent.open = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(false);
        testComponent.nzSelectComponent.focus();
        fixture.detectChanges();
        expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(true);
        testComponent.nzSelectComponent.blur();
        fixture.detectChanges();
        expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      });
    }));
    it('should dropdown class work', () => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      expect(overlayContainerElement.querySelector('.test-class')).toBeDefined();
    });
    it('should dropdown style work', () => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.test-class') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    });
    it('should dropdownMatchSelectWidth true work', () => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(targetElement.style.width).toBe('10px');
    });
    it('should dropdownMatchSelectWidth false work', () => {
      testComponent.dropdownMatchSelectWidth = false;
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(targetElement.style.width).toBe('');
      expect(targetElement.style.minWidth).toBe('10px');
    });
    it('should click option close dropdown', async(() => {
      testComponent.showSearch = true;
      testComponent.open = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        overlayContainerElement.querySelector('li').click();
        fixture.detectChanges();
        expect(testComponent.open).toBe(false);
      });
    }));
    it('should keep overlay open when press esc', async(() => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      testComponent.nzSelectComponent.cdkConnectedOverlay.overlayRef.detach();
      testComponent.nzSelectComponent.cdkConnectedOverlay.overlayRef.detachBackdrop();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        select.nativeElement.click();
        fixture.detectChanges();
        expect(testComponent.open).toBe(true);
        expect(testComponent.nzSelectComponent.cdkConnectedOverlay.overlayRef.backdropElement).toBeDefined();
      });
    }));
  });
});

@Component({
  selector: 'nz-test-select-basic',
  template: `
    <nz-select
      style="width:10px;position: relative;display: block;"
      [nzSize]="size"
      [(ngModel)]="selectedValue"
      [nzAllowClear]="allowClear"
      (nzOpenChange)="openChange($event)"
      [nzDisabled]="disabled"
      [nzMode]="mode"
      [nzShowSearch]="showSearch"
      [nzAutoFocus]="autoFocus"
      [(nzOpen)]="open"
      [nzServerSearch]="serverSearch"
      [nzDropdownMatchSelectWidth]="dropdownMatchSelectWidth"
      [nzDropdownStyle]="dropdownStyle"
      [nzDropdownClassName]="'test-class'"
      (nzOnSearch)="onSearch($event)"
      [nzPlaceHolder]="placeholder">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
    </nz-select>
  `
})
export class NzTestSelectBasicComponent {
  @ViewChild(NzSelectComponent) nzSelectComponent: NzSelectComponent;
  selectedValue = 'lucy';
  allowClear = false;
  open = false;
  size = 'default';
  mode = 'default';
  autoFocus = false;
  disabled = false;
  showSearch = false;
  placeholder = 'placeholder';
  serverSearch = false;
  dropdownMatchSelectWidth = true;
  openChange = jasmine.createSpy('open change');
  dropdownStyle = { height: '120px' };
  nzFilterOption = (input: string, option: NzOptionComponent) => {
    if (option && option.nzLabel) {
      return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
    } else {
      return false;
    }
  }
}
