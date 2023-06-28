import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {
  login_msg!: string;
  logged_success: boolean = false;
 
  constructor(private afAuth: AngularFireAuth)
  {
   
  }
        
        onclick()
        {
       
         
          this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

              //   const data = collection(this.firestore , 'users');
              //   collectionData(data).subscribe(val =>
              //     {
              //       this.datas = collectionData(data);

              //       this.datas.forEach((item: any) => {
              //         if (item.email === f.email && item.password === f.password) {
              //           this.login_msg='logged in';
              //           this.logged_success=true;
              //           console.log("Logged in");
              //           this.router.navigateByUrl('/homepage');
                      
              //         }
              //       });
                    
              //       console.log(val);
                    
              // })
        }
}
