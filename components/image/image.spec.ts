/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, NgModule, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  flushMicrotasks,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  CloseCircleOutline,
  LeftCircleOutline,
  RightCircleOutline,
  RotateLeftOutline,
  RotateRightOutline,
  ZoomInOutline,
  ZoomOutOutline
} from '@ant-design/icons-angular/icons';

import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  getFitContentPosition,
  NzImage,
  NzImageDirective,
  NzImageGroupComponent,
  NzImageModule,
  NzImagePreviewRef,
  NzImageService
} from 'ng-zorro-antd/image';

const SRC = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const QUICK_SRC =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTA2cHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMDYgMTIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OC4xMjc5ODcyJSIgeTE9Ii0zNS42OTA1NzM3JSIgeDI9IjMwLjQ0MDA5MTQlIiB5Mj0iMTE0Ljk0MjY3OSUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjUxLjI2MzUxOTElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OC4xMjc5ODcyJSIgeTE9Ii0zNS42OTA1NzM3JSIgeDI9Ijc0LjUzNjM5MTQlIiB5Mj0iMTYyLjUxMTc1NSUiIGlkPSJsaW5lYXJHcmFkaWVudC0yIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjUxLjI2MzUxOTElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OS42NDQxMTYlIiB5MT0iMCUiIHgyPSI2OS42NDQxMTYlIiB5Mj0iMTAwJSIgaWQ9ImxpbmVhckdyYWRpZW50LTMiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjlDREZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMxNDhFRkYiIG9mZnNldD0iMzcuODYwMDY4NyUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzBBNjBGRiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9Ii0xOS44MTkxNTUzJSIgeTE9Ii0zNi43OTMxNDY0JSIgeDI9IjEzOC41NzkxOSUiIHkyPSIxNTcuNjM3NTA3JSIgaWQ9ImxpbmVhckdyYWRpZW50LTQiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjlDREZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwRjc4RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQW5ndWxhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExLjAwMDAwMCwgLTQuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS4wMDAwMDAsIDQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNjUuNjMsNzIuMiBMNTMuMjMsNTMuMiBMNDYsNjMuNjkgTDUzLjM3LDYzLjY5IEM1Ni40MDc1NjYxLDYzLjY5IDU4Ljg3LDY2LjE1MjQzMzkgNTguODcsNjkuMTkgQzU4Ljg3LDcyLjIyNzU2NjEgNTYuNDA3NTY2MSw3NC42OSA1My4zNyw3NC42OSBMMzUuNDksNzQuNjkgQzMzLjQ0NDg5ODYsNzQuNjg5MDY2NyAzMS41NjkxODksNzMuNTUzNDg0NiAzMC42MjAzMjYsNzEuNzQxODI4MSBDMjkuNjcxNDYzLDY5LjkzMDE3MTUgMjkuODA2MTUxMSw2Ny43NDE2MzQ5IDMwLjk3LDY2LjA2IEw0OC44NCw0MC4yNiBDNDkuODc5MjI2LDM4Ljc1Mjc2MzYgNTEuNjAxMzk0OCwzNy44NjI3MzkzIDUzLjQzMjAxNTQsMzcuODg2ODI2NCBDNTUuMjYyNjM2MSwzNy45MTA5MTM1IDU2Ljk2MDc5MSwzOC44NDU5NDIxIDU3Ljk2LDQwLjM4IEw3NC44NCw2Ni4xOCBDNzUuOTQ0OTUwNSw2Ny44Njk4MjA2IDc2LjAzNTIxMjIsNzAuMDI5MjA2NyA3NS4wNzUxMzc2LDcxLjgwNTM0NDYgQzc0LjExNTA2Myw3My41ODE0ODI2IDcyLjI1OTAxMTYsNzQuNjg4ODA3NiA3MC4yNCw3NC42OSBDNjguMzc5OTE5NCw3NC42OTc4MTMxIDY2LjY0MzM0NTQsNzMuNzU5ODM3MiA2NS42Myw3Mi4yIFoiIGlkPSJQYXRoIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzAuMjgsMjUgQzY5LjA2MTY5MzksMjUuMDAwNDA1MyA2Ny44NjQ4MTA1LDI0LjY3OTYyNjggNjYuODEsMjQuMDcgTDUyLjg3LDE2LjA3IEwzOSwyNCBDMzYuODMzMTg0MiwyNS4yNTA0Mjk4IDM0LjE2Mzg2NzQsMjUuMjQ5ODkyIDMxLjk5NzU1NTYsMjMuOTk4NTg5MiBDMjkuODMxMjQzOCwyMi43NDcyODY1IDI4LjQ5NzA1MTMsMjAuNDM1MzIxNCAyOC40OTc1NTU1LDE3LjkzMzU4OSBDMjguNDk4MDU5NywxNS40MzE4NTY2IDI5LjgzMzE4NCwxMy4xMjA0Mjk1IDMyLDExLjg3IEw0OS4zNCwxLjg3IEM1MS41MDU4MDc1LDAuNjE5NTcwNDM1IDU0LjE3NDE5MjUsMC42MTk1NzA0MzUgNTYuMzQsMS44NyBMNzMuNzYsMTEuODcgQzc2LjU3NDEwNywxMy40MjA3NzMxIDc3Ljk3MTA4ODksMTYuNjg4MjM0IDc3LjE0NzkwMiwxOS43OTQxMDg4IEM3Ni4zMjQ3MTUsMjIuODk5OTgzNyA3My40OTI3NzUsMjUuMDQ2NjAzMSA3MC4yOCwyNSBaIiBpZD0iUGF0aCIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0yKSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTUyLjg2LDExOS45MiBDNTEuNjMxMDQ1NCwxMTkuOTE5MzM4IDUwLjQyMzkyMzUsMTE5LjU5NTEzOSA0OS4zNiwxMTguOTggTDMuOTMsOTIuNzUgQzEuNzY0ODY2MTQsOTEuNDk5OTU5NSAwLjQzMDc3Nzg5LDg5LjE5MDA4MSAwLjQzLDg2LjY5IEwwLjQzLDM0LjIzIEMwLjQzMDc3Nzg5LDMxLjcyOTkxOSAxLjc2NDg2NjE0LDI5LjQyMDA0MDUgMy45MywyOC4xNyBMMTUuMTYsMjEuNjkgQzE3LjMyOTA4NzksMjAuMzY5MTUzIDIwLjA0MzQyNTEsMjAuMzI2NzIwOCAyMi4yNTI3Mzk2LDIxLjU3OTEyMTkgQzI0LjQ2MjA1NDEsMjIuODMxNTIzIDI1LjgxOTc1NDQsMjUuMTgyMjg0IDI1LjgwMDQ5ODYsMjcuNzIxODEzMSBDMjUuNzgxMjQyOCwzMC4yNjEzNDIzIDI0LjM4ODA1MTgsMzIuNTkxMjQ0OSAyMi4xNiwzMy44MSBMMTQuNDMsMzguMjcgTDE0LjQzLDgyLjY1IEw1Mi44NiwxMDQuODMgTDg5Ljc4OTYxNjEsODMuNTE1OTUxNSBDOTAuNzE4MDM1Nyw4Mi45ODAxMTExIDkxLjI5LDgxLjk4OTYwODggOTEuMjksODAuOTE3NjUzNiBMOTEuMjksNDAuMDAyODQyMSBDOTEuMjksMzguOTMwNjIxMyA5MC43MTc3NTQ1LDM3LjkzOTkxNTcgODkuNzg4OTcyMSwzNy40MDQxNzI3IEw4My42MSwzMy44NCBDODEuNDQzMTg0MiwzMi41ODk1NzA0IDgwLjEwODA2MDEsMzAuMjc4MTQzNCA4MC4xMDc1NTU5LDI3Ljc3NjQxMTEgQzgwLjEwNzA1MTgsMjUuMjc0Njc4OCA4MS40NDEyNDQzLDIyLjk2MjcxMzggODMuNjA3NTU1OSwyMS43MTE0MTExIEM4NS43NzM4Njc2LDIwLjQ2MDEwODMgODguNDQzMTg0MiwyMC40NTk1NzA0IDkwLjYxLDIxLjcxIEwxMDEuNzksMjguMTcgQzEwMy45NTUxMzQsMjkuNDIwMDQwNSAxMDUuMjg5MjIyLDMxLjcyOTkxOSAxMDUuMjksMzQuMjMgTDEwNS4yOSw4Ni42OSBDMTA1LjI4OTIyMiw4OS4xOTAwODEgMTAzLjk1NTEzNCw5MS40OTk5NTk1IDEwMS43OSw5Mi43NSBMNTYuMzYsMTE5IEM1NS4yOTUyMjc5LDExOS42MTA4MDUgNTQuMDg3NDk5LDExOS45MjgyNjUgNTIuODYsMTE5LjkyIFoiIGlkPSJQYXRoIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTMpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03OC4wNiwxMDYuNDUgQzY2Ljg5LDExMyA1Mi44NywxMDQuODMgNTIuODcsMTA0LjgzIEwxNS45NDAzODM5LDgzLjUxNTk1MTUgQzE1LjAxMTk2NDMsODIuOTgwMTExMSAxNC40NCw4MS45ODk2MDg4IDE0LjQ0LDgwLjkxNzY1MzYgTDE0LjQ0LDQwLjAwMjYxNzEgQzE0LjQ0LDM4LjkzMDUxNjkgMTUuMDEyMTE3OSwzNy45Mzk5MDM1IDE1Ljk0MDczNTYsMzcuNDA0MTE2MyBMMjIuMTcsMzMuODEgQzI0LjM5ODA1MTgsMzIuNTkxMjQ0OSAyNS43OTEyNDI4LDMwLjI2MTM0MjMgMjUuODEwNDk4NiwyNy43MjE4MTMxIEMyNS44Mjk3NTQ0LDI1LjE4MjI4NCAyNC40NzIwNTQxLDIyLjgzMTUyMyAyMi4yNjI3Mzk2LDIxLjU3OTEyMTkgQzIwLjA1MzQyNTEsMjAuMzI2NzIwOCAxNy4zMzkwODc5LDIwLjM2OTE1MyAxNS4xNywyMS42OSBMMy45NCwyOC4xNyBDMS43NzQ4NjYxNCwyOS40MjAwNDA1IDAuNDQwNzc3ODksMzEuNzI5OTE5IDAuNDQsMzQuMjMgTDAuNDQsODYuNjkgQzAuNDQwNzc3ODksODkuMTkwMDgxIDEuNzc0ODY2MTQsOTEuNDk5OTU5NSAzLjk0LDkyLjc1IEw0OS4zNiwxMTkgQzUxLjUyNTgwNzUsMTIwLjI1MDQzIDU0LjE5NDE5MjUsMTIwLjI1MDQzIDU2LjM2LDExOSBMNzguMDYsMTA2LjQ3IEw3OC4wNiwxMDYuNDUgWiIgaWQ9IlBhdGgiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtNCkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
const PLACEHOLDER =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';
const FALLBACK =
  'data:image/png;base64,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';

