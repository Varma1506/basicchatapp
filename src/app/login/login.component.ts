import { Component, OnInit } from '@angular/core';
import {FormControl, Validators , FormGroup , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide =true;
  constructor(private fb : FormBuilder, private router : Router, private user: UserService) { }

  ngOnInit(): void {
    
  }
  loginForm = this.fb.group(
    { 
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
    });
    usernameErrorMessage() 
  {
    if(this.loginForm.get('username').hasError('required'))
    {
      return 'username is required';
    }
  }
  passwordErrorMessage()
  {
    if(this.loginForm.get('password').hasError('required'))
    {
      return 'password is required';
    }
    else if(this.loginForm.get('password').hasError('minlength'))
    {
      return 'password contains atleast 8 characters';
    }
  }

  public userData;
  onSubmit(){
    this.user.loginService(this.loginForm.value).subscribe((res)=>{
      if(res.message == ""){
        this.user.userData = res.user;
        this.router.navigate(['chat']);
      }
      else{
        alert(res.message);
      }
    },(err)=>{
      console.log('error : '+ err);
    });
  }

  
  routelogin()
  {
    this.router.navigate(['sign-up']);
  }

}

