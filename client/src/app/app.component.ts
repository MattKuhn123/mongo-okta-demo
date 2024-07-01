import { Component } from '@angular/core';
import { UserProfileComponent } from "./user-profile.component";
import { ListTeamMembersComponent } from "./team-members/list-team-members.component";
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';

@Component({
  selector: 'app-root',
  template: `
    <login-button></login-button>
    <user-profile [user]="auth.user$ | async"></user-profile>
    <list-team-members></list-team-members>
    `,
  standalone: true,
  imports: [CommonModule, UserProfileComponent, ListTeamMembersComponent, LoginButtonComponent,]
})
export class AppComponent {
  constructor(protected auth: AuthService) { }
}