describe('Basics', () => {
  let fixture: ComponentFixture<TestImageBasicsComponent>;
  let context: TestImageBasicsComponent;
  let debugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzImageModule, TestImageModule, NoopAnimationsModule],
      providers: [{ provide: Overlay, useClass: Overlay }]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageBasicsComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should only latest src work', fakeAsync(() => {
    const ERROR_SRC = 'error.png';
    context.src = ERROR_SRC;
    context.placeholder = null;
    const image = debugElement.nativeElement.querySelector('img');
    fixture.detectChanges();
    const oldBackLoadImage = context.nzImage.backLoadImage;
    context.src = SRC;
    fixture.detectChanges();
    tick(1000);
    context.nzImage.backLoadImage.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(image.src).toBe(SRC);
    tick(1000);
    oldBackLoadImage.dispatchEvent(new ErrorEvent('error'));
    fixture.detectChanges();
    expect(image.src).toBe(SRC);
    expect(context.nzImage.status).toBe('normal');
  }));

  it('should keep placeholder when latest src is loading', fakeAsync(() => {
    context.src = SRC;
    context.placeholder = PLACEHOLDER;
    const image = debugElement.nativeElement.querySelector('img');
    fixture.detectChanges();
    const oldBackLoadImage = context.nzImage.backLoadImage;
    const SECOND_SRC = 'https://test.com/SECOND_SRC.png';
    context.src = SECOND_SRC;
    fixture.detectChanges();
    tick(1000);
    oldBackLoadImage.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(image.src).toBe(PLACEHOLDER);
    tick(1000);
    context.nzImage.backLoadImage.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(image.src).toBe(SECOND_SRC);
  }));
});

