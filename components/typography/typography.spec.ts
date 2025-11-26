/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CAPS_LOCK, ENTER, ESCAPE, TAB } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, Component, NgZone, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  MockNgZone,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzTextEditComponent } from '.';
import { NzTypographyComponent } from './typography.component';
import { NzTypographyModule } from './typography.module';

declare const viewport: NzSafeAny;

describe('typography', () => {
  let componentElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // todo: use zoneless
        provideZoneChangeDetection(),
        provideNzIconsTesting(),
        provideNoopAnimations(),
        { provide: NgZone, useFactory: () => new MockNgZone() }
      ]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function testCopyButton(
    fixture: ComponentFixture<NzSafeAny>,
    copyButton: HTMLButtonElement,
    onHover: () => void,
    onClick: () => void
  ): void {
    fixture.detectChanges();

    dispatchMouseEvent(copyButton, 'mouseenter');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    onHover();

    copyButton.click();
    fixture.detectChanges();

    onClick();

    dispatchMouseEvent(copyButton, 'mouseleave');
    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();
  }

  describe('base', () => {
    let fixture: ComponentFixture<NzTestTypographyComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTypographyComponent);
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('should selector work', () => {
      const elements = componentElement.querySelectorAll('[nz-typography]');
      elements.forEach(el => {
        expect(el.classList).toContain('ant-typography');
      });
    });

    it('should [nzType] work', () => {
      expect(componentElement.querySelector('.test-secondary')!.classList).toContain('ant-typography-secondary');
      expect(componentElement.querySelector('.test-warning')!.classList).toContain('ant-typography-warning');
      expect(componentElement.querySelector('.test-danger')!.classList).toContain('ant-typography-danger');
      expect(componentElement.querySelector('.test-success')!.classList).toContain('ant-typography-success');
    });

    it('should [nzDisabled] work', () => {
      expect(componentElement.querySelector('.test-disabled')!.classList).toContain('ant-typography-disabled');
    });
  });

  describe('copyable', () => {
    let fixture: ComponentFixture<NzTestTypographyCopyComponent>;
    let testComponent: NzTestTypographyCopyComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTypographyCopyComponent);
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('should copyable', () => {
      spyOn(testComponent, 'onCopy');
      const copyButtons = componentElement.querySelectorAll<HTMLButtonElement>('.ant-typography-copy');
      expect(copyButtons.length).toBe(5);
      copyButtons.forEach((btn, i) => {
        btn.click();
        fixture.detectChanges();
        expect(testComponent.onCopy).toHaveBeenCalledWith(`Ant Design-${i}`);
      });
    });

    it('should be set tooltips', fakeAsync(() => {
      const copyButton = componentElement.querySelector<HTMLButtonElement>('.custom-tooltips .ant-typography-copy')!;
      testCopyButton(
        fixture,
        copyButton,
        () => {
          expect(overlayContainerElement.textContent).toContain(testComponent.tooltips![0]);
        },
        () => {
          expect(overlayContainerElement.textContent).toContain(testComponent.tooltips![1]);
        }
      );
    }));

    it('should be hied all tooltips', fakeAsync(() => {
      const copyButton = componentElement.querySelector<HTMLButtonElement>('.custom-tooltips .ant-typography-copy')!;
      testComponent.tooltips = null;
      fixture.detectChanges();

      testCopyButton(
        fixture,
        copyButton,
        () => {
          expect(overlayContainerElement.textContent).toBeFalsy();
        },
        () => {
          expect(overlayContainerElement.textContent).toBeFalsy();
        }
      );
    }));

    it('should be set icons', fakeAsync(() => {
      const copyButton = componentElement.querySelector<HTMLButtonElement>('.custom-icons .ant-typography-copy')!;
      const icon = copyButton.querySelector('.anticon')!;

      // init
      expect(icon.className).toContain('meh');

      testCopyButton(
        fixture,
        copyButton,
        () => {
          // hover
          expect(icon.className).toContain('meh');
        },
        () => {
          // clicked
          expect(icon.className).toContain('smile');
        }
      );

      // done
      expect(icon.className).toContain('meh');
    }));

    it('should only trigger once within 3000ms', fakeAsync(() => {
      spyOn(testComponent, 'onCopy');
      const copyButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-copy');
      expect(testComponent.onCopy).toHaveBeenCalledTimes(0);
      copyButton!.click();
      fixture.detectChanges();
      copyButton!.click();
      fixture.detectChanges();
      expect(testComponent.onCopy).toHaveBeenCalledTimes(1);
      tick(3000);
      fixture.detectChanges();
      copyButton!.click();
      fixture.detectChanges();
      expect(testComponent.onCopy).toHaveBeenCalledTimes(2);
      flush();
      fixture.detectChanges();
    }));
  });

  describe('editable', () => {
    let fixture: ComponentFixture<NzTestTypographyEditComponent>;
    let testComponent: NzTestTypographyEditComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTypographyEditComponent);
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    }));

    afterEach(fakeAsync(() => {
      flush();
      fixture.detectChanges();
    }));

    it('should discard changes when Esc keydown', () => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      expect(testComponent.str).toBe('This is an editable text.');
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')!;
      typeInElement('test', textarea);
      fixture.detectChanges();
      testComponent.nzTypographyComponent.textEditRef!.onCancel();
      fixture.detectChanges();
      expect(testComponent.str).toBe('This is an editable text.');
    });

    it('should be set icon', fakeAsync(() => {
      const icon = componentElement.querySelector<HTMLElement>('.anticon')!;
      expect(icon.className).toContain('edit');

      testComponent.icon = 'smile';
      fixture.detectChanges();

      expect(icon.className).toContain('smile');
    }));

    it('should be set tooltip', fakeAsync(() => {
      testComponent.tooltip = 'click to copy.';
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit')!;

      fixture.detectChanges();

      dispatchMouseEvent(editButton, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(testComponent.tooltip);

      dispatchMouseEvent(editButton, 'mouseleave');
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
    }));

    it('should edit work', fakeAsync(() => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(testComponent.str).toBe('This is an editable text.');
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')!;
      typeInElement('test', textarea);
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'blur');

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(testComponent.str).toBe('test');
    }));

    it('should edit focus', () => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();

      // `tick()` will handle over after next render hooks.
      TestBed.inject(ApplicationRef).tick();

      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')! as HTMLTextAreaElement;

      expect(document.activeElement === textarea).toBe(true);
    });

    it('should apply changes when Enter keydown', fakeAsync(() => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')!;
      typeInElement('test', textarea);
      fixture.detectChanges();
      const event = createKeyboardEvent('keydown', ENTER, textarea);
      testComponent.nzTypographyComponent.textEditRef!.onEnter(event);

      flush();
      fixture.detectChanges();

      expect(testComponent.str).toBe('test');
    }));
  });

  describe('ellipsis', () => {
    let fixture: ComponentFixture<NzTestTypographyEllipsisComponent>;
    let testComponent: NzTestTypographyEllipsisComponent;

    beforeEach(fakeAsync(() => {
      viewport.set(1200, 1000);
      fixture = TestBed.createComponent(NzTestTypographyEllipsisComponent);
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
    }));

    it('should ellipsis work', fakeAsync(() => {
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.classList).toContain('ant-typography-ellipsis');
      });
    }));

    it('should css ellipsis', fakeAsync(() => {
      const singleLine = componentElement.querySelector('.single')!;
      const multipleLine = componentElement.querySelector('.multiple')!;
      const dynamicContent = componentElement.querySelector('.dynamic')!;
      expect(singleLine.classList).toContain('ant-typography-ellipsis-single-line');
      expect(multipleLine.classList).toContain('ant-typography-ellipsis-multiple-line');
      testComponent.expandable = true;
      fixture.detectChanges();
      expect(singleLine.classList).not.toContain('ant-typography-ellipsis-single-line');
      expect(multipleLine.classList).not.toContain('ant-typography-ellipsis-multiple-line');
      expect(dynamicContent.classList).not.toContain('ant-typography-ellipsis-multiple-line');
    }));

    it('should resize when content changed', fakeAsync(() => {
      testComponent.expandable = true;
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      const dynamicContent = componentElement.querySelector('.dynamic')! as HTMLParagraphElement;
      expect(dynamicContent.innerText.includes('...')).toBe(true);
      testComponent.str = 'short content.';
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(dynamicContent.innerText.includes('...')).toBe(false);
    }));

    it('should expandable', fakeAsync(() => {
      testComponent.expandable = true;
      viewport.set(400, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      tick(16);
      componentElement.querySelectorAll('p').forEach((e, i) => {
        expect(e.classList).toContain('ant-typography-ellipsis');
        const expandBtn = e.querySelector('.ant-typography-expand') as HTMLAnchorElement;
        expect(expandBtn).toBeTruthy();
        expandBtn!.click();
        fixture.detectChanges();
        expect(e.classList).not.toContain('ant-typography-ellipsis');
        expect(testComponent.onExpand).toHaveBeenCalledTimes(i + 1);
      });
    }));

    it('should not resize when is expanded', fakeAsync(() => {
      testComponent.expandable = true;
      viewport.set(400, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      tick(16);
      componentElement.querySelectorAll('p').forEach(e => {
        const expandBtn = e.querySelector('.ant-typography-expand') as HTMLAnchorElement;
        expandBtn!.click();
        fixture.detectChanges();
      });
      testComponent.expandable = false;
      fixture.detectChanges();
      tick(16);
      viewport.set(800, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(32);
      fixture.detectChanges();
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.innerText.includes('...')).toBe(false);
      });
      viewport.reset();
    }));

    it('should resize work', fakeAsync(() => {
      testComponent.expandable = true;
      viewport.set(400, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      tick(16);
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.innerText.includes('...')).toBe(true);
      });
      viewport.set(8000, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(32);
      fixture.detectChanges();
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.innerText.includes('...')).toBe(false);
      });
      expect(testComponent.onEllipsis).toHaveBeenCalledWith(false);
      viewport.set(400, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(32);
      fixture.detectChanges();
      viewport.set(800, 1000);
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(32);
      fixture.detectChanges();
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.innerText.includes('...')).toBe(true);
      });
      expect(testComponent.onEllipsis).toHaveBeenCalledWith(true);
      viewport.reset();
    }));

    it('should suffix work', fakeAsync(() => {
      testComponent.expandable = true;
      testComponent.suffix = 'The suffix.';

      {
        viewport.set(8000, 1000);
        dispatchFakeEvent(window, 'resize');
        fixture.detectChanges();
        tick(32);
        fixture.detectChanges();
        const el = componentElement.querySelector('.dynamic') as HTMLParagraphElement;
        expect(el.innerText.endsWith('The suffix.')).toBe(true);
        expect(el.innerText.includes('...')).toBe(false);
      }

      {
        viewport.set(800, 1000);
        dispatchFakeEvent(window, 'resize');
        fixture.detectChanges();
        tick(32);
        fixture.detectChanges();
        const el = componentElement.querySelector('.dynamic') as HTMLParagraphElement;
        expect(el.innerText.includes('The suffix.')).toBe(true);
        expect(el.innerText.includes('...')).toBe(true);
        testComponent.expandable = false;
        fixture.detectChanges();
        tick(32);
        fixture.detectChanges();
        expect(el.innerText.endsWith('The suffix.')).toBe(true);
        expect(el.innerText.includes('...')).toBe(true);
      }

      viewport.reset();
      dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick(32);
      fixture.detectChanges();
    }));
  });
});

