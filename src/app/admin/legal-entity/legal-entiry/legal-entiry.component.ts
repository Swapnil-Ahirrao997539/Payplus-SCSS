import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-legal-entiry',
  templateUrl: './legal-entiry.component.html',
  styleUrls: ['./legal-entiry.component.scss']
})
export class LegalEntiryComponent {
  tableData:any = {};
  legalEntity: FormGroup = this.fb.group({
    username:['', Validators.required],
    address1:['', Validators.required],
    address2:['', Validators.required],
 

  });
  constructor(private fb:FormBuilder) {

  }
  
  submit(){
     this.tableData = {
        username : this.legalEntity.controls['username'].value,
        address1 : this.legalEntity.controls['address1'].value,       
        address2 : this.legalEntity.controls['address2'].value,
     };
 
    alert("Table=>"+JSON.stringify(this.tableData));    



  }
}
