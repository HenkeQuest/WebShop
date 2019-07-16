import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { RecordService } from 'src/app/shared/record.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styles: []
})
export class RecordDetailsComponent implements OnInit {

  record: Record;
  constructor(private route: ActivatedRoute, private service : RecordService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.list.forEach((rec: Record) => {
        console.log("rec: " + rec.RecordID);
        if (rec.RecordID == params.id) {
          this.record = rec;
        }
      });
    });
  }

}
