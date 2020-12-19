import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  loginForm: FormGroup;
  email;
  password;
  users = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLogin(data) {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.email = data.email;
      this.password = data.password;
      this.authService.getData(this.email, this.password).subscribe((data) => {
        this.users = Array.from(Object.keys(data), (k) => data[k]);
        var countKey = Object.keys(data).length;
        if (countKey > 0) {
          localStorage.setItem('Movie', 'success');
          this.authService.isLoggedIn$.next(true);
          this.router.navigateByUrl('/movies');
          this.notificationService.show({
            content: 'Logged in successfully',
            hideAfter: 700,
            cssClass: 'success-notification',
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'success', icon: true },
          });
        } else {
          this.authService.isLoggedIn$.next(false);
          this.notificationService.show({
            content: 'Something went wrong',
            hideAfter: 1000,
            cssClass: 'warning-notification',
            position: { horizontal: 'left', vertical: 'bottom' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'warning', icon: true },
          });
        }
      });
    }
  }
}
