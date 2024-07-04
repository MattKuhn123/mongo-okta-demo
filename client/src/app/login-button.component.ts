import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'login-button',
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="onClickLogout()">
        Log out
      </button>
    </ng-container>
    
    <ng-template #loggedOut>
      <button (click)="onClickLogin()">Log in</button>
    </ng-template>
  `,
  standalone: true
})
export class LoginButtonComponent {
  constructor(@Inject(DOCUMENT) protected document: Document, protected auth: AuthService) { }

  protected onClickLogin(): void {
    this.auth.loginWithRedirect();
  }

  protected onClickLogout(): void {
    this.auth.logout({ 
      logoutParams: { 
        returnTo: document.location.origin 
      } 
    });
  }
}