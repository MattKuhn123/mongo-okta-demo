import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';
import { MongoResult } from '../utils/mongo-result.model';

const events = "/events";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.httpClient
      .get(`${environment.api}${events}`)
      .pipe(map(x => x as MongoResult))
      .pipe(map(x => x.result as Event[]));
  }
}
