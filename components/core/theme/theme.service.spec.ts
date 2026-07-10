/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CSP_NONCE } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { nzCompactAlgorithm } from './algorithms/compact';
import { nzDarkAlgorithm } from './algorithms/dark';
import { provideNzTheme } from './provide-theme';
import { NzThemeService } from './theme.service';

function themeStyleElement(): HTMLStyleElement | null {
  return document.head.querySelector<HTMLStyleElement>('style[nz-theme]');
}

describe('NzThemeService', () => {
  afterEach(() => {
    document.head.querySelectorAll('style[nz-theme]').forEach(element => element.remove());
    TestBed.resetTestingModule();
  });

  it('should write the CSS variables synchronously on creation (SSR requirement)', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme()] });
    TestBed.inject(NzThemeService);

    const style = themeStyleElement();
    expect(style).toBeTruthy();
    const css = style!.textContent!;
    expect(css).toContain(':root{');
    expect(css).toContain('--ant-color-primary:#1890ff;');
    expect(css).toContain('--ant-color-primary-hover:#40a9ff;');
    expect(css).toContain('--ant-control-height:32px;');
    expect(css).toContain('--ant-line-height:1.5715;');
    expect(css).toContain('--ant-button-padding-block:4px;');
    expect(css).toContain('--ant-button-padding-inline:15px;');
    expect(css).toContain('--ant-input-padding-block:4px;');
    expect(css).toContain('--ant-input-padding-inline:11px;');
    expect(css).toContain('--ant-date-picker-padding-block-start:4px;'); // kebab-cased component namespace
    expect(css).toContain('--ant-select-multiple-item-height:24px;');
    expect(css).toContain('--ant-font-height:22px;'); // derived alias value
    expect(css).toContain('--ant-float-button-body-size:32px;'); // global-size derived namespace
    expect(css).toContain('--ant-tabs-card-horizontal-padding:8px 16px;');
    expect(css).toContain('--ant-table-expand-icon-scale:0.94117647;'); // unitless
  });

  it('should emit the legacy bridge variables of the css-variable theme', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme()] });
    TestBed.inject(NzThemeService);

    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--ant-primary-color:#1890ff;');
    expect(css).toContain('--ant-primary-color-hover:#40a9ff;');
    expect(css).toContain('--ant-primary-5:#40a9ff;');
    expect(css).toContain('--ant-error-color:#ff4d4f;');
  });

  it('should apply seed token overrides', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme({ token: { colorPrimary: '#00b96b' } })] });
    TestBed.inject(NzThemeService);

    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--ant-color-primary:#00b96b;');
    expect(css).toContain('--ant-primary-color:#00b96b;');
  });

  it('should apply alias token and component token overrides', () => {
    TestBed.configureTestingModule({
      providers: [
        provideNzTheme({
          token: { colorTextDisabled: 'rgba(0, 0, 0, 0.5)' },
          components: { button: { paddingBlock: 8 } }
        })
      ]
    });
    TestBed.inject(NzThemeService);

    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--ant-color-text-disabled:rgba(0, 0, 0, 0.5);');
    expect(css).toContain('--ant-button-disabled-color:rgba(0, 0, 0, 0.5);');
    expect(css).toContain('--ant-button-padding-block:8px;');
  });

  it('should apply algorithms', () => {
    TestBed.configureTestingModule({
      providers: [provideNzTheme({ algorithm: [nzDarkAlgorithm, nzCompactAlgorithm] })]
    });
    TestBed.inject(NzThemeService);

    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--ant-color-primary:#177ddc;');
    expect(css).toContain('--ant-color-bg-container:#141414;');
    expect(css).toContain('--ant-control-height:28px;');
    expect(css).toContain('--ant-button-padding-block:3px;');
    // The legacy bridge follows the algorithm: dark-mixed palette steps.
    expect(css).toContain('--ant-primary-1:#111d2c;');
    expect(css).toContain('--ant-primary-5:#1765ad;');
    expect(css).toContain('--ant-primary-color-deprecated-bg:#111d2c;');
    expect(css).toContain('--ant-color-error:#a61d24;'); // dark @red-5
    expect(css).toContain('--ant-error-color:#a61d24;');
  });

  it('should support the factory overload', () => {
    TestBed.configureTestingModule({
      providers: [provideNzTheme(() => ({ token: { colorPrimary: '#f5222d' } }))]
    });
    TestBed.inject(NzThemeService);

    expect(themeStyleElement()!.textContent).toContain('--ant-color-primary:#f5222d;');
  });

  it('should update the style element on setTheme/updateTheme/setAlgorithm', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme()] });
    const service = TestBed.inject(NzThemeService);

    service.setTheme({ token: { colorPrimary: '#00b96b' } });
    TestBed.tick();
    expect(themeStyleElement()!.textContent).toContain('--ant-color-primary:#00b96b;');

    service.updateTheme({ token: { colorError: '#a61d24' } });
    TestBed.tick();
    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--ant-color-primary:#00b96b;'); // merged, not replaced
    expect(css).toContain('--ant-color-error:#a61d24;');

    service.setAlgorithm(nzCompactAlgorithm);
    TestBed.tick();
    expect(themeStyleElement()!.textContent).toContain('--ant-control-height:28px;');
  });

  it('should expose resolved tokens as signals', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme({ algorithm: nzDarkAlgorithm })] });
    const service = TestBed.inject(NzThemeService);

    expect(service.seedToken().colorPrimary).toBe('#1890ff');
    expect(service.mapToken().colorPrimary).toBe('#177ddc');
    expect(service.token().colorLink).toBe('#177ddc');
    expect(service.componentTokens().button.defaultColor).toBe('rgba(255, 255, 255, 0.85)');
  });

  it('should respect a custom css variable prefix', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme({ cssVarPrefix: 'nz' })] });
    TestBed.inject(NzThemeService);

    const css = themeStyleElement()!.textContent!;
    expect(css).toContain('--nz-color-primary:#1890ff;');
    expect(css).toContain('--nz-button-padding-block:4px;');
    expect(css).not.toContain('--ant-color-primary:');
  });

  it('should apply the CSP nonce to the style element', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: CSP_NONCE, useValue: 'test-nonce' }, provideNzTheme()]
    });
    TestBed.inject(NzThemeService);

    expect(themeStyleElement()!.nonce).toBe('test-nonce');
  });

  it('should reuse the existing style element instead of appending a second one', () => {
    TestBed.configureTestingModule({ providers: [provideNzTheme()] });
    const service = TestBed.inject(NzThemeService);
    service.setTheme({ token: { colorPrimary: '#00b96b' } });
    TestBed.tick();

    expect(document.head.querySelectorAll('style[nz-theme]').length).toBe(1);
  });
});
