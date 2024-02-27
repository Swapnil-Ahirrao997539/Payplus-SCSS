import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  form: FormGroup = this.fb.group({
    username:['', Validators.required],
    password:['',Validators.required]

  })
  constructor( private authService:AuthService, private fb:FormBuilder,private route:Router) {

  }

  login() {
    let user = this.authService.login(this.form.value.username,this.form.value.password);
    let parser = new DOMParser();
    let xmlString = "<request>  <user>" + this.form.value.username + "</user> <password>" + this.form.value.password + "</password> </request>";
    let doc = parser.parseFromString(xmlString, "application/xml");
    console.log(doc);
    let headers = new HttpHeaders();
          headers = headers.append('Content-Type', 'text/xml');
          headers = headers.append('Accept', 'text/xml');
    let body =  '<request>' 
                '<username>Username</username>' 
                '<password>Password</password>' 
                '</request>';

    if(!user) {
      alert('Invalid Username or Password ');
    } else {
       this.route.navigateByUrl('/admin');
    }

  }

}
