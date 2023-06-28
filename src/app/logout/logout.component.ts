import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  user: firebase.User | null;

  constructor(private afAuth: AngularFireAuth) {
    this.user = null; // Initialize the user property to null
    afAuth.authState.subscribe(user => this.user = user);
  }
}
