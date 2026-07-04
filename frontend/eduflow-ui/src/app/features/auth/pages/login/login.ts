import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule,FormControl,FormGroup,Validators, NonNullableFormBuilder} from '@angular/forms';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthStateService } from '../../../../core/services/auth.state';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(NonNullableFormBuilder)

  constructor(private authService : AuthService , private authStateService : AuthStateService) {}
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]],
  })
 

  onLogin() : void{
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next : (response) => {
        if(!response.token){
          console.error('No token received');
          return;
        }
        this.authStateService.setToken(response.token);
      },
      error : (error) => {
        console.error('Login failed', error);
      }
    })
  }
}
