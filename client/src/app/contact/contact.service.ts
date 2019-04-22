import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {map } from 'rxjs/operators'
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import * as env from 'src/environments/environment';
import { Contact } from './contact.model';
const apiUrl = env.environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(apiUrl +'contacts')
      .pipe(
        delay(100),
        catchError(this.handleError)
      );
  }

  addContact(contact: Contact) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(apiUrl +'contact', contact, { headers: headers })
      .pipe(
        delay(100),
        catchError(this.handleError)
      );
  }

  deleteContact(id) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(apiUrl +'contact/' +id)
      .pipe(
        delay(100),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
		let errorMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';

		return Observable.throw(errorMsg);
	}
}