// Caretaker note: this is moved to a separate `describe` block because the first `describe` block
// mocks the `NgZone` with `MockNgZone`.
describe('change detection behavior', () => {
  let componentElement: HTMLElement;
  let fixture: ComponentFixture<NzTestTypographyEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestTypographyEditComponent);
    componentElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should not run change detection on `input` event', () => {
    componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit')!.click();
    fixture.detectChanges();

    const appRef = TestBed.inject(ApplicationRef);
    spyOn(appRef, 'tick');

    const nzTextEdit = fixture.debugElement.query(By.directive(NzTextEditComponent));
    const textarea: HTMLTextAreaElement = nzTextEdit.nativeElement.querySelector('textarea');

    textarea.value = 'some-value';
    dispatchFakeEvent(textarea, 'input');

    expect(appRef.tick).not.toHaveBeenCalled();
    expect(nzTextEdit.componentInstance.currentText).toEqual('some-value');
  });

  it('should not run change detection on non-handled keydown events', () => {
    componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit')!.click();
    fixture.detectChanges();
    const nzTextEdit = fixture.debugElement.query(By.directive(NzTextEditComponent));
    const textarea: HTMLTextAreaElement = nzTextEdit.nativeElement.querySelector('textarea');
    const spyCancel = spyOn(nzTextEdit.componentInstance, 'onCancel');
    const spyEnter = spyOn(nzTextEdit.componentInstance, 'onEnter');

    dispatchKeyboardEvent(textarea, 'keydown', TAB);
    dispatchKeyboardEvent(textarea, 'keydown', CAPS_LOCK);

    expect(spyCancel).not.toHaveBeenCalled();
    expect(spyEnter).not.toHaveBeenCalled();

    dispatchKeyboardEvent(textarea, 'keydown', ESCAPE);
    expect(spyCancel).toHaveBeenCalled();
    expect(spyEnter).not.toHaveBeenCalled();

    spyCancel.calls.reset();

    dispatchKeyboardEvent(textarea, 'keydown', ENTER);
    expect(spyCancel).not.toHaveBeenCalled();
    expect(spyEnter).toHaveBeenCalled();
  });
});

