import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PickerComponent } from './components/picker.component';
import { Color } from './interfaces/color';
import { HsbaColorType } from './interfaces/type';
import { NgAntdColorPickerComponent } from './ng-antd-color-picker.component';

describe('NgxColorPickerComponent', () => {
  let component: NzxTestColorPickerComponent;
  let fixture: ComponentFixture<NzxTestColorPickerComponent>;
  let resultEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NzxTestColorPickerComponent],
      imports: [NgAntdColorPickerComponent, PickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzxTestColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    resultEl = fixture.debugElement.query(By.directive(NgAntdColorPickerComponent));

    // karma 无法读取class样式， 添加默认样式
    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-select').style.width = '258px';
    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-select').style.height = '160px';

    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-hue').style.width = '222px';
    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-hue').style.height = '8px';

    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-alpha').style.width = '222px';
    fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-alpha').style.height = '8px';

    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[0].firstChild.style.width = '16px';
    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[0].firstChild.style.height =
      '16px';
    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[1].firstChild.style.width = '16px';
    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[1].firstChild.style.height =
      '16px';
    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[2].firstChild.style.width = '16px';
    fixture.debugElement.nativeElement.querySelectorAll('.ant-color-picker-palette')[2].firstChild.style.height =
      '16px';
  });

  it('color-picker basic', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(22, 119, 255)'
    );
  });

  it('color-picker defaultValue', () => {
    component.defaultValue = '#ff6600';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-picker disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-panel').classList).toContain(
      'ant-color-picker-panel-disabled'
    );
  });

  it('color-picker disabledAlpha', () => {
    component.disabledAlpha = true;
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-slider-group').classList).toContain(
      'ant-color-picker-slider-group-disabled-alpha'
    );
  });

  it('color-picker input color', () => {
    component.value = '#ff6600';
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement.querySelector('.ant-color-picker-palette');
    expect(dom.firstChild.style.top).toBe('-8px');
    expect(dom.firstChild.style.left).toBe('250px');
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-picker slide select', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('.ant-color-picker-select');
    const { x, y } = {
      x: element.offsetLeft + 258,
      y: element.offsetTop - 8
    };
    const event = new MouseEvent('mousedown', { clientX: x, clientY: y });
    const event1 = new MouseEvent('mouseup');
    element.dispatchEvent(event);
    element.dispatchEvent(event1);
    const dom = fixture.debugElement.nativeElement.querySelector('.ant-color-picker-palette');
    expect(dom.firstChild.style.top).toBe('-8px');
    expect(dom.firstChild.style.left).toBe('250px');
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(0, 106, 255)'
    );
    expect(component.changeColor?.toRgbString()).toBe('rgb(0, 106, 255)');
    expect(component.complete).toBe(null);
  });

  it('color-picker slide hue', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-hue');
    const { x, y } = {
      x: element.offsetLeft + 230,
      y: element.offsetTop + 4
    };
    const event = new MouseEvent('mousedown', { clientX: x, clientY: y });
    const closeEvent = new MouseEvent('mouseup');
    element.dispatchEvent(event);
    element.dispatchEvent(closeEvent);
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 22, 22)'
    );
    expect(component.changeColor?.toRgbString()).toBe('rgb(255, 22, 22)');
    expect(component.complete).toBe('hue');
  });

  it('color-picker slide alpha', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('.ant-color-picker-slider-alpha');
    const { x, y } = {
      x: element.offsetLeft - 6,
      y: element.offsetTop + 4
    };
    const event = new MouseEvent('mousedown', { clientX: x, clientY: y });
    const closeEvent = new MouseEvent('mouseup');
    element.dispatchEvent(event);
    element.dispatchEvent(closeEvent);
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgba(22, 119, 255, 0)'
    );
    expect(component.changeColor?.toRgbString()).toBe('rgba(22, 119, 255, 0)');
    expect(component.complete).toBe('alpha');
  });

  it('color-picker ngTemplateOutlet', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-header').innerText).toBe('Color Picker Header');
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-footer').innerText).toBe('Color Picker Footer');
  });
});

@Component({
  template: `
    <ng-antd-color-picker
      [value]="value"
      [defaultValue]="defaultValue"
      [disabled]="disabled"
      [disabledAlpha]="disabledAlpha"
      [panelRenderHeader]="title"
      [panelRenderFooter]="footer"
      (nzOnChange)="onChange($event)"
      (nzOnChangeComplete)="onChangeComplete($event)"
    ></ng-antd-color-picker>
    <ng-template #title>
      <div class="ant-color-picker-header">Color Picker Header</div>
    </ng-template>
    <ng-template #footer>
      <div class="ant-color-picker-footer">Color Picker Footer</div>
    </ng-template>
  `
})
export class NzxTestColorPickerComponent {
  value = '';
  defaultValue = '';
  disabled = false;
  disabledAlpha = false;

  changeColor: Color | null = null;
  complete: HsbaColorType | null = null;

  onChange(value: { color: Color; type?: HsbaColorType }): void {
    this.changeColor = value.color;
    this.complete = value?.type || null;
  }

  onChangeComplete(value: HsbaColorType): void {
    this.complete = value;
  }
}
