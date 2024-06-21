import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  imports: [ CommonModule ],
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
      <li>{{ user | json }}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {
  constructor(protected auth: AuthService) {
    this.auth.user$.subscribe(x => {
      console.log(x);
    })
  }
}