import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { District } from '../entities/district';
import { DistrictService } from '../services/district/district.service';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable() 

export class DistrictResolver implements Resolve<District[]> {
    constructor(private districtService: DistrictService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<District[]> {
        return this.districtService.getDistricts().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}