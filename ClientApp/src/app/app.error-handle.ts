import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";

import * as Sentry from '@sentry/browser';

export class AppErrorHandler implements ErrorHandler
{
    constructor(@Inject(ToastyService) private toastyService : ToastyService,
        private ngZone:NgZone)
    {

    }
    handleError(error: any): void {

        if(!isDevMode())
            Sentry.captureException(error.originalError || error);
        else 
            throw error;

       this.ngZone.run(() => {
           
        this.toastyService.error({
            title:'Error',
            msg :'An unexpected error happened.',
            theme : 'bootstrap',
            showClose:true,
            timeout:5000
        });
       })
          // if(err.status == 400){

          // }
    }
    
}