import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ROUTER_LIST } from './router';

@Component({
  selector     : 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './app.component.html',
  styleUrls    : [
    './style/index.less',
  ]
})
export class AppComponent implements OnInit {
  routerList = ROUTER_LIST;
  componentList = [];
  searchComponent = null;

  constructor(private router: Router, private title: Title) {

  }

  navigateTo(url) {
    if (url) {
      console.log(url);
      this.router.navigateByUrl(url);
    }
  }

  ngOnInit() {
    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([ ...group.children ])
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentDemoComponent = this.componentList.find(component => `/${component.path}` === this.router.url);
        if (currentDemoComponent) {
          this.title.setTitle(`${currentDemoComponent.zh} ${currentDemoComponent.label} - NG-ZORRO`)
        }
        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          this.title.setTitle(`${currentIntroComponent.label} - NG-ZORRO`)
        }
        if (this.router.url !== '/' + this.searchComponent) {
          this.searchComponent = null;
        }
        window.scrollTo(0, 0);
      }
    });
  }

}
