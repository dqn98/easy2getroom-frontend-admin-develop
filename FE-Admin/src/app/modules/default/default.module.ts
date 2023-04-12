import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../screen/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FunctionService } from 'src/app/services/function/function.service';
import { PropertiesComponent } from '../screen/properties/properties.component';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { PropertiesResolver } from 'src/app/resolver/properties.resolver';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'
import { MatPaginatorModule } from '@angular/material/paginator';
import { PropertyDetailResolver } from 'src/app/resolver/propertyDetail.resolver';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailPropertyDialogComponent } from '../dialog/properties/detail-property-dialog/detail-property-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCurrencyFormatModule } from 'mat-currency-format'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { AgmCoreModule } from '@agm/core'
import { MatExpansionModule } from '@angular/material/expansion';
import { EditPropertyImageComponent } from '../dialog/properties/edit-property-image/edit-property-image.component';
import { CityService } from 'src/app/services/city/city.service';
import { DistrictService } from 'src/app/services/district/district.service';
import { WardsService } from 'src/app/services/wards/wards.service';
import { MatSelectModule } from '@angular/material/select';
import { PropertyCategoryService } from 'src/app/services/propertyCategory/property-category.service';
import { RentalTypeService } from 'src/app/services/retalType/rental-type.service';
import { CityResolver } from 'src/app/resolver/city.resolver';
import { DistrictResolver } from 'src/app/resolver/district.resolver';
import { WardsResolver } from 'src/app/resolver/wards.resolver';
import { RentalTypeResolver } from 'src/app/resolver/rentalType.resolver';
import { PropertyCategoryResolver } from 'src/app/resolver/propertyCategories.resolver';
import { UsersManageComponent } from '../screen/users/users-manage/users-manage.component';
import { UsersResolver } from 'src/app/resolver/user.resolver';
import { DetailUserDialogComponent } from '../dialog/users/detail-user-dialog/detail-user-dialog.component';
import { ProfileComponent } from '../screen/users/profile/profile.component';
import { UserProfileResolver } from 'src/app/resolver/userProfile.resolver';
import { PropertyUserComponent } from '../screen/property-user/property-user.component';
import { PropertiesUserResolver } from 'src/app/resolver/propertiesUserResolver';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSortModule } from '@angular/material/sort';
import { PropertyCommentDialogComponent } from '../dialog/properties/detail-property-dialog/property-comment-dialog/property-comment-dialog.component';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ReplyCommentDialogComponent } from '../dialog/properties/reply-comment-dialog/reply-comment-dialog.component';
import { MessagesResolver } from 'src/app/resolver/messages.resolver';
import { MatListModule } from '@angular/material/list';
import { ChatService } from 'src/app/services/message/chat.service';
import { MessageService } from 'src/app/services/message/message.service';
import { FeatureService } from 'src/app/services/feature/feature.service';
import { FeatureResolver } from 'src/app/resolver/feature.resolver';
import { FeaturesComponent } from '../screen/features/features.component';
import { LoggingComponent } from '../screen/logging/logging.component';
import { LogsService } from 'src/app/services/logs/logs.service';
import { LogsResolver } from 'src/app/resolver/logs.resolver';
import { LogTypesService } from 'src/app/services/logs/log-types.service';
import { LogTypesResolver } from 'src/app/resolver/logTypes.resolver';
import { WarningDialogComponent } from '../dialog/warning-dialog/warning-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    HomeComponent,
    PropertiesComponent,
    UsersManageComponent,
    ProfileComponent,
    PropertyUserComponent,
    FeaturesComponent,
    LoggingComponent,
    //Dialog
    DetailPropertyDialogComponent,
    PropertyCommentDialogComponent,
    EditPropertyImageComponent,
    DetailUserDialogComponent,
    ReplyCommentDialogComponent,
    WarningDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FileUploadModule,
    NgxGalleryModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    PerfectScrollbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatCurrencyFormatModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSortModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBEfLTmYpED4HyRSF1KaSyyqZ7m7ZGYxpU',
    })
  ],
  exports: [MatSortModule],
  providers: [
    FunctionService,
    PropertiesService,
    CityService,
    DistrictService,
    WardsService,
    PropertyCategoryService,
    RentalTypeService,
    AuthService,
    CommentService,
    ChatService,
    MessageService,
    FeatureService,
    LogsService,
    LogTypesService,
    // Resolever
    PropertiesResolver,
    PropertyDetailResolver,
    CityResolver,
    DistrictResolver,
    WardsResolver,
    RentalTypeResolver,
    PropertyCategoryResolver,
    UsersResolver,
    UserProfileResolver,
    PropertiesUserResolver,
    MessagesResolver,
    FeatureResolver,
    LogsResolver,
    LogTypesResolver,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class DefaultModule { }
