import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm;
  name;
  email;
  password;
  pushed = 0;
  isSubmitted = false;
  users = [];
  constructor(
    private myservice: MyserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.myservice.getData().subscribe((data) => {
      this.users = Array.from(Object.keys(data), (k) => data[k]);
    });
  }

  onRegister(data) {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;

      this.users.forEach((user) => {
        if (this.email == user.email) {
          console.log('Match found');
          this.pushed++;
        } else {
          console.log('No match found');
        }
      });

      if (this.pushed > 0) {
        this.toastr.warning('Warning','Email already exists',{
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      } else {
        data.name = this.name;
        data.email = this.email;
        data.password = this.password;
        this.myservice.registerUser(data);
        this.toastr.success('Success','Registered successfully',{
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    } else {
      console.log('Error');
    }
  }

  clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  }
}
