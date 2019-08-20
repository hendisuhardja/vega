import { KeyValuePair } from './../models/vehicle';
import { MakeService } from './../services/make.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3
  queryResult:any = {};
  makes:KeyValuePair[];
  models:KeyValuePair[];
  query:any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable:true },
    { title: 'Make', key: 'make', isSortable:true },
    { title: 'Model', key: 'model', isSortable:true },
    {}
  ];
  constructor(private vehicleService:VehicleService,
    private makeService:MakeService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(makes =>  this.makes = makes);
    this.makeService.getMakes().subscribe(makes =>  this.makes = makes);
    this.populeVehicles();
  }

  onFilterChange(){
    this.query.page = 1;
    this.populeVehicles();
  }
  private populeVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(results => 
        { this.queryResult = results;
        });
  }
  resetFilter(){
    this.query ={
      page:1,
      pageSize:this.PAGE_SIZE
    };
    this.populeVehicles();
  }

  sortBy(columnName){
      if(this.query.sortBy !== columnName){
          this.query.sortBy = columnName;
      }
      this.query.isSortAscending = !this.query.isSortAscending;
      this.populeVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populeVehicles();
  }
}
