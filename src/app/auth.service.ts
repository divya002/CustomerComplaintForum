import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Response, Http } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';



@Injectable()
export class AuthService {
    errors = [];
    hasError: boolean = false;
    path = environment.path;

    TOKEN_KEY = 'token';
    EMAIL="email";
    TYPE='type';
    usertype="";

    constructor(private http: HttpClient, private router:Router) { }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.EMAIL);
        localStorage.removeItem(this.TYPE);

    }

    registerUser(registerData) {
        this.http.post<any>(this.path + '/users/', registerData).subscribe(res => {
            this.saveToken(res.token,res.type,res.email);
        })
    }

    loginUser(loginData) {
        this.http.post<any>(this.path + '/users/login', loginData).subscribe(res => {
            this.saveToken(res.token,res.type,res.email);
        },
            error => {
                (this.errors = error)
                this.hasError = true;
            }
        );
    }
    async checkUserAvailability(loginData) {
        let validuser;
        validuser=await this.http.post(this.path + '/users/checkusername', loginData).toPromise();
        let x=validuser;
        console.log(x);
        return validuser;
        
    }
    async checkEmailAvailability(emailData) {
        let validemail;
        await this.http.post(this.path + '/users/checkemail', emailData).toPromise().then(
            function (result) {
                validemail = result;
            }
        )
        return validemail;
    }
    async checkMobileAvailability(numberData) {
        let validmobile;
        await this.http.post(this.path + '/users/checkmobile', numberData).toPromise().then(
            function (result) {
                validmobile = result;
            }
        )
        return validmobile;
    }
    saveToken(token,type,email) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.TYPE,type);
        localStorage.setItem(this.EMAIL,email);
        this.usertype = type;
        this.router.navigate(['/profile'])
    }

}