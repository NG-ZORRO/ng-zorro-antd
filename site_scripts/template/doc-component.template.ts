import { Component } from '@angular/core';

@Component({
  selector     : 'nz-doc-{{component}}-{{language}}',
  templateUrl  : './{{component}}-{{language}}.html',
  preserveWhitespaces: false
})
export class NzDoc{{componentName}}Component {
  goLink(link: string) {
    window.location.hash = link;
  }
}
