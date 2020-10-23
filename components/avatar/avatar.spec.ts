import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createFakeEvent } from 'ng-zorro-antd/core/testing';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzAvatarGroupComponent } from './avatar-group.component';
import { NzAvatarComponent } from './avatar.component';
import { NzAvatarModule } from './avatar.module';

const imageBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) {
    return 'image';
  }
  if (el.querySelector('.anticon') != null) {
    return 'icon';
  }
  return el.innerText.trim().length === 0 ? '' : 'text';
}
describe('avatar group', () => {
  let fixture: ComponentFixture<TestAvatarGroupComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzAvatarModule],
      declarations: [TestAvatarGroupComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAvatarGroupComponent);
    fixture.detectChanges();
  });

  it('should avatar group work', () => {
    fixture.detectChanges();
    const avatarGroup = fixture.debugElement.query(By.directive(NzAvatarGroupComponent));
    expect(avatarGroup.nativeElement.classList).toContain('ant-avatar-group');
  });
});
describe('avatar', () => {
  let fixture: ComponentFixture<TestAvatarComponent>;
  let context: TestAvatarComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzAvatarModule, NzIconTestModule],
      declarations: [TestAvatarComponent]
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
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.nzSrc = '';
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
      expect(context.comp.hasSrc).toBe(false);
      context.nzSrc = imageBase64;
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
    it('should prevent default fallback when error src', fakeAsync(() => {
      const event = createFakeEvent('error');
      event.preventDefault();
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.nzSrc = 'Invalid image src';
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      context.nzSrc = imageBase64;
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
    it('#nzSrcSet', () => {
      context.nzSrcSet = '1.png';
      fixture.detectChanges();
      const el = dl.query(By.css(`img`)).nativeElement as HTMLImageElement;
      expect(el.srcset).toBe(context.nzSrcSet);
    });
    it('#nzAlt', () => {
      context.nzAlt = 'alt';
      fixture.detectChanges();
      const el = dl.query(By.css(`img`)).nativeElement as HTMLImageElement;
      expect(el.alt).toBe(context.nzAlt);
    });
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
      const scale = getScaleFromCSSTransform(dl.nativeElement.querySelector('.ant-avatar-string')!.style.transform!);
      expect(scale).toBe(1);
    }));
    it('should be auto set font-size', fakeAsync(() => {
      context.nzText = 'LongUsername';
      fixture.detectChanges();
      tick();
      const scale = getScaleFromCSSTransform(dl.nativeElement.querySelector('.ant-avatar-string')!.style.transform!);
      expect(scale).toBeLessThan(1);
    }));

    describe('nzGap', () => {
      let firstScale: number;
      let avatarText: HTMLElement;
      beforeEach(fakeAsync(() => {
        context.nzGap = 4;
        context.nzText = 'Username';
        fixture.detectChanges();
        tick();
        avatarText = dl.nativeElement.querySelector('.ant-avatar-string')!;
        firstScale = getScaleFromCSSTransform(avatarText.style.transform);
      }));

      it('should be set gap', fakeAsync(() => {
        context.nzGap = 8;
        fixture.detectChanges();
        tick();

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeLessThan(firstScale);

        context.nzGap = 2;
        fixture.detectChanges();
        tick();

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeGreaterThan(firstScale);
      }));

      it('Should be set to default when the limit is exceeded', fakeAsync(() => {
        context.nzGap = 1000;
        fixture.detectChanges();
        tick();

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(firstScale);

        context.nzGap = -1000;
        fixture.detectChanges();
        tick();

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(1);
      }));
    });
  });

  describe('#nzShape', () => {
    for (const type of ['square', 'circle']) {
      it(type, () => {
        context.nzShape = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${type}`)) !== null).toBe(true);
      });
    }
  });

  describe('#nzSize', () => {
    for (const item of [
      { size: 'large', cls: 'lg' },
      { size: 'small', cls: 'sm' }
    ]) {
      it(item.size, () => {
        context.nzSize = item.size;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${item.cls}`)) !== null).toBe(true);
      });
    }

    it('custom size', () => {
      context.nzSize = 64;
      context.nzIcon = null;
      context.nzSrc = null;
      fixture.detectChanges();
      const size = `${64}px`;
      const hostStyle = dl.nativeElement.querySelector('nz-avatar').style;
      expect(hostStyle.height === size).toBe(true);
      expect(hostStyle.width === size).toBe(true);
      expect(hostStyle.lineHeight === size).toBe(true);
      expect(hostStyle.fontSize === ``).toBe(true);

      context.nzIcon = 'user';
      fixture.detectChanges();
      expect(hostStyle.fontSize === `${context.nzSize / 2}px`).toBe(true);
    });
  });

  describe('order: image > icon > text', () => {
    it('image priority', () => {
      expect(getType(dl)).toBe('image');
    });
    it('should be show icon when image loaded error and icon exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
    }));
    it('should be show text when image loaded error and icon not exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.nzIcon = null;
      fixture.detectChanges();
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('text');
    }));
    it('should be show empty when image loaded error and icon & text not exists', fakeAsync(() => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.nzIcon = null;
      context.nzText = null;
      fixture.detectChanges();
      context.comp.imgError(event);
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('');
    }));
  });
});

function getScaleFromCSSTransform(transform: string): number {
  return +/(\w+)\(([^)]*)\)/g.exec(transform)![2];
}

@Component({
  template: `
    <nz-avatar
      #comp
      [nzShape]="nzShape"
      [nzSize]="nzSize"
      [nzIcon]="nzIcon"
      [nzText]="nzText"
      [nzGap]="nzGap"
      [nzSrc]="nzSrc"
      [nzSrcSet]="nzSrcSet"
      [nzAlt]="nzAlt"
    ></nz-avatar>
  `,
  styleUrls: ['./style/index.less']
})
class TestAvatarComponent {
  @ViewChild('comp', { static: false }) comp!: NzAvatarComponent;
  nzShape = 'square';
  nzSize: string | number = 'large';
  nzGap = 4;
  nzIcon: string | null = 'user';
  nzText: string | null = 'A';
  nzSrc: string | null = imageBase64;
  nzSrcSet?: string;
  nzAlt?: string;
}

@Component({
  template: `
    <nz-avatar-group></nz-avatar-group>
  `
})
class TestAvatarGroupComponent {}
