import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { SaveVehicle } from '../models/vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  constructor(private http:Http) { }

    create(vehicle){
      return this.http.post(this.vehiclesEndpoint, vehicle).map(data => data.json());
    }

    update(vehicle: SaveVehicle){
      return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle).map(data => data.json());
    }

    delete(id){
      return this.http.delete(this.vehiclesEndpoint + '/' + id).map(data => data.json());
    }
  getVehicle(id): Observable<any> {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json())
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json())
  }

  toQueryString(obj){
    var parts = [];
    for(var property in obj){
      var value = obj[property];
      if(value != null && value != undefined){
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }

    }
      return parts.join('&');
  }
}
