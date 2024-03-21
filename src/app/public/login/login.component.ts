import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  version:any;
  copyright:any;
  frmLogin: FormGroup = this.fb.group({
    username:['', Validators.required],
    txtUserId :[''],
    password:['',Validators.required],
    txtPasswordVisible:[''],
   '@FORM_NAME@' :['frmLogin'],
   '@COMMAND_EVENT@':['']
      

  })
  constructor( private authService:AuthService, private fb:FormBuilder,private route:Router,private _http: HttpClient,
    private ngxXml2jsonService : NgxXml2jsonService

    
    ) {
    this.postCall();
     } 

  login(event:any) {
    let user = this.authService.login(this.frmLogin.value.username,this.frmLogin.value.password);
    this.loggedIn();
    let parser = new DOMParser();
    let xmlString = "<request>  <user>" + this.frmLogin.value.username + "</user> <password>" + this.frmLogin.value.password + "</password> </request>";
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
  loggedIn() {

    console.log('Form Data'+ JSON.stringify(this.frmLogin.value))
    let data1 =`
    @FORM_NAME@: frmLogin
    @COMMAND_EVENT@: Submit
    USER_ID :`+this.frmLogin.controls['username'].value+`
    paramNmSeq: 1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv
    FPRINT: 18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw`


    
    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet?@FORM_NAME@=frmLogin&@COMMAND_EVENT@=Submit',data1,
    {  
      observe: 'response',    
      headers: new HttpHeaders()  ,
      //.set('Content-Type', 'application/x-www-form-urlencoded') 
      //.append('Access-Control-Allow-Methods', 'POST')  ,
      // .append('Access-Control-Allow-Origin', '*')  
      //.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-  Origin,Origin, Access-Control-Request-Method"),  
      responseType: 'text' 

    })  
    .subscribe((data:any) => {  
 

    },error =>{
        alert('Internal Server Error'+ '' +JSON.parse(JSON.stringify(error.status)));
    }); 
  }

  postCall() {  
    let data1 =`
       @FORM_NAME@: frmVersion
       @COMMAND_EVENT@: eventGetVersion
       paramNmSeq: 1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv
       FPRINT: 18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw`
    

    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet?@FORM_NAME@=frmVersion&@COMMAND_EVENT@=eventGetVersion',data1,
    // this._http.post('http://localhost:8080/thinClient/servlet/MainServlet',data1,

    {  
      observe: 'response',    
      headers: new HttpHeaders()  ,
      //.set('Content-Type', 'application/x-www-form-urlencoded') 
      //.append('Access-Control-Allow-Methods', 'POST')  ,
      // .append('Access-Control-Allow-Origin', '*')  
      //.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-  Origin,Origin, Access-Control-Request-Method"),  
      responseType: 'text' 

    })  
    .subscribe((data:any) => {  
      var parser = new DOMParser();
      let convertedData = JSON.parse(JSON.stringify(data.body));
      let xmlDoc = parser.parseFromString(convertedData, 'text/xml'); 
      let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc); // Converted into JSON
      console.log(standardObj); 
      this.version = standardObj.GPP_VERSION_INFO.PRODUCT;
      this.copyright = standardObj.GPP_VERSION_INFO.COPYRIGHT;

      
      if(standardObj.SecurityException) {                               //**Check whether throw exception */
        this.route.navigate(['/servlet-exception'])   //** Redirect with error string to error page */
      } else {
        this.route.navigateByUrl('/');

      }


    },error =>{
        alert('Internal Server Error'+ '' +JSON.parse(JSON.stringify(error.status)));
    }); 
  }

}
