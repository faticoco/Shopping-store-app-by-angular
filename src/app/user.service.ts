import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase   } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private db: AngularFireDatabase,
  ) { }
  
  
  async addUserToFirestore(user: firebase.User ) {
   
    if (user.email && user.displayName) {
      const emailExists = await this.checkEmailExists(user.email);
      if (emailExists) {
        console.log('User with the same email already exists. Skipping addition to the database.');
        return;
      }
      
      return this.db.object<AppUser>('/users/' + user.uid).update({
        name: user.displayName,
        email:user.email
      });
    }
  }
    

      
    //   const userRef = this.db.list('users');
    //   const userData = {
    //     uid: user.uid,
    //     email: user.email,
    //     displayName: user.displayName,
    //     isadmin: 
    //   };
    
    //   console.log(userData);
    //   userRef.push(userData)
    //   .then(() => {
    //     console.log('Document added successfully.');
    //   })
    //   .catch(error => {
    //     console.error('Error adding document: ', error);
    //   });
    

    // } else {
    //   console.log('Invalid user data. Unable to add to Firestore.');
    // }
  


  
  
  get(uid: string):  Observable<AppUser | null> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
  
  async checkEmailExists(email: string): Promise<boolean> {
    const usersRef = this.db.list('users', ref => ref.orderByChild('email').equalTo(email));
    const snapshot = await usersRef.valueChanges().pipe(take(1)).toPromise();
    return (snapshot && snapshot.length > 0) || false;
  }

  
}
