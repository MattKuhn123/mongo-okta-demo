import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-api-call-by-phone',
  imports: [ CommonModule, FormsModule ],
  template: `
  <input type="text" [(ngModel)]="phoneNumber"/>
  <button (click)="onClickGetTeamMember()">Get Team Member By Phone</button>
  <p>{{result}}</p>
  `,
  standalone: true
})
export class ApiCallByPhoneComponent {
  protected phoneNumber: string = "513-675-7394";
  protected result: string = "nothing yet..."

  constructor(private service: ApiCallService) { }

  protected onClickGetTeamMember(): void {
    this.result = "nothing yet...";
    this.service.getTeamMemberByPhone(this.phoneNumber).subscribe({
      next: teamMember => this.result = JSON.stringify(teamMember),
      error: err => this.result = JSON.stringify(err)
    });
  }
}