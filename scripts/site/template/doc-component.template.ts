import { Component } from '@angular/core';
import { ShareModule } from '../share/share.module';

@Component({
  selector     : 'nz-doc-{{component}}-{{language}}',
  imports      : [ShareModule],
  templateUrl  : './{{component}}-{{language}}.html'
})
export default class NzDoc{{componentName}}Component {
  goLink(link: string): void {
    if (window) {
      window.location.hash = link;
    }
  }
}