@Component({
  imports: [NzTypographyModule],
  template: `
    <h1 nz-typography>h1. Ant Design</h1>
    <h2 nz-typography>h2. Ant Design</h2>
    <h3 nz-typography>h3. Ant Design</h3>
    <h4 nz-typography>h4. Ant Design</h4>
    <h5 nz-typography>h5. Ant Design</h5>
    <p nz-typography>Ant Design, a design language for background applications, is refined by Ant UED Team</p>
    <span nz-typography>Ant Design</span>
    <span class="test-secondary" nz-typography nzType="secondary">Ant Design</span>
    <span class="test-success" nz-typography nzType="success">Ant Design</span>
    <span class="test-warning" nz-typography nzType="warning">Ant Design</span>
    <span class="test-danger" nz-typography nzType="danger">Ant Design</span>
    <span class="test-disabled" nz-typography nzDisabled>Ant Design</span>
    <span nz-typography><mark>Ant Design</mark></span>
    <span nz-typography><code>Ant Design</code></span>
    <span nz-typography><u>Ant Design</u></span>
    <span nz-typography><del>Ant Design</del></span>
    <span nz-typography><strong>Ant Design</strong></span>
  `
})
export class NzTestTypographyComponent {}

@Component({
  imports: [NzTypographyModule],
  template: `
    <h4 nz-title nzCopyable class="test-copy-h4" nzContent="Ant Design-0" (nzCopy)="onCopy($event)"></h4>
    <p nz-paragraph nzCopyable class="test-copy-p" nzContent="Ant Design-1" (nzCopy)="onCopy($event)"></p>
    <span nz-text nzCopyable class="test-copy-text" nzContent="Ant Design-2" (nzCopy)="onCopy($event)"></span>
    <span nz-text nzCopyable nzCopyText="Ant Design-3" class="test-copy-replace" (nzCopy)="onCopy($event)">Test</span>
    <p
      nz-typography
      class="custom-icons custom-tooltips"
      nzCopyable
      nzContent="Ant Design-4"
      (nzCopy)="onCopy($event)"
      [nzCopyTooltips]="tooltips"
      [nzCopyIcons]="icons"
    ></p>
  `
})
export class NzTestTypographyCopyComponent {
  tooltips: [string, string] | null = ['click here', 'coped'];
  icons: [string, string] = ['meh', 'smile'];
  onCopy(_text: string): void {}
}

