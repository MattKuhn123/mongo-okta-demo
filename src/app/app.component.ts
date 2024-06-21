import { Component } from '@angular/core';
import { AuthButtonComponent } from "./auth-button.component";
import { UserProfileComponent } from "./user-profile.component";
import { ApiCallByPhoneComponent } from "./api-call-by-phone.component";
import { ApiCallByNameComponent } from "./api-call-by-name.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [AuthButtonComponent, UserProfileComponent, ApiCallByPhoneComponent, ApiCallByNameComponent]
})
export class AppComponent {
  title = 'okta-test';
}
