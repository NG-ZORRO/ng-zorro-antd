import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { NzDemoCodeEditorBasicComponent } from './demo/basic';

// tslint:disable-next-line no-any
declare const monaco: any;

@Component({
  template: `
    <nz-code-editor
      class="editor"
      [ngModel]="code"
      [nzFullControl]="true"
      (nzEditorInitialized)="onEditorInit($event)"
    ></nz-code-editor>
  `
})
export class NzTestCodeEditorFullControlComponent {
  // tslint:disable-next-line no-any
  editor: any;

  code = '';

  // tslint:disable-next-line no-any
  onEditorInit(e: any): void {
    this.editor = e;
    this.editor.setModel(monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript'));
  }
}

describe('code editor', () => {
  describe('basic', () => {
    // let fixture: ComponentFixture<NzDemoCodeEditorBasicComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, NzCodeEditorModule],
        declarations: [NzDemoCodeEditorBasicComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      // fixture = TestBed.createComponent(NzDemoCodeEditorBasicComponent);
    });
  });

  describe('full control', () => {
    let fixture: ComponentFixture<NzTestCodeEditorFullControlComponent>;
    let testComponent: NzTestCodeEditorFullControlComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, NzCodeEditorModule],
        declarations: [NzTestCodeEditorFullControlComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCodeEditorFullControlComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    // It seems that there is no way to waiting for monaco editor to load.
    xit('should raise error when user try to set value in full control mode', async(() => {
      const spy = spyOn(console, 'warn');
      testComponent.code = '123';
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(
        '[NG-ZORRO]',
        'should not set value when you are using full control mode! It would result in ambiguous data flow!'
      );
    }));
  });
});