describe('Placeholder', () => {
  let fixture: ComponentFixture<TestImagePlaceholderComponent>;
  let context: TestImagePlaceholderComponent;
  let debugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzImageModule, TestImageModule, NoopAnimationsModule],
      providers: [{ provide: Overlay, useClass: Overlay }]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImagePlaceholderComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should placeholder src work', () => {
    context.src = SRC;
    context.placeholder = PLACEHOLDER;
    const image = debugElement.nativeElement.querySelector('img');
    fixture.detectChanges();
    expect(image.src).toBe(PLACEHOLDER);
  });

  it('should hide placeholder when image loaded', fakeAsync(() => {
    context.src = QUICK_SRC;
    context.placeholder = PLACEHOLDER;
    const imageComponent = context.nzImage;
    const imageElement = imageComponent.getElement().nativeElement;
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    imageComponent.backLoadImage.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(imageElement.getAttribute('src')).toBe(QUICK_SRC);
  }));
});

describe('Fallback', () => {
  let fixture: ComponentFixture<TestImageFallbackComponent>;
  let context: TestImageFallbackComponent;
  let debugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzImageModule, TestImageModule, NoopAnimationsModule],
      providers: [{ provide: Overlay, useClass: Overlay }]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageFallbackComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should fallback src work', fakeAsync(() => {
    context.src = 'error.png';
    context.fallback = FALLBACK;
    fixture.detectChanges();
    context.image.backLoadImage.dispatchEvent(new ErrorEvent('error'));
    tick();
    fixture.detectChanges();
    const image = debugElement.nativeElement.querySelector('img');
    expect(image.src).toBe(FALLBACK);
  }));
});

