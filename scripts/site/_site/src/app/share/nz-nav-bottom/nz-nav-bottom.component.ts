import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTER_LIST } from '../../router';

@Component({
  selector: 'nz-nav-bottom',
  template: `
    <section class="prev-next-nav">
      <a class="prev-page" *ngIf="index-1>=0" [routerLink]="list[index-1]?.path">
        <i nz-icon type="left" class="footer-nav-icon-before"></i>{{ list[index - 1]?.label }}<i nz-icon type="right" class="footer-nav-icon-after"></i>
      </a>
      <a class="next-page" *ngIf="index+1<list?.length" [routerLink]="list[index+1]?.path">
        <i nz-icon type="left" class="footer-nav-icon-before"></i>{{ list[index + 1]?.label }}<i nz-icon type="right" class="footer-nav-icon-after"></i>
      </a>
    </section>
  `
})
export class NzNavBottomComponent implements OnInit {
  list = [];
  index = 0;
  language = 'en';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = window.location.pathname.slice(1);
        this.language = this.router.url.split('/')[ this.router.url.split('/').length - 1 ].split('#')[ 0 ];
        const componentsList = ROUTER_LIST.components.reduce((pre, cur) => {
          return pre.concat(cur.children);
        }, []);
        this.list = [ ...ROUTER_LIST.intro.filter(item => item.language === this.language), ...componentsList.filter(item => item.language === this.language) ];
        this.index = this.list.findIndex(item => item.path === url);
      }
    });
  }
}
