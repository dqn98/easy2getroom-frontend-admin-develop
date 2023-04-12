import { Injectable } from '@angular/core';
import { Wards } from '../entities/wards';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { WardsService } from '../services/wards/wards.service';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable() 

export class WardsResolver implements Resolve<Wards[]> {
    constructor(private wardsService: WardsService,
        private router: Router,
        private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Wards[]> {
        return this.wardsService.getWards().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}