import { Injectable, signal } from '@angular/core';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  private _isLoading = signal(false);
  private _errorMessage = signal<string>('');

  // Public signals
  user = this._user.asReadonly();
  isLoading = this._isLoading.asReadonly();
  errorMessage = this._errorMessage.asReadonly();

  constructor() {
    // Check if user is already logged in
    this.checkAuthState();
    this.initializeGoogleSignIn();
  }

  private initializeGoogleSignIn() {
    // For demo purposes, we'll use a simulated approach
    // In production, uncomment the Google Identity Services code below
    
    /*
    // Load Google Identity Services script
    if (!document.getElementById('google-signin-script')) {
      const script = document.createElement('script');
      script.id = 'google-signin-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.setupGoogleSignIn();
      };
      document.head.appendChild(script);
    } else {
      this.setupGoogleSignIn();
    }
    */
  }

  private setupGoogleSignIn() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
        callback: (response: any) => this.handleCredentialResponse(response)
      });
    }
  }

  private handleCredentialResponse(response: any) {
    // Decode the JWT token to get user information
    const payload = this.decodeJwtResponse(response.credential);
    
    const user: User = {
      uid: payload.sub,
      email: payload.email,
      displayName: payload.name,
      photoURL: payload.picture
    };

    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    this._isLoading.set(false);
  }

  private decodeJwtResponse(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  private async checkAuthState() {
    // Check localStorage for existing user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        this._user.set(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }

  async signInWithGoogle(): Promise<void> {
    this._isLoading.set(true);
    this._errorMessage.set('');

    try {
      // For demo purposes, simulate Google Sign-In
      await this.simulateGoogleSignIn();
      
      // In production, use this instead:
      // if (typeof google !== 'undefined') {
      //   google.accounts.id.prompt();
      // } else {
      //   throw new Error('Google Sign-In not loaded');
      // }
    } catch (error) {
      this._errorMessage.set('Failed to sign in with Google. Please try again.');
      this._isLoading.set(false);
      throw error;
    }
  }

  private async simulateGoogleSignIn(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate successful login with realistic user data
    const mockUser: User = {
      uid: 'google_' + Date.now(),
      email: 'demo.user@gmail.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150/4285f4/ffffff?text=U'
    };

    this._user.set(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    this._isLoading.set(false);
  }

  async signOut(): Promise<void> {
    this._isLoading.set(true);
    
    try {
      if (typeof google !== 'undefined') {
        google.accounts.id.disableAutoSelect();
      }
      
      this._user.set(null);
      localStorage.removeItem('user');
    } catch (error) {
      this._errorMessage.set('Failed to sign out. Please try again.');
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  isAuthenticated(): boolean {
    return this._user() !== null;
  }

  getCurrentUser(): User | null {
    return this._user();
  }
} 