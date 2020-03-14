import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'div[app-footer-col]',
  template: `
    <h2>
      <span *ngIf="imgSrc" class="rc-footer-column-icon">
      <img [src]="imgSrc" [attr.alt]="imgAlt">
    </span>
      {{title}}
    </h2>
    <ng-content></ng-content>
  `,
  host: {
    class: 'rc-footer-column'
  }
})
export class FooterColComponent implements OnInit {

  @Input() title: string;
  @Input() imgSrc: string;
  @Input() imgAlt: string;
  constructor() { }

  ngOnInit(): void {
  }

}
