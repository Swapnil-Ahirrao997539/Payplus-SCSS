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
// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Control Branch',
//     children: [
//       {
//         name: 'Green',
//         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
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

          // for(let i=0;i<this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode.length;i++) {
          //   console.log("JSON object11 =====>",this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode[i].FIELD_NM[9]);

          // }
          
          // const TREE_DATA: FoodNode[] = [
          //   {
          //     name: 'System',
          //     children: [{name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode[0].FIELD_NM[9]}, 
          //     {name: 'Banana'}, {name: 'Fruit loops'}],
          //   },
          //   {
          //     name: 'Control Branch',
          //     children: [
          //       {
          //         name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode,
          //         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
          //       },
          //       {
          //         name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode,
          //         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
          //       },
          //     ],
          //   },
          // ];

          // this.dataSource.data = TREE_DATA;

    }
    // FUNCTION TO DRAW NESTED TREE ON RECEIVED RESPONSE
    drawTree(data:any) {
        let parentChildren: any = {};
         
         
        
        let TREE_DATA: FoodNode[] = [
            {
              name: data[0].FIELD_NM[2],
              children: [{name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode[0].FIELD_NM[9]}, 
              {name: 'Banana'}, {name: 'Fruit loops'}],
            },
            {
              name: data[1].FIELD_NM[9],
              children: [
                {
                  name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode,
                  children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
                },
                // {
                //   name: this.convertedData.GetUseConRep.BuTree.GroupBuTree.BuNode.GroupBuNode[1].BuNode.GroupBuNode,
                //   children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
                // },
              ],
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
