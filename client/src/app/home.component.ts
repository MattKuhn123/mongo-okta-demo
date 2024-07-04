import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ListTeamMembersComponent } from './team-members/list-team-members.component';
import { UserProfileComponent } from './user-profile.component';

@Component({
  template: `
    <user-profile [user]="auth.user$ | async"></user-profile>
    <list-team-members></list-team-members>
  `,
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    ListTeamMembersComponent,
  ]
})
export class HomeComponent {
    constructor(protected auth: AuthService) { }
}