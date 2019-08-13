import { VehicleService } from './../services/vehicle.service';
import { MakeService } from './../services/make.service';
import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../services/feature.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes:any[];
  models:any[];
  features:any[];
  vehicle: any = {
    features:[],
    contact:{}
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private makeService:MakeService,
    private featureService:FeatureService,
    private vehicleService:VehicleService,
    private toastyService:ToastyService) { 

      route.params.subscribe(p =>
        {
          this.vehicle.id = +p['id'] || 0;
        });
    }

  ngOnInit() {
    if(this.vehicle.id){
    this.vehicleService.getVehicle(this.vehicle.id)
    .subscribe(
      vehicle => {
        this.vehicle = vehicle;
        console.log('1');
      }, err => {
          if(err.status == 404){
            console.log("home");
            this.router.navigate(['/']);
          }
      }
    );
    }
    this.makeService.getMakes().subscribe(makes =>{
      this.makes = makes;
    });

    this.featureService.getFeatures().subscribe(features => this.features = features);

  }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
  onFeatureToggle(featureId, $event) {
    if($event.target.checked)
      this.vehicle.features.push(featureId)
    else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit(){
    this.vehicleService.create(this.vehicle)
      .subscribe(x => 
        console.log(x)
      );
  }
}
