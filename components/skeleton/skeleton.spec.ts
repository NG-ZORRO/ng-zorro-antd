/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzSkeletonModule } from './skeleton.module';
import {
  NzSkeletonAvatar,
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize,
  NzSkeletonParagraph,
  NzSkeletonTitle
} from './skeleton.type';

describe('skeleton', () => {
  let fixture: ComponentFixture<NzTestSkeletonComponent>;
  let testComp: NzTestSkeletonComponent;
  let dl: DebugElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestSkeletonComponent);
    testComp = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#nzActive', () => {
    it('should active work', () => {
      expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeFalsy();
      testComp.nzActive = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeTruthy();
    });
  });

  describe('#nzTitle', () => {
    it('should basic width prop work', () => {
      expect(dl.nativeElement.querySelector('.ant-skeleton-title')).toBeFalsy();
      testComp.nzTitle = true;
      testComp.nzAvatar = false;
      testComp.nzParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('38%');
      testComp.nzAvatar = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('50%');
      testComp.nzParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('');
    });
    it('should customize width props work', () => {
      testComp.nzTitle = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('');
      testComp.nzTitle = { width: '50%' };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('50%');
      testComp.nzTitle = { width: 200 };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('200px');
    });
  });

  describe('#nzAvatar', () => {
    it('should basic avatar props work', () => {
      testComp.nzTitle = true;
      testComp.nzAvatar = true;
      testComp.nzParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-square')).toBeTruthy();
      expect(dl.nativeElement.querySelector('.ant-skeleton-with-avatar')).toBeTruthy();
      testComp.nzParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-circle')).toBeTruthy();
    });
    for (const type of ['square', 'circle']) {
      it(`should customize shape ${type} work`, () => {
        testComp.nzAvatar = { shape: type } as NzSkeletonAvatar;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-skeleton-avatar-${type}`)) !== null).toBe(true);
      });
    }
    for (const type of [
      { size: 'large', cls: 'lg' },
      { size: 'small', cls: 'sm' }
    ]) {
      it(`should customize size ${type.size} work`, () => {
        testComp.nzAvatar = { size: type.size } as NzSkeletonAvatar;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-skeleton-avatar-${type.cls}`)) !== null).toBe(true);
      });
    }
  });

  describe('#nzParagraph', () => {
    it('should basic rows and width work', () => {
      testComp.nzTitle = true;
      testComp.nzAvatar = true;
      testComp.nzParagraph = true;
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(2);
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('');
      testComp.nzAvatar = false;
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(3);
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('61%');
    });
    it('should width type is string or number work', () => {
      testComp.nzParagraph = { width: 100 };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.nzParagraph = { width: 100, rows: 3 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('100px');
    });
    it('should define width type is Array work', () => {
      testComp.nzParagraph = { width: [200, '100px', '90%'] };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('200px');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.nzParagraph = { width: [200, '100px', '90%'], rows: 4 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[2].style.width).toBe('90%');
      expect(paragraphs[3].style.width).toBe('');
    });
  });

  describe('#nzRound', () => {
    it('should round work', () => {
      expect(dl.nativeElement.querySelector('.ant-skeleton-round')).toBeFalsy();
      testComp.nzRound = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-round')).toBeTruthy();
    });
  });
});

describe('skeleton element', () => {
  let fixture: ComponentFixture<NzTestSkeletonElementComponent>;
  let testComp: NzTestSkeletonElementComponent;
  let dl: DebugElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestSkeletonElementComponent);
    testComp = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should nzActive work', () => {
    expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeFalsy();
    testComp.nzActive = true;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeTruthy();
    testComp.useSuite = 4;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeTruthy();
  });

  it('should nzSize work', () => {
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-lg')).toBeFalsy();
    testComp.nzSize = 'large';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-lg')).toBeTruthy();
    testComp.nzSize = 40;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar').style.width).toBe('40px');
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar').style.height).toBe('40px');
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar').style.lineHeight).toBe('40px');
    // number size only work in 'avatar' type
    testComp.useSuite = 2;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button').style.width).toBeFalsy();
  });

  it('should nzShape work', () => {
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-circle')).toBeNull();
    testComp.nzShape = 'circle';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-circle')).toBeTruthy();
    testComp.nzShape = 'square';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-square')).toBeTruthy();

    testComp.useSuite = 2;
    testComp.nzShape = 'round';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button-round')).toBeTruthy();
  });

  it('should image svg work', () => {
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('svg')).toBeNull();
    testComp.useSuite = 4;
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('svg')).toBeTruthy();
  });
});

@Component({
  imports: [NzSkeletonModule],
  template: `
    <nz-skeleton
      [nzActive]="nzActive"
      [nzAvatar]="nzAvatar"
      [nzTitle]="nzTitle"
      [nzParagraph]="nzParagraph"
      [nzRound]="nzRound"
    />
  `
})
export class NzTestSkeletonComponent {
  nzActive: boolean = false;
  nzRound: boolean = false;
  nzAvatar: NzSkeletonAvatar | boolean = false;
  nzTitle: NzSkeletonTitle | boolean = false;
  nzParagraph: NzSkeletonParagraph | boolean = false;
}

@Component({
  imports: [NzSkeletonModule],
  template: `
    @switch (useSuite) {
      @case (1) {
        <nz-skeleton-element nzType="avatar" [nzActive]="nzActive" [nzSize]="nzSize" [nzShape]="$any(nzShape)" />
      }
      @case (2) {
        <nz-skeleton-element nzType="button" [nzActive]="nzActive" [nzSize]="$any(nzSize)" [nzShape]="nzShape" />
      }
      @case (3) {
        <nz-skeleton-element nzType="input" [nzActive]="nzActive" [nzSize]="$any(nzSize)" />
      }
      @case (4) {
        <nz-skeleton-element nzType="image" [nzActive]="nzActive" />
      }
    }
  `
})
export class NzTestSkeletonElementComponent {
  useSuite = 1;
  nzActive: boolean = false;
  nzSize: NzSkeletonAvatarSize | NzSkeletonButtonSize | NzSkeletonInputSize = 'default';
  nzShape: NzSkeletonAvatarShape | NzSkeletonButtonShape = 'default';
}
