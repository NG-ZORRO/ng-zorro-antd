import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector     : 'nz-demo-popover-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-popover [nzTitle]="'Title'">
      <button nz-button [nzType]="'primary'" nz-popover>Hover me</button>
      <ng-template #nzTemplate>
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      </ng-template>
    </nz-popover>
  `,
  styles       : [
      `
      p {
        margin: 0;
      }
    `
  ]
})
export class NzDemoPopoverBasicComponent {
}
