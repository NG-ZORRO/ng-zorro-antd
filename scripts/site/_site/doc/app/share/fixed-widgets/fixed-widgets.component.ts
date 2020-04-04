import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fixed-widgets',
  template: `
    <div class="fixed-widgets"
         nz-tooltip
         [nzTooltipTitle]="theme === 'dark' ?
         (language === 'zh' ? '切换浅色模式' : 'Switch default mode') :
         (language === 'zh' ? '切换暗黑模式' : 'Switch dark mode') ">
      <div class="ant-avatar ant-avatar-circle ant-avatar-icon fixed-widgets-avatar"
           style="width: 44px; height: 44px; line-height: 44px; font-size: 22px;"
           [class.fixed-widgets-avatar-dark]="theme === 'dark'"
           [class.fixed-widgets-avatar-default]="theme === 'default'"
      >
        <theme-default-icon *ngIf="theme === 'default'"></theme-default-icon>
        <theme-dark-icon *ngIf="theme === 'dark'"></theme-dark-icon>
      </div>
    </div>
  `,
  host: {
    '(click)': 'onClick()'
  }
})
export class FixedWidgetsComponent {

  @Input() theme: string = 'default';
  @Input() language: string = 'zh'
  @Output() themeChange = new EventEmitter<string>()

  onClick(): void {
    this.themeChange.emit(this.theme === 'dark' ? 'default' : 'dark')
  }
}
