/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { NzButtonComponent, NzButtonModule, NzButtonShape, NzButtonSize, NzButtonType } from './index';

describe('button', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  describe('className', () => {
    let fixture: ComponentFixture<TestButtonComponent>;
    let component: TestButtonComponent;
    let buttonElement: HTMLButtonElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonComponent);
      component = fixture.componentInstance;
      buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      expect(buttonElement.className).toBe('ant-btn');
    });

    it('should apply classname based on nzDanger', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-dangerous');
      component.nzDanger.set(true);
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dangerous');
    });

    it('should apply classname based on nzGhost', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-background-ghost');
      component.nzGhost.set(true);
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-background-ghost');
    });

    it('should apply classname based on nzLoading', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-loading');
      component.nzLoading.set(true);
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-loading');
    });

    it('should apply classname based on nzBlock', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-block');
      component.nzBlock.set(true);
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-block');
    });

    it('should apply classname based on nzType', () => {
      component.nzType.set('default');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-default');
      component.nzType.set('primary');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-primary');
      component.nzType.set('link');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-link');
      component.nzType.set('dashed');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dashed');
      component.nzType.set(null);
      fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });

    it('should apply classname based on nzShape', () => {
      component.nzShape.set('round');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-round');
      component.nzShape.set('circle');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-circle');
    });

    it('should apply classname based on nzSize', () => {
      component.nzSize.set('large');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-lg');
      component.nzSize.set('small');
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-sm');
      component.nzSize.set('default');
      fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });
  });

  describe('loading icon', () => {
    let fixture: ComponentFixture<TestButtonBindingComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonBindingComponent);
    });

    it('should hide icon when loading correct', () => {
      vi.useFakeTimers();
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
      expect(buttonElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      buttonElement.click();
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('ant-btn-loading-icon')).toBe(true);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('display: none;');
      vi.advanceTimersByTime(1000);
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.firstElementChild!.classList.contains('ant-btn-loading-icon')).toBe(false);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('');
      vi.useRealTimers();
    });
  });

  describe('insert span', () => {
    let fixture: ComponentFixture<TestButtonWithIconComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonWithIconComponent);
    });

    it('should insert span correctly', () => {
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.firstElementChild.tagName).toBe('SPAN');
      expect(buttonElement.firstElementChild.innerText).toContain('text');
    });
  });

  describe('icon only', () => {
    it('should icon only works correctly', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });

    it('should icon only works correctly with any tag', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithAnyTagComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });

    it('should icon only works correctly with any comments', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithCommentComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });

    it('should icon only works correctly with any text', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithTextComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
    });

    it('should icon only works correctly without nz-icon', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithoutIconComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
    });

    it('should icon only loading works correctly', async () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyLoadingComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.autoDetectChanges();
      await fixture.whenStable();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });
  });

  testDirectionality(() => TestButtonComponent, By.directive(NzButtonComponent), 'ant-btn');

  describe('change detection', () => {
    let fixture: ComponentFixture<TestButtonComponent>;
    let buttonElement: HTMLButtonElement;
    let component: TestButtonComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonComponent);
      buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      component = fixture.componentInstance;
    });

    it('should not trigger change detection when the button is clicked', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const spy = vi.spyOn(appRef, 'tick');
      buttonElement.dispatchEvent(new MouseEvent('click'));
      buttonElement.dispatchEvent(new MouseEvent('click'));
      // Previously, it would've caused ApplicationRef.tick to be called twice.
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('prevent default and stop propagation when the button state is loading', () => {
      component.nzLoading.set(true);
      fixture.detectChanges();
      const event = new MouseEvent('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopImmediatePropagationSpy = vi.spyOn(event, 'stopImmediatePropagation');
      buttonElement.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(stopImmediatePropagationSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('anchor', () => {
  let fixture: ComponentFixture<TestAnchorComponent>;
  let anchorElement: HTMLAnchorElement;
  let component: TestAnchorComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAnchorComponent);
    anchorElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    component = fixture.componentInstance;
  });

  it('should prevent default and stop propagation when the anchor is disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();
    const event = new MouseEvent('click');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    const stopImmediatePropagationSpy = vi.spyOn(event, 'stopImmediatePropagation');
    anchorElement.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(stopImmediatePropagationSpy).toHaveBeenCalledTimes(1);
  });
});

describe('finalSize', () => {
  let fixture: ComponentFixture<TestButtonFinalSizeComponent>;
  let buttonElement: HTMLButtonElement;
  let compactSizeSignal: WritableSignal<NzSizeLDSType>;
  let formSizeSignal: WritableSignal<NzSizeLDSType>;

  beforeEach(() => {
    compactSizeSignal = signal<NzSizeLDSType>('large');
    formSizeSignal = signal<NzSizeLDSType>('default');
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should set correctly the size from the formSize signal', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NZ_FORM_SIZE, useValue: formSizeSignal },
        { provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }
      ]
    });
    fixture = TestBed.createComponent(TestButtonFinalSizeComponent);
    buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('ant-btn-lg');
  });
  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(TestButtonFinalSizeComponent);
    buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('ant-btn-lg');
  });
  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(TestButtonFinalSizeComponent);
    buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('ant-btn-lg');
  });
});

