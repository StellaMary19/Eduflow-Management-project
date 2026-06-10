import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule,FormControl,FormGroup,Validators} from '@angular/forms';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private authService : AuthService){

  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password :new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onLogin(){
    const loginRequest : LoginRequest = {
      email : this.loginForm.value?.email ?? '',
      password : this.loginForm.value?.password ?? ''
    }
    console.log(loginRequest);
    this.authService.login();
  }
}
