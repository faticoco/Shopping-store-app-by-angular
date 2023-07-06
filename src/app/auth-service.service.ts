import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
users: Observable<firebase.User|null>;
  
  constructor(private afAuth: AngularFireAuth , private route:ActivatedRoute)
  {
       this.users = afAuth.authState;
  }
      

      login()
      {
        let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());


        
      }
      
      logout()
      {
          this.afAuth.signOut();
      }
}
