import { Component, OnInit } from '@angular/core';
import {FormControl, Validators , FormGroup , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../validators/confirmpasswordvalidator';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { UserService } from '../user.service';



@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  hide = true;
  hide2 = true;
  constructor(private fb:FormBuilder,private router:Router , private http: HttpClient , private user : UserService) { }


  ngOnInit(): void {
  }
  signupForm = this.fb.group(
    { 
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      repeatpassword:['',[Validators.required]]
    },
    {
      validator:MustMatch('password','repeatpassword')
    }
  )
  Onsubmit()
  {
    console.log(this.signupForm.value);
    var obj  =  this.user.submitService(this.signupForm.value).subscribe();
    alert('verify your given email');
    console.log(obj);
  }

  
  emailErrorMessage() {
    if (this.signupForm.get('email').hasError('required')) {
      return 'Email is required';
    }
    else if(this.signupForm.get('email').hasError('email'))
    {
      return 'Invalid email address';
    }
  }
  usernameErrorMessage() 
  {
    if(this.signupForm.get('username').hasError('required'))
    {
      return 'username is required';
    }
  }
  passwordErrorMessage()
  {
    if(this.signupForm.get('password').hasError('required'))
    {
      return 'password is required';
    }
    else if(this.signupForm.get('password').hasError('minlength'))
    {
      return 'password must contain atleast 8 characters';
    }
  }
  
  routelogin()
  {
    this.router.navigate(['login']);
  }

  
}
  