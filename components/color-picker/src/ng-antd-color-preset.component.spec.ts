/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NgAntdColorPresetComponent } from './ng-antd-color-preset.component';

describe('ng-antd-color-preset', () => {
  let fixture: ComponentFixture<NgAntdColorPresetComponent>;
  let component: NgAntdColorPresetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });

    fixture = TestBed.createComponent(NgAntdColorPresetComponent);
    component = fixture.componentInstance;
  });

  it('should render collapse panels and colors according to presets', () => {
    component.presets = [
      {
        label: 'Recent',
        colors: ['#ff0000', '#00ff00'],
        defaultOpen: true
      },
      {
        label: 'Favorites',
        colors: ['#0000ff'],
        defaultOpen: false
      }
    ];
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const items = host.querySelectorAll('.ant-collapse-item');
    expect(items.length).toBe(2);

    const colors = host.querySelectorAll('.ant-color-picker-color-block');
    expect(colors.length).toBe(3);

    const headers = host.querySelectorAll('.ant-collapse-header');
    expect(headers[0]?.textContent).toContain('Recent');
    expect(headers[1]?.textContent).toContain('Favorites');
  });

  it('should respect defaultOpen state', () => {
    component.presets = [
      {
        label: 'Recent',
        colors: ['#ff0000', '#00ff00'],
        defaultOpen: true
      },
      {
        label: 'Favorites',
        colors: ['#0000ff'],
        defaultOpen: false
      }
    ];
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const items = host.querySelectorAll('.ant-collapse-item');
    const first = items[0] as HTMLElement;
    const second = items[1] as HTMLElement;

    expect(first.classList.contains('ant-collapse-item-active')).toBe(true);

    expect(second.classList.contains('ant-collapse-item-active')).toBe(false);
  });

  it('should toggle panel active state when header clicked', async () => {
    component.presets = [
      {
        label: 'Recent',
        colors: ['#ff0000', '#00ff00'],
        defaultOpen: true
      },
      {
        label: 'Favorites',
        colors: ['#0000ff'],
        defaultOpen: false
      }
    ];
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const items = host.querySelectorAll('.ant-collapse-item');
    const second = items[1] as HTMLElement;

    const header = second.querySelector('.ant-collapse-header') as HTMLElement;
    dispatchMouseEvent(header, 'click');
    fixture.detectChanges();

    expect(second.classList.contains('ant-collapse-item-active')).toBe(true);
  });

  it('should emit presetSelect with NzColor when a color is clicked', () => {
    component.presets = [
      {
        label: 'Recent',
        colors: ['#ff0000', '#00ff00'],
        defaultOpen: true
      },
      {
        label: 'Favorites',
        colors: ['#0000ff'],
        defaultOpen: false
      }
    ];
    fixture.detectChanges();

    let emitted: NzSafeAny = null;
    const sub = component.presetSelect.subscribe(v => (emitted = v));

    const host = fixture.nativeElement as HTMLElement;
    const firstColor = host.querySelector('.ant-color-picker-color-block') as HTMLElement;
    dispatchMouseEvent(firstColor, 'click');
    fixture.detectChanges();

    expect(emitted).toBeTruthy();
    expect(typeof emitted.toRgbString).toBe('function');
    expect(emitted.toRgbString()).toBe('rgb(255, 0, 0)');

    sub.unsubscribe();
  });

  it('should add checked class to the selected preset color', () => {
    component.presets = [
      {
        label: 'Recent',
        colors: ['#ff0000', '#00ff00'],
        defaultOpen: true
      }
    ];
    // Select second color '#00ff00'
    component.value = '#00ff00' as NzSafeAny;
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const blocks = host.querySelectorAll('.ant-color-picker-color-block');
    expect(blocks.length).toBe(2);

    const checked = host.querySelectorAll('.ant-color-picker-presets-color-checked');
    expect(checked.length).toBe(1);
    // The second block should be checked
    expect(blocks[1].classList.contains('ant-color-picker-presets-color-checked')).toBe(true);
  });

  it('should add bright class for bright preset colors (e.g., white)', () => {
    component.presets = [
      {
        label: 'Bright',
        colors: ['#ffffff'],
        defaultOpen: true
      },
      {
        label: 'Dark',
        colors: ['#000000'],
        defaultOpen: true
      }
    ];
    // Select white to also trigger checked
    component.value = '#ffffff' as NzSafeAny;
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const blocks = host.querySelectorAll('.ant-color-picker-color-block');
    expect(blocks.length).toBe(2);

    const first = blocks[0] as HTMLElement; // white
    expect(first.classList.contains('ant-color-picker-presets-color-bright')).toBe(true);
    expect(first.classList.contains('ant-color-picker-presets-color-checked')).toBe(true);

    const second = blocks[1] as HTMLElement; // black
    expect(second.classList.contains('ant-color-picker-presets-color-bright')).toBe(false);
  });

  it('should render base presets color class on each color block', () => {
    component.presets = [{ label: 'Group', colors: ['#111111', '#222222', '#333333'], defaultOpen: true }];
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const blocks = host.querySelectorAll('.ant-color-picker-color-block');
    expect(blocks.length).toBe(3);
    blocks.forEach(block => {
      expect(block.classList.contains('ant-color-picker-presets-color')).toBe(true);
    });
  });
});
