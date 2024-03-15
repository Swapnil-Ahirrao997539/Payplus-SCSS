import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-servlet-exception',
  templateUrl: './servlet-exception.component.html',
  styleUrls: ['./servlet-exception.component.scss']
})
export class ServletExceptionComponent {
  displayString :any;

  constructor(private route:ActivatedRoute,private _http: HttpClient,
    private ngxXml2jsonService : NgxXml2jsonService){
    this.postCall();
    //  this.displayString = this.route.snapshot.paramMap.get('data');
  }

  postCall() {  
    let data1:string =`@FORM_NAME@: frmVersion
       @COMMAND_EVENT@: eventGetVersion
       paramNmSeq: 1egv1jld1k741j0s1ldi1lll1nce1fgc1jsu1fnn1h0y1d261dgc1b3c1egv1b4m1dia1d401h1o1fnf1jsw1fgi1ndc1lk51le01j021k721jm51egv
       FPRINT: 18qe19q1194s1abc19j21bpb19j41abq194y19qd18qw`
    

    this._http.post('http://localhost:8080/thinClient/servlet/MainServlet?@FORM_NAME@=frmVersion&@COMMAND_EVENT@=eventGetVersion',data1,
    {  
      observe: 'response',    
      headers: new HttpHeaders()  
      .set('Content-Type', 'application/x-www-form-urlencoded') 
      .append('Access-Control-Allow-Methods', 'POST')  
      // .append('Access-Control-Allow-Origin', '*')  
      .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin,Origin, Access-Control-Request-Method"),  
      responseType: 'text' 

    })  
    .subscribe((data:any) => {  
      var parser = new DOMParser();
      let convertedData = JSON.parse(JSON.stringify(data.body));
      let xmlDoc = parser.parseFromString(convertedData, 'text/xml'); 
      let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc); // Converted into JSON
    this.displayString = standardObj.SecurityException.DATA.MSG;
   

    },error =>{
        alert('Internal Server Error'+ '' +JSON.parse(JSON.stringify(error.status)));
    }); 
  }

}
