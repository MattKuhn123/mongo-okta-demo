import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountUpsertResponse } from './account-upsert-response.model';
import { AccountUpsertRequest } from './account-upsert-request.model';
import { AccountFlightPassRequest } from './account-flight-pass-request.model';
import { AccountFlightPassResponse } from './account-flight-pass-response.model';

const loginRedirectUpdateAccount = "/login-redirect-update-account";
const loginRedirectFlightPass = "/login-redirect-flight-pass";

@Injectable({
  providedIn: 'root'
})
export class LoginReturnService {

  constructor(private httpClient: HttpClient) { }

  public upsertAccount(request: AccountUpsertRequest): Observable<AccountUpsertResponse> {
    return this.httpClient
      .post(`${environment.api}${loginRedirectUpdateAccount}`, request)
      .pipe(map(x => x as AccountUpsertResponse));
  }

  public addFlightPass(request: AccountFlightPassRequest): Observable<AccountFlightPassResponse> {
    return this.httpClient
      .post(`${environment.api}${loginRedirectFlightPass}`, request)
      .pipe(map(x => x as AccountFlightPassResponse));
  }
}
