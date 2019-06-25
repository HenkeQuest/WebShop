import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/shared/record.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  constructor(private service : RecordService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      RecordID :null,
      Band : "",
      Album : "",
      Year : null,
      Genre : ""
    }
  }

  onSubmit(form : NgForm){
    console.log("form.value.RecordID: ", form.value);
    if(form.value.RecordID == null){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form : NgForm){
    this.service.postRecord(form.value).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form : NgForm){
    this.service.putRecord(form.value).subscribe(res =>{
      this.toastr.info("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

}
