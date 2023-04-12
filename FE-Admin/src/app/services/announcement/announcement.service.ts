import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/entities/announcement';
import { Observable } from 'rxjs';
import { AddAnnouncementViewModel } from 'src/app/viewmodels/announcement/addAnnouncementViewModel';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  saveAnnouncement(announcement: AddAnnouncementViewModel): Observable<Announcement> {
    return this.http.post<Announcement>(this.appUrl + "Announcement/SaveAnnouncement", announcement);
  }
}
