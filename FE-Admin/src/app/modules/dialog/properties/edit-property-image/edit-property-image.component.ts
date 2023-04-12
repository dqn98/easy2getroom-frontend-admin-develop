import { Component, OnInit, Input } from '@angular/core';
import { PropertyImage } from 'src/app/entities/propertyImage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Property } from 'src/app/entities/property';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-edit-property-image',
  templateUrl: './edit-property-image.component.html',
  styleUrls: ['./edit-property-image.component.scss']
})
export class EditPropertyImageComponent implements OnInit {
  @Input() property: Property;
  @Input() images: PropertyImage[];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private authService: AuthService, private alertify: AlertifyService, private propertiesService: PropertiesService) {

  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for(const image of this.images) {
      imageUrls.push({
        small: image.url,
        medium: image.url,
        big: image.url,
      });
    }

    return imageUrls;
  }
}
