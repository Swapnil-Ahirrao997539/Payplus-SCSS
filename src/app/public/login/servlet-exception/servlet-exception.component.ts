import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servlet-exception',
  templateUrl: './servlet-exception.component.html',
  styleUrls: ['./servlet-exception.component.scss']
})
export class ServletExceptionComponent {
  displayString :any;

  constructor(private route:ActivatedRoute){
     this.displayString = this.route.snapshot.paramMap.get('data');
  }

}
