/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';

import { ImageConfig, NzConfigService } from 'ng-zorro-antd/core/config';

import { NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import { NzImagePreviewComponent } from './image-preview.component';
import { NzImageScaleStep, NzImageUrl } from './image.directive';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface NzImageService {
  preview(images: NzImage[], option?: NzImagePreviewOptions): NzImagePreviewRef;
}

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class NzImageService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private nzConfigService = inject(NzConfigService);
  private directionality = inject(Directionality);

  preview(
    images: NzImage[],
    options?: NzImagePreviewOptions,
    zoomMap?: Map<NzImageUrl, NzImageScaleStep>
  ): NzImagePreviewRef {
    return this.display(images, options, zoomMap);
  }

  private display(
    images: NzImage[],
    config?: NzImagePreviewOptions,
    scaleStepMap?: Map<NzImageUrl, NzImageScaleStep>
  ): NzImagePreviewRef {
    const configMerged = { ...new NzImagePreviewOptions(), ...(config ?? {}) };
    const overlayRef = this.createOverlay(configMerged);
    const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
    previewComponent.setImages(images, scaleStepMap);
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
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: config.nzCloseOnNavigation ?? globalConfig.nzCloseOnNavigation ?? true,
      direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
    });

    return this.overlay.create(overLayConfig);
  }
}