@Component({
  imports: [NzTypographyModule],
  template: `
    <p
      nz-paragraph
      nzEditable
      [nzEditIcon]="icon"
      [nzEditTooltip]="tooltip"
      (nzContentChange)="onChange($event)"
      [nzContent]="str"
    ></p>
  `
})
export class NzTestTypographyEditComponent {
  @ViewChild(NzTypographyComponent, { static: false }) nzTypographyComponent!: NzTypographyComponent;
  str = 'This is an editable text.';
  icon = 'edit';
  tooltip?: string | null;

  onChange = (text: string): void => {
    this.str = text;
  };
}

@Component({
  imports: [NzTypographyModule],
  template: `
    <p nz-paragraph nzEllipsis [nzExpandable]="expandable" (nzExpandChange)="onExpand()" class="single">
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by
      Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a
      design language for background applications, is refined by Ant UED Team.
    </p>
    <br />
    <p
      nz-paragraph
      nzEllipsis
      [nzExpandable]="expandable"
      [nzEllipsisRows]="3"
      (nzExpandChange)="onExpand()"
      class="multiple"
    >
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by
      Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a
      design language for background applications, is refined by Ant UED Team.
    </p>
    <p
      nz-paragraph
      nzEllipsis
      [nzExpandable]="expandable"
      [nzEllipsisRows]="2"
      (nzExpandChange)="onExpand()"
      (nzOnEllipsis)="onEllipsis($event)"
      [nzContent]="str"
      [nzSuffix]="suffix"
      class="dynamic"
    ></p>
  `
})
export class NzTestTypographyEllipsisComponent {
  expandable = false;
  onExpand = jasmine.createSpy('expand callback');
  suffix?: string;
  onEllipsis = jasmine.createSpy('ellipsis callback');
  @ViewChild(NzTypographyComponent, { static: false }) nzTypographyComponent!: NzTypographyComponent;
  str = new Array(5)
    .fill('Ant Design, a design language for background applications, is refined by Ant UED Team.')
    .join('');
}
