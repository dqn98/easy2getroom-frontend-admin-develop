import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property } from 'src/app/entities/property';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Feature } from 'src/app/entities/feature';
import { PropertyFeature } from 'src/app/entities/propertyFeature';

@Component({
  selector: 'app-detail-property-dialog',
  templateUrl: './detail-property-dialog.component.html',
  styleUrls: ['./detail-property-dialog.component.scss']
})
export class DetailPropertyDialogComponent implements OnInit {
  propertyFeatures: PropertyFeature[] = [];
  isLoadComment: boolean = false;
  public propertySelected: Property;
  countImages: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DetailPropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private propertiesService: PropertiesService,
    private alertify: AlertifyService) {
    this.propertySelected = data.property;
    this.countImages = this.propertySelected.propertyImages.length;
  }

  ngOnInit(): void {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
