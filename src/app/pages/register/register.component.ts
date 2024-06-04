import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApicallService } from '../../services/apicall.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [ApicallService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  apicallservice = inject (ApicallService);
  formBuilder = inject (FormBuilder);
  router = inject (Router);
  registerForm: FormGroup;
  message = '';

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl<string | null>('', Validators.required),
      email: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.apicallservice.postRegister(formData).subscribe(
        (response) => {
          this.message = 'Registration successful! You can now log in.';

          const navigationExtras: NavigationExtras = {
            queryParams: { message: this.message },
          };
          this.router.navigate(['/login'], navigationExtras);
        },
        (error) => {
          this.message = 'Registration failed. Please try again.';
          console.error('Registration error', error);
        },
      );
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }
}
