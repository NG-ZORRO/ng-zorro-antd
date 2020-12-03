/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzImageGroupComponent } from './image-group.component';
import { NzImageService } from './image.service';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'image';

export type ImageStatusType = 'error' | 'loading' | 'normal';

@Directive({
  selector: 'img[nz-image]',
  exportAs: 'nzImage',
  host: {
    '(click)': 'onPreview()'
  }
})
export class NzImageDirective implements OnInit, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzDisablePreview: BooleanInput;

  @Input() nzSrc = '';
  @Input() @InputBoolean() @WithConfig() nzDisablePreview: boolean = false;
  @Input() nzFallback: string | null = null;
  @Input() nzPlaceholder: string | null = null;

  backLoadImage!: HTMLImageElement;
  private status: ImageStatusType = 'normal';

  get previewable(): boolean {
    return !this.nzDisablePreview && this.status !== 'error';
  }

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private nzImageService: NzImageService,
    @Optional() private parentGroup: NzImageGroupComponent
  ) {}

  ngOnInit(): void {
    this.backLoad();
    if (this.parentGroup) {
      this.parentGroup.addImage(this);
    }
  }

  onPreview(): void {
    if (!this.previewable) {
      return;
    }

    if (this.parentGroup) {
      // preview inside image group
      const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
      const previewImages = previewAbleImages.map(e => ({ src: e.nzSrc }));
      const previewIndex = previewAbleImages.findIndex(el => this === el);
      const previewRef = this.nzImageService.preview(previewImages);
      previewRef.switchTo(previewIndex);
    } else {
      // preview not inside image group
      const previewImages = [{ src: this.nzSrc }];
      this.nzImageService.preview(previewImages);
    }
  }

  getElement(): ElementRef<HTMLImageElement> {
    return this.elementRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSrc } = changes;
    if (nzSrc) {
      this.getElement().nativeElement.src = nzSrc.currentValue;
      this.backLoad();
    }
  }

  /**
   * use internal Image object handle fallback & placeholder
   * @private
   */
  private backLoad(): void {
    this.backLoadImage = new Image();
    this.backLoadImage.src = this.nzSrc;
    this.status = 'loading';

    if (this.backLoadImage.complete) {
      this.status = 'normal';
      this.getElement().nativeElement.src = this.nzSrc;
    } else {
      if (this.nzPlaceholder) {
        this.getElement().nativeElement.src = this.nzPlaceholder;
      } else {
        this.getElement().nativeElement.src = this.nzSrc;
      }

      this.backLoadImage.onload = () => {
        this.status = 'normal';
        this.getElement().nativeElement.src = this.nzSrc;
      };

      this.backLoadImage.onerror = () => {
        this.status = 'error';
        if (this.nzFallback) {
          this.getElement().nativeElement.src = this.nzFallback;
        }
      };
    }
  }
}
