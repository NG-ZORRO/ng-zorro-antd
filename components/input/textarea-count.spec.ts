/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzInputModule } from 'ng-zorro-antd/input/input.module';
import { NzTextareaCountComponent } from 'ng-zorro-antd/input/textarea-count.component';

describe('textarea-count', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  describe('without-max-length', () => {
    let fixture: ComponentFixture<NzTestInputTextareaCountWithoutMaxComponent>;
    let testComponent: NzTestInputTextareaCountWithoutMaxComponent;
    let textareaCountElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputTextareaCountWithoutMaxComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      textareaCountElement = fixture.debugElement.query(By.directive(NzTextareaCountComponent)).nativeElement;
    });

    it('should count work', () => {
      expect(textareaCountElement.getAttribute('data-count')).toBe('0');
    });

    it('should count update work', fakeAsync(() => {
      testComponent.inputValue = 'test';
      fixture.detectChanges();
      flush();

      expect(textareaCountElement.getAttribute('data-count')).toBe('4');
    }));
  });

  describe('with-max-length', () => {
    let fixture: ComponentFixture<NzTestInputTextareaCountWithMaxComponent>;
    let testComponent: NzTestInputTextareaCountWithMaxComponent;
    let textareaCountElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputTextareaCountWithMaxComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      textareaCountElement = fixture.debugElement.query(By.directive(NzTextareaCountComponent)).nativeElement;
    });

    it('should count with max length work', () => {
      expect(textareaCountElement.getAttribute('data-count')).toBe('0/100');
    });

    it('should count update with max length work', fakeAsync(() => {
      testComponent.inputValue = 'test';
      fixture.detectChanges();
      flush();

      expect(textareaCountElement.getAttribute('data-count')).toBe('4/100');
    }));
  });
});

@Component({
  imports: [FormsModule, NzInputModule],
  template: `
    <nz-textarea-count>
      <textarea rows="4" nz-input [(ngModel)]="inputValue"></textarea>
    </nz-textarea-count>
  `
})
export class NzTestInputTextareaCountWithoutMaxComponent {
  inputValue = '';
}

@Component({
  imports: [FormsModule, NzInputModule],
  template: `
    <nz-textarea-count [nzMaxCharacterCount]="100">
      <textarea rows="4" nz-input [(ngModel)]="inputValue"></textarea>
    </nz-textarea-count>
  `
})
export class NzTestInputTextareaCountWithMaxComponent {
  inputValue = '';
}
