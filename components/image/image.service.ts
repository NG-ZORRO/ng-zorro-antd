/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional } from '@angular/core';

import { ImageConfig, NzConfigService } from 'ng-zorro-antd/core/config';

import { IMAGE_PREVIEW_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import { NzImagePreviewComponent } from './image-preview.component';

export interface NzImageService {
  preview(images: NzImage[], option?: NzImagePreviewOptions): NzImagePreviewRef;
}

@Injectable()
export class NzImageService {
  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private nzConfigService: NzConfigService,
    @Optional() private directionality: Directionality
  ) {}

  preview(images: NzImage[], options?: NzImagePreviewOptions): NzImagePreviewRef {
    return this.display(images, options);
  }

  private display(images: NzImage[], config?: NzImagePreviewOptions): NzImagePreviewRef {
    const configMerged = { ...new NzImagePreviewOptions(), ...(config ?? {}) };
    const overlayRef = this.createOverlay(configMerged);
    const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
    previewComponent.setImages(images);
    const previewRef = new NzImagePreviewRef(previewComponent, configMerged, overlayRef);

    previewComponent.previewRef = previewRef;
    return previewRef;
  }

  private attachPreviewComponent(overlayRef: OverlayRef, config: NzImagePreviewOptions): NzImagePreviewComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: NzImagePreviewOptions, useValue: config }
      ]
    });

    const containerPortal = new ComponentPortal(NzImagePreviewComponent, null, injector);
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(config: NzImagePreviewOptions): OverlayRef {
    const globalConfig = (this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) as ImageConfig) || {};
    const overLayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: config.nzCloseOnNavigation ?? globalConfig.nzCloseOnNavigation ?? true,
      backdropClass: IMAGE_PREVIEW_MASK_CLASS_NAME,
      direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
    });

    return this.overlay.create(overLayConfig);
  }
}
