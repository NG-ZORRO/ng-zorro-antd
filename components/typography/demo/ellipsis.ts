import { Component } from '@angular/core';

import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-typography-ellipsis',
  imports: [NzTypographyModule],
  template: `
    <p
      nz-typography
      nzEllipsis
      nzCopyable
      nzContent="Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
      Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design"
    ></p>
    <br />
    <p nz-typography nzEllipsis>
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by
      Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design
    </p>
    <br />
    <p nz-typography nzEllipsis nzExpandable [nzEllipsisRows]="3">
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
      applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by
      Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a
      design language for background applications, is refined by Ant UED Team.
    </p>
    <br />
    <p
      nz-typography
      nzEllipsis
      nzEditable
      [nzEllipsisRows]="2"
      [nzContent]="dynamicContent"
      (nzContentChange)="onChange($event)"
    ></p>
  `
})
export class NzDemoTypographyEllipsisComponent {
  dynamicContent =
    'Ant Design, a design language for background applications, is refined by Ant UED Team. ' +
    'Ant Design, a design language for background applications, is refined by Ant UED Team. ' +
    'Ant Design, a design language for background applications, is refined by Ant UED Team. ' +
    'Ant Design, a design language for background applications, is refined by Ant UED Team.';

  onChange(event: string): void {
    this.dynamicContent = event;
  }
}
