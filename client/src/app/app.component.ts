import { Component } from '@angular/core';
import { UserProfileComponent } from "./user-profile.component";
import { ListTeamMembersComponent } from "./team-members/list-team-members.component";
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <login-button></login-button>
    <router-outlet></router-outlet>
  `,
  imports: [
    CommonModule,
    UserProfileComponent,
    ListTeamMembersComponent,
    LoginButtonComponent,
    RouterOutlet,
  ]
})
export class AppComponent {
  constructor(protected auth: AuthService) { }
}
