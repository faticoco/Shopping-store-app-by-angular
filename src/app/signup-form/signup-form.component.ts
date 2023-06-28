import { Component } from '@angular/core';
import { Firestore , collection , addDoc , collectionData } from '@angular/fire/firestore';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  constructor(private firestore : Firestore)
  {

  }
  onclick(f :any) 
  {
    addDoc(collection(this.firestore , 'users') , f.value).then(()=>{console.log('Data saved successfully');
  }).catch((error) => {console.log(error);
  })
  
  }

 
}
