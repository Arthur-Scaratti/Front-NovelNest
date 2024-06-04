import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApicallService } from '../../services/apicall.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [ApicallService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  apicallservice = inject (ApicallService);
  formBuilder = inject (FormBuilder);
  route = inject (ActivatedRoute);
  
  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl<string | null>('', { nonNullable: true }),
    password: new FormControl<string | null>('', { nonNullable: true }),
  });;

  message = '';
  messageFromRegister: string | null = '';
  messageFromRegister$ = this.route.queryParams.subscribe((params) => {
    this.messageFromRegister = params['message'] || '';
  });
  
  constructor() {}
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.apicallservice.postLogin(credentials).subscribe(
        (response) => {
          const token = response.token;
          console.log(token);
          if (typeof window !== 'undefined' && 'sessionStorage') {
            sessionStorage.setItem('authToken', token);
          }
          this.message = 'Login successful!';
          window.location.href = '/home';
        },
        (error) => {
          this.message = 'Login failed. Please try again.';
          console.error('Login error', error);
        },
      );
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }
}
