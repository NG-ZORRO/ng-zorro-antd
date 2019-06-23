import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { createKeyboardEvent, dispatchFakeEvent, typeInElement } from 'ng-zorro-antd/core';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzDemoTypographyEllipsisComponent } from './demo/ellipsis';
import { NzTypographyComponent } from './nz-typography.component';
import { NzTypographyModule } from './nz-typography.module';

// declare const viewport: any;

describe('typography', () => {
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzTypographyModule, NzIconTestModule],
      declarations: [
        NzTestTypographyComponent,
        NzTestTypographyCopyComponent,
        NzTestTypographyEditComponent,
        NzDemoTypographyEllipsisComponent
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
    let fixture: ComponentFixture<NzDemoTypographyEllipsisComponent>;
    // let testComponent: NzDemoTypographyEllipsisComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzDemoTypographyEllipsisComponent);
      // testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    }));

    it('should ellipsis', fakeAsync(() => {
      // viewport.set(800, 1000);
      // dispatchFakeEvent(window, 'resize');
      fixture.detectChanges();
      tick();
      componentElement.querySelectorAll('p').forEach(e => {
        expect(e.classList).toContain('ant-typography-ellipsis');
      });
    }));

    it('should css ellipsis', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const element = componentElement.querySelectorAll('p')[0]!;
      expect(element.classList).toContain('ant-typography-ellipsis-single-line');
    }));
  });
});

@Component({
  selector: 'nz-test-typography',
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
  selector: 'nz-test-typography-copy',
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
  selector: 'nz-test-typography-edit',
  template: `
    <p nz-paragraph nzEditable (nzChange)="onChange($event)" [nzContent]="str"></p>
  `
})
export class NzTestTypographyEditComponent {
  @ViewChild(NzTypographyComponent, { static: false }) nzTypographyComponent: NzTypographyComponent;
  str = 'This is an editable text.';
  onChange = (text: string): void => {
    this.str = text;
  };
}
