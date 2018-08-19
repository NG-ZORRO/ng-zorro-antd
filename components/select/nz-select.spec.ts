import { Component, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchKeyboardEvent } from '../core/testing';
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
      declarations: [ NzTestSelectDefaultComponent, NzTestSelectTagsComponent, NzTestSelectFormComponent ]
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
      fixture = TestBed.createComponent(NzTestSelectDefaultComponent);
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
    it('should focus and blur function work', () => {
      testComponent.showSearch = true;
      select.nativeElement.click();
      fixture.detectChanges();
      expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.nzSelectComponent.focus();
      fixture.detectChanges();
      expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.nzSelectComponent.blur();
      fixture.detectChanges();
      expect(select.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });
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
    it('should click option close dropdown', () => {
      testComponent.showSearch = true;
      select.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      fixture.detectChanges();
      overlayContainerElement.querySelector('li').click();
      fixture.detectChanges();
      expect(testComponent.open).toBe(false);
    });
    it('should keep overlay open when press esc', fakeAsync(() => {
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      dispatchKeyboardEvent(document.body, 'keydown', 27);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      select.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.open).toBe(true);
      expect(testComponent.nzSelectComponent.cdkConnectedOverlay.overlayRef.backdropElement).toBeDefined();
    }));
    it('should keydown origin work', () => {
      spyOn(testComponent.nzSelectComponent.nzOptionContainerComponent, 'onKeyDownUl');
      dispatchKeyboardEvent(select.nativeElement.querySelector('.ant-select-selection'), 'keydown', 38);
      fixture.detectChanges();
      expect(testComponent.nzSelectComponent.nzOptionContainerComponent.onKeyDownUl).toHaveBeenCalledTimes(1);
    });
    it('should onSearch work', () => {
      fixture.detectChanges();
      testComponent.nzSelectComponent.onSearch('test', true);
      fixture.detectChanges();
      expect(testComponent.onSearch).toHaveBeenCalledTimes(1);
    });
    it('should blur after user hits enter key in single mode', () => {
        const spy = spyOn(testComponent.nzSelectComponent, 'blur');
        testComponent.showSearch = true;
        select.nativeElement.click();
        fixture.detectChanges();
        dispatchKeyboardEvent(select.nativeElement.querySelector('.ant-select-selection'), 'keydown', 40);
        fixture.detectChanges();
        expect(spy).not.toHaveBeenCalled();
        dispatchKeyboardEvent(select.nativeElement.querySelector('.ant-select-selection'), 'keydown', 13);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });
  });
  describe('tags', () => {
    let fixture;
    let testComponent;
    let select;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectTagsComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      select = fixture.debugElement.query(By.directive(NzSelectComponent));
    });
    it('should click option correct', fakeAsync(() => {
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select');
      select.nativeElement.click();
      fixture.detectChanges();
      overlayContainerElement.querySelector('li').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.selectedValue.length).toBe(1);
      expect(testComponent.selectedValue[ 0 ]).toBe('jack');
    }));
    it('should remove from top control work', () => {
      fixture.detectChanges();
      testComponent.nzSelectComponent.updateListOfSelectedValueFromTopControl([ 'jack' ]);
      fixture.detectChanges();
      expect(testComponent.selectedValue.length).toBe(1);
      expect(testComponent.selectedValue[ 0 ]).toBe('jack');
    });
    it('should clear work', fakeAsync(() => {
      fixture.detectChanges();
      select.nativeElement.querySelector('.ant-select-selection__clear').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.selectedValue.length).toBe(0);
    }));
  });
  describe('form', () => {
    let fixture;
    let testComponent;
    let select;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectFormComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      select = fixture.debugElement.query(By.directive(NzSelectComponent));
    });
    it('should set disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(select.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(select.nativeElement.classList).toContain('ant-select-disabled');
    }));
  });
});

@Component({
  selector: 'nz-test-select-default',
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
export class NzTestSelectDefaultComponent {
  @ViewChild(NzSelectComponent) nzSelectComponent: NzSelectComponent;
  selectedValue = 'lucy';
  allowClear = false;
  open = false;
  size = 'default';
  mode = 'default';
  autoFocus = false;
  disabled = false;
  onSearch = jasmine.createSpy('on search');
  showSearch = false;
  placeholder = 'placeholder';
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

@Component({
  selector: 'nz-test-select-tags',
  template: `
    <nz-select
      [(ngModel)]="selectedValue"
      [nzAllowClear]="true"
      [nzMode]="'tags'">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled nzCustomContent>Disabled</nz-option>
    </nz-select>
  `
})
export class NzTestSelectTagsComponent {
  @ViewChild(NzSelectComponent) nzSelectComponent: NzSelectComponent;
  selectedValue = [ 'lucy', 'jack' ];
  allowClear = false;
}

@Component({
  selector: 'nz-test-select-form',
  template: `
    <form [formGroup]="formGroup">
      <nz-select
        formControlName="select">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
        <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
      </nz-select>
    </form>
  `
})
export class NzTestSelectFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      select: [ 'jack' ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
