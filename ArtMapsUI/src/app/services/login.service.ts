import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private currentUserSubject: BehaviorSubject<User>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
    }


    signIn(email, password): Observable<User>
    {
        const body: User = {
            id: 0,
            userName : email,
            password
        };
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<User>(environment.userEndpoint, body, {headers}).pipe(
            tap((data: User) => {
                this.currentUserSubject.next(data);
        }));
    }
    setCurrentUserSubject(value){
        this.currentUserSubject.next(value);
    }


  register(email, password): Observable<User>
  {
    const body: User = {
      id: 0,
      userName : email,
      password
    };
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.httpClient.post<User>(environment.userRegisterEndpoint, body, {headers}).pipe(
      tap((data: User) => {
        this.currentUserSubject.next(data);
      }));
  }

  isAuthenticated(){
        if (this.currentUserSubject.value != null && this.currentUserSubject.value.id > 0){
            return true;
        }
        return false;
    }
}
