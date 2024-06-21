import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamMember } from './team-member.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private httpClient: HttpClient) { }

  getTeamMemberByPhone(phoneNumber: string): Observable<TeamMember> {
    return this.httpClient
    .get(`${environment.api}/teamMember?phoneNumber=${phoneNumber}`)
    .pipe(map(x => x as TeamMember));
  }

  getTeamMemberByName(phoneNumber: string): Observable<TeamMember> {
    return this.httpClient
    .get(`${environment.api}/teamMember2?firstName=${phoneNumber}`)
    .pipe(map(x => x as TeamMember));
  }
}
