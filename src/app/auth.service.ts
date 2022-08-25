import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<User>();

  constructor() {}

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('login credentials', loginCredentials);
    return of({ email, password });
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
    //make an api call to save user in db
    //update the user subject
    this.user$.next(user);
    console.log('registered user successfually', user);
    return of(user);
  }

  private setUser(user: any) {
    this.user$.next(user);
  }
}
