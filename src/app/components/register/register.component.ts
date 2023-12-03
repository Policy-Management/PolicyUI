import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { LoginService } from '../../services/login.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, RouterOutlet, RouterLink, RouterLinkActive,MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void { }

  credentials = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    panNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
      // Validators.pattern('/^[1-9][0-9]*$/'),
    ]),
    salary: new FormControl('', [
      Validators.required,
      Validators.min(10000),
      Validators.max(9999999999),
      // Validators.pattern('/^[1-9][0-9]*$/'),
    ]),
    employeeType: new FormControl('', [Validators.required])
  });
  public get employeeType() {
    return this.credentials.get('employeeType');
  }
  public get panNumber() {
    return this.credentials.get('panNumber');
  }
  public get address() {
    return this.credentials.get('address');
  }
  public get dateOfBirth() {
    return this.credentials.get('dateOfBirth');
  }
  public get firstName() {
    return this.credentials.get('firstName');
  }
  public get lastName() {
    return this.credentials.get('lastName');
  }
  public get username() {
    return this.credentials.get('username');
  }
  public get password() {
    return this.credentials.get('password');
  }
  public get phoneNumber() {
    return this.credentials.get('phoneNumber');
  }
  public get salary() {
    return this.credentials.get('salary');
  }

  onSubmit() {
    console.log(this.credentials.value);

    this.loginService.registerUser(this.credentials.value).subscribe(
      (response: any) => {
        console.log(response);
        window.location.href = '/';
      },
      (error) => {
        console.log(error);
      }
    );
  }

}