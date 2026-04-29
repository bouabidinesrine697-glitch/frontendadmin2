import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSavedCredentials();
  }

  /**
   * Initialize the login form with validators
   */
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  /**
   * Load saved credentials if remember me was checked previously
   */
  private loadSavedCredentials(): void {
    const savedCredentials = localStorage.getItem('loginCredentials');
    if (savedCredentials) {
      try {
        const { email, password } = JSON.parse(savedCredentials);
        this.loginForm.patchValue({
          email,
          password,
          remember: true
        });
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    }
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }
console.log('Submitting login form with values:', this.loginForm.value);
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);
        this.successMessage = 'Login successful! Redirecting...';
                  this.router.navigate(['/dashboard']);

        // Save credentials if remember me is checked
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('loginCredentials', JSON.stringify(credentials));
        } else {
          localStorage.removeItem('loginCredentials');
        }

        // Store auth token if returned
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        if (response.access) {
          localStorage.setItem('authToken', response.access);
        }

        // Store user info
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }


        // Redirect to dashboard after a short delay
        // setTimeout(() => {
        // }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please check your connection.';
        } else if (error.error && error.error.detail) {
          this.errorMessage = error.error.detail;
        } else if (error.error && typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        console.error('Login error:', error);
      }
    });
  }

  /**
   * Getter for email field
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Getter for password field
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Check if email field has error
   */
  get emailError(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  /**
   * Check if password field has error
   */
  get passwordError(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  /**
   * Handle forgot password navigation
   */
  onForgotPassword(): void {
    this.router.navigate(['/auth/reset-password']);
  }

  /**
   * Handle signup navigation
   */
  onSignUp(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Handle social login (Google)
   */
  onGoogleLogin(): void {
    // TODO: Implement Google OAuth integration
    console.log('Google login not implemented yet');
  }

  /**
   * Handle social login (GitHub)
   */
  onGithubLogin(): void {
    // TODO: Implement GitHub OAuth integration
    console.log('GitHub login not implemented yet');
  }
}
