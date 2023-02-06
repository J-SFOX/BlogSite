import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000/users';
  authToken: any | undefined;
  user: any;
  constructor(private httpClient: HttpClient) {}

  registerUser(user: any) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.baseUrl + '/register', user, {
      headers: _headers,
    });
  }

  authenticateUser(user: any) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.baseUrl + '/login', user, {
      headers: _headers,
    });
  }

  getProfile() {
    this.loadToken();
    let _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    //   const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]

    return this.httpClient.get(this.baseUrl + '/profile', {
      headers: _headers,
    });
  }

  loadToken(): any {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token.split(' ')[1]);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  isLoggedIn() {
    return localStorage.getItem('id_token') ? true : false;
  }

  getUserId() {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user!);
    return userData.id;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
