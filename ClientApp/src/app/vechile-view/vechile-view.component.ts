import { PhotoService } from './../services/photo.service';
import { VehicleService } from './../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vechile-view',
  templateUrl: './vechile-view.component.html',
  styleUrls: ['./vechile-view.component.css']
})
export class VechileViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput:ElementRef;
  vehicle:any;
  vehicleId: number;
  photos:any[];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private toasy:ToastyService,
    private photoService : PhotoService,
    private vehicleService:VehicleService
  ) { 
    route.params.subscribe(p =>
      {
        this.vehicleId = +p['id'];
        if(isNaN(this.vehicleId) || this.vehicleId <= 0){
          router.navigate(['/vehicles']);
          return;
        }
      });

  }

  ngOnInit() {

    this.photoService.getPhotos(this.vehicleId)
      .subscribe(p => this.photos = p);
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v => {this.vehicle = v; 
      console.log(JSON.stringify(this.vehicle));
      console.log(this.vehicle.make.name);
    }
        ,
        
        err => {
          if(err.status == 404){
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }


  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id).subscribe(x => 
        {
            this.router.navigate(["/"]);
        });
    }
  }

  uploadPhoto(){
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService.upload(this.vehicleId, nativeElement.files[0])
      .subscribe(p => {
        this.photos.push(p);
      });
  }

}
