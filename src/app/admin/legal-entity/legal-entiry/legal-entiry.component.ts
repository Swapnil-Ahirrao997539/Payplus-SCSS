import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-legal-entiry',
  templateUrl: './legal-entiry.component.html',
  styleUrls: ['./legal-entiry.component.scss']
})
export class LegalEntiryComponent {
  legalEntity: FormGroup = this.fb.group({
    username:['', Validators.required],
 

  });
  constructor(private fb:FormBuilder) {

  }
  submit(){
    
  }
}
