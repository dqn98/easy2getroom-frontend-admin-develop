import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from '../entities/property';
import { PropertiesService } from '../services/properties/properties.service';

@Injectable() 

export class PropertyDetailResolver implements Resolve<Property> {
    constructor(private propertiesService: PropertiesService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Property> {
        return this.propertiesService.getPropertyById(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}