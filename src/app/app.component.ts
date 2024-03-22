import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';  
// import { NgxXml2jsonService } from 'ngx-xml2json';
import { Route, Router } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xml-poc';
  public xmlItems: any;  
  feildName:any;
  session:any;
  constructor(private _http: HttpClient,
             private ngxXml2jsonService : NgxXml2jsonService ,
             private router:Router
    ) { 
      // this.loadXML();
      // this.loadParentXML()
     }  

  loadXML() {  
    this._http.get('/assets/users.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      .subscribe((data) => {  
        this.parseXML(data)  
     
      });  
      
  }  

  loadParentXML() {  
    this._http.get('/assets/users2.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      .subscribe((data) => {  
        this.parseXML2(data)  
        
      });  
      
  }  

  parseXML(data:any) {  
    var parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, 'text/xml'); 
    let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc);
    let convertedData:any = JSON.stringify(standardObj);
    console.log("==>",standardObj.CbrNode.GroupCbrNode.FIELD_NM);
     for(let i =0; i<standardObj.CbrNode.GroupCbrNode.FIELD_NM.length;i++) {
          this.feildName = standardObj.CbrNode.GroupCbrNode.FIELD_NM;
     }
     console.log("=<=>",this.feildName);
  }

  parseXML2(data:any) {  
    var parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, 'text/xml'); 
    // let firstEmploye = xmlDoc.getElementsByTagName('GroupCbrNode')[0];
    let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc);
    let convertedData:any = JSON.stringify(standardObj);
    console.log("Parent Responce =>",standardObj);
    console.log("JSON object=>",convertedData);

  }
}
