import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { parseString } from 'xml2js';
import { parseNumbers } from 'xml2js/lib/processors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  version:any;
  copyright:any;
  frmLogin: FormGroup = this.fb.group({
    username:['', Validators.required],
    txtUserId :[''],
    password:['',],
    txtHiddenUserId:[''],
    txtPasswordVisible:[''],
    txtLanguage:[''],

   '@FORM_NAME@' :['frmLogin'],
   '@COMMAND_EVENT@':[''],
   '@SESSION_ID@':['']
      

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

    let data1: FormData = new FormData();
    data1.append('@FORM_NAME@','frmLogin');
    data1.append('@COMMAND_EVENT@','Submit')
    data1.append('txtHiddenUserId',this.frmLogin.controls['username'].value)
    data1.append('txtPassword','')
    data1.append('txtPasswordVisible','')
    data1.append('txtLanguage','English')
    data1.append('txtUserId','1dav1ew11jzp1k091eu51d9j')
    data1.append('paramNmSeq','1egv1gg11j7p1o4y1jsu1nkf1ime1hm91jeo1lk51i0d1bhi1e8o1emu1egv1b4m1dia1d401hu01gfr1rh51nbu1to01jlb1sv61pht1oiw1rhh1mja1kjc1kxi1h6x1aj71eau1biw1i8i1j0u1i0v1njj1jzz1nkf1i0v1j001i7g1bhi1e8o1ai31h9x1l1k1kna1mlk1rix1ok61pkd1sws1jm71tou1ndw1rj91gg71hti1d261dgc1b3c1egv1ep41eau1biw1i1d1lll1jem1hn11im01njj1jsw1o5o1j7d1gfx1egv')
    data1.append('FPRINT','1a4718qk1bb518xr1bb318xr1bb118qq1a4n')
    data1.append('@SESSION_ID@','')
  
    
    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet',data1,
    {  
      observe: 'response',    
      headers: new HttpHeaders(),  
      responseType: 'text' 

    })  
    .subscribe((data:any) => {  
       // Success resp
        // let data2: FormData = new FormData();
        // data2.append('@FORM_NAME@','frmVALogin');
        // data2.append('@COMMAND_EVENT@','Submit');
        // data2.append('statusCd302','302')
        this.login302Call();

    },error =>{
        alert('Internal Server Error'+ '' +JSON.parse(JSON.stringify(error.status)));
    }); 
  }
 
  login302Call(){
    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet?statusCd302=302',
    {  
      observe: 'response',    
      headers: new HttpHeaders(),  
      responseType: 'text' 

    })  
    .subscribe((data:any) => {  
       // Success resp

  
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
