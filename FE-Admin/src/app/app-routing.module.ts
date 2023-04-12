import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/shared/dashboard/dashboard.component';
import { DefaultComponent } from './modules/default/default.component';
import { HomeComponent } from './modules/screen/home/home.component';
import { LoginComponent } from './modules/security/login/login.component';
import { AuthGuard } from './base/guards/auth.guard';
import { PropertiesComponent } from './modules/screen/properties/properties.component';
import { PropertiesResolver } from './resolver/properties.resolver';
import { RentalTypeResolver } from './resolver/rentalType.resolver';
import { PropertyCategoryResolver } from './resolver/propertyCategories.resolver';
import { UsersManageComponent } from './modules/screen/users/users-manage/users-manage.component';
import { UsersResolver } from './resolver/user.resolver';
import { ProfileComponent } from './modules/screen/users/profile/profile.component';
import { UserProfileResolver } from './resolver/userProfile.resolver';
import { PropertyUserComponent } from './modules/screen/property-user/property-user.component';
import { PropertiesUserResolver } from './resolver/propertiesUserResolver';
import { FeaturesComponent } from './modules/screen/features/features.component';
import { FeatureResolver } from './resolver/feature.resolver';
import { LoggingComponent } from './modules/screen/logging/logging.component';
import { LogsResolver } from './resolver/logs.resolver';
import { LogTypesResolver } from './resolver/logTypes.resolver';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'users', component: UsersManageComponent,
        resolve: {
          users: UsersResolver
        }
      },
      {
        path: 'profile', component: ProfileComponent,
        resolve: {
          user: UserProfileResolver
        }
      },
      {
        path: 'properties', component: PropertiesComponent,
        resolve: {
          properties: PropertiesResolver,
          rentalTypes: RentalTypeResolver,
          propertyCategories: PropertyCategoryResolver
        }
      },
      {
        path: 'properties/:username', component: PropertyUserComponent,
        resolve: {
          properties: PropertiesUserResolver,
          rentalTypes: RentalTypeResolver,
          propertyCategories: PropertyCategoryResolver
        }
      },
      // {
      //   path: 'chats', component: ChatComponent,
      //   resolve: {
      //     users: UsersResolver
      //   }
      // },
      { path: 'messages', loadChildren: () => import('./modules/screen/message/message.module').then(m => m.MessageModule) },
      {
        path: 'features', component: FeaturesComponent,
        resolve: {
          features: FeatureResolver,
        }
      },
      {
        path: 'logs', component: LoggingComponent,
        resolve: {
          logs: LogsResolver,
          logTypes: LogTypesResolver
        }
      }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
