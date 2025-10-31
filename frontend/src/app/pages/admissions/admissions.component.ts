import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.scss'
})
export class AdmissionsComponent {
  bookingForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  genders = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      aadharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      applyingForClass: ['', Validators.required],
      fatherName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      motherName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fatherOccupation: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      previousSchoolName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      profilePictureUrl: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.bookingForm.valid) {
      this.isSubmitting = true;
      const formData = this.bookingForm.value;

      this.http.post<any>('/api/students/register', formData)
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            if (response.message === 'success') {
              this.successMessage = response.status || 'Application submitted successfully. Please wait for approval.';
              this.bookingForm.reset();
              this.submitted = false;
              // Scroll to top to show success message
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              this.errorMessage = response.status || 'An error occurred';
            }
          },
          error: (error) => {
            this.isSubmitting = false;
            this.errorMessage = error.error?.status || 'An error occurred while submitting. Please try again.';
          }
        });
    }
  }

  get f() {
    return this.bookingForm.controls;
  }
}
