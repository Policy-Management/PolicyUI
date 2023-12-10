import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void { }

  credentials = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  public get username() {
    return this.credentials.get('username');
  }
  public get password() {
    return this.credentials.get('password');
  }

  onSubmit(): void {
    console.warn(this.credentials.value);
    this.loginService.getToken(this.credentials.value).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/home']);
        // window.location.href = '/PolicyUI/home';
      },
      (error) => {
        console.log(error);
        alert('invalid credentials');
      }
    );
  }
}