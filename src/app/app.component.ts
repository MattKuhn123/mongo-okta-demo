import { Component } from '@angular/core';
import { AuthButtonComponent } from "./auth-button.component";
import { UserProfileComponent } from "./user-profile.component";
import { ApiCallByPhoneComponent } from "./api-call-by-phone.component";
import { ApiCallByNameComponent } from "./api-call-by-name.component";

@Component({
    selector: 'app-root',
    template: `
    <app-auth-button></app-auth-button>
    <app-user-profile></app-user-profile>
    <app-api-call-by-phone></app-api-call-by-phone>
    <app-api-call-by-name></app-api-call-by-name>
    `,
    standalone: true,
    imports: [AuthButtonComponent, UserProfileComponent, ApiCallByPhoneComponent, ApiCallByNameComponent]
})
export class AppComponent {
  title = 'okta-test';
}
