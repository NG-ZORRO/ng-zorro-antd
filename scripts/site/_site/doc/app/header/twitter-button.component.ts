import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-twitter-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="twitter-btn" target="_blank" [href]="twitterLink" rel="noopener" aria-hidden="true">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 512 462.799"
        >
          <path
            fill-rule="nonzero"
            d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
          />
        </svg>
      </span>
    </a>
  `,
  styles: [
    `
      .twitter-btn {
        cursor: pointer;
      }
      svg {
        width: 18px;
        height: 18px;
        margin-top: 4px;
      }
    `
  ]
})
export class TwitterButtonComponent {
  twitterLink = `https://twitter.com/ng_zorro`;
}
