import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PolicyService } from '../../services/policy.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, NavbarComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent {
  constructor(private policyService: PolicyService, private router: Router) { }

  ngOnInit(): void { }

  credentials = new FormGroup({
    policyName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    durationInYears: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
    companyName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(10000), Validators.max(9999999999)]),
    policyType: new FormControl('', [Validators.required]),
    userTypes: new FormControl('', [Validators.required]),
    termsPerYear: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
    termAmount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)]),
    interest: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
  });
  public get policyName() {
    return this.credentials.get('policyName');
  }
  public get startDate() {
    return this.credentials.get('startDate');
  }
  public get durationInYears() {
    return this.credentials.get('durationInYears');
  }
  public get companyName() {
    return this.credentials.get('companyName');
  }
  public get amount() {
    return this.credentials.get('amount');
  }
  public get policyType() {
    return this.credentials.get('policyType');
  }
  public get userTypes() {
    return this.credentials.get('userTypes');
  }
  public get termsPerYear() {
    return this.credentials.get('termsPerYear');
  }
  public get termAmount() {
    return this.credentials.get('termAmount');
  }
  public get interest() {
    return this.credentials.get('interest');
  }


  onSubmit() {
    console.log(this.credentials.value);

    this.policyService.save(this.credentials.value).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        // window.location.href = '/home';
        console.log(response);
      },
      (error) => {
        alert('Not Authorize to register policy');
        console.warn(error);
      }
    );
  }
}