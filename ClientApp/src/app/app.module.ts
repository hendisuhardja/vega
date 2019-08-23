import { ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {ToastyModule} from 'ng2-toasty';

import { FeatureService } from './services/feature.service';
import { MakeService } from './services/make.service';
import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { AppErrorHandler } from './app.error-handle';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { VechileViewComponent } from './vechile-view/vechile-view.component';

import 'bootstrap'
import { PhotoService } from './services/photo.service';
Sentry.init({
  dsn: "https://b33a8949a9d84f32abcd2f3ee04d3ad9@sentry.io/1528999"
});

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    VechileViewComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo:'vehicles', pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: VechileViewComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    MakeService,
    FeatureService,
    VehicleService,
    PhotoService,
    {
      provide:ErrorHandler, useClass :AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
