import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-sanitizer',
  template: `
    <div [innerHTML]="htmlSnippet | nzSanitizer: 'html'"></div>
    <div [innerHTML]="scriptSnippet | nzSanitizer: 'script'"></div>
    <div [style]="styleSnippet | nzSanitizer: 'style'">我不会报警</div>
    <hr />
    <div><img [src]="urlSnippet | nzSanitizer: 'url'" /></div>
    <hr />
    <div>
      <iframe [src]="resourceUrlSnippet | nzSanitizer: 'resourceUrl'"></iframe>
    </div>
  `
})
export class NzDemoPipesSanitizerComponent {
  htmlSnippet: string = '<p>hello world</p>';
  scriptSnippet: string = '<script>function testScript(){alert("我不会报错！")}</script>';
  styleSnippet: string = "{'height': '20px'}";
  urlSnippet: string = 'https://ng.ant.design/assets/img/logo.svg';
  resourceUrlSnippet: string = 'https://ng.ant.design/docs/introduce/zh';
}
