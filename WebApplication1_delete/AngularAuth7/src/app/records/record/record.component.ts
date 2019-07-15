import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/shared/record.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Record } from 'src/app/shared/record.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  imageFile: File = null;
  imageUrl : string = "default-image.png";
  imageRootPath : string = "http://localhost:62921/Images/40/";
  fileToUpload : File = null;
  imageByteArray : [];
  record : Record;  

  constructor(private service : RecordService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.formData.ImagePath = this.imageRootPath + "default-image.png";
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      RecordID : 0,
      Band : "",
      Album : "",
      Year : "",
      Genre : "",
      Image : null,
      ImagePath : ""
    }
    this.service.formData.ImagePath =  this.imageRootPath + "default-image.png";
    this.imageUrl = this.imageRootPath + "default-image.png";
  }

  onSubmit(form : NgForm){
    console.log("form.value.RecordID: ", Image);
    if(form.value.RecordID == 0){
      console.log("event: ", form.value);
      
      this.insertRecord(form);
    }
    else{
      console.log("form: " + form.value.Band);
      console.log("event: ", this.service.formData.ImagePath);
      form.value.ImagePath = this.service.formData.ImagePath;
      this.updateRecord(form);
    }
  }

  onFileSelected(file : FileList){
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      console.log("event.target.result: ", event.target.result);
      this.service.formData.ImagePath = event.target.result;
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  insertRecord(form : NgForm){
    this.service.postRecord(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  updateRecord(form : NgForm){
    this.service.putRecord(form.value, this.fileToUpload).subscribe(res =>{
      console.log("form.Band: " + form.value.Band);
      console.log("form.ImagePath: " + form.value.ImagePath);
      console.log("form.Album: " + form.value.Album);
      this.toastr.info("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }


}
