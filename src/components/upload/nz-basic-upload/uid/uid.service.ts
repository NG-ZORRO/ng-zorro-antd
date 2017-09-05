import { Injectable } from '@angular/core';

@Injectable()
export class UidService {
    now = +(new Date());
    index = 0;

    constructor() { }
    getUid() {
        return `nz-upload-${this.now}-${++this.index}`;
    }
}
