import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DefaultModule } from './modules/default/default.module';
import { SecurityModule } from './modules/security/security.module';
import { BaseService } from './base/serviceBase';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth/auth.service';
import { WarningDialogComponent } from './modules/dialog/warning-dialog/warning-dialog.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DefaultModule,
        SecurityModule,
        FlexLayoutModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:44390'],
                blacklistedRoutes: ['localhost:44390/api/AdminSecurity']
            }
        }),
        NgbModule,

    ],
    providers: [
        BaseService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }