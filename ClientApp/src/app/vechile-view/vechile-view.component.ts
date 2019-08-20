import { VehicleService } from './../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vechile-view',
  templateUrl: './vechile-view.component.html',
  styleUrls: ['./vechile-view.component.css']
})
export class VechileViewComponent implements OnInit {
  vehicle:any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private toasy:ToastyService,
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


}
