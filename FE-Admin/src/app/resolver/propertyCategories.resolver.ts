import { PropertyCategory } from '../entities/propertyCategory';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PropertyCategoryService } from '../services/propertyCategory/property-category.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Injectable } from '@angular/core';

@Injectable() 

export class PropertyCategoryResolver implements Resolve<PropertyCategory[]> {
    constructor(private propertyCategoryService: PropertyCategoryService,
        private router: Router,
        private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<PropertyCategory[]> {
        return this.propertyCategoryService.GetAllPropertyCategories().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}