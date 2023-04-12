import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Constant } from 'src/app/base/constants';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Property } from 'src/app/entities/property';
import { City } from 'src/app/entities/ctity';
import { RentalType } from 'src/app/entities/rentalType';
import { PropertyCategory } from 'src/app/entities/propertyCategory';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { CityService } from 'src/app/services/city/city.service';
import { DistrictService } from 'src/app/services/district/district.service';
import { WardsService } from 'src/app/services/wards/wards.service';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateStatusViewModel } from 'src/app/viewmodels/property/updateStatusViewModel';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DetailPropertyDialogComponent } from '../../dialog/properties/detail-property-dialog/detail-property-dialog.component';
import { GetPropertiesUserViewModel } from 'src/app/viewmodels/property/getPropertiesUserViewModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.scss']
})
export class PropertyUserComponent implements OnInit, AfterViewInit {

  isExpaned: boolean = false;

  propertyStatus = Constant.propertyStatus;
  propertySatusSelected: number[] = [];
  isLoadingResults: boolean;

  public dataSource: any;

  public config: PerfectScrollbarConfigInterface = {};

  public pageSizeOptions = Constant.pageSizeOptions;

  public displayedColumns = ['order', 'title', 'address', 'dateCreated', 'status', 'actions'];

  // Filter
  keywordFilter: string = '';
  dateStart: Date;
  dateEnd: Date;
  properties: Property[];
  cities: City[];
  rentalTypes: RentalType[];
  rentalTypeIdsSelected: number[] = [];
  propertyCategories: PropertyCategory[];
  propertyCategoryIdsSelected: number[] = [];
  username: string;
  public orderNumber: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private propertiesService: PropertiesService,
    private cityService: CityService,
    private alertitfy: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) {
    this.getCities();
    this.username = this.authService.decodedToken.user_name;
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.route.data.subscribe(data => {
      this.properties = data['properties'];
      this.rentalTypes = data['rentalTypes'];
      this.propertyCategories = data['propertyCategories'];
      this.dataSource = new MatTableDataSource(this.properties);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  refresh() {
    this.isLoadingResults = true;
    const viewModel: GetPropertiesUserViewModel = {
      username: this.username,
      status: this.propertySatusSelected,
      propertyCategoryIds: this.propertyCategoryIdsSelected,
      rentalTypeIds: this.rentalTypeIdsSelected,
      keyWord: this.keywordFilter,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd
    };
    this.propertiesService.getPropertiesUser(viewModel).subscribe((properties) => {
      this.properties = properties;
      this.dataSource = new MatTableDataSource(this.properties);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
      this.isLoadingResults = false;
    });
    this.isExpaned = false;
  }

  resetAllFilter() {
    this.propertyCategoryIdsSelected = [];
    this.rentalTypeIdsSelected = [];
    this.keywordFilter = '';
    this.propertySatusSelected = [];
  }

  getCities() {
    this.cityService.getCities().subscribe(response => {
      this.cities = response;
    });
  }

  hide(id: number) {
    const viewModel: UpdateStatusViewModel = {
      id: id,
      status: Constant.status.Inactive
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertitfy.error(Constant.messagesAlertify.UpdateError);
    });
  }


  unhide(id: number) {
    const viewModel: UpdateStatusViewModel = {
      id: id,
      status: Constant.status.Active
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertitfy.error(Constant.messagesAlertify.UpdateError);
    });
  }


  approval(id: number) {
    const viewModel: UpdateStatusViewModel = {
      id: id,
      status: Constant.status.Active
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertitfy.error(Constant.messagesAlertify.UpdateError);
    });
  }

  selectdateStart(event: MatDatepickerInputEvent<Date>) {
    this.dateStart = event.value;
    this.dateStart.setHours(0, 0);
  }

  selectdateEnd(event: MatDatepickerInputEvent<Date>) {
    this.dateEnd = event.value;
    this.dateEnd.setHours(0, 0);
  }

  openDialog(id: number, property: Property) {
    const dialogRef = this.dialog.open(DetailPropertyDialogComponent, {
      data: {
        id: id,
        property: property,
        cities: this.cities
      },
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    });
  }

  public detail(id: number) {
    this.propertiesService.getPropertyById(id).subscribe(property => {
      this.openDialog(id, property);
    });
  }

  public delete(id: number) {
    this.alertitfy.confirm(Constant.messagesAlertify.ConfirmMessage, () => {
      this.propertiesService.deleteProperty(id).subscribe(() => {
        this.refresh();
        this.alertitfy.success(Constant.messagesAlertify.DeleteSuccess);
      }, error => {
        this.alertitfy.error(Constant.messagesAlertify.DeleteError);
      });
    });
  }

}
