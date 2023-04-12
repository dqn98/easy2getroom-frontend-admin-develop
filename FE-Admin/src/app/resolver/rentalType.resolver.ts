import { RentalType } from '../entities/rentalType';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RentalTypeService } from '../services/retalType/rental-type.service';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable() 

export class RentalTypeResolver implements Resolve<RentalType[]> {
    constructor(private rentalTypeService: RentalTypeService,
        private router: Router,
        private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<RentalType[]> {
        return this.rentalTypeService.GetAllRentalTypes().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}