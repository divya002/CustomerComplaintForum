import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
  }
  loginData = {
    username:'',
    password:''
  } 

  constructor(public authService: AuthService,public router:Router) { }

  post() {
      this.authService.loginUser(this.loginData);
      //this.router.navigateByUrl('/profile');
      
  }
  

}
