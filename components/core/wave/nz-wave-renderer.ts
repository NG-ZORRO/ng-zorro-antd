import { Platform } from '@angular/cdk/platform';
import { NgZone } from '@angular/core';

export class NzWaveRenderer {

  readonly waveTransitionDuration = 400;
  private styleForPseudo: HTMLStyleElement | null;
  private extraNode: HTMLDivElement | null;
  private lastTime = 0;

  get waveAttributeName(): string {
    return this.insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
  }

  constructor(private triggerElement: HTMLElement, private ngZone: NgZone, private insertExtraNode: boolean) {
    const platform = new Platform();
    if (platform.isBrowser) {
      this.bindTriggerEvent();
    }
  }

  onClick = (event: MouseEvent) => {
    if (
      !this.triggerElement ||
      !this.triggerElement.getAttribute ||
      this.triggerElement.getAttribute('disabled') ||
      (event.target as HTMLElement).tagName === 'INPUT' ||
      this.triggerElement.className.indexOf('disabled') >= 0) {
      return;
    }
    this.fadeOutWave();
  }

  bindTriggerEvent(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.triggerElement) {
        this.triggerElement.addEventListener('click', this.onClick, true);
      }
    });
  }

  removeTriggerEvent(): void {
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('click', this.onClick, true);
    }
  }

  removeStyleAndExtraNode(): void {
    if (this.styleForPseudo && document.body.contains(this.styleForPseudo)) {
      document.body.removeChild(this.styleForPseudo);
      this.styleForPseudo = null;
    }
    if (this.insertExtraNode && this.triggerElement.contains(this.extraNode)) {
      this.triggerElement.removeChild(this.extraNode);
    }
  }

  destroy(): void {
   this.removeTriggerEvent();
   this.removeStyleAndExtraNode();
  }

  private fadeOutWave(): void {
    const node = this.triggerElement;
    const waveColor = this.getWaveColor(node);
    node.setAttribute(this.waveAttributeName, 'true');
    if (Date.now() < this.lastTime + this.waveTransitionDuration) {
      return;
    }

    if (this.isValidColor(waveColor)) {
      if (!this.styleForPseudo) {
        this.styleForPseudo = document.createElement('style');
      }

      this.styleForPseudo.innerHTML =
        `[ant-click-animating-without-extra-node]:after { border-color: ${waveColor}; }`;
      document.body.appendChild(this.styleForPseudo);
    }

    if (this.insertExtraNode) {
      if (!this.extraNode) {
        this.extraNode = document.createElement('div');
      }
      this.extraNode.className = 'ant-click-animating-node';
      node.appendChild(this.extraNode);
    }

    this.lastTime = Date.now();

    this.runTimeoutOutsideZone(() => {
      node.removeAttribute(this.waveAttributeName);
      this.removeStyleAndExtraNode();
    }, this.waveTransitionDuration);
  }

  private isValidColor(color: string): boolean {
    return color
      && color !== '#ffffff'
      && color !== 'rgb(255, 255, 255)'
      && this.isNotGrey(color)
      && !/rgba\(\d*, \d*, \d*, 0\)/.test(color)
      && color !== 'transparent';
  }

  private isNotGrey(color: string): boolean {
    const match = color.match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
    if (match && match[ 1 ] && match[ 2 ] && match[ 3 ]) {
      return !(match[ 1 ] === match[ 2 ] && match[ 2 ] === match[ 3 ]);
    }
    return true;
  }

  private getWaveColor(node: HTMLElement): string {
    const nodeStyle = getComputedStyle(node);
    return nodeStyle.getPropertyValue('border-top-color') || // Firefox Compatible
      nodeStyle.getPropertyValue('border-color') ||
      nodeStyle.getPropertyValue('background-color');
  }

  private runTimeoutOutsideZone(fn: () => void, delay: number): void {
    this.ngZone.runOutsideAngular(() => setTimeout(fn, delay));
  }
}
