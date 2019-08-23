import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http : Http) { }

  upload(vehicleId, photo){
    var formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
      .map(x => x.json());
  }

  
  getPhotos(vehicleId){
    return this.http.get(`/api/vehicles/${vehicleId}/photos`)
      .map(x => x.json());
  }
}
