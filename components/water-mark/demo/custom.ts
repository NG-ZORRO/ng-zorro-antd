import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzColor, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FontType, NzWaterMarkModule } from 'ng-zorro-antd/water-mark';

@Component({
  selector: 'nz-demo-water-mark-custom',
  imports: [
    ReactiveFormsModule,
    NzColorPickerModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSliderModule,
    NzTypographyModule,
    NzWaterMarkModule
  ],
  template: `
    <div style="display: flex;">
      <nz-water-mark
        [nzContent]="form.value.content!"
        [nzRotate]="form.value.rotate!"
        [nzZIndex]="form.value.zIndex!"
        [nzGap]="gap"
        [nzOffset]="offset"
        [nzFont]="font"
      >
        <p nz-typography style="z-index: 10; position:relative;">
          The light-speed iteration of the digital world makes products more complex. However, human consciousness and
          attention resources are limited. Facing this design contradiction, the pursuit of natural interaction will be
          the consistent direction of Ant Design.
        </p>
        <p nz-typography style="z-index: 10; position:relative;">
          Natural user cognition: According to cognitive psychology, about 80% of external information is obtained
          through visual channels. The most important visual elements in the interface design, including layout, colors,
          illustrations, icons, etc., should fully absorb the laws of nature, thereby reducing the user&apos;s cognitive
          cost and bringing authentic and smooth feelings. In some scenarios, opportunely adding other sensory channels
          such as hearing, touch can create a richer and more natural product experience.
        </p>
        <p nz-typography style="z-index: 10; position:relative;">
          Natural user behavior: In the interaction with the system, the designer should fully understand the
          relationship between users, system roles, and task objectives, and also contextually organize system functions
          and services. At the same time, a series of methods such as behavior analysis, artificial intelligence and
          sensors could be applied to assist users to make effective decisions and reduce extra operations of users, to
          save users&apos; mental and physical resources and make human-computer interaction more natural.
        </p>
        <img
          style="z-index: 30; position:relative; width: 100%; max-width: 800px;"
          src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
          alt="示例图片"
        />
      </nz-water-mark>
      <nz-divider nzType="vertical"></nz-divider>
      <form nz-form nzLayout="vertical" [formGroup]="form">
        <nz-form-item>
          <nz-form-label>Content</nz-form-label>
          <nz-form-control>
            <input nz-input type="text" formControlName="content" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Color</nz-form-label>
          <nz-form-control>
            <nz-color-picker [nzValue]="color" (nzOnChange)="changeColor($event)"></nz-color-picker>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>FontSize</nz-form-label>
          <nz-form-control>
            <nz-slider formControlName="fontSize"></nz-slider>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>zIndex</nz-form-label>
          <nz-form-control>
            <nz-slider formControlName="zIndex"></nz-slider>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Rotate</nz-form-label>
          <nz-form-control>
            <nz-slider [nzMin]="-180" [nzMax]="180" formControlName="rotate"></nz-slider>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Gap</nz-form-label>
          <nz-form-control>
            <nz-input-number formControlName="gapX"></nz-input-number>
            <nz-input-number formControlName="gapY"></nz-input-number>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Offset</nz-form-label>
          <nz-form-control>
            <nz-input-number formControlName="offsetX"></nz-input-number>
            <nz-input-number formControlName="offsetY"></nz-input-number>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
  `,
  styles: [
    `
      nz-water-mark {
        flex: 1 1 auto;
      }

      nz-divider {
        height: auto;
        margin: 0 20px;
      }

      form {
        flex: 0 0 280px;
      }

      nz-input-number {
        margin-right: 12px;
        width: 40%;
      }
    `
  ]
})
export class NzDemoWaterMarkCustomComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    content: 'NG Ant Design',
    fontSize: 16,
    zIndex: 11,
    rotate: -22,
    gapX: 100,
    gapY: 100,
    offsetX: 50,
    offsetY: 50
  });
  color: string = 'rgba(0,0,0,.15)';
  font: FontType = {
    color: 'rgba(0,0,0,.15)',
    fontSize: 16
  };
  gap: [number, number] = [100, 100];
  offset: [number, number] = [50, 50];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(item => {
      this.font = {
        fontSize: item.fontSize,
        color: this.color
      };
      this.gap = [item.gapX!, item.gapY!];
      this.offset = [item.offsetX!, item.offsetY!];
      this.cdr.markForCheck();
    });
  }

  changeColor(value: { color: NzColor; format: string }): void {
    this.color = value.color.toRgbString();
    this.font = {
      fontSize: this.form.value.fontSize,
      color: value.color.toRgbString()
    };
    this.cdr.markForCheck();
  }
}
