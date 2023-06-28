import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
   
  user: firebase.User | null;

  constructor(private afAuth: AngularFireAuth) {
    this.user = null; // Initialize the user property to null
    afAuth.authState.subscribe(user => this.user = user);
    afAuth.authState.subscribe(x=> console.log(x?.displayName));
  }


   
  onClick()
  {
      this.afAuth.signOut();
  }
}
