// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthenticatedKey = 'isAuthenticated';
  private readonly loginTimeKey = 'loginTime';
  private readonly validUsername = 'fatma'; // Username is defined here
  private readonly validPassword = '122683Fatma'; // Password is defined here
  private readonly sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds

  private isAuthenticated = false;

  constructor(private router: Router) {
    if (this.isLocalStorageAvailable()) {
      // Initialize the authentication state from local storage
      const loginTime = localStorage.getItem(this.loginTimeKey);
      if (loginTime) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(loginTime) < this.sessionDuration) {
          this.isAuthenticated = localStorage.getItem(this.isAuthenticatedKey) === 'true';
        } else {
          this.logout(); // Automatically logout if the session has expired
        }
      }
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.isAuthenticated = true;
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.isAuthenticatedKey, 'true');
        localStorage.setItem(this.loginTimeKey, new Date().getTime().toString());
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.isAuthenticatedKey);
      localStorage.removeItem(this.loginTimeKey);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      const loginTime = localStorage.getItem(this.loginTimeKey);
      if (loginTime) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(loginTime) < this.sessionDuration) {
          return this.isAuthenticated;
        } else {
          this.logout(); // Automatically logout if the session has expired
        }
      }
    }
    return false;
  }
 // It's For checking local Storege Availability
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
