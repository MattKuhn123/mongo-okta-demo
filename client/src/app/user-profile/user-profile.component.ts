import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'user-profile',
  imports: [ CommonModule ],
  template: `
  <ng-container *ngIf="user">
    <ul>
      <li>{{ user.name }}</li>
      <li>{{ user.email}}</li>
    </ul>
  </ng-container>
  `,
  standalone: true
})
export class UserProfileComponent {
  @Input() user?: User | null;
}