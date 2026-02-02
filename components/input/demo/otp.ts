import { Component } from '@angular/core';

import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-input-otp',
  template: `
    <nz-flex nzVertical [nzGap]="16">
      <nz-flex nzVertical>
        <h5 nz-typography>With Formatter (Uppercase)</h5>
        <nz-input-otp [nzFormatter]="formatter" />
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With Disabled</h5>
        <nz-input-otp [disabled]="true" />
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With Length (8)</h5>
        <nz-input-otp [nzLength]="8" />
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With custom display character</h5>
        <nz-input-otp nzMask="🔒" />
      </nz-flex>
    </nz-flex>
  `,
  imports: [NzFlexDirective, NzTypographyComponent, NzInputOtpComponent]
})
export class NzDemoInputOtpComponent {
  formatter: (value: string) => string = value => value.toUpperCase();
}
