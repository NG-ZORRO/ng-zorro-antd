import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { createKeyboardEvent, dispatchFakeEvent, typeInElement } from 'ng-zorro-antd/core';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzTypographyComponent } from './nz-typography.component';
import { NzTypographyModule } from './nz-typography.module';

// tslint:disable-next-line no-any
declare const viewport: any;

describe('typography', () => {
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzTypographyModule, NzIconTestModule],
      declarations: [
        NzTestTypographyComponent,
        NzTestTypographyCopyComponent,
        NzTestTypographyEditComponent,
        NzTestTypographyEllipsisComponent
      ]
    }).compileComponents();
  });

  describe('base', () => {
    let fixture: ComponentFixture<NzTestTypographyComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTypographyComponent);
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('should selector work', () => {
      const elements = componentElement.querySelectorAll(
        'h1[nz-title],' + 'h2[nz-title],' + 'h3[nz-title],' + 'h4[nz-title],' + 'p[nz-paragraph],' + 'span[nz-text]'
      );
      elements.forEach(el => {
        expect(el.classList).toContain('ant-typography');
      });
    });

    it('should [nzType] work', () => {
      expect(componentElement.querySelector('.test-secondary')!.classList).toContain('ant-typography-secondary');

      expect(componentElement.querySelector('.test-warning')!.classList).toContain('ant-typography-warning');

      expect(componentElement.querySelector('.test-danger')!.classList).toContain('ant-typography-danger');
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
      expect(copyButtons.length).toBe(4);
      copyButtons.forEach((btn, i) => {
        btn.click();
        fixture.detectChanges();
        expect(testComponent.onCopy).toHaveBeenCalledWith(`Ant Design-${i}`);
      });
    });

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
      testComponent.nzTypographyComponent.textEditRef.onCancel();
      fixture.detectChanges();
      expect(testComponent.str).toBe('This is an editable text.');
    });

    it('should edit work', () => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      expect(testComponent.str).toBe('This is an editable text.');
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')!;
      typeInElement('test', textarea);
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'blur');
      fixture.detectChanges();
      expect(testComponent.str).toBe('test');
    });

    it('should edit focus', fakeAsync(() => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')! as HTMLTextAreaElement;
      expect(document.activeElement === textarea).toBe(true);
      dispatchFakeEvent(textarea, 'blur');
      fixture.detectChanges();
    }));

    it('should apply changes when Enter keydown', () => {
      const editButton = componentElement.querySelector<HTMLButtonElement>('.ant-typography-edit');
      editButton!.click();
      fixture.detectChanges();
      const textarea = componentElement.querySelector<HTMLTextAreaElement>('textarea')!;
      typeInElement('test', textarea);
      fixture.detectChanges();
      const event = createKeyboardEvent('keydown', ENTER, textarea);
      testComponent.nzTypographyComponent.textEditRef.onEnter(event);
      fixture.detectChanges();
      expect(testComponent.str).toBe('test');
    });
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
      expect(dynamicContent.classList).toContain('ant-typography-ellipsis-multiple-line');
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

    // TODO Uncaught RangeError: Maximum call stack size exceeded thrown
    xit('should resize work', fakeAsync(() => {
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
      viewport.reset();
    }));
  });
});

@Component({
  template: `
    <h1 nz-title>h1. Ant Design</h1>
    <h2 nz-title>h2. Ant Design</h2>
    <h3 nz-title>h3. Ant Design</h3>
    <h4 nz-title>h4. Ant Design</h4>
    <p nz-paragraph>Ant Design, a design language for background applications, is refined by Ant UED Team</p>
    <span nz-text>Ant Design</span>
    <span class="test-secondary" nz-text nzType="secondary">Ant Design</span>
    <span class="test-warning" nz-text nzType="warning">Ant Design</span>
    <span class="test-danger" nz-text nzType="danger">Ant Design</span>
    <span class="test-disabled" nz-text nzDisabled>Ant Design</span>
    <span nz-text><mark>Ant Design</mark></span>
    <span nz-text><code>Ant Design</code></span>
    <span nz-text><u>Ant Design</u></span>
    <span nz-text><del>Ant Design</del></span>
    <span nz-text><strong>Ant Design</strong></span>
  `
})
export class NzTestTypographyComponent {}

@Component({
  template: `
    <h4 nz-title nzCopyable class="test-copy-h4" nzContent="Ant Design-0" (nzCopy)="onCopy($event)"></h4>
    <p nz-paragraph nzCopyable class="test-copy-p" nzContent="Ant Design-1" (nzCopy)="onCopy($event)"></p>
    <span nz-text nzCopyable class="test-copy-text" nzContent="Ant Design-2" (nzCopy)="onCopy($event)"></span>
    <span nz-text nzCopyable nzCopyText="Ant Design-3" class="test-copy-replace" (nzCopy)="onCopy($event)">Test</span>
  `
})
export class NzTestTypographyCopyComponent {
  onCopy(_text: string): void {
    // noop
  }
}

@Component({
  template: `
    <p nz-paragraph nzEditable (nzContentChange)="onChange($event)" [nzContent]="str"></p>
  `
})
export class NzTestTypographyEditComponent {
  @ViewChild(NzTypographyComponent, { static: false }) nzTypographyComponent: NzTypographyComponent;
  str = 'This is an editable text.';
  onChange = (text: string): void => {
    this.str = text;
  };
}

@Component({
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
      [nzContent]="str"
      class="dynamic"
    ></p>
  `,
  styles: [
    `
      p {
        line-height: 1.5;
      }
    `
  ]
})
export class NzTestTypographyEllipsisComponent {
  expandable = false;
  onExpand = jasmine.createSpy('expand callback');

  @ViewChild(NzTypographyComponent, { static: false }) nzTypographyComponent: NzTypographyComponent;
  str = new Array(5)
    .fill('Ant Design, a design language for background applications, is refined by Ant UED Team.')
    .join('');
}
