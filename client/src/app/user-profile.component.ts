import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'user-profile',
  imports: [CommonModule],
  template: `<p *ngIf="user">{{ user.name }}</p>`,
  standalone: true
})
export class UserProfileComponent {
  @Input() user?: User | null;
}