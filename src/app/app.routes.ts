import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PolicyComponent } from './components/policy/policy.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        // canActivate: [() => inject(LoginService).isLoggedIn()],
      },
      {
        path: 'policy',
        component: PolicyComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        pathMatch:'full',
        redirectTo:'/'
      },
];