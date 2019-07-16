import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { ToastrService } from 'ngx-toastr';
import { RecordService } from 'src/app/shared/record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecordComponent } from '../record/record.component';
import { UserService } from 'src/app/shared/user.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  displayedColumns: string[] = ["Band","Album","Year","Genre","ImagePath","actions"];
  listData: MatTableDataSource<any>;
  searchResult;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public sanitizer: DomSanitizer, private router: Router, private service : RecordService,
    private toastr : ToastrService, private user : UserService) {

     }

  ngOnInit() {
    var refresh = this.service.refreshList();
    this.service.getRecords().then(res =>{
      console.log("res: ", res);
      this.listData = new MatTableDataSource(this.service.list);
      this.listData.sort = this.sort;
      // let array = list.map(item => {
      //   let departmentName = "sdsd";
      //   console.log("item: ", item);
      //   return {
      //     $key: item.RecordID,
      //     departmentName,
      //     item
      //   };
      // });
      // let array = Object.keys(list).map(item => {
      //   console.log("item: ", item);
      //   return list[item];
      // })
      // this.searchResult = list;
      // console.log("list: ", list);
      // this.listData = [{RecordID: 13, Band: "Blink 182", Album: "fertret", Year: "frvrfgrfg", Genre: "efrefrefe", Image: null, ImagePath: "tammerfist.jpg"}];;
      // this.listData = this.searchResult;
      //this.listData = this.listData.filteredData;
      //console.log("this.listData ", this.listData);

    });
    console.log("this.listData ", refresh);
    //this.listData = this.service.list;
    //this.service.list;

    let list = [{RecordID: 13, Band: "Blink 182", Album: "fertret", Year: "frvrfgrfg", Genre: "efrefrefe", Image: null, ImagePath: "tammerfist.jpg"}];

    //this.listData = new MatTableDataSource(this.service.list);
    
      
  }

  ngAfterContentInit(){
    
  }

  isAdmin(){
    console.log("isAdmin: " , this.user.roleMatch(["Admin"]));
    return this.user.roleMatch(["Admin"]);
  }

  populateForm(rec : Record){
    console.log("rec: ", rec);
    this.service.formData = Object.assign({}, rec);
    this.service.formData.ImagePath = "http://localhost:62921/Images/40/" + rec.ImagePath;
    //this.service.formData.ImagePath = "new path";
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteRecord(id).subscribe(res=>{
        this.toastr.warning("Deleted successfully", 'EMP. Register');
        this.service.refreshList();
      })
    }
  }

  details(id: number){
    var myurl = `record/${id}`;
    this.router.navigateByUrl(myurl);
  }

}
