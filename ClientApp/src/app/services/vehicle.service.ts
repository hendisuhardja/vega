import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:Http) { }

    create(vehicle){
      return this.http.post('/api/vehicles', vehicle).map(data => data.json());
    }

  getVehicle(id): Observable<any> {
    return this.http.get('/api/vehicles/' + id)
      .map(res => res.json())
  }

}
