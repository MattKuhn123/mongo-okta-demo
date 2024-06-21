import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from './events.service';
import { Event } from './event.model';

@Component({
  selector: 'list-events',
  imports: [ CommonModule, FormsModule ],
  template: `
  <button (click)="onClickGetEvents()">Get Events</button>
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
  <p *ngIf="error">{{ error }}</p>
  `,
  standalone: true
})
export class EventsListComponent {
  events: Event[] = [];
  error: any | undefined = undefined;
  constructor(protected service: EventsService) { }

  onClickGetEvents(): void {
    this.service.getEvents().subscribe({
      next: events => this.events = events,
      error: error => this.error = error
    });
  }
}