describe('Preview', () => {
  let fixture: ComponentFixture<TestImagePreviewGroupComponent>;
  let context: TestImagePreviewGroupComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let previewElement: HTMLElement | null;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzImageModule, TestImageModule, NoopAnimationsModule, NzIconModule],
      providers: [
        { provide: Overlay, useClass: Overlay },
        {
          provide: NZ_ICONS,
          useValue: [
            ZoomInOutline,
            ZoomOutOutline,
            RightCircleOutline,
            LeftCircleOutline,
            RotateLeftOutline,
            RotateRightOutline,
            CloseCircleOutline
          ]
        }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImagePreviewGroupComponent);
    fixture.detectChanges();
    context = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function getOverlayBackDropElement(): HTMLDivElement {
    return overlayContainerElement.querySelector('.ant-image-preview-mask')! as HTMLDivElement;
  }

  function getPreviewWrapElement(): HTMLElement {
    return overlayContainerElement.querySelector('.ant-image-preview-wrap')! as HTMLElement;
  }

  function getPreviewElement(): HTMLDivElement {
    return overlayContainerElement.querySelector('.ant-image-preview')! as HTMLDivElement;
  }

  function getPreviewImageElement(): HTMLImageElement {
    return previewElement!.querySelector('.ant-image-preview-img')! as HTMLImageElement;
  }

  function tickChanges(time: number = 300): void {
    fixture.detectChanges();
    tick(time);
    fixture.detectChanges();
  }

  describe('nzDisablePreview', () => {
    it('should nzDisablePreview work outside group', fakeAsync(() => {
      context.firstSrc = QUICK_SRC;
      context.disablePreview = true;
      fixture.detectChanges();
      context.nzImage.getElement().nativeElement.click();
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).not.toBeTruthy();
      context.disablePreview = false;
      fixture.detectChanges();
      context.nzImage.getElement().nativeElement.click();
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).toBeTruthy();
    }));

    it('should nzDisablePreview work inside group', fakeAsync(() => {
      context.firstSrc = QUICK_SRC;
      context.disablePreview = true;
      fixture.detectChanges();
      const image = debugElement.nativeElement.querySelector('img');
      image.click();
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).not.toBeTruthy();
      context.disablePreview = false;
      fixture.detectChanges();
      image.click();
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).toBeTruthy();
    }));
  });

  describe('ImagePreview', () => {
    it('should rotate, zoom and close work', fakeAsync(() => {
      context.firstSrc = QUICK_SRC;
      fixture.detectChanges();
      const image = debugElement.nativeElement.querySelector('img');
      image.click();
      tickChanges();
      previewElement = getPreviewElement();
      const imageElement = getPreviewImageElement();
      const operations = overlayContainerElement.querySelectorAll('.ant-image-preview-operations-operation');
      const close = operations[0];
      const zoomIn = operations[1];
      const zoomOut = operations[2];
      const rotateRight = operations[3];
      const rotateLeft = operations[4];
      dispatchFakeEvent(rotateLeft, 'click');
      tickChanges();
      expect(imageElement!.getAttribute('style')).toContain('transform: scale3d(1, 1, 1) rotate(-90deg)');
      dispatchFakeEvent(rotateRight, 'click');
      tickChanges();
      expect(imageElement!.getAttribute('style')).toContain('transform: scale3d(1, 1, 1) rotate(0deg)');
      dispatchFakeEvent(zoomIn, 'click');
      tickChanges();
      expect(imageElement!.getAttribute('style')).toContain('transform: scale3d(2, 2, 1) rotate(0deg)');
      dispatchFakeEvent(zoomOut, 'click');
      tickChanges();
      expect(imageElement!.getAttribute('style')).toContain('transform: scale3d(1, 1, 1) rotate(0deg)');
      dispatchFakeEvent(close, 'click');
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).not.toBeTruthy();
      discardPeriodicTasks();
      flush();
    }));

    it('should container click work', fakeAsync(() => {
      context.firstSrc = QUICK_SRC;
      fixture.detectChanges();
      const image = debugElement.nativeElement.querySelector('img');
      image.click();
      tickChanges();
      const previewWrap = getPreviewWrapElement();
      previewWrap.click();
      tickChanges();
      previewElement = getPreviewElement();
      expect(previewElement).not.toBeTruthy();
      discardPeriodicTasks();
      flush();
    }));

    it('should preview group work', fakeAsync(() => {
      context.firstSrc = SRC;
      context.secondSrc = QUICK_SRC;
      fixture.detectChanges();
      const images = debugElement.nativeElement.querySelectorAll('img');
      images[0].click();
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      previewElement = getPreviewElement();
      const left = previewElement!.querySelector('.ant-image-preview-switch-left')!;
      const right = previewElement!.querySelector('.ant-image-preview-switch-right')!;
      expect(left).toBeTruthy();
      expect(right).toBeTruthy();
      expect(left.classList.contains('ant-image-preview-switch-left-disabled')).toBeTrue();
      dispatchFakeEvent(right, 'click');
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      let previewImage = getPreviewImageElement();
      expect(previewImage.getAttribute('src')).toContain(QUICK_SRC);
      expect(right.classList.contains('ant-image-preview-switch-right-disabled')).toBeTrue();
      dispatchFakeEvent(left, 'click');
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      previewImage = getPreviewImageElement();
      expect(previewImage.getAttribute('src')).toContain(SRC);
    }));
  });

  describe('Service', () => {
    it('should switchTo, next, prev work', fakeAsync(() => {
      const images = [
        {
          src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
          width: '200px',
          height: '200px',
          alt: 'ng-zorro'
        },
        {
          src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
          width: '200px',
          height: '200px',
          alt: 'angular'
        }
      ];
      context.images = images;
      context.createUsingService();
      context.previewRef?.switchTo(1);
      tickChanges();
      previewElement = getPreviewElement();
      let previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[1].src);
      context.previewRef?.next();
      fixture.detectChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[1].src);
      context.previewRef?.prev();
      fixture.detectChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[0].src);
      context.previewRef?.next();
      fixture.detectChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[1].src);

      dispatchKeyboardEvent(overlayContainerElement, 'keydown', RIGHT_ARROW);
      tickChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[1].src);
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', LEFT_ARROW);
      tickChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[0].src);
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', RIGHT_ARROW);
      tickChanges();
      previewImageElement = getPreviewImageElement();
      expect(previewImageElement.src).toContain(images[1].src);
    }));
  });

  describe('Animation', () => {
    it('should animation work', fakeAsync(() => {
      context.firstSrc = SRC;
      context.secondSrc = QUICK_SRC;
      tickChanges();
      context.nzImageGroup.images[0].getElement().nativeElement.click();
      fixture.detectChanges();
      flushMicrotasks();
      const backdropElement = getOverlayBackDropElement();
      const previewWrapElement = getPreviewWrapElement();
      expect(backdropElement.classList).toContain('ant-fade-enter');
      expect(backdropElement.classList).toContain('ant-fade-enter-active');
      tick(500);
      previewWrapElement.click();
      fixture.detectChanges();
      flushMicrotasks();
      expect(backdropElement.classList).toContain('ant-fade-leave');
      expect(backdropElement.classList).toContain('ant-fade-leave-active');
      flush();
    }));
  });

  describe('Drag', () => {
    it('should drag released work', fakeAsync(() => {
      context.images = [{ src: QUICK_SRC }];
      context.createUsingService();
      const previewInstance = context.previewRef?.previewInstance!;
      tickChanges();
      previewInstance.imagePreviewWrapper.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      expect(previewInstance.isDragging).toEqual(true);
      previewInstance.onDragReleased();
      expect(previewInstance.position).toEqual({ x: 0, y: 0 });
    }));

    it('should position calculate correct', () => {
      let params = {
        width: 200,
        height: 200,
        top: 0,
        left: 0,
        clientWidth: 1080,
        clientHeight: 768
      };
      let pos = getFitContentPosition(params);
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);

      params = {
        width: 2000,
        height: 1000,
        top: 0,
        left: 0,
        clientWidth: 1080,
        clientHeight: 768
      };
      pos = getFitContentPosition(params);
      expect(pos.x).toBeNull();
      expect(pos.y).toBeNull();

      params = {
        width: 2000,
        height: 1000,
        top: 100,
        left: 100,
        clientWidth: 1080,
        clientHeight: 768
      };
      pos = getFitContentPosition(params);
      expect(pos.x).toBe(460);
      expect(pos.y).toBe(116);

      params = {
        width: 2000,
        height: 1000,
        top: -200,
        left: -200,
        clientWidth: 1080,
        clientHeight: 768
      };
      pos = getFitContentPosition(params);
      expect(pos.x).toBeNull();
      expect(pos.y).toBeNull();

      params = {
        width: 1000,
        height: 500,
        top: -200,
        left: -200,
        clientWidth: 1080,
        clientHeight: 768
      };
      pos = getFitContentPosition(params);
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);

      params = {
        width: 1200,
        height: 600,
        top: -200,
        left: -200,
        clientWidth: 1080,
        clientHeight: 768
      };

      pos = getFitContentPosition(params);
      expect(pos.x).toBe(-60);
      expect(pos.y).toBe(-84);

      params = {
        width: 1000,
        height: 900,
        top: -200,
        left: -200,
        clientWidth: 1080,
        clientHeight: 768
      };

      pos = getFitContentPosition(params);
      expect(pos.x).toBe(-40);
      expect(pos.y).toBe(-66);
    });
  });
});

