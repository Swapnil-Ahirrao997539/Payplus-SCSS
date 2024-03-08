import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor( private authService:AuthService, private fb:FormBuilder,private route:Router,private _http: HttpClient) {
    this.postCall();
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

  postCall() {  
    let data:any = {
      '@FORM_NAME@': 'frmVersion',
      '@COMMAND_EVENT@': 'eventGetVersion',
      'paramNmSeq': '1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv',
      'FPRINT': '18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw',
      //'paramNmSeq': '1iej1iev1j7p1lkv1k701lso1db51aqc1d401p3n1lqy1e8o1jcu1d991nbm1lk11ra41njf1qho1aqc1db51bbr1km61je81ll31gfz1lkn1jf21kkg1baf1d991ap61qjm1nkj1rc21llp1ne41db51jgg1eau1lt01p631d261ap61d991lra1k761lkv1j7d1ifb1ifn',
      // 'FPRINT': '19bn18cg19q11a4f1a4h1bpb1a4d1a4f19qd18ce19cb'
    }
    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet',data,
    {  
      headers: new HttpHeaders()  
      .set('Content-Type', 'application/x-www-form-urlencoded') 
      .append('Access-Control-Allow-Methods', 'POST')  
      .append('Access-Control-Allow-Origin', '*')  
      .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
      responseType: 'text' 

    })  
    .subscribe((data) => {  
      
    },error =>{
        alert('Internal Server Error'+ '' +JSON.stringify(error.status));
    }); 
  }

}
