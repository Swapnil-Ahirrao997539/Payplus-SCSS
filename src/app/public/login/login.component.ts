import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { AuthService } from 'src/app/auth.service';
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
    // let data1 =`
    // @FORM_NAME@: frmLogin
    // @COMMAND_EVENT@: Submit
    // txtHiddenUserId:""
    // txtPassword:""
    // txtPasswordVisible:""
    // txtUserId :`+this.frmLogin.controls['username'].value+`
    // paramNmSeq: 1o3y1mxs1l6j1qw41jsu1tgx1nqk1oi61njf1owk1aj716kf16kf1efr1rj91rce1sbl1j7b1ns21ho71ho71hvc1xff1p4j1vv11ugo1oz21cbg1ho716kf1ai31efr1rj91qk21t3x1jm71uoj1mlc1r4z1gg71o5y1d261dgc1b3c1os31lmz1kuf1dpf1uum1v2p1vv11y161odn1kg51ho716kf1ai31efr1rj91qk21t3x1imi1r411pda1rc41pkl1qch1qxw1ok41jf61mlk1kna1inw1h9x1uh21th91gzu1kxi1i6c1xtx1w2e1r531r2v1w141xtl1i9m1l1k1h2s1thd1ugo1h6x1iki1kjc1mja1je41oiy1qvu1qal1phl1ra21pao1r3x1ilw1t291qh81rh51ehz1aj716kf1hl31kc91ob71y0k1vu91v1p1uvk1dnf1kqf1lir1op71b4m1dia1d401o4o1gfr1r2z1mji1unf1jlb1t291qh81rh51ehz1aj716kf1hl31c9u1owg1uh21vu91p571xfn1hs61hl31hl31nq41j7r1s9p1r9s1rh51ehz16kf16kf1ai31oyy1nkj1okw1nrm1thp1jsw1qxm1l6r1mzi1o6o
    // FPRINT: 18xh18xp1bi81aih19bx19q719c11ait1bi618xt18y1`
    
    
    // let formData: FormData = new FormData(); 
    // formData.append('@FORM_NAME@','frmLogin');
    // formData.append('@COMMAND_EVENT@','Submit')
    // formData.append('txtUserId',this.frmLogin.controls['username'].value)

    let data1  = {
    '@FORM_NAME@' : 'frmLogin',
    '@COMMAND_EVENT@' : 'Submit',
      txtHiddenUserId:"",
      txtPassword:"",
      txtPasswordVisible:"",
      txtUserId : this.frmLogin.controls['username'].value,
      paramNmSeq: '1o3y1mxs1l6j1qw41jsu1tgx1nqk1oi61njf1owk1aj716kf16kf1efr1rj91rce1sbl1j7b1ns21ho71ho71hvc1xff1p4j1vv11ugo1oz21cbg1ho716kf1ai31efr1rj91qk21t3x1jm71uoj1mlc1r4z1gg71o5y1d261dgc1b3c1os31lmz1kuf1dpf1uum1v2p1vv11y161odn1kg51ho716kf1ai31efr1rj91qk21t3x1imi1r411pda1rc41pkl1qch1qxw1ok41jf61mlk1kna1inw1h9x1uh21th91gzu1kxi1i6c1xtx1w2e1r531r2v1w141xtl1i9m1l1k1h2s1thd1ugo1h6x1iki1kjc1mja1je41oiy1qvu1qal1phl1ra21pao1r3x1ilw1t291qh81rh51ehz1aj716kf1hl31kc91ob71y0k1vu91v1p1uvk1dnf1kqf1lir1op71b4m1dia1d401o4o1gfr1r2z1mji1unf1jlb1t291qh81rh51ehz1aj716kf1hl31c9u1owg1uh21vu91p571xfn1hs61hl31hl31nq41j7r1s9p1r9s1rh51ehz16kf16kf1ai31oyy1nkj1okw1nrm1thp1jsw1qxm1l6r1mzi1o6o',
      FPRINT: '18xh18xp1bi81aih19bx19q719c11ait1bi618xt18y1'
   }

    
    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet',data1,
    {  
      observe: 'response',    
      headers: new HttpHeaders()  
      .set('Content-Type', 'application/x-www-form-urlencoded'),
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
