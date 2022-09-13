import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [href]="link" target="_blank" rel="noopener">
      <span *ngIf="icon || imgSrc" class="rc-footer-item-icon">
        <span *ngIf="icon" nz-icon [nzType]="icon"></span>
        <img *ngIf="imgSrc" [src]="imgSrc" [attr.alt]="imgAlt" />
      </span>
      {{ title }}
      <ng-content></ng-content>
    </a>
    <ng-container *ngIf="description">
      <span class="rc-footer-item-separator">-</span>
      <span class="rc-footer-item-description">{{ description }}</span>
    </ng-container>
  `,
  host: {
    class: 'rc-footer-item'
  },
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class FooterItemComponent implements OnInit {
  @Input() imgSrc!: string;
  @Input() imgAlt!: string;
  @Input() icon!: string;
  @Input() link!: string;
  @Input() title!: string;
  @Input() description!: string;

  constructor() {}

  ngOnInit(): void {}
}