@Component({
  template: ` <img nz-image [nzSrc]="src" [nzPlaceholder]="placeholder" /> `
})
export class TestImageBasicsComponent {
  @ViewChild(NzImageDirective) nzImage!: NzImageDirective;
  src = '';
  placeholder: string | null = '';
}

@Component({
  template: ` <img nz-image [nzSrc]="src" [nzPlaceholder]="placeholder" [nzDisablePreview]="disablePreview" /> `
})
export class TestImagePlaceholderComponent {
  @ViewChild(NzImageDirective) nzImage!: NzImageDirective;
  src = '';
  placeholder = '';
  disablePreview = true;
}

@Component({
  template: ` <img nz-image [nzSrc]="src" [nzFallback]="fallback" /> `
})
export class TestImageFallbackComponent {
  @ViewChild(NzImageDirective) image!: NzImageDirective;
  src = '';
  fallback = '';
}

@Component({
  template: `
    <nz-image-group>
      <img nz-image [nzSrc]="firstSrc" [nzDisablePreview]="disablePreview" />
      <img nz-image [nzSrc]="secondSrc" [nzDisablePreview]="disablePreview" />
    </nz-image-group>
    <img nz-image [nzSrc]="firstSrc" [nzDisablePreview]="disablePreview" />
  `
})
export class TestImagePreviewGroupComponent {
  disablePreview = false;
  firstSrc = '';
  secondSrc = '';
  previewRef: NzImagePreviewRef | null = null;
  images: NzImage[] = [];

  @ViewChild(NzImageGroupComponent) nzImageGroup!: NzImageGroupComponent;
  @ViewChild(NzImageDirective) nzImage!: NzImageDirective;

  constructor(private nzImageService: NzImageService) {}

  createUsingService(): void {
    this.previewRef = this.nzImageService.preview(this.images, { nzZoom: 1.5, nzRotate: 0 });
  }
}

const TEST_COMPONENTS = [
  TestImageBasicsComponent,
  TestImageFallbackComponent,
  TestImagePlaceholderComponent,
  TestImagePreviewGroupComponent
];

@NgModule({
  imports: [NzImageModule],
  declarations: [...TEST_COMPONENTS],
  exports: [...TEST_COMPONENTS]
})
export class TestImageModule {}
