import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'nz-upload',
    templateUrl: './nz-upload.component.html',
    styleUrls: ['./nz-upload.component.css']
})
export class NzUploadComponent implements OnInit {
    @Input() action: string;
    @Input() multiple: boolean;
    @Input() headers: string | { [name: string]: string | string[] };
    @Input() withCredentials: boolean;

    constructor() { }

    ngOnInit() { }
}
