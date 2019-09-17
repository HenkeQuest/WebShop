import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { RecordService } from '../shared/record.service';
import { ClothingService } from '../shared/clothing.service';
import { FlagService } from '../shared/flag.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Record } from 'src/app/shared/record.model';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  displayedColumns: string[] = ["ID","Title","Price","Category","ImagePath"];
  listData = new MatTableDataSource<Record>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;
  list;

  constructor(private router:Router, 
              private service:UserService,
              private recordService: RecordService,
              private clothingService: ClothingService,
              private flagService: FlagService,
              private homeService: HomeService) { 

  }

  ngOnInit() {
    

    

    //this.homeService.populate(0);
  }

  // populate(){
  //   this.recordService.getRecords().subscribe(res => {
  //     this.list = res;
  //   })
    
  // }

  // populateFlags(){
  //   this.flagService.getFlag().then(res => {
  //     this.list = res;
  //   })
  // }

  // populateRecords(){
  //   this.recordService.getRecords().subscribe(res => {
  //     this.list = res;
  //   })
  // }

  // populateClothing(){
  //   this.clothingService.getClothing().then(res => {
  //     this.list = res;
  //   })
  // }

  details(id: number){
   // var myurl = `record/${id}`;
   // this.router.navigateByUrl(myurl);
  }

}
