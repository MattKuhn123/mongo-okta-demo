import { Component } from '@angular/core';
import { AuthButtonComponent } from "./auth/auth-button.component";
import { UserProfileComponent } from "./auth/user-profile.component";
import { EventsListComponent } from "./events/list-events.component";
import { ListTeamMembersComponent } from "./team-members/list-team-members.component";

@Component({
  selector: 'app-root',
  template: `
    <app-auth-button></app-auth-button>
    <app-user-profile></app-user-profile>
    <list-events></list-events>
    <list-team-members></list-team-members>
    `,
  standalone: true,
  imports: [
    AuthButtonComponent,
    UserProfileComponent,
    EventsListComponent,
    ListTeamMembersComponent
  ]
})
export class AppComponent {
}
