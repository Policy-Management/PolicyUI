import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  LoggedIn = false;
  IsAdmin = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.LoggedIn = this.loginService.isLoggedIn();
    this.IsAdmin = this.loginService.isAdmin();
  }
  logoutUser() {
    this.loginService.logout();
    window.location.href = '/';
  }
}
