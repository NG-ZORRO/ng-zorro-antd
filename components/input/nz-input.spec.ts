import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../core/testing';

import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputDirective } from './nz-input.directive';
import { NzInputModule } from './nz-input.module';

describe('input', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzInputModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestInputWithInputComponent, NzTestInputWithTextAreaComponent, NzTestInputWithTextAreaAutoSizeStringComponent, NzTestInputWithTextAreaAutoSizeObjectComponent, NzTestInputGroupAddonComponent, NzTestInputGroupAffixComponent, NzTestInputGroupMultipleComponent, NzTestInputGroupColComponent, NzTestInputFormComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('single input', () => {
    describe('input with input element', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });
      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      });
      it('should nzSize work', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-sm');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-lg');
      });
    });
    describe('input with textarea element', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });
    });
    describe('textarea autosize string', () => {
      let textarea;
      let autosize;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithTextAreaAutoSizeStringComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(NzInputDirective)).injector.get(NzInputDirective);
      });
      it('should resize when input change', fakeAsync(() => {
        const previousHeight = textarea.clientHeight;
        dispatchKeyboardEvent(textarea, 'input', 13, textarea);
        testComponent.value = '\n';
        fixture.detectChanges();
        flush();
        autosize.resizeTextArea();
        expect(textarea.clientHeight)
        .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with input content.');
        expect(textarea.clientHeight)
        .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
      }));
      it('should resize the textarea based on its ngModel', fakeAsync(() => {
        let previousHeight = textarea.clientHeight;
        testComponent.value = `
    Once upon a midnight dreary, while I pondered, weak and weary,
    Over many a quaint and curious volume of forgotten lore—
        While I nodded, nearly napping, suddenly there came a tapping,
    As of some one gently rapping, rapping at my chamber door.
    “’Tis some visitor,” I muttered, “tapping at my chamber door—
                Only this and nothing more.”`;
        flush();
        // Manually call resizeTextArea instead of faking an `input` event.
        fixture.detectChanges();
        flush();
        autosize.resizeTextArea();

        expect(textarea.clientHeight)
        .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
        .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');

        previousHeight = textarea.clientHeight;
        testComponent.value += `
        Ah, distinctly I remember it was in the bleak December;
    And each separate dying ember wrought its ghost upon the floor.
        Eagerly I wished the morrow;—vainly I had sought to borrow
        From my books surcease of sorrow—sorrow for the lost Lenore—
    For the rare and radiant maiden whom the angels name Lenore—
                Nameless here for evermore.`;
        flush();
        fixture.detectChanges();
        flush();
        autosize.resizeTextArea();
        expect(textarea.clientHeight)
        .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
        .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
      }));
    });
    describe('textarea autosize object', () => {
      let textarea;
      let autosize;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithTextAreaAutoSizeObjectComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(NzInputDirective)).injector.get(NzInputDirective);
      });
      it('should set a min-height based on minRows', () => {
        const previousMinHeight = parseInt(textarea.style.minHeight as string, 10);
        testComponent.minRows = 6;
        fixture.detectChanges();
        autosize.resizeTextArea();
        expect(parseInt(textarea.style.minHeight as string, 10))
        .toBeGreaterThan(previousMinHeight, 'Expected increased min-height with minRows increase.');
      });

      it('should set a max-height based on maxRows', () => {
        const previousMaxHeight = parseInt(textarea.style.maxHeight as string, 10);
        testComponent.maxRows = 6;
        fixture.detectChanges();
        autosize.resizeTextArea();
        expect(parseInt(textarea.style.maxHeight as string, 10))
        .toBeGreaterThan(previousMaxHeight, 'Expected increased max-height with maxRows increase.');
      });
    });
  });
  describe('input group', () => {
    describe('addon', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupAddonComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).not.toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper-sm');
      });
    });
    describe('affix', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupAffixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper-sm');
      });
    });
    describe('multiple', () => {
      let inputGroupElement;
      let inputs;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupMultipleComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
        inputs = fixture.debugElement.queryAll(By.directive(NzInputDirective));
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).not.toContain('ant-input-group-compact');
        testComponent.compact = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-compact');
      });
      it('should search work', () => {
        expect(inputGroupElement.classList).not.toContain('ant-input-search-enter-button');
        expect(inputGroupElement.classList).not.toContain('ant-input-search');
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-enter-button');
        expect(inputGroupElement.classList).toContain('ant-input-search');
      });
      it('should size work', () => {
        expect(inputGroupElement.classList).toContain('ant-input-group');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-sm');
      });
      it('should search size work', () => {
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-sm');
      });
    });
    describe('col', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupColComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).toContain('ant-input-group');
      });
    });
  });
  describe('input form', () => {
    describe('input with form', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputFormComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });
      it('should set disabled work', fakeAsync(() => {
        flush();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      }));
    });
  });
});

@Component({
  selector: 'nz-test-input-with-input',
  template: `<input nz-input [nzSize]="size" [disabled]="disabled">`
})
export class NzTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  selector: 'nz-test-input-with-textarea',
  template: `<textarea nz-input></textarea>`
})
export class NzTestInputWithTextAreaComponent {
}

@Component({
  selector: 'nz-test-input-with-textarea-autosize-string',
  template: `<textarea nz-input nzAutosize [ngModel]="value"></textarea>`
})
export class NzTestInputWithTextAreaAutoSizeStringComponent {
  value = '';
}

@Component({
  selector: 'nz-test-input-with-textarea-autosize-object',
  template: `<textarea nz-input [nzAutosize]="{ minRows: minRows, maxRows: maxRows }"></textarea>`
})
export class NzTestInputWithTextAreaAutoSizeObjectComponent {
  minRows = 2;
  maxRows = 2;
}

@Component({
  selector: 'nz-test-input-group-addon',
  template: `
    <nz-input-group [nzAddOnBefore]="beforeContent" [nzAddOnAfter]="afterContent" [nzSize]="size">
      <input type="text" nz-input>
    </nz-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputGroupAddonComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'nz-test-input-group-affix',
  template: `
    <nz-input-group [nzPrefix]="beforeContent" [nzSuffix]="afterContent" [nzSize]="size">
      <input type="text" nz-input>
    </nz-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputGroupAffixComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'nz-test-input-group-multiple',
  template: `
    <nz-input-group [nzCompact]="compact" [nzSearch]="search" [nzSize]="size">
      <input type="text" nz-input>
      <input type="text" nz-input>
    </nz-input-group>
  `
})
export class NzTestInputGroupMultipleComponent {
  compact = false;
  search = false;
  size = 'default';
}

@Component({
  selector: 'nz-test-input-group-col',
  template: `
    <nz-input-group>
      <div nz-col nzSpan="4">
        <input type="text" nz-input [ngModel]="'0571'">
      </div>
      <div nz-col nzSpan="8">
        <input type="text" nz-input [ngModel]="'26888888'">
      </div>
    </nz-input-group>
  `
})
export class NzTestInputGroupColComponent {
}

@Component({
  selector: 'nz-test-input-form',
  template: `
    <form [formGroup]="formGroup">
      <input nz-input formControlName="input">
    </form>
  `
})
export class NzTestInputFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: [ 'abc' ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
