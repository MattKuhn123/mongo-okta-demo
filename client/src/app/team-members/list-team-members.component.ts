import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamMemberService } from './team-members.service';
import { TeamMember } from './team-member.model';

@Component({
  selector: 'list-team-members',
  imports: [CommonModule, FormsModule],
  template: `
  <button 
    *ngIf="!teamMembers" 
    (click)="onClickGetTeamMembers()">
    Get Team Members
  </button>
  <table *ngIf="teamMembers">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of teamMembers">
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.phoneNumber }}</td>
      </tr>
    </tbody>
  </table>
  <p *ngIf="error">{{ error | json }}</p>
  `,
  standalone: true
})
export class ListTeamMembersComponent {
  teamMembers: TeamMember[] | null = null;
  error: any = null;

  constructor(protected service: TeamMemberService) { }

  onClickGetTeamMembers(): void {
    this.service.getTeamMembers().subscribe({
      next: teamMembers => this.teamMembers = teamMembers,
      error: error => this.error = error
    });
  }
}