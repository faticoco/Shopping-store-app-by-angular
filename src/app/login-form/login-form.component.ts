import { Component } from '@angular/core';
import 'firebase/compat/auth';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {
        login_msg!: string;
        logged_success: boolean = false;
        constructor(public Auth: AuthServiceService  )
        {
            
        }
        
        login()
        {  
          this.Auth.login();
         

        }
}
