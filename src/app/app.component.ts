import { Component, Inject } from '@angular/core';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { EventsListComponent } from "./events/list-events.component";
import { ListTeamMembersComponent } from "./team-members/list-team-members.component";
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>

      <user-profile [user]="auth.user$ | async"></user-profile>
    </ng-container>
    
    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
    
    <list-events></list-events>
    <list-team-members></list-team-members>
    `,
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    EventsListComponent,
    ListTeamMembersComponent
  ]
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) protected document: Document,
    protected auth: AuthService) { }
}
