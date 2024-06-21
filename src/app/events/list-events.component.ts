import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from './events.service';
import { Event } from './event.model';

@Component({
  selector: 'list-events',
  imports: [CommonModule, FormsModule],
  template: `
  
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Country</th>
        <th>Venue</th>
      </tr>
    </thead>

    <tbody>
        <tr>
          <td *ngIf="isNoContent" colspan="8">
            <button 
              *ngIf="!events" 
              (click)="onClickGetEvents()">Get Events</button>
            <p *ngIf="error">{{ error }}</p>
          </td>
        </tr>

        <tr *ngFor="let item of events">
          <td>{{ item.name }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.venue }}</td>
        </tr>
    </tbody>
  </table>
  `,
  standalone: true
})
export class EventsListComponent {
  events: Event[] | undefined = undefined;
  error: any | undefined = undefined;

  get isNoContent(): boolean {
    return !this.events || this.error;
  }

  constructor(protected service: EventsService) { }

  onClickGetEvents(): void {
    this.service.getEvents().subscribe({
      next: events => this.events = events,
      error: error => this.error = error
    });
  }
}