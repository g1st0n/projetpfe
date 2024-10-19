import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  // Method to retrieve token and create authorization headers (plain object)
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
  
    // Initialize headers object
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'  // Always include Content-Type as application/json
    };
  
    if (token) {
      // Add Authorization header if token exists
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    return headers;
  }
  
}
