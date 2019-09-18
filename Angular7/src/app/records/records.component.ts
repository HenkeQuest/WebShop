import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { RecordService } from '../shared/record.service';
import { CartService } from '../shared/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private homeService: HomeService, private activeRoute: ActivatedRoute, private recordService: RecordService, private cartService: CartService) { }

  order: string = 'Band';

  ngOnInit() {
    console.log('this.activeRoute: ', this.activeRoute);
    //this.recordService.refreshList();
    // this.recordService.getRecords().subscribe(res => {
    //   this.recordService.list = res;
    // })
  }

}