@Component({
  imports: [NzButtonModule],
  template: `
    <button
      nz-button
      [nzType]="nzType()"
      [nzGhost]="nzGhost()"
      [nzLoading]="nzLoading()"
      [nzDanger]="nzDanger()"
      [nzShape]="nzShape()"
      [nzBlock]="nzBlock()"
      [nzSize]="nzSize()"
    >
      button
    </button>
  `
})
export class TestButtonComponent {
  readonly nzBlock = signal(false);
  readonly nzGhost = signal(false);
  readonly nzLoading = signal(false);
  readonly nzDanger = signal(false);
  readonly nzType = signal<NzButtonType>(null);
  readonly nzShape = signal<NzButtonShape>(null);
  readonly nzSize = signal<NzButtonSize>('default');
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191
@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button nzType="primary" (click)="load()" [nzLoading]="loading()">
      <nz-icon nzType="poweroff" />
      {{ 'Click me!' }}
    </button>
  `
})
export class TestButtonBindingComponent {
  readonly loading = signal(false);
  load(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1000);
  }
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079
@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      text
      <nz-icon nzType="caret-down" />
    </button>
  `
})
export class TestButtonWithIconComponent {}

@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <nz-icon nzType="caret-down" />
    </button>
  `
})
export class TestButtonIconOnlyComponent {}

@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <u nz-icon nzType="up"></u>
    </button>
  `
})
export class TestButtonIconOnlyWithAnyTagComponent {}

@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <nz-icon nzType="down" />
      <!-- comment -->
    </button>
  `
})
export class TestButtonIconOnlyWithCommentComponent {}

@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <nz-icon nzType="down" />
      text
    </button>
  `
})
export class TestButtonIconOnlyWithTextComponent {}

@Component({
  imports: [NzButtonModule],
  template: `
    <button nz-button>
      <span>text</span>
    </button>
  `
})
export class TestButtonIconOnlyWithoutIconComponent {}

@Component({
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button nzLoading>
      <nz-icon nzType="caret-down" />
    </button>
  `
})
export class TestButtonIconOnlyLoadingComponent {}

@Component({
  imports: [NzButtonModule],
  template: '<a nz-button [disabled]="disabled()">anchor</a>'
})
export class TestAnchorComponent {
  readonly disabled = signal(false);
}

@Component({
  imports: [NzButtonModule],
  template: ` <button nz-button [nzSize]="size()">Button</button> `
})
export class TestButtonFinalSizeComponent {
  readonly size = signal<NzButtonSize>('default');
}
