import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from './events.service';

@Component({
  selector: 'list-events',
  imports: [CommonModule, FormsModule],
  template: `
  <h1>Events</h1>
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
        <tr *ngFor="let item of (service.getEvents() | async)">
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
  constructor(protected service: EventsService) { }
}