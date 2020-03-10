import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzSkeletonModule } from './skeleton.module';
import { AvatarShape, AvatarSize, ButtonShape, ButtonSize, NzSkeletonAvatar, NzSkeletonParagraph, NzSkeletonTitle } from './skeleton.type';

describe('skeleton', () => {
  let fixture: ComponentFixture<NzTestSkeletonComponent>;
  let testComp: NzTestSkeletonComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzSkeletonModule],
      declarations: [NzTestSkeletonComponent]
    }).compileComponents();
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
});

describe('skeleton element', () => {
  let fixture: ComponentFixture<NzTestSkeletonElementComponent>;
  let testComp: NzTestSkeletonElementComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzSkeletonModule],
      declarations: [NzTestSkeletonElementComponent]
    }).compileComponents();
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
  });

  it('should nzSize work', () => {
    testComp.nzType = 'avatar';
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
    testComp.nzType = 'button';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button').style.width).toBeFalsy();
  });

  it('should nzShape work', () => {
    testComp.nzType = 'button';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button-circle')).toBeNull();
    testComp.nzShape = 'circle';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button-circle')).toBeTruthy();
    testComp.nzShape = 'round';
    fixture.detectChanges();
    expect(dl.nativeElement.querySelector('.ant-skeleton-button-round')).toBeTruthy();
  });
});

@Component({
  template: `
    <nz-skeleton [nzActive]="nzActive" [nzAvatar]="nzAvatar" [nzTitle]="nzTitle" [nzParagraph]="nzParagraph"> </nz-skeleton>
  `
})
export class NzTestSkeletonComponent {
  nzActive: boolean;
  nzAvatar: NzSkeletonAvatar | boolean;
  nzTitle: NzSkeletonTitle | boolean;
  nzParagraph: NzSkeletonParagraph | boolean;
}

@Component({
  template: `
    <nz-skeleton-element [nzType]="nzType" [nzActive]="nzActive" [nzSize]="nzSize" [nzShape]="nzShape"> </nz-skeleton-element>
  `
})
export class NzTestSkeletonElementComponent {
  nzType: string;
  nzActive: boolean;
  nzSize: AvatarSize | ButtonSize;
  nzShape: AvatarShape | ButtonShape;
}
