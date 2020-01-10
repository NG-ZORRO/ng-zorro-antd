import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  language$ = new ReplaySubject<string>(1);
}
