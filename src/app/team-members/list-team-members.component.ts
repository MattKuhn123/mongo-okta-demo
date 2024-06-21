import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamMemberService } from './team-members.service';

@Component({
  selector: 'list-team-members',
  imports: [CommonModule, FormsModule],
  template: `
  <h1>Team Members</h1>
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
        <tr *ngFor="let item of (service.getTeamMembers() | async)">
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.phoneNumber }}</td>
        </tr>
    </tbody>
  </table>
  `,
  standalone: true
})
export class ListTeamMembersComponent {
  constructor(protected service: TeamMemberService) { }
}