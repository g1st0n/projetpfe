import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthControllerApi } from '../../../network/openapi/apis/AuthControllerApi';  // Import the AuthService

@Component({
  selector: 'app-sign-in',
  providers: [
    AuthControllerApi // Provide your client API service here
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private authService: AuthControllerApi // Inject AuthService
  ) { }

  ngOnInit(): void {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }

  // Perform login
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true; // Start loading spinner

    const { email, password } = this.loginForm.value;

    const jwtRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Call the AuthService to perform login
    this.authService.login({ jwtRequest }).then((response) => {
      console.log('login success:', response);
      const token = response?.jwtToken;  // Extract token from response
      const role = response?.role;       // Extract role from response (modify based on your API)

      if (token && role) {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userRole', role);

        // Redirect to the dashboard
        this.redirectBasedOnRole(role);
      } else {
        this.snackBar.open('Login failed: No token returned', 'Close', { duration: 3000 });
      }
    })
    .catch((error) => {
      console.error('login failed:', error);
    });
}

  // Redirect the user based on their role
  redirectBasedOnRole(role: string) {
    if (role.includes('ADMIN')) {
      this.router.navigate(['/dashboard']);
    } else if (role.includes('FINANCIER')) {
      this.router.navigate(['/financier-dashboard']);
    } else if (role.includes('PRODUCTION')) {
      this.router.navigate(['/production-dashboard']);
    } else {
      this.snackBar.open('Role not recognized', 'Close', { duration: 3000 });
    }
  }
}
