import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { RecordService } from 'src/app/shared/record.service';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeService } from 'src/app/shared/home.service';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styles: []
})
export class RecordDetailsComponent implements OnInit {

  record: Record = {
    "ID" : 0,
    "Band" : "",
    "Album" : "",
    "Year" : "",
    "Genre" : "",
    "Image" :  null,
    "ImagePath" : "",
    "Title" : "",
    "Price" : "",
    "Category" : ""
  };
  constructor(private route: ActivatedRoute, private recordService : RecordService, private homeService : HomeService ) { }

  ngOnInit() {
    
    this.route.params.subscribe( params => {
       this.homeService.list.forEach((rec: Record) => {
        console.log("rec: " + rec.ID);
        if (rec.ID == params.id) {
           this.record = rec;
        }
      });
    });
  }

}
