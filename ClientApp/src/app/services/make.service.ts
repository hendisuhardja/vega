import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http:Http) { }

  getMakes() {
    return this.http.get('/api/makes')
      .pipe(map(data => data.json()))
  }
}
