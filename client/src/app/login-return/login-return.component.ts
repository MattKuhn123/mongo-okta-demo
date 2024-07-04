import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginReturnService } from './login-return.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { home } from 'src/main';

type LoginStatus = ''
    | 'Getting user'
    | 'Updating account'
    | 'Updated account'
    | 'Adding flight pass'
    | 'Error';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  template: `
  <p>Welcome! {{ loginStatus | async }}...</p>
  <div *ngIf="isNewUser | async">
    <p>It looks like this is your first time here! Do you have a flight pass? (Optional)</p>
    <input [formControl]="flightPass" type="text"/>
  </div>
  <div *ngIf="(loginStatus | async) === 'Updated account'">
    <button (click)="onClickContinue()">Continue</button>
  </div>
  `,
})
export class LoginReturnComponent implements OnInit {
  flightPass: FormControl = new FormControl('', Validators.required);
  loginStatus: BehaviorSubject<LoginStatus> = new BehaviorSubject('' as LoginStatus);
  isNewUser: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private service: LoginReturnService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginStatus.next('Getting user');
    this.auth.user$.subscribe({
      next: user => this.upsertAccount(user!),
      error: err => {
        this.loginStatus.next('Error');
        console.error(err);
      }
    });

    this.loginStatus.asObservable().subscribe(x => console.log(x));
  }
  
  private upsertAccount(user: User): void {
    if (!user.sub) {
      this.loginStatus.next('Error');
      return;
    }

    this.loginStatus.next('Updating account');
    this.service.upsertAccount({ 
      sub: user.sub,
      firstName: user.given_name,
      lastName: user.family_name
    }).subscribe({
      next: account => {
        if (!account.alreadyInSystem) {
          this.isNewUser.next(account.alreadyInSystem);
        }
      },
      error: err => {

      }
    })
  }

  protected onClickContinue(): void {
    if (this.flightPass.valid) {
      this.auth.user$.subscribe(user => {
        this.loginStatus.next('Adding flight pass');
        this.service.addFlightPass({
          sub: user!.sub!,
          flightPass: this.flightPass.value
        }).subscribe({
          next: response => {
            this.goHome();
          },
          error: err => {
            console.error(err);
          }
        });
      });
    }

    if (!this.flightPass.value) {
      this.goHome();
    }
  }

    protected goHome(): void {
      this.router.navigate([home]);
    }
}