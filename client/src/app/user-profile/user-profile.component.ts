import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'user-profile',
  imports: [CommonModule],
  template: `
    <ul *ngIf="user">
      <li>{{ user.name }}</li>
      <li>{{ user.email}}</li>
    </ul>
  `,
  standalone: true
})
export class UserProfileComponent {
  @Input() user?: User | null;
}