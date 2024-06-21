import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamMember } from './team-member.model';
import { MongoResult } from '../utils/mongo-result.model';

const teamMembers = "/teamMembers";

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private httpClient: HttpClient) { }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.httpClient
      .get(`${environment.api}${teamMembers}`)
      .pipe(map(x => x as MongoResult))
      .pipe(map(x => x.result as TeamMember[]));
  }
}
