import { Component } from '@angular/core';
import { NzImageLoader } from 'ng-zorro-antd/image';

export const loader: NzImageLoader = ({ src, width }) => {
  return `http://image-demo.oss-cn-hangzhou.aliyuncs.com/${encodeURIComponent(src)}?x-oss-process=image/resize,w_${width}`;
};

@Component({
  selector: 'nz-demo-image-optimization',
  template: `
    <nz-image [nzSrc]="src" nzWidth="200" nzHeight="140" [nzLoader]="loader" nzOptimize></nz-image>
  `
})
export class NzDemoImageOptimizationComponent {
  src = 'example.jpg';
  loader = loader;
}
