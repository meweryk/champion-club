import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})

export class AuthService {
  private token = null
  private myNicname = null
  private myShop = null
  private myEmail = null
  private myPhone = null


  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string, nicname: string, shop: string, email: string, phone: string }> {
    return this.http.post<{ token: string, nicname: string, shop: string, email: string, phone: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token, nicname, shop, email, phone }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
            localStorage.setItem('my-nicname', nicname)
            this.setNicname(nicname)
            localStorage.setItem('my-shop', shop)
            this.setShop(shop)
            localStorage.setItem('my-email', email)
            this.setEmail(email)
            localStorage.setItem('my-phone', phone)
            this.setPhone(phone)
            this.setChange(!!this.token)
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

  setShop(shop: string) {
    this.myShop = shop
  }

  setEmail(email: string) {
    this.myEmail = email
  }

  setPhone(phone: string) {
    this.myPhone = phone
  }

  getToken(): string {
    return this.token
  }

  getNicname(): string {
    return this.myNicname
  }

  getShop(): string {
    return this.myShop
  }

  getEmail(): string {
    return this.myEmail
  }

  getPhone(): string {
    return this.myPhone
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    this.setNicname(null)
    this.setShop(null)
    this.setEmail(null)
    this.setPhone(null)
    localStorage.clear()
    this.setChange(false)
  }

  private changeAuth = new BehaviorSubject(!!localStorage.getItem('auth-token'));

  $chT = this.changeAuth.asObservable()

  setChange(chAuth: boolean) {
    this.changeAuth.next(chAuth);
  }
}
