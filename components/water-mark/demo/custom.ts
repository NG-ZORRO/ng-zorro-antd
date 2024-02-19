import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { ColorEvent } from 'ngx-color/color-wrap.component';

import { FontType } from 'ng-zorro-antd/water-mark';

@Component({
  selector: 'nz-demo-water-mark-custom',
  template: `
    <div style="display: flex;">
      <nz-water-mark
        [nzContent]="validateForm.value.content!"
        [nzRotate]="validateForm.value.rotate!"
        [nzZIndex]="validateForm.value.zIndex!"
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
      <form nz-form nzLayout="vertical" [formGroup]="validateForm">
        <nz-form-item>
          <nz-form-label>Content</nz-form-label>
          <nz-form-control>
            <input nz-input type="text" formControlName="content" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Color</nz-form-label>
          <nz-form-control>
            <div
              class="theme-pick-wrap"
              nz-popover
              [nzPopoverTrigger]="'click'"
              nzPopoverOverlayClassName="theme-color-content"
              [nzPopoverContent]="colorTpl"
            >
              <div class="theme-pick" [ngStyle]="{ background: color }"></div>
            </div>
            <ng-template #colorTpl>
              <color-sketch [color]="color" (onChangeComplete)="changeColor($event)"></color-sketch>
            </ng-template>
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

      .theme-pick-wrap {
        padding: 4px;
        background: rgb(255, 255, 255);
        border-radius: 2px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px;
        display: inline-block;
        cursor: pointer;
      }

      .theme-pick {
        width: 80px;
        height: 16px;
        border-radius: 2px;
      }
    `
  ]
})
export class NzDemoWaterMarkCustomComponent implements OnInit {
  validateForm: FormGroup<{
    content: FormControl<string>;
    fontSize: FormControl<number>;
    zIndex: FormControl<number>;
    rotate: FormControl<number>;
    gapX: FormControl<number>;
    gapY: FormControl<number>;
    offsetX: FormControl<number>;
    offsetY: FormControl<number>;
  }>;
  color: string = 'rgba(0,0,0,.15)';
  font: FontType = {
    color: 'rgba(0,0,0,.15)',
    fontSize: 16
  };
  gap: [number, number] = [100, 100];
  offset: [number, number] = [50, 50];

  constructor(
    private fb: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.validateForm = this.fb.group({
      content: ['NG Ant Design'],
      fontSize: [16],
      zIndex: [11],
      rotate: [-22],
      gapX: [100],
      gapY: [100],
      offsetX: [50],
      offsetY: [50]
    });
  }

  ngOnInit(): void {
    this.validateForm.valueChanges.subscribe(item => {
      this.font = {
        fontSize: item.fontSize,
        color: this.color
      };
      this.gap = [item.gapX!, item.gapY!];
      this.offset = [item.offsetX!, item.offsetY!];
      this.cdr.markForCheck();
    });
  }

  changeColor(value: ColorEvent): void {
    this.color = value.color.hex;
    this.font = {
      fontSize: this.validateForm.controls.fontSize.value,
      color: value.color.hex
    };
    this.cdr.markForCheck();
  }
}
