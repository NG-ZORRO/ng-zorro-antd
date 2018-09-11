import { Component } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzTagComponent } from './nz-tag.component';
import { NzTagModule } from './nz-tag.module';

describe('tag', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTagModule, NoopAnimationsModule ],
      declarations: [ NzTestTagBasicComponent, NzTestTagPreventComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic tag', () => {
    let fixture;
    let testComponent;
    let tag;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTagBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tag = fixture.debugElement.query(By.directive(NzTagComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag');
    });
    it('should checkable work', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-checkable');
      testComponent.mode = 'checkable';
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-checkable');
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-checkable-checked');
      tag.nativeElement.firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(1);
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-checkable');
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-checkable-checked');
    });
    it('should closeable work', fakeAsync(() => {
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.anticon-close')).toBeNull();
      testComponent.mode = 'closeable';
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.anticon-close')).toBeDefined();
      tag.nativeElement.querySelector('.anticon-close').click();
      fixture.detectChanges();
      expect(testComponent.onClose).toHaveBeenCalledTimes(1);
      expect(testComponent.afterClose).toHaveBeenCalledTimes(0);
      tick(1000);
      fixture.detectChanges();
      expect(testComponent.afterClose).toHaveBeenCalledTimes(1);
      expect(tag.nativeElement.querySelector('.anticon-close')).toBeNull();
    }));
    it('should color work', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-has-color');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-green');
      testComponent.color = '#f50';
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-green');
      expect(tag.nativeElement.firstElementChild.style.backgroundColor).toBe('rgb(255, 85, 0)');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-green');
      expect(tag.nativeElement.firstElementChild.style.backgroundColor).toBe('');
    });
    it('issues #1176', () => {
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).toContain('ant-tag-green');
      testComponent.color = '';
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-has-color');
      testComponent.color = undefined;
      fixture.detectChanges();
      expect(tag.nativeElement.firstElementChild.classList).not.toContain('ant-tag-has-color');
    });
  });
  describe('prevent tag', () => {
    let fixture;
    let testComponent;
    let tag;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTagPreventComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tag = fixture.debugElement.query(By.directive(NzTagComponent));
    });
    it('should close prevent default', fakeAsync(() => {
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.anticon-close')).toBeDefined();
      tag.nativeElement.querySelector('.anticon-close').click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.anticon-close')).toBeDefined();
    }));
  });
});

@Component({
  template: `
    <nz-tag
      [nzMode]="mode"
      [(nzChecked)]="checked"
      [nzColor]="color"
      (nzCheckedChange)="checkedChange($event)"
      (nzAfterClose)="afterClose()"
      (nzOnClose)="onClose()">
      Tag 1
    </nz-tag>
  `
})
export class NzTestTagBasicComponent {
  mode = 'default';
  color;
  checked = false;
  onClose = jasmine.createSpy('on close');
  afterClose = jasmine.createSpy('after close');
  checkedChange = jasmine.createSpy('after close');
}

@Component({
  template: `
    <nz-tag
      nzMode="closeable"
      (nzOnClose)="onClose($event)">
      Tag 1
    </nz-tag>
  `
})
export class NzTestTagPreventComponent {
  onClose(e: MouseEvent): void {
    e.preventDefault();
  }
}
