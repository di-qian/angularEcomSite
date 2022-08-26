import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject, switchMap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('login credentials', loginCredentials);

    return this.httpClient
      .post<User>(`${this.apiUrl}login`, loginCredentials)
      .pipe(
        switchMap((foundUser) => {
          this.setUser(foundUser);
          console.log(`user found`, foundUser);
          return of(foundUser);
        }),
        catchError((e) => {
          console.log(
            `Your login detail could not be verified. Please try again`,
            e
          );
          return throwError(
            `Your login detail could not be verified. Please try again`
          );
        })
      );
  }

  logout() {
    //remove user from subject
    this.setUser(null);
    console.log('user has been logged out');
  }

  get user() {
    return this.user$.asObservable();
  }

  register(user: any) {
    return this.httpClient.post(`${this.apiUrl}register`, user).pipe(
      switchMap((savedUser) => {
        this.setUser(savedUser);
        console.log(`user registered successfully`, savedUser);
        return of(savedUser);
      }),
      catchError((e) => {
        console.log(`server error occured`, e);
        return throwError(`Registeration failed please contact to admin`);
      })
    );
  }

  private setUser(user: any) {
    this.user$.next(user);
  }
}
