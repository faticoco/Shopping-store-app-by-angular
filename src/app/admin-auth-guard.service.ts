import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import {  CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { switchMap, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthServiceService, private router: Router , private userservice: UserService) { }
  
  canActivate(): Observable<boolean> {
    return this.auth.users.pipe(
      switchMap(user => {
        const uid = user?.uid || ''; // Provide a default value (empty string) if user or user.uid is undefined
        return this.userservice.get(uid);
      }),
      map((appUser: AppUser | null) => {
        if (appUser) {
          return appUser.isadmin;
        } else {
          return false;
        }
      })
    );
  }
}
