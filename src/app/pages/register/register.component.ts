import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [ApicallService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(
    private apicallservice: ApicallService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl<string | null>('', { nonNullable: true }),
      email: new FormControl<string | null>('', { nonNullable: true }),
      password: new FormControl<string | null>('', { nonNullable: true }),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.apicallservice.postRegister(this.registerForm.value).subscribe(
        (response) => {
          this.message = 'Registration successful!';
        },
        (error) => {
          this.message = 'Registration failed. Please try again.';
          console.error('Registration error', error);
        }
      );
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }
}
