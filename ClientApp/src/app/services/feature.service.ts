import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:Http) { }

  getFeatures(){
    return this.http.get('/api/features')
    .pipe(map(data => data.json()));
  }
}
