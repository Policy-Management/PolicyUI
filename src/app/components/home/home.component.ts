import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { PolicyService } from '../../services/policy.service';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
export interface credentials {
  policyName: string,
  startDate: string,
  durationInYears: string,
  companyName: string,
  amount: string,
  policyType: string,
  userTypes: string,
  termsPerYear: string,
  termAmount: string,
  interest: string
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isAdmin = false;

  displayedColumns: string[] = ['id', 'policyName', 'amount', 'companyName',
    'durationInYears', 'interest', 'policyType', 'startDate', 'termAmount',
    'termsPerYear', 'userTypes', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private policyService: PolicyService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
    this.isAdmin = this.policyService.isAdmin();
  }
  getAllUser() {
    this.policyService.getall().subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.id);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.dataSource == null) {
          this.noUsersToDisplay = true;
        } else {
          this.noUsersToDisplay = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  noUsersToDisplay: boolean = false;



  update(policy: any) {
    console.log("update" + policy);
    console.log(policy.policyName);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: policy,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   this.credentials = result;
    // });

    // this.policyService.update(policy.id, { "hi": "hi" }).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.warn(error);
    //   }
    // );

  }
  delete(id: any) {
    console.log("delete" + id);

    this.policyService.delete(id).subscribe(
      (response: any) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.warn(error);
        location.reload();
      }
    );
  }

}