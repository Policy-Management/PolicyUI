import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  isAdmin() {
    return (localStorage.getItem('role') != null) && (localStorage.getItem('role') == "ROLE_ADMIN");
  }
  save(cred: any) {
    return this.http.post(`${this.baseUrl}/register/policy`, cred, )
  }
  getall() {
    return this.http.get(`${this.baseUrl}/getall`, );
  }
  update(id: any, cred: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, cred, );
  }
  delete(id: any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, );
  }
}