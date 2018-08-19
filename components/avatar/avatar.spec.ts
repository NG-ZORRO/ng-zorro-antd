import { Component, DebugElement, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzAvatarComponent } from './nz-avatar.component';
import { NzAvatarModule } from './nz-avatar.module';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) { return 'image'; }
  if (el.querySelector('.anticon') != null) { return 'icon'; }
  return el.innerText.trim().length === 0 ? '' : 'text';
}

describe('avatar', () => {
  let fixture: ComponentFixture<TestAvatarComponent>;
  let context: TestAvatarComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NzAvatarModule ],
      declarations: [ TestAvatarComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAvatarComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#nzSrc', () => {
    it('#nzSrc', () => {
      expect(context).not.toBeNull();
    });
    it('should tolerate error src', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.nzSrc = '';
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
      expect(context.comp.hasSrc).toBe(false);
      context.nzSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
  });

  it('#nzIcon', () => {
    context.nzSrc = null;
    context.nzText = null;
    fixture.detectChanges();
    expect(getType(dl)).toBe('icon');
  });

  describe('#nzText', () => {
    beforeEach(() => {
      context.nzSrc = null;
      context.nzIcon = null;
      fixture.detectChanges();
    });
    it('property', () => {
      expect(getType(dl)).toBe('text');
    });
    it('should be normal font-size', fakeAsync(() => {
      context.nzText = 'a';
      fixture.detectChanges();
      tick();
      const scale = +dl.nativeElement.querySelector('.ant-avatar-string').style.transform.replace(/[^\.0-9]/ig, '');
      expect(scale).toBe(0);
    }));
    it('should be autoset font-size', fakeAsync(() => {
      context.nzText = 'LongUsername';
      fixture.detectChanges();
      tick();
      const scale = +dl.nativeElement.querySelector('.ant-avatar-string').style.transform.replace(/[^\.0-9]/ig, '');
      expect(scale).toBeLessThan(1);
    }));
  });

  describe('#nzShape', () => {
    for (const type of [ 'square', 'circle' ]) {
      it(type, () => {
        context.nzShape = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${type}`)) !== null).toBe(true);
      });
    }
  });

  describe('#nzSize', () => {
    for (const item of [ { size: 'large', cls: 'lg'}, { size: 'small', cls: 'sm'} ]) {
      it(item.size, () => {
        context.nzSize = item.size;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${item.cls}`)) !== null).toBe(true);
      });
    }
  });

  describe('order: image > icon > text', () => {
    it('image priority', () => {
      expect(getType(dl)).toBe('image');
    });
    it('should be show icon when image loaded error and icon exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
    }));
    it('should be show text when image loaded error and icon not exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.nzIcon = null;
      fixture.detectChanges();
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('text');
    }));
    it('should be show empty when image loaded error and icon & text not exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.nzIcon = null;
      context.nzText = null;
      fixture.detectChanges();
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('');
    }));
  });
});

@Component({
  template: `
  <nz-avatar #comp
    [nzShape]="nzShape"
    [nzSize]="nzSize"
    [nzIcon]="nzIcon"
    [nzText]="nzText"
    [nzSrc]="nzSrc"></nz-avatar>
  `,
  styleUrls: [ './style/index.less' ]
})
class TestAvatarComponent {
  @ViewChild('comp') comp: NzAvatarComponent;
  nzShape = 'square';
  nzSize = 'large';
  nzIcon = 'anticon anticon-user';
  nzText = 'A';
  nzSrc = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==`;
}
