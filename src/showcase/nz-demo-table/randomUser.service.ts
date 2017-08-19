import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(PageIndex = 1, pageSize = 10, sortField = '', sortOrder = '') {
    return this.http.get(`${this.randomUserUrl}?results=${pageSize}&page=${PageIndex}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
  }


}
