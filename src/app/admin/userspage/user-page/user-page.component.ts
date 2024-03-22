import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
   convertedData:any;
   constructor( private authService:AuthService,
    private _http: HttpClient,
    private ngxXml2jsonService : NgxXml2jsonService
       ){
    // this.dataSource.data = TREE_DATA;
    this.loadParentXML();
   
    
  }

  // SET HEADERS and CALL SAMPLE XML DATA.

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

      

   // CONVERT XML DATA INTO JSON format
    parseXML2(data:any) {  
      var parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, 'text/xml'); 
      let standardObj :any = this.ngxXml2jsonService.xmlToJson(xmlDoc); // Converted into JSON
      this.convertedData = JSON.parse(JSON.stringify(standardObj));
    
      // console.log("JSON object =====>",this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode);
          // this.dataSource.data = this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode;
          // console.log("JSON object11 =====>",this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode);
          console.log("JSON object11 =====>",this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode);
          this.drawTree(this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode);


    }

    // FUNCTION TO DRAW NESTED TREE ON RECEIVED RESPONSE
    drawTree(data:any) {
        let parentChildren: any = [];
        let nodeChildren: any = [{buNode:'abc',feild_name:'xyz'}];

        let childArray1 : any =  [{name: 'Brucolli'}, {name: 'Brussels sprouts'}];
        let childArray : any = [{name:'Test',children: [{name: ''}, {name: 'Brussels sprouts'}]}];


          for(let i=0;i<data[1].BuNode.GroupBuNode.length;i++) {
            parentChildren.push(data[1].BuNode.GroupBuNode[i].FIELD_NM[9]);
            if(data[1].BuNode.GroupBuNode[i].BuNode) {
              nodeChildren.push(
                {
                  buNode:data[1].BuNode.GroupBuNode[i].BuNode,
                  feild_name: data[1].BuNode.GroupBuNode[i].FIELD_NM
                 } )
              } else {
                nodeChildren.push(
                  {
                    buNode: '',
                    feild_name: data[1].BuNode.GroupBuNode[i].FIELD_NM
                   } )
              } 

          }
          nodeChildren.splice(0,1);
          childArray1.splice(0,2);
          childArray.splice(0,1);

          for(let k=0;k<parentChildren.length;k++) {
             childArray.push({name:parentChildren[k],children:childArray1});
             
               for(let j=0;j<nodeChildren.length;j++) {
                 if(parentChildren[k] == nodeChildren[j].feild_name[9]) {    // Compare first level and their respective buNode
                  if( nodeChildren[j].buNode) {           
                    for(let g=0 ;g<nodeChildren[j].buNode.GroupBuNode.length;g++) {
                      childArray1.push({name:nodeChildren[j].buNode.GroupBuNode[g].FIELD_NM[9]})  // Collect buNode groups for first level
                    }
                  }
                   else {
                    childArray1.push({name: "Empty Data"})  // Collect buNode groups for first level
                  }

                  
                  childArray[k].children.push(childArray1); 
                  childArray1 =[]; 
                   
                  } 
          
               }

     
           }

         
        
        let TREE_DATA: FoodNode[] = [
            {
              name: data[0].FIELD_NM[2],
              children: [{name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode[0].FIELD_NM[9]}, 
              {name: 'Banana'}, {name: 'Fruit loops'}],
            },
            {
              name: data[1].FIELD_NM[9],
              children:  childArray
              // children : [
              //   {
              //     name: '',
              //     children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
              //   },
                // {
                //   name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode,
                //   children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
                // },
              // ],
            },
         ];


        
          this.dataSource.data = TREE_DATA;

    }

  // TREE DRAW RELATED STUFFS
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  // LOGOUT FROM CURRENT SESSION
  logout(){
    this.authService.logout();

  }

}
