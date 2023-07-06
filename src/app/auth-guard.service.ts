import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthServiceService, private router: Router) { }

 
  canActivate(route  : ActivatedRouteSnapshot , state  : RouterStateSnapshot) {
    return this.auth.users.pipe(
      map(users => {
        if (users) {
          return true;
        }
        this.router.navigate(['/login'] ,{queryParams:{ returnUrl: state.url}} );
        return false;
      })
    );
  }
}
