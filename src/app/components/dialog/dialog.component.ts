import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PolicyService } from '../../services/policy.service';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private policyService: PolicyService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // constructor(private policyService: PolicyService, public dialogRef: MatDialogRef<DialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.credentials.patchValue(this.data);
  }

  credentials = new FormGroup({
    policyName: new FormControl('', [Validators.required]),
    startDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
    durationInYears: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
    companyName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(10000), Validators.max(9999999999)]),
    policyType: new FormControl({ value: '', disabled: true }, [Validators.required]),
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

    this.policyService.update(this.data.id, this.credentials.value).subscribe(
      (response: any) => {
        window.location.href = '/home';
        console.log(response);
      },
      (error) => {
        alert('Not Authorize to register policy');
        console.warn(error);
      } 
    );

    // this.policyService.save(this.credentials.value).subscribe(
    //   (response) => {
    //     window.location.href = '/home';
    //     console.log(response);
    //   },
    //   (error) => {
    //     alert('Not Authorize to register policy');
    //     console.warn(error);
    //   }
    // );
  }

}