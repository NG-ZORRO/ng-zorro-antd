import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-flex',
  template: `
    <nz-card style="width:240px">
      <ng-template #body>
        <div class="custom-image">
          <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
        </div>
        <div class="custom-card">
          <h3>Europe Street beat</h3>
          <p>www.instagram.com</p>
        </div>
      </ng-template>
    </nz-card>
  `,
  styles  : [
      `
      :host ::ng-deep .custom-image img {
        display: block;
      }

      :host ::ng-deep .custom-card {
        padding: 10px 16px;
      }

      :host ::ng-deep .custom-card p {
        color: #999;
      }

      :host ::ng-deep .ant-card-body {
        padding: 0;
      }`
  ]
})
export class NzDemoCardFlexComponent {
  bodyStyle = { padding: 0 };
}
