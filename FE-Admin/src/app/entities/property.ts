import { Wards } from './wards';
import { RentalType } from './rentalType';
import { PropertyCategory } from './propertyCategory';
import { PropertyImage } from './propertyImage';
import { User } from './user';
import { PropertyFeature } from './propertyFeature';

export class Property {
    id: number;
    propertyCategoryId: number;
    wardsId: number;
    rentalTypeId: number;
    title: string;
    description: string;
    price: number;
    priceFrom: number;
    priceTo: number;
    acreage: number;
    acreageFrom: number;
    acreageTo: number;
    address: string;
    lat: number;
    lng: number;
    status: number;
    slideFlag: number;
    dateCreated: Date;
    dateModified: Date;
    userId: string;
    propertyCategory: PropertyCategory;
    wards: Wards;
    rentalType: RentalType;
    user: User;
    propertyImages: PropertyImage[];
    propertyFeatures: PropertyFeature[];
}