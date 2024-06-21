import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-api-call-by-name',
  imports: [ CommonModule, FormsModule ],
  template: `
  <input type="text" [(ngModel)]="name"/>
  <button (click)="onClickGetTeamMember()">Get Team Member By Name</button>
  <p>{{result}}</p>
  `,
  standalone: true
})
export class ApiCallByNameComponent {
  protected name: string = "Matt";
  protected result: string = "nothing yet..."

  constructor(private service: ApiCallService) { }

  protected onClickGetTeamMember(): void {
    this.result = "nothing yet...";
    this.service.getTeamMemberByName(this.name).subscribe({
      next: teamMember => this.result = JSON.stringify(teamMember),
      error: err => this.result = JSON.stringify(err)
    });
  }
}