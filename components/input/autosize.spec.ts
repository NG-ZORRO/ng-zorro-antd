/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, NgZone } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, MockNgZone } from 'ng-zorro-antd/core/testing';

import { NzAutosizeDirective } from './autosize.directive';
import { NzInputModule } from './input.module';

describe('autoresize', () => {
  let zone: MockNgZone;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    });
  }));

  describe('single input', () => {
    describe('textarea autosize string', () => {
      let fixture: ComponentFixture<NzTestInputWithTextAreaAutoSizeStringComponent>;
      let testComponent: NzTestInputWithTextAreaAutoSizeStringComponent;
      let textarea: HTMLTextAreaElement;
      let autosize: NzAutosizeDirective;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithTextAreaAutoSizeStringComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(NzAutosizeDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(NzAutosizeDirective)).injector.get(NzAutosizeDirective);
      });
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
        autosize.resizeToFitContent();
        zone.simulateZoneExit();
        fixture.detectChanges();
        expect(textarea.clientHeight)
          .withContext('Expected textarea to have grown with added content.')
          .toBeGreaterThan(previousHeight);
        expect(textarea.clientHeight)
          .withContext('Expected textarea height to match its scrollHeight')
          .toBe(textarea.scrollHeight);

        previousHeight = textarea.clientHeight;
        testComponent.value += `
        Ah, distinctly I remember it was in the bleak December;
    And each separate dying ember wrought its ghost upon the floor.
        Eagerly I wished the morrow;—vainly I had sought to borrow
        From my books surcease of sorrow—sorrow for the lost Lenore—
    For the rare and radiant maiden whom the angels name Lenore—
                Nameless here for evermore.`;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        zone.simulateZoneExit();
        fixture.detectChanges();
        expect(textarea.clientHeight)
          .withContext('Expected textarea to have grown with added content.')
          .toBeGreaterThan(previousHeight);
        expect(textarea.clientHeight)
          .withContext('Expected textarea height to match its scrollHeight')
          .toBe(textarea.scrollHeight);
      }));

      it('should trigger a resize when the window is resized', fakeAsync(() => {
        spyOn(autosize, 'resizeToFitContent');

        dispatchFakeEvent(window, 'resize');
        tick(16);

        expect(autosize.resizeToFitContent).toHaveBeenCalled();
      }));
    });
    describe('textarea autosize object', () => {
      let fixture: ComponentFixture<NzTestInputWithTextAreaAutoSizeObjectComponent>;
      let testComponent: NzTestInputWithTextAreaAutoSizeObjectComponent;
      let textarea: HTMLTextAreaElement;
      let autosize: NzAutosizeDirective;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithTextAreaAutoSizeObjectComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(NzAutosizeDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(NzAutosizeDirective)).injector.get(NzAutosizeDirective);
      });
      it('should set a min-height based on minRows', fakeAsync(() => {
        autosize.resizeToFitContent(true);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        const previousMinHeight = parseInt(textarea.style.minHeight as string, 10);
        testComponent.minRows = 6;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(parseInt(textarea.style.minHeight as string, 10))
          .withContext('Expected increased min-height with minRows increase.')
          .toBeGreaterThan(previousMinHeight);
      }));

      it('should set a max-height based on maxRows', fakeAsync(() => {
        autosize.resizeToFitContent(true);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        const previousMaxHeight = parseInt(textarea.style.maxHeight as string, 10);
        testComponent.maxRows = 6;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(parseInt(textarea.style.maxHeight as string, 10))
          .withContext('Expected increased max-height with maxRows increase.')
          .toBeGreaterThan(previousMaxHeight);
      }));
    });
    describe('textarea autosize boolean', () => {
      let fixture: ComponentFixture<NzTestInputWithTextAreaAutoSizeBooleanComponent>;
      let testComponent: NzTestInputWithTextAreaAutoSizeBooleanComponent;
      let textarea: HTMLTextAreaElement;
      let autosize: NzAutosizeDirective;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithTextAreaAutoSizeBooleanComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(NzAutosizeDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(NzAutosizeDirective)).injector.get(NzAutosizeDirective);
      });
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
        autosize.resizeToFitContent();
        zone.simulateZoneExit();
        fixture.detectChanges();
        expect(textarea.clientHeight)
          .withContext('Expected textarea to have grown with added content.')
          .toBeGreaterThan(previousHeight);
        expect(textarea.clientHeight)
          .withContext('Expected textarea height to match its scrollHeight')
          .toBe(textarea.scrollHeight);

        previousHeight = textarea.clientHeight;
        testComponent.value += `
        Ah, distinctly I remember it was in the bleak December;
    And each separate dying ember wrought its ghost upon the floor.
        Eagerly I wished the morrow;—vainly I had sought to borrow
        From my books surcease of sorrow—sorrow for the lost Lenore—
    For the rare and radiant maiden whom the angels name Lenore—
                Nameless here for evermore.`;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        zone.simulateZoneExit();
        fixture.detectChanges();
        expect(textarea.clientHeight)
          .withContext('Expected textarea to have grown with added content.')
          .toBeGreaterThan(previousHeight);
        expect(textarea.clientHeight)
          .withContext('Expected textarea height to match its scrollHeight')
          .toBe(textarea.scrollHeight);
      }));

      it('should trigger a resize when the window is resized', fakeAsync(() => {
        spyOn(autosize, 'resizeToFitContent');

        dispatchFakeEvent(window, 'resize');
        tick(16);

        expect(autosize.resizeToFitContent).toHaveBeenCalled();
      }));
    });
  });
});

@Component({
  imports: [FormsModule, NzInputModule],
  template: `<textarea nz-input nzAutosize [ngModel]="value"></textarea>`
})
export class NzTestInputWithTextAreaAutoSizeStringComponent {
  value = '';
}

@Component({
  imports: [FormsModule, NzInputModule],
  template: `<textarea nz-input ngModel [nzAutosize]="{ minRows, maxRows }"></textarea>`
})
export class NzTestInputWithTextAreaAutoSizeObjectComponent {
  minRows = 2;
  maxRows = 2;
}

@Component({
  imports: [FormsModule, NzInputModule],
  template: `<textarea nz-input [nzAutosize]="true" [ngModel]="value"></textarea>`
})
export class NzTestInputWithTextAreaAutoSizeBooleanComponent {
  value = '';
}
