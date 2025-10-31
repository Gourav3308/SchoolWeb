import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <section class="page admin-login-page">
      <div class="login-container">
        <h1>Admin Login</h1>
        <form (ngSubmit)="onLogin()" class="login-form">
          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>
          
          <div class="form-group">
            <label>Username</label>
            <input type="text" [(ngModel)]="username" name="username" required>
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          
          <button type="submit" class="btn-login" [disabled]="isLoading">
            <span *ngIf="!isLoading">Login</span>
            <span *ngIf="isLoading">Logging in...</span>
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .admin-login-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
      padding: 2rem;
    }
    
    .login-container {
      background: #fff;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #0f172a;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #334155;
    }
    
    input {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: #ff8c00;
        box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
      }
    }
    
    .btn-login {
      background: #ff8c00;
      color: #fff;
      border: none;
      padding: 0.875rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
      
      &:hover:not(:disabled) {
        background: #ff9500;
        transform: translateY(-2px);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    
    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
    }
  `]
})
export class AdminLoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;

    this.http.post<any>('/api/admin/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          localStorage.setItem('adminToken', response.token);
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}

