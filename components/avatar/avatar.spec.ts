import { fakeAsync, tick } from '@angular/core/testing';
// tslint:disable
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { NzAvatarModule } from './nz-avatar.module';
import { NzAvatarComponent } from './nz-avatar.component';
import { By } from '@angular/platform-browser';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) return 'image';
  if (el.querySelector('.anticon') != null) return 'icon';
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

  it('#nzSrc', () => {
    expect(context).not.toBeNull();
  });

  it('#nzIcon', () => {
    context.nzSrc = null;
    context.nzText = null;
    fixture.detectChanges();
    expect(getType(dl)).toBe('icon');
  });

  it('#nzText', () => {
    context.nzSrc = null;
    context.nzIcon = null;
    fixture.detectChanges();
    expect(getType(dl)).toBe('text');
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
        debugger;
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
      context.comp._imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
    }));
    it('should be show text when image loaded error and icon not exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.nzIcon = '';
      fixture.detectChanges();
      context.comp._imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('text');
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
  `
})
class TestAvatarComponent {
  @ViewChild('comp') comp: NzAvatarComponent;
  nzShape = 'square';
  nzSize = 'large';
  nzIcon = 'user';
  nzText = 'A';
  nzSrc = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==`;
}
