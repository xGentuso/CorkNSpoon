import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{user: User, token: string}>(`${environment.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(userData: {email: string, password: string, name: string}): Observable<any> {
    return this.http.post<{user: User, token: string}>(`${environment.apiUrl}/auth/register`, userData)
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
      // Make API call to validate token and get user data
      this.http.get<{user: User}>(`${environment.apiUrl}/auth/me`).subscribe({
        next: (response) => this.currentUserSubject.next(response.user),
        error: () => {
          this.logout(); // Invalid token or other error
        }
      });
    }
  }
} 