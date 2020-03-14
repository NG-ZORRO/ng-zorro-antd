import { Component } from "@angular/core";

@Component({
  selector: 'theme-default-icon',
  template: `
    <svg width="21" height="21" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <circle fill="#222" cx="10.5" cy="10.5" r="10.5"></circle>
        <path
          d="M13.396 11c0-3.019-1.832-5.584-4.394-6.566A6.427 6.427 0 0111.304 4C15.002 4 18 7.135 18 11c0 3.866-2.998 7-6.698 7A6.42 6.42 0 019 17.566c2.564-.98 4.396-3.545 4.396-6.566z"
          fill="#FFF"
          fill-rule="nonzero">
        </path>
      </g>
    </svg>
  `,
  host: {
    class: 'anticon',
    role: 'img'
  }
})
export class DefaultIcon {
}

@Component({
  selector: 'theme-dark-icon',
  template: `
    <svg width="21" height="21" viewBox="0 0 21 21">
      <g fill="none" fill-rule="evenodd">
        <path
          fill="#222"
          fill-rule="nonzero"
          d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z">
        </path>
        <circle stroke="#FFF" stroke-width="1.5" cx="10.5" cy="10.5" r="4"></circle>
      </g>
    </svg>
  `,
  host: {
    class: 'anticon',
    role: 'img'
  }
})
export class DarkIcon {
}
