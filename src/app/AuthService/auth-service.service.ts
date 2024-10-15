import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUser = {
    role: 'administrator' // This can be 'responsable-financier' or 'responsable-production'
  };
  getUserRole() {
    return this.currentUser.role;
  }
}
