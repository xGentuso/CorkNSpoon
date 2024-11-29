import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  register(userData: { email: string; password: string; name: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          this.currentUserSubject.next(response.user);
          localStorage.setItem('token', response.token);
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.currentUserSubject.next(response.user);
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<{ user: User }>(`${this.apiUrl}/me`).subscribe({
        next: (response) => this.currentUserSubject.next(response.user),
        error: () => {
          this.logout(); // Invalid token or other error
        }
      });
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
} 