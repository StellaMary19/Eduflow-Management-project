import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response.model';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
    providedIn : 'root'
})
export class AuthService{
 private http = inject(HttpClient);
 private apiUrl = 'http://localhost:8081/api/auth';

 login(request : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
 }

 test(){
    return this.http.get(`${this.apiUrl}/test`, {responseType : 'text'});
 }
}
