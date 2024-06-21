import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'user-profile',
  imports: [ CommonModule ],
  template: `
  <ng-container *ngIf="user; else loggedOut">
    <ul>
      <li>{{ user.name }}</li>
      <li>{{ user.email}}</li>
    </ul>
  </ng-container>
  
  <ng-template #loggedOut>
    <ul>
      <li> ... </li>
      <li> ... </li>
    </ul>
  </ng-template>
  `,
  standalone: true
})
export class UserProfileComponent {
  @Input() user?: User | null;
}