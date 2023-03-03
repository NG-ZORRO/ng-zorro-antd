import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'nz-demo-water-mark-custom',
  template: `
    <div style="display: flex;">
      <nz-water-mark
        [nzContent]="content"
        [nzRotate]="rotate"
        [nzZIndex]="zIndex"
        [nzGap]="gap"
        [nzOffset]="offset"
        [nzFont]="font"
      >
        <p nz-typography>
          The light-speed iteration of the digital world makes products more complex. However, human consciousness and
          attention resources are limited. Facing this design contradiction, the pursuit of natural interaction will be
          the consistent direction of Ant Design.
        </p>
        <p nz-typography>
          Natural user cognition: According to cognitive psychology, about 80% of external information is obtained
          through visual channels. The most important visual elements in the interface design, including layout, colors,
          illustrations, icons, etc., should fully absorb the laws of nature, thereby reducing the user&apos;s cognitive
          cost and bringing authentic and smooth feelings. In some scenarios, opportunely adding other sensory channels
          such as hearing, touch can create a richer and more natural product experience.
        </p>
        <p nz-typography>
          Natural user behavior: In the interaction with the system, the designer should fully understand the
          relationship between users, system roles, and task objectives, and also contextually organize system functions
          and services. At the same time, a series of methods such as behavior analysis, artificial intelligence and
          sensors could be applied to assist users to make effective decisions and reduce extra operations of users, to
          save users&apos; mental and physical resources and make human-computer interaction more natural.
        </p>
        <img
          style="z-index: 10; position:relative; width: 100%; max-width: 800"
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
            <input nz-input type="text" formControlName="color" />
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
  validateForm!: UntypedFormGroup;
  content: string = 'NG Ant Design';
  font = {
    color: '#e6e6e6',
    fontSize: 16
  };
  zIndex: number = 11;
  rotate: number = -22;
  gap: [number, number] = [100, 100];
  offset!: [number, number];

  constructor(private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      content: ['NG Ant Design'],
      color: ['#e6e6e6'],
      fontSize: [16],
      zIndex: [11],
      rotate: [-22],
      gapX: [100],
      gapY: [100],
      offsetX: [],
      offsetY: []
    });

    this.validateForm.valueChanges.subscribe(item => {
      this.content = item.content;
      this.font = {
        color: item.color,
        fontSize: item.fontSize
      };
      this.zIndex = item.zIndex;
      this.rotate = item.rotate;
      this.gap = [item.gapX, item.gapY];
      this.offset = [item.offsetX, item.offsetY];
      this.cdr.markForCheck();
    });
  }
}
