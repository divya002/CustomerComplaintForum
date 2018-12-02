import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user'
import { AuthService } from '../auth.service'
import { Observable } from "rxjs/Rx"
import { Router } from '@angular/router';
import 'rxjs'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validemail:boolean;
  validmobile:boolean;
  validuser:boolean;
  user = new User();
  types=['Customer','Agent']
  message: string;
  submitted: boolean = false;
  constructor(private authService: AuthService ,private router:Router) { }
  
  async checkemail(email) {
    let emailData: {} = { email: email };
    let result=await this.authService.checkEmailAvailability(emailData);
    this.validemail=result.valid;
  }
  async checkmobile(mobile) {
    let mobileData: {} = { mobile: mobile };
    let result=await this.authService.checkMobileAvailability(mobileData);
    this.validmobile=result.valid;
  }
  async onSubmit(registerForm: NgForm) {
     await this.checkemail(this.user.email);
     await this.checkmobile(this.user.mobile);
     
    console.log("submit"+this.validuser);
    console.log(registerForm);
    this.submitted = true;
    if (registerForm.valid &&this.validemail && this.validmobile) {
      await this.authService.registerUser(this.user);
      //registerForm.reset();
    }
    else
      this.message = "Please fill all details";
  }



  ngOnInit() {
    //this.checkusername(this.user.username);
  }

}
