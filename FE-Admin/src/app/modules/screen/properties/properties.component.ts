import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/entities/property';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/base/constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailPropertyDialogComponent } from '../../dialog/properties/detail-property-dialog/detail-property-dialog.component';
import { WarningDialogComponent } from '../../dialog/warning-dialog/warning-dialog.component';
import { City } from 'src/app/entities/ctity';
import { CityService } from 'src/app/services/city/city.service';
import { DistrictService } from 'src/app/services/district/district.service';
import { WardsService } from 'src/app/services/wards/wards.service';
import { RentalType } from 'src/app/entities/rentalType';
import { PropertyCategory } from 'src/app/entities/propertyCategory';
import { GetPropertiesViewModel } from 'src/app/viewmodels/property/getPropertiesViewModel';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UpdateStatusViewModel } from 'src/app/viewmodels/property/updateStatusViewModel';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Announcement } from 'src/app/entities/announcement';
import { AddAnnouncementViewModel } from 'src/app/viewmodels/announcement/addAnnouncementViewModel';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, AfterViewInit {

  private hubConnection;

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
  public orderNumber: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private propertiesService: PropertiesService,
    private cityService: CityService,
    private districtService: DistrictService,
    private wardsService: WardsService,
    private alertitfy: AlertifyService,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private authService: AuthService,
    private announcementService: AnnouncementService,
    public dialog: MatDialog) {
    this.getCities();
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.signalrConn(this.authService.decodedToken.user_id);
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
    const viewModel: GetPropertiesViewModel = {
      status: this.propertySatusSelected,
      propertyCategoryIds: this.propertyCategoryIdsSelected,
      rentalTypeIds: this.rentalTypeIdsSelected,
      keyWord: this.keywordFilter,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd
    };
    this.propertiesService.getProperties(viewModel).subscribe((properties) => {
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

  hide(property: Property) {
    const viewModel: UpdateStatusViewModel = {
      id: property.id,
      status: Constant.status.Inactive
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      let viewModel: AddAnnouncementViewModel = {
        content: "Your property: 	" + property.title + " was hided by Admin " + this.authService.decodedToken.full_name + ", contact Admin to get the reason.",
        senderId: this.authService.decodedToken.user_id,
        receiverId: property.userId,
        announcementTypeId: Constant.announcementContent.AnnouncementType.Normal
      };
      this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
        this.sendAnnouncement(announcement);
      });
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertitfy.error(Constant.messagesAlertify.UpdateError);
    });
  }


  unhide(property: Property) {
    const viewModel: UpdateStatusViewModel = {
      id: property.id,
      status: Constant.status.Active
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      let viewModel: AddAnnouncementViewModel = {
        content: "Your property: 	" + property.title + " was unhided by Admin " + this.authService.decodedToken.full_name + ".",
        senderId: this.authService.decodedToken.user_id,
        receiverId: property.userId,
        announcementTypeId: Constant.announcementContent.AnnouncementType.Normal
      };
      this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
        this.sendAnnouncement(announcement);
      });
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertitfy.error(Constant.messagesAlertify.UpdateError);
    });
  }


  approval(property: Property) {
    const viewModel: UpdateStatusViewModel = {
      id: property.id,
      status: Constant.status.Active
    };
    this.propertiesService.updateStatus(viewModel).subscribe(() => {
      let viewModel: AddAnnouncementViewModel = {
        content: "Your property: 	" + property.title + " was approval by Admin " + this.authService.decodedToken.full_name + ".",
        senderId: this.authService.decodedToken.user_id,
        receiverId: property.userId,
        announcementTypeId: Constant.announcementContent.AnnouncementType.Approved
      };
      this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
        this.sendAnnouncement(announcement);
      });
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
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      this.refresh();
      this.alertitfy.success(Constant.messagesAlertify.UpdateSuccess);
    });
  }

  public warning(property) {
    let id = property.id;
    this.propertiesService.getPropertyById(id).subscribe(property => {
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        data: {
          id: id,
          property: property,
        },
        width: '50%',
      });

      dialogRef.afterClosed().subscribe(result => {
        let viewModel: AddAnnouncementViewModel = {
          content: result.content + ": by Admin " + this.authService.decodedToken.full_name,
          senderId: this.authService.decodedToken.user_id,
          receiverId: property.userId,
          announcementTypeId: Constant.announcementContent.AnnouncementType.Warning
        };
        this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
          this.sendAnnouncement(announcement);
        });
        this.alertitfy.success(Constant.messagesAlertify.SendAnnouncementSuccess)
      });
    });
  }

  public detail(id: number) {
    this.propertiesService.getPropertyById(id).subscribe(property => {
      this.openDialog(id, property);
    });
  }

  public delete(property: Property) {
    this.alertitfy.confirm(Constant.messagesAlertify.ConfirmMessage, () => {
      this.propertiesService.deleteProperty(property.id).subscribe(() => {
        let viewModel: AddAnnouncementViewModel = {
          content: "Your property: 	" + property.title + " was deleted by Admin " + this.authService.decodedToken.full_name + ", contact Admin to get the reason.",
          senderId: this.authService.decodedToken.user_id,
          receiverId: property.userId,
          announcementTypeId: Constant.announcementContent.AnnouncementType.Delete
        };
        this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
          this.sendAnnouncement(announcement);
        });
        this.refresh();
        this.alertitfy.success(Constant.messagesAlertify.DeleteSuccess);
      }, error => {
        this.alertitfy.error(Constant.messagesAlertify.DeleteError);
      });
    });
  }

  signalrConn(loggedUserid: string) {
    //Init Connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44390/NotifyHub?user=" + loggedUserid)
      .build();

    //Call client methods from hub to update User
    this.hubConnection.on("CreateConnection", () => { });

    //Start Connection
    this.hubConnection
      .start()
      .then(function () {
        console.log("Connected");
      }).catch(function (err) {
        return console.error(err.toString());
      });
  }

  sendAnnouncement(announcement: Announcement) {
    this.hubConnection.invoke('SendAnnouncement', announcement);
  }
}
