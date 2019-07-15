import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { ToastrService } from 'ngx-toastr';
import { RecordService } from 'src/app/shared/record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecordComponent } from '../record/record.component';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, private router: Router, private service : RecordService,
    private toastr : ToastrService, private Record : RecordComponent) { }

  ngOnInit() {
    this.service.refreshList();
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
