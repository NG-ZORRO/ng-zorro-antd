import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-drawer-service',
  imports: [FormsModule, NzButtonModule, NzDrawerModule, NzFormModule, NzInputModule],
  template: `
    <ng-template #drawerTemplate let-data let-drawerRef="drawerRef">
      value: {{ data?.value }}
      <br />
      <br />
      <button nz-button nzType="primary" (click)="drawerRef.close()">close</button>
    </ng-template>
    <div nz-form>
      <nz-form-item>
        <input nz-input [(ngModel)]="value" />
      </nz-form-item>
    </div>
    <button nz-button nzType="primary" (click)="openTemplate()">Use Template</button>
    &nbsp;
    <button nz-button nzType="primary" (click)="openComponent()">Use Component</button>
  `
})
export class NzDemoDrawerServiceComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';

  constructor(private drawerService: NzDrawerService) {}

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Template',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: this.drawerTemplate,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<NzDrawerCustomComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: NzDrawerCustomComponent,
      nzContentParams: {
        value: this.value
      },
      nzData: {
        value: 'Ng Zorro'
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}

@Component({
  selector: 'nz-drawer-custom-component',
  imports: [FormsModule, NzButtonModule, NzDividerModule, NzInputModule],
  template: `
    <div>
      <input nz-input [(ngModel)]="nzData.value" />
      <nz-divider />
      <button nzType="primary" (click)="close()" nz-button>Confirm</button>
    </div>
  `
})
export class NzDrawerCustomComponent {
  // @Input() value = '';
  nzData: { value: string } = inject(NZ_DRAWER_DATA);

  constructor(private drawerRef: NzDrawerRef<string>) {}

  close(): void {
    this.drawerRef.close(this.nzData);
  }
}
