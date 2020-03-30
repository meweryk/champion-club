import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})

export class AuthService {

  private token = null
  private myNicname = null

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string, nicname: string }> {
    return this.http.post<{ token: string, nicname: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token, nicname }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
            localStorage.setItem('my-nicname', nicname)
            this.setNicname(nicname)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  setNicname(nicname: string) {
    this.myNicname = nicname
  }

  getToken(): string {
    return this.token
  }

  getNicname(): string {
    return this.myNicname
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    this.setNicname(null)
    localStorage.clear()
  }
}
