import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  registerForm: FormGroup;
  message = '';

  constructor(
    private apicallservice: ApicallService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl<string | null>('', Validators.required ),
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
          // Passar a mensagem de sucesso como NavigationExtras
          const navigationExtras: NavigationExtras = {
            queryParams: { message: this.message }
          };
          this.router.navigate(['/login'], navigationExtras);
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